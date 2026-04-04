import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const dataStr = formData.get("data");

    if (!dataStr || typeof dataStr !== "string") {
      return NextResponse.json(
        { error: "Missing application data" },
        { status: 400 }
      );
    }

    const data = JSON.parse(dataStr);

    // Validate required fields
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

    if (!data.events || data.events.length === 0) {
      return NextResponse.json(
        { error: "Select at least one event" },
        { status: 400 }
      );
    }

    // Create storage directory
    const storageDir = path.join(process.cwd(), "vendor-applications");
    await mkdir(storageDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const slug = data.businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 40);
    const appDir = path.join(storageDir, `${timestamp}_${slug}`);
    await mkdir(appDir, { recursive: true });

    // Save uploaded files
    const fileKeys = [
      "coi1",
      "coi2",
      "waiver",
      "healthPermit",
      "sellersPermit",
      "additionalDoc",
    ];
    const uploadedFiles: Record<string, string> = {};

    for (const key of fileKeys) {
      const file = formData.get(key);
      if (file && file instanceof File && file.size > 0) {
        // 10MB limit
        if (file.size > 10 * 1024 * 1024) {
          return NextResponse.json(
            { error: `File ${key} exceeds 10MB limit` },
            { status: 400 }
          );
        }

        const ext = file.name.split(".").pop() || "pdf";
        const fileName = `${key}.${ext}`;
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(path.join(appDir, fileName), buffer);
        uploadedFiles[key] = fileName;
      }
    }

    // Save application data
    const application = {
      ...data,
      uploadedFiles,
      submittedAt: new Date().toISOString(),
      status: "pending",
    };

    await writeFile(
      path.join(appDir, "application.json"),
      JSON.stringify(application, null, 2)
    );

    return NextResponse.json({
      success: true,
      message: "Application received. We will review within 5 business days.",
    });
  } catch (err) {
    console.error("Vendor application error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again or email info@itsbiggerthanusla.org." },
      { status: 500 }
    );
  }
}
