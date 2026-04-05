import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { getPrograms } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/client";
import ProgramGallerySection from "@/components/sections/ProgramGallerySection";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Programs | IBTU — It's Bigger Than Us",
  description:
    "7 community programs across Crisis & Disaster Stabilization, School & Youth Stability, and Community Health & Resource Access. Built for Los Angeles.",
};

/* Images per program — unique to this page, no overlap with program detail pages.
   Updated 4/4/2026: correct image assignments per Molly's review. */
const PROGRAM_GALLERY_IMAGES: Record<string, string[]> = {
  'fire-relief': [
    '/images/fire-relief/IMG_8047.jpg', '/images/fire-relief/IMG_5909.jpg',
    '/images/fire-relief/IMG_9804.jpg', '/images/additional/IMG_0339.jpg',
    '/images/additional/IMG_0283.jpg', '/images/additional/IMG_0337.jpg',
  ],
  'back-2-school': [
    '/images/b2s/_D5A5792.jpg', '/images/b2s/_D5A5869.jpg',
    '/images/b2s/_D5A7187.jpg', '/images/b2s/_D5A7604.jpg',
    '/images/b2s/_D5A8685.jpg', '/images/b2s/_D5A8736.jpg',
  ],
  'coastal-care': [
    '/images/coastal/IMG_4920.jpg', '/images/coastal/IMG_1603.jpg',
    '/images/coastal/IMG_1817.jpg', '/images/coastal/IMG_1820.jpg',
    '/images/coastal/IMG_4805.jpg', '/images/coastal/IMG_4926.jpg',
  ],
  'wellness': [
    '/images/additional/IMG_1540.jpg', '/images/additional/IMG_1585.jpg',
    '/images/additional/IMG_1605.jpg', '/images/additional/IMG_1507.jpg',
    '/images/additional/IMG_1517.jpg', '/images/additional/IMG_1619.jpg',
  ],
  'youth-programming': [
    '/images/school/IMG_5406.jpg', '/images/school/IMG_5629.jpg',
    '/images/school/IMG_5652.jpg', '/images/school/IMG_5893.jpg',
    '/images/school/IMG_5895.jpg', '/images/school/IMG_6238.jpg',
  ],
  'community-builder-linkups': [
    '/images/linkup/community-builder-linkups.jpg', '/images/gallery/IMG_1324.jpg',
    '/images/gallery/IMG_1359.jpg', '/images/gallery/IMG_1501.jpg',
    '/images/gallery/IMG_1603.jpg', '/images/gallery/IMG_1807.jpg',
  ],
  'community-health': [
    '/images/additional/IMG_0418.jpg', '/images/additional/IMG_5506.jpg',
    '/images/additional/IMG_5511.jpg', '/images/additional/IMG_5645.jpg',
    '/images/additional/IMG_5724.jpg', '/images/additional/IMG_5850.jpg',
  ],
  'giving-season': [
    '/images/landscape/_D5A8844.jpg', '/images/landscape/_D5A8877.jpg',
    '/images/landscape/_D5A8894.jpg', '/images/landscape/_D5A8937.jpg',
    '/images/landscape/_D5A8946.jpg', '/images/landscape/_D5A9056.jpg',
  ],
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  const programsWithImages = programs.map((prog: {
    slug: string;
    title: string;
    pillar: string;
    tagline: string;
    cardStat: string;
    heroImage?: { asset?: { _ref?: string } };
  }) => {
    const heroSrc = prog.heroImage?.asset?._ref
      ? urlFor(prog.heroImage).width(800).quality(80).url()
      : null;
    return {
      slug: prog.slug,
      title: prog.title,
      pillar: prog.pillar,
      tagline: prog.tagline,
      cardStat: prog.cardStat,
      heroImage: heroSrc,
      galleryImages: PROGRAM_GALLERY_IMAGES[prog.slug] || [],
    };
  });

  return (
    <>
      <ProgramGallerySection programs={programsWithImages} />
      <Footer />
    </>
  );
}
