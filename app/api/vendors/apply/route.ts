import { NextResponse } from "next/server";

// Vendor applications write to the B2S Production Airtable base.
// Server-only env: AIRTABLE_API_KEY (PAT, scopes data.records:read+write on the base).
const BASE_ID = process.env.AIRTABLE_BASE_ID || "appxak9slpO0Okjwb";
const APPLICATIONS_TABLE = "tbl7RXZXIj58CLccz"; // Vendor Applications
const DOCUMENTS_TABLE = "tbldoyJUmom33rA4z"; // Vendor Documents

// Vendor Applications field IDs (stable across renames)
const F = {
  companyName: "fldRHEcJawSIbBOAu",
  firstName: "fldOoXNcuGLAgN0ux",
  lastName: "fldzNSRKrVv0u8TnB",
  email: "fldjzTsyqYfjCnfzV",
  phone: "fldye2pqDys52l4Cr",
  entityType: "flda08E2mT2G8Acxh",
  services: "fld2FpeiwidrWF52z",
  eventsApplying: "flduDgWR9hIycoavc",
  foodVendor: "fldf4fxve6LmqcLHI",
  regStatus: "fldzSNUsUR4znMrPe",
  notes: "fld4WeX20euh79bdi",
};

// Vendor Documents field IDs
const D = {
  orgName: "fldZDhlFbUrsDqNC4",
  email: "fld4YdbVVGGpW9Heo",
  docType: "fldvKhOOSrG2ZJt6Q",
  file: "fldottBEUembIrhLG",
  linkedApplication: "fld5vY3iaViNpf4ub",
};

// Site form event labels → existing "Events Applying To" choice names (must match Airtable exactly)
const EVENT_CHOICE_MAP: Record<string, string> = {
  "Back 2 School — Baldwin Hills Crenshaw Plaza — August 1, 2026":
    "Baldwin Hills Crenshaw Plaza- Aug 1",
  "Back 2 School — Exposition Park — August 8, 2026":
    " Exposition Park – Aug 8: Alliance College Ready Public Schools: Back 2 School Resource Fair",
  "Back 2 School — Venice Beach — August 15, 2026": "Venice Beach – Aug 15",
};

const DOC_TYPE_MAP: Record<string, string> = {
  coi1: "Certificate of Insurance (COI)",
  coi2: "Certificate of Insurance (COI)",
  waiver: "Other",
  healthPermit: "County Health Permit",
  sellersPermit: "Other",
  additionalDoc: "Other",
};

async function airtable(
  path: string,
  init: RequestInit & { json?: unknown } = {}
) {
  const res = await fetch(`https://api.airtable.com/v0/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    body: init.json !== undefined ? JSON.stringify(init.json) : init.body,
  });
  if (!res.ok) {
    throw new Error(`Airtable ${path} → ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

export async function POST(request: Request) {
  let data: Record<string, unknown> = {};
  try {
    const formData = await request.formData();
    const dataStr = formData.get("data");

    if (!dataStr || typeof dataStr !== "string") {
      return NextResponse.json(
        { error: "Missing application data" },
        { status: 400 }
      );
    }

    data = JSON.parse(dataStr);

    const required = [
      "businessName",
      "contactName",
      "email",
      "phone",
      "vendorType",
      "boothSize",
      "description",
    ];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const events = (data.events as string[]) || [];
    if (events.length === 0) {
      return NextResponse.json(
        { error: "Select at least one event" },
        { status: 400 }
      );
    }

    if (!process.env.AIRTABLE_API_KEY) {
      throw new Error("AIRTABLE_API_KEY is not configured");
    }

    const contactName = String(data.contactName).trim();
    const [firstName, ...rest] = contactName.split(/\s+/);
    const lastName = rest.join(" ");

    const mappedEvents = events
      .map((e) => EVENT_CHOICE_MAP[e])
      .filter(Boolean);
    const unmappedEvents = events.filter((e) => !EVENT_CHOICE_MAP[e]);

    const vendorType =
      data.vendorType === "Other" && data.vendorTypeOther
        ? `Other — ${data.vendorTypeOther}`
        : String(data.vendorType);

    const notesLines = [
      `Submitted via ibtu.la/vendors ${new Date().toISOString()}`,
      `Booth size preference: ${data.boothSize}`,
      data.website ? `Website: ${data.website}` : "",
      data.instagram ? `Instagram: ${data.instagram}` : "",
      data.previousVendor ? `Returning vendor: ${data.previousVendor}` : "",
      data.specialRequirements
        ? `Special requirements: ${data.specialRequirements}`
        : "",
      unmappedEvents.length
        ? `Also interested in (non-B2S): ${unmappedEvents.join("; ")}`
        : "",
    ].filter(Boolean);

    const fields: Record<string, unknown> = {
      [F.companyName]: String(data.businessName),
      [F.firstName]: firstName || contactName,
      [F.lastName]: lastName,
      [F.email]: String(data.email),
      [F.phone]: String(data.phone),
      [F.entityType]: vendorType,
      [F.services]: String(data.description),
      [F.regStatus]: "New – Pending Review",
      [F.notes]: notesLines.join("\n"),
    };
    if (mappedEvents.length) fields[F.eventsApplying] = mappedEvents;
    if (data.vendorType === "Food Truck / Food Vendor")
      fields[F.foodVendor] = "Yes";

    const created = await airtable(`${BASE_ID}/${APPLICATIONS_TABLE}`, {
      method: "POST",
      json: { records: [{ fields }], typecast: true },
    });
    const applicationId: string = created.records[0].id;

    // Upload any attached documents as linked Vendor Documents rows.
    // Failures here must not fail the application — note them instead.
    const fileKeys = Object.keys(DOC_TYPE_MAP);
    const fileNotes: string[] = [];
    for (const key of fileKeys) {
      const file = formData.get(key);
      if (!(file instanceof File) || file.size === 0) continue;
      try {
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("over 5MB upload limit");
        }
        const doc = await airtable(`${BASE_ID}/${DOCUMENTS_TABLE}`, {
          method: "POST",
          json: {
            records: [
              {
                fields: {
                  [D.orgName]: String(data.businessName),
                  [D.email]: String(data.email),
                  [D.docType]: DOC_TYPE_MAP[key],
                  [D.linkedApplication]: [applicationId],
                },
              },
            ],
            typecast: true,
          },
        });
        const docId: string = doc.records[0].id;
        const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
        const uploadRes = await fetch(
          `https://content.airtable.com/v0/${BASE_ID}/${docId}/${D.file}/uploadAttachment`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contentType: file.type || "application/pdf",
              file: base64,
              filename: file.name || `${key}.pdf`,
            }),
          }
        );
        if (!uploadRes.ok) {
          throw new Error(`upload → ${uploadRes.status}`);
        }
      } catch (fileErr) {
        console.error(`Vendor doc upload failed (${key}):`, fileErr);
        fileNotes.push(
          `Document "${key}" (${file.name}) failed to upload — request re-send by email.`
        );
      }
    }

    if (fileNotes.length) {
      await airtable(`${BASE_ID}/${APPLICATIONS_TABLE}`, {
        method: "PATCH",
        json: {
          records: [
            {
              id: applicationId,
              fields: {
                [F.notes]: `${notesLines.join("\n")}\n${fileNotes.join("\n")}`,
              },
            },
          ],
        },
      }).catch((e) => console.error("Vendor note update failed:", e));
    }

    return NextResponse.json({
      success: true,
      message: "Application received. We will review within 5 business days.",
    });
  } catch (err) {
    // Log the full payload so a failed write is recoverable from Vercel logs.
    console.error("Vendor application error:", err, "payload:", JSON.stringify(data));
    return NextResponse.json(
      { error: "Server error. Please try again or email info@itsbiggerthanusla.org." },
      { status: 500 }
    );
  }
}
