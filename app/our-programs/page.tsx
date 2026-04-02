import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import { getPrograms } from "@/sanity/lib/fetch";
import ProgramsCarousel from "@/components/sections/ProgramsCarousel";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Programs | IBTU — It's Bigger Than Us",
  description:
    "7 community programs across Crisis & Disaster Stabilization, School & Youth Stability, and Community Health & Resource Access. Built for Los Angeles.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  const cards = programs.map((prog: {
    slug: string;
    title: string;
    pillar: string;
    tagline: string;
    cardStat: string;
    scheduleType: string;
    heroImage?: { asset?: { _ref?: string } };
  }) => {
    const heroSrc = prog.heroImage?.asset?._ref
      ? `https://cdn.sanity.io/images/0m4ngfcw/production/${prog.heroImage.asset._ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}?w=800&q=80`
      : null;
    return {
      slug: prog.slug,
      title: prog.title,
      pillar: prog.pillar,
      tagline: prog.tagline,
      cardStat: prog.cardStat,
      scheduleType: prog.scheduleType,
      image: heroSrc,
    };
  });

  return (
    <>
      <ProgramsCarousel programs={cards} />
      <Footer />
    </>
  );
}
