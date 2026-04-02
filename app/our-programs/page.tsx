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

/* Images per program for the 3D ring galleries */
const PROGRAM_GALLERY_IMAGES: Record<string, string[]> = {
  'fire-relief': [
    '/images/school/IMG_5382.jpg', '/images/school/IMG_5406.jpg',
    '/images/school/IMG_5508.jpg', '/images/school/IMG_5608.jpg',
    '/images/school/IMG_5629.jpg', '/images/school/IMG_5843.jpg',
  ],
  'back-2-school': [
    '/images/b2s/_D5A7392.jpg', '/images/b2s/_D5A7224.jpg',
    '/images/b2s/2V8A1964.jpg', '/images/b2s/_D5A5912.jpg',
    '/images/b2s/_D5A7155.jpg', '/images/b2s/_D5A7530.jpg',
  ],
  'coastal-care': [
    '/images/coastal/IMG_0024.jpg', '/images/coastal/IMG_0267.jpg',
    '/images/coastal/IMG_1796.jpg', '/images/coastal/IMG_1810.jpg',
    '/images/coastal/IMG_4838.jpg', '/images/coastal/IMG_4805.jpg',
  ],
  'wellness': [
    '/images/wellness/IMG_0007.jpg', '/images/wellness/IMG_0279.jpg',
    '/images/wellness/IMG_1554.jpg', '/images/wellness/IMG_1583.jpg',
    '/images/wellness/IMG_1610.jpg', '/images/wellness/IMG_9922.jpg',
  ],
  'youth-programming': [
    '/images/school/IMG_5608.jpg', '/images/school/IMG_5629.jpg',
    '/images/school/IMG_4674.jpg', '/images/school/IMG_5612.jpg',
    '/images/school/IMG_5884.jpg', '/images/school/IMG_6134.jpg',
  ],
  'community-builder-linkups': [
    '/images/gallery/IMG_4353.jpg', '/images/gallery/IMG_4649.jpg',
    '/images/gallery/IMG_4672.jpg', '/images/gallery/IMG_1311.jpg',
  ],
  'community-health': [
    '/images/gallery/IMG_1311.jpg', '/images/gallery/IMG_1673.jpg',
    '/images/gallery/IMG_4687.jpg', '/images/gallery/IMG_4907.jpg',
  ],
  'giving-season': [
    '/images/gallery/IMG_4944.jpg', '/images/gallery/IMG_1790.jpg',
    '/images/gallery/IMG_1848.jpg', '/images/gallery/IMG_4353.jpg',
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
