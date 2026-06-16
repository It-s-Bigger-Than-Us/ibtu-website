import EventbriteCheckout from "@/components/events/EventbriteCheckout";
import { urlFor } from "@/sanity/lib/client";

// The ONE responsive vendor application (Airtable form). First question = which event,
// then the form branches. Deep-linked with the event pre-filled. Falls back to /vendors
// until the Airtable form URL is set via env.
const VENDOR_FORM_BASE = process.env.NEXT_PUBLIC_VENDOR_FORM_URL || "";
const FALLBACK_VOLUNTEER_URL =
  "https://volunteer.bloomerang.co/volunteer/#/join-party?k=u9uiz8g1753qfr";

function vendorHref(eventTitle: string) {
  if (!VENDOR_FORM_BASE) return "/vendors";
  const sep = VENDOR_FORM_BASE.includes("?") ? "&" : "?";
  return `${VENDOR_FORM_BASE}${sep}prefill_Event=${encodeURIComponent(eventTitle)}`;
}

// Sanity stores dates as MM/DD/YYYY; convert to ISO (YYYY-MM-DD) for schema.org. Returns
// undefined for ranges/TBD so we never emit an invalid startDate.
function isoDate(dateStart?: string): string | undefined {
  if (!dateStart) return undefined;
  const m = dateStart.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return undefined;
  const [, mm, dd, yyyy] = m;
  return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
}

interface EventLike {
  _id?: string;
  title: string;
  slug?: string;
  dateStart?: string;
  dateEnd?: string;
  location?: string;
  shortDescription?: string;
  description?: string;
  status?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flyer?: any;
  rsvpUrl?: string;
  eventbriteId?: string;
  eventbriteWidgetHeight?: number;
  eventbriteBrandColor?: string;
  publicAttendance?: boolean;
  volunteerSignupOpen?: boolean;
  vendorSignupOpen?: boolean;
  volunteerUrl?: string;
}

/**
 * One event, rendered inline on its PROGRAM page (the canonical home for events).
 * Flyer + details + up to 3 conditional CTAs: Attendees (embedded Eventbrite checkout
 * or RSVP), Volunteers (Bloomerang), Vendors/Partners (the one Airtable vendor form,
 * event pre-filled). Visual treatment is intentionally simple — Claude Design refines later.
 */
export default function EventEmbedBlock({ event }: { event: EventLike }) {
  const showAttendee = Boolean(event.eventbriteId || event.rsvpUrl || event.publicAttendance);
  const showVolunteer = Boolean(event.volunteerSignupOpen);
  const showVendor = Boolean(event.vendorSignupOpen);
  const anchorId = event.slug ? `event-${event.slug}` : undefined;

  const startDate = isoDate(event.dateStart);
  const jsonLd = startDate
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        startDate,
        ...(isoDate(event.dateEnd) ? { endDate: isoDate(event.dateEnd) } : {}),
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        ...(event.shortDescription || event.description
          ? { description: event.shortDescription || event.description }
          : {}),
        ...(event.location
          ? { location: { "@type": "Place", name: event.location, address: event.location } }
          : {}),
        organizer: { "@type": "Organization", name: "It's Bigger Than Us", url: "https://ibtu.la" },
        ...(event.eventbriteId
          ? { url: `https://www.eventbrite.com/e/${event.eventbriteId}` }
          : event.rsvpUrl
            ? { url: event.rsvpUrl }
            : {}),
      }
    : null;

  return (
    <div
      id={anchorId}
      className="card-lift"
      style={{
        scrollMarginTop: 120,
        border: "1px solid var(--gold)",
        borderRadius: "var(--radius-card, 16px)",
        overflow: "hidden",
        background: "#000",
        display: "grid",
        gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
      }}
    >
      {jsonLd && (
        <script
          type="application/ld+json"
          // Content is from our own Sanity CMS; we still escape `<` so a stray "</script>"
          // in any field can't break out of the tag.
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}

      {/* Flyer (or branded fallback) */}
      <div style={{ position: "relative", minHeight: 280, background: "var(--gold)" }}>
        {event.flyer ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(event.flyer).width(800).quality(85).url()}
            alt={`${event.title} flyer`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 48px)", lineHeight: 0.95, textTransform: "uppercase", color: "#000" }}>
              {event.title}
            </span>
          </div>
        )}
      </div>

      {/* Details + CTAs */}
      <div style={{ padding: "32px clamp(24px, 3vw, 40px)", display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          {event.status && (
            <span style={{ background: "var(--gold)", color: "#000", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", padding: "3px 10px", borderRadius: "var(--radius-pill, 100px)" }}>
              {event.status}
            </span>
          )}
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--display-card, clamp(24px,3vw,40px))", lineHeight: 1.02, textTransform: "uppercase", color: "#fff", margin: "12px 0 8px" }}>
            {event.title}
          </h3>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--gold)", fontWeight: 600, lineHeight: 1.5 }}>
            {event.dateStart}{event.dateEnd && ` – ${event.dateEnd}`}{event.location && <> · {event.location}</>}
          </div>
          {(event.shortDescription || event.description) && (
            <p className="p" style={{ marginTop: 10, fontSize: 15 }}>{event.shortDescription || event.description}</p>
          )}
        </div>

        {/* Attendee path: embedded Eventbrite checkout, or RSVP button */}
        {showAttendee && event.eventbriteId ? (
          <EventbriteCheckout
            eventId={event.eventbriteId}
            height={event.eventbriteWidgetHeight || 425}
            brandColor={event.eventbriteBrandColor || "#ffc700"}
          />
        ) : showAttendee && event.rsvpUrl ? (
          <a href={event.rsvpUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">RSVP / Get Tickets →</a>
        ) : null}

        {/* Volunteer + Vendor paths */}
        {(showVolunteer || showVendor) && (
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {showVolunteer && (
              <a href={event.volunteerUrl || FALLBACK_VOLUNTEER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-black">Volunteer →</a>
            )}
            {showVendor && (
              <a href={vendorHref(event.title)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Vendors / Partners →</a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
