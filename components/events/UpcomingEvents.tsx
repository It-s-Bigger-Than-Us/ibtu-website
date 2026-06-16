import EventEmbedBlock from "@/components/events/EventEmbedBlock";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ev = any;

/**
 * Consistent "Upcoming Events" section for EVERY program page.
 * Renders each upcoming/active event as an EventEmbedBlock (flyer + info + the 3 CTAs
 * + inline embedded checkout). Same look on every program page. Visual treatment will be
 * upgraded to the holographic-ticket design from Claude Design — structure maps onto it.
 */
export default function UpcomingEvents({
  events,
  heading = "What's Next",
}: {
  events: Ev[];
  heading?: string;
}) {
  const upcoming = (events || []).filter(
    (e: Ev) => e.status === "Upcoming" || e.status === "Active"
  );
  if (upcoming.length === 0) return null;

  return (
    <section
      id="upcoming-events"
      style={{
        background: "#000",
        padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)",
        scrollMarginTop: 96,
      }}
    >
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <span className="section-label" style={{ display: "block", marginBottom: 14 }}>
          Upcoming Events
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--display-section, clamp(36px, 5vw, 72px))",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            color: "#fff",
            marginBottom: 40,
          }}
        >
          {heading}
        </h2>
        <div style={{ display: "grid", gap: 24 }}>
          {upcoming.map((ev: Ev) => (
            <EventEmbedBlock key={ev._id || ev.slug || ev.title} event={ev} />
          ))}
        </div>
      </div>
    </section>
  );
}
