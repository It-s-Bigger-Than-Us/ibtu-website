import type { Metadata } from "next";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import { getAwards } from "@/sanity/lib/fetch";
import AwardsClient from "./AwardsClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Awards & Recognition | IBTU",
  description:
    "23 awards and recognitions from the U.S. Congress, California Legislature, City of Los Angeles, and community institutions — honoring IBTU's impact since 2020.",
};

// Media placements data — from Obsidian ibtu-partnerships-media.md
const MEDIA_PLACEMENTS = [
  { outlet: "Jennifer Hudson Show", type: "TV", year: 2025, description: "Season 3, Episode 95 — Molly Morrow and Tyrone Nance featured for wildfire relief and community-first crisis response.", featured: true },
  { outlet: "FOX 11 Los Angeles", type: "TV", year: 2025, description: "Coverage of IBTU's wildfire relief operations and community hub launch." },
  { outlet: "ABC News", type: "TV", year: 2025, description: "National coverage of LA wildfire community response." },
  { outlet: "Spectrum News 1", type: "TV", year: 2025, description: "Feature on IBTU Relief Hub operations at Baldwin Hills Crenshaw Plaza." },
  { outlet: "LA Sentinel", type: "Print", year: 2025, description: "Multiple features on community programs and school partnerships." },
  { outlet: "Yahoo Finance", type: "Digital", year: 2025, description: "Coverage of IBTU's disaster relief and community impact." },
  { outlet: "lululemon Glow Up Studio", type: "Event", year: 2025, description: "Featured at NYC activation — 13 media hits including WWD, People, and Interview Magazine." },
  { outlet: "WWD (Women's Wear Daily)", type: "Print", year: 2025, description: "lululemon Glow Up Studio feature highlighting IBTU partnership." },
  { outlet: "Interview Magazine", type: "Digital", year: 2025, description: "Feature on IBTU's community wellness programming." },
  { outlet: "Resident Advisor", type: "Digital", year: 2025, description: "Coverage of A Club Called Rhonda x IBTU community activation." },
  { outlet: "KJLH Radio", type: "Radio", year: 2025, description: "Regular features on IBTU community programs and events." },
  { outlet: "People Magazine", type: "Print", year: 2025, description: "Coverage of lululemon x IBTU wellness partnership." },
];

export default async function AwardsPage() {
  const sanityAwards = await getAwards();
  return (
    <>
      <TopNav />
      <AwardsClient awards={sanityAwards} media={MEDIA_PLACEMENTS} />
      <Footer />
    </>
  );
}
