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

/* Images per program — correct folders for each program type */
const PROGRAM_GALLERY_IMAGES: Record<string, string[]> = {
  'fire-relief': [
    '/images/fire-relief/relief-104.jpg', '/images/fire-relief/relief-177.jpg',
    '/images/fire-relief/hub-interior-1.jpg', '/images/fire-relief/hub-ty-community.jpg',
    '/images/fire-relief/hub-awards.jpg', '/images/fire-relief/hub-group.jpg',
  ],
  'back-2-school': [
    '/images/b2s/_D5A8614.jpg', '/images/b2s/_D5A8720.jpg',
    '/images/b2s/_D5A8877.jpg', '/images/b2s/_D5A9056.jpg',
    '/images/b2s/new-IMG_5394.jpg', '/images/b2s/new-IMG_5579.jpg',
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
    '/images/school/IMG_4674.jpg', '/images/school/IMG_5612.jpg',
    '/images/school/IMG_5884.jpg', '/images/school/IMG_6134.jpg',
    '/images/school/IMG_7067.jpg', '/images/school/IMG_7169.jpg',
  ],
  'community-builder-linkups': [
    '/images/gallery/IMG_4353.jpg', '/images/gallery/IMG_1501.jpg',
    '/images/gallery/IMG_1603.jpg', '/images/gallery/IMG_1359.jpg',
    '/images/gallery/IMG_1324.jpg', '/images/gallery/IMG_1807.jpg',
  ],
  'community-health': [
    '/images/wellness/IMG_0097.jpg', '/images/wellness/IMG_0111.jpg',
    '/images/wellness/IMG_4457.jpg', '/images/wellness/IMG_4688.jpg',
    '/images/wellness/IMG_9866.jpg', '/images/wellness/IMG_9874.jpg',
  ],
  'giving-season': [
    '/images/b2s/6D5A0871.jpg', '/images/b2s/6D5A1246.jpg',
    '/images/b2s/_D5A8700.jpg', '/images/b2s/_D5A8744.jpg',
    '/images/b2s/IMG_2113.jpg', '/images/b2s/IMG_2166.jpg',
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
