import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import OrbitHero from "@/components/sections/OrbitHero";
import StatsSection from "@/components/sections/StatsSection";
import MissionSection from "@/components/sections/MissionSection";
import PillarsSection from "@/components/sections/PillarsSection";
import ProgramsGrid from "@/components/sections/ProgramsGrid";
import GetInvolvedSection from "@/components/sections/GetInvolvedSection";

export const metadata: Metadata = {
  title: "It's Bigger Than Us (IBTU) | Community is the Infrastructure",
  description:
    "IBTU builds trusted, place-based programs for Los Angeles communities — from fire relief and youth programming to back-to-school festivals and food access. Designed with dignity.",
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <OrbitHero />
        <StatsSection />
        <MissionSection />
        <PillarsSection />
        <ProgramsGrid />
        <GetInvolvedSection />
      </main>
      <Footer />
    </>
  );
}
