import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { getPrograms } from "@/sanity/lib/fetch";
import ProgramGallerySection from "@/components/sections/ProgramGallerySection";
import { PROGRAM_INDEX_GALLERIES } from "@/lib/data/site-media";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Programs | IBTU — It's Bigger Than Us",
  description:
    "7 community programs across Crisis & Disaster Stabilization, School & Youth Stability, and Community Health & Resource Access. Built for Los Angeles.",
};

const HIDDEN_PROGRAMS = ['gala', 'community-builder-linkups', 'incubation-academy']

export default async function ProgramsPage() {
  const programs = await getPrograms();

  const programsWithImages = programs.filter((p: { slug: string }) => !HIDDEN_PROGRAMS.includes(p.slug)).map((prog: {
    slug: string;
    title: string;
    pillar: string;
    tagline: string;
    cardStat: string;
    heroImage?: { asset?: { _ref?: string } };
  }) => {
      return {
        slug: prog.slug,
        title: prog.title,
        pillar: prog.pillar,
        tagline: prog.tagline,
        cardStat: prog.cardStat,
        heroImage: null,
        galleryImages: PROGRAM_INDEX_GALLERIES[prog.slug as keyof typeof PROGRAM_INDEX_GALLERIES] || [],
      };
    });

  return (
    <>
      <ProgramGallerySection programs={programsWithImages} />
      <Footer />
    </>
  );
}
