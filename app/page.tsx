"use client";

import { useState } from "react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import OrbitHero from "@/components/sections/OrbitHero";
import StatsSection from "@/components/sections/StatsSection";
import MissionSection from "@/components/sections/MissionSection";
import PillarsSection from "@/components/sections/PillarsSection";
import ProgramsGrid from "@/components/sections/ProgramsGrid";
import GetInvolvedSection from "@/components/sections/GetInvolvedSection";
import IntroSequence from "@/components/3d/IntroSequence";

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && (
        <IntroSequence onComplete={() => setIntroComplete(true)} />
      )}
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
