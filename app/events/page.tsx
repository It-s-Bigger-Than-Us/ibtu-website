import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import EventsPageClient from "@/components/sections/EventsPageClient";
import InTheFieldGallery from "@/components/sections/InTheFieldGallery";
import { EVENTS_GALLERY_IMAGES } from "@/lib/data/site-media";
import { getAllEvents, getUpcomingEvents, getPrograms } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Events | IBTU — It's Bigger Than Us",
  description:
    "54 events across 7 programs — from annual festivals and monthly beach clean-ups to ongoing fire relief and weekly food distributions.",
  alternates: { canonical: "/events" },
};

const HIDDEN_PROGRAM_SLUGS = ['community-builder-linkups', 'incubation-academy'];

export default async function EventsPage() {
  const [events, upcoming, programsRaw] = await Promise.all([
    getAllEvents(),
    getUpcomingEvents(),
    getPrograms(),
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const programs = programsRaw.filter((p: any) => !HIDDEN_PROGRAM_SLUGS.includes(p.slug));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allByProgram = programs.map((p: any) => ({
    program: p,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events: events.filter((e: any) => e.programSlug === p.slug),
  }));

  return (
    <>
      <EventsPageClient
        events={events}
        upcoming={upcoming}
        programs={programs}
        allByProgram={allByProgram}
      />
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
