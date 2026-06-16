import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import EventsCalendar from "@/components/sections/EventsCalendar";
import InTheFieldGallery from "@/components/sections/InTheFieldGallery";
import { EVENTS_GALLERY_IMAGES } from "@/lib/data/site-media";
import { getUpcomingEvents, getPrograms } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Events Calendar | IBTU — It's Bigger Than Us",
  description:
    "The IBTU community calendar — festivals, beach clean-ups, wellness sessions, food distributions, and more across Los Angeles. Filter by program or by how you want to get involved: attend, volunteer, or join as a vendor.",
  alternates: { canonical: "/events" },
};

// Programs with no public-facing event surface are hidden from the calendar filters.
const HIDDEN_PROGRAM_SLUGS = ['community-builder-linkups', 'incubation-academy', 'giving-season'];

export default async function EventsPage() {
  const [upcoming, programsRaw] = await Promise.all([
    getUpcomingEvents(),
    getPrograms(),
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const programs = programsRaw.filter((p: any) => !HIDDEN_PROGRAM_SLUGS.includes(p.slug));

  return (
    <>
      <EventsCalendar events={upcoming} programs={programs} />
      <section style={{ background: "#FFC700", padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)" }}>
        <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <span style={{ display: "block", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "#000", fontFamily: 'var(--font-body)', fontWeight: 700, marginBottom: 20 }}>
            Event Archive
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 0.95, color: "#000", marginBottom: 28 }}>
            HOW IBTU SHOWS UP
          </h2>
          <InTheFieldGallery
            items={EVENTS_GALLERY_IMAGES.map((image, index) => ({
              id: `events-gallery-${index}`,
              image,
              alt: `IBTU events gallery photo ${index + 1}`,
            }))}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
