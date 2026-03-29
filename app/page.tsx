"use client";

import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import OrbitHero from "@/components/sections/OrbitHero";
import StatsSection from "@/components/sections/StatsSection";
import PillarsSection from "@/components/sections/PillarsSection";
import ProgramsGrid from "@/components/sections/ProgramsGrid";
import GetInvolvedSection from "@/components/sections/GetInvolvedSection";
import ScrollText from "@/components/ui/ScrollText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ImageTile from "@/components/ui/ImageTile";
import StickyFlipbook from "@/components/ui/StickyFlipbook";

// Curated photos from Sanity CDN — mix of all programs
const FLIPBOOK_IMAGES = [
  { src: "https://cdn.sanity.io/images/0m4ngfcw/production/632cd4ff54c9edaf0a15a4c6e6f4a5762112f3a6-5674x3783.jpg?w=1600", alt: "Back 2 School Festival", caption: "18,550+ backpacks distributed across 6 years of Back 2 School Festivals." },
  { src: "https://cdn.sanity.io/images/0m4ngfcw/production/ade49221a64fe868c66d596336ac5f2582b98f28-3763x3010.jpg?w=1600", alt: "Youth Programming", caption: "28,025 students served across 34 school sites in 2025." },
  { src: "https://cdn.sanity.io/images/0m4ngfcw/production/a094389f86e390c4449847533d6f13f86482cae8-4819x3377.jpg?w=1600", alt: "Coastal Care", caption: "20,463+ items removed from Venice Beach coastline." },
  { src: "https://cdn.sanity.io/images/0m4ngfcw/production/be4abc3126994ff67875669d99476ae58d5d7c62-6240x4160.jpg?w=1600", alt: "Wellness & Health", caption: "Removing barriers to health and wellness in the places people already are." },
  { src: "https://cdn.sanity.io/images/0m4ngfcw/production/ea3cfe071b64caafd03f990a331de54e78d47961-6240x4160.jpg?w=1600", alt: "Fire Relief", caption: "5,000+ families stabilized. 15,000+ meals. The Hub is permanent infrastructure." },
  { src: "https://cdn.sanity.io/images/0m4ngfcw/production/c4e58bf5b5868b375ca344ef0476076e72afb5b0-6240x4160.jpg?w=1600", alt: "Community Health", caption: "875,500+ lbs of food distributed across 389+ events since 2020." },
  { src: "https://cdn.sanity.io/images/0m4ngfcw/production/8b2e4f4af515095c32feb931a08b715564e4b205-1536x1167.jpg?w=1600", alt: "Volunteers", caption: "10,000+ Community Builders powering the work." },
  { src: "https://cdn.sanity.io/images/0m4ngfcw/production/483a9f8a06cbe8d28e43c7de9dcc20f4ff18a328-5669x3779.jpg?w=1600", alt: "Community", caption: "Community is the infrastructure." },
];

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        {/* 1. Orbit Hero — unchanged */}
        <OrbitHero />

        {/* 2. Big Parallax Text Section */}
        <section
          style={{
            background: "#000",
            padding: "200px 0",
            overflow: "hidden",
          }}
        >
          <ScrollText
            direction="left"
            speed={0.4}
            color="#FFC700"
            size="clamp(48px, 10vw, 160px)"
          >
            COMMUNITY IS THE INFRASTRUCTURE
          </ScrollText>
          <div style={{ height: "60px" }} />
          <ScrollText
            direction="right"
            speed={0.35}
            color="#FFF"
            size="clamp(40px, 8vw, 130px)"
          >
            WE LISTEN. WE BUILD. WE STAY.
          </ScrollText>
        </section>

        {/* 3. Tiled Image Grid — asymmetric layout */}
        <section
          style={{
            background: "#000",
            padding: "80px 40px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "auto auto",
              gap: "20px",
            }}
          >
            {/* Tall left image — spans 2 rows */}
            <div style={{ gridRow: "1 / 3" }}>
              <ImageTile
                src="https://cdn.sanity.io/images/0m4ngfcw/production/632cd4ff54c9edaf0a15a4c6e6f4a5762112f3a6-5674x3783.jpg?w=800"
                alt="IBTU volunteers working with the community"
                height="700px"
                parallaxSpeed={0.2}
                style={{ borderRadius: "0" }}
              />
            </div>
            {/* Top right — shorter */}
            <div>
              <ImageTile
                src="https://cdn.sanity.io/images/0m4ngfcw/production/ade49221a64fe868c66d596336ac5f2582b98f28-3763x3010.jpg?w=800"
                alt="Community event organized by IBTU"
                height="340px"
                parallaxSpeed={0.12}
                style={{ borderRadius: "0" }}
              />
            </div>
            {/* Bottom right — shorter */}
            <div>
              <ImageTile
                src="https://cdn.sanity.io/images/0m4ngfcw/production/a094389f86e390c4449847533d6f13f86482cae8-4819x3377.jpg?w=800"
                alt="Youth programming and education support"
                height="340px"
                parallaxSpeed={0.25}
                style={{ borderRadius: "0" }}
              />
            </div>
          </div>
        </section>

        {/* 4. Sticky Flipbook — photos flip in as you scroll */}
        <StickyFlipbook images={FLIPBOOK_IMAGES} height="500vh" />

        {/* 5. Stats Section */}
        <StatsSection />

        {/* 5. Mission Text — editorial paragraph */}
        <section
          style={{
            background: "#FFF",
            padding: "160px 40px",
          }}
        >
          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            <RevealOnScroll delay={0}>
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 900,
                  fontSize: "14px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#FFC700",
                  marginBottom: "24px",
                }}
              >
                OUR MISSION
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15} y={40}>
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 400,
                  fontSize: "24px",
                  lineHeight: 1.6,
                  color: "#000",
                  margin: 0,
                }}
              >
                It&rsquo;s Bigger Than Us builds trusted, place-based programs
                that support youth, families, and neighborhoods through
                education, health access, and crisis response&nbsp;&mdash;
                designed with dignity, informed by community, and built to last.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* 6. Full-Bleed Image */}
        <section
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            background: "#000",
          }}
        >
          <ImageTile
            src="https://cdn.sanity.io/images/0m4ngfcw/production/be4abc3126994ff67875669d99476ae58d5d7c62-6240x4160.jpg?w=1600"
            alt="It's Bigger Than Us community in action"
            width="100%"
            height="100%"
            parallaxSpeed={0.15}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </section>

        {/* 7. Three Pillars */}
        <PillarsSection />

        {/* 8. Impact Numbers — parallax text */}
        <section
          style={{
            background: "#000",
            padding: "200px 0",
            overflow: "hidden",
          }}
        >
          <ScrollText
            direction="left"
            speed={0.35}
            color="#FFC700"
            size="clamp(50px, 10vw, 150px)"
          >
            62,475+ STUDENTS
          </ScrollText>
          <div style={{ height: "50px" }} />
          <ScrollText
            direction="right"
            speed={0.3}
            color="#FFF"
            size="clamp(50px, 10vw, 150px)"
          >
            875,500+ LBS FOOD
          </ScrollText>
          <div style={{ height: "50px" }} />
          <ScrollText
            direction="left"
            speed={0.4}
            color="#FFC700"
            size="clamp(50px, 10vw, 150px)"
          >
            300+ PARTNERS
          </ScrollText>
        </section>

        {/* 9. Programs Grid */}
        <ProgramsGrid />

        {/* 10. Get Involved */}
        <GetInvolvedSection />
      </main>

      {/* 11. Footer */}
      <Footer />
    </>
  );
}
