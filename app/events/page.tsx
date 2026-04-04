import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import EventsPageClient from "@/components/sections/EventsPageClient";
import { getAllEvents, getUpcomingEvents, getPrograms } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Events | IBTU — It's Bigger Than Us",
  description:
    "54 events across 7 programs — from annual festivals and monthly beach clean-ups to ongoing fire relief and weekly food distributions.",
};

export default async function EventsPage() {
  const [events, upcoming, programs] = await Promise.all([
    getAllEvents(),
    getUpcomingEvents(),
    getPrograms(),
  ]);
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
      <Footer />
    </>
  );
}
