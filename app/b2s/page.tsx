import type { Metadata } from "next"
import Image from "next/image"
import Footer from "@/components/layout/Footer"
import ProgramStoryTabs from "@/components/sections/ProgramStoryTabs"
import UpcomingEvents from "@/components/events/UpcomingEvents"
import { getEventsByProgram } from "@/sanity/lib/fetch"

const STORY_TABS = [
  {
    label: "The Story",
    heading: "Six years. 18,550+ backpacks.",
    body: [
      "Every August, IBTU transforms community spaces into school-readiness hubs where thousands of families access backpacks, school supplies, uniforms, health screenings, haircuts, food, and partner resources.",
      "The Back 2 School Festival has grown from a single site to a multi-city operation across Los Angeles, now in its seventh year. In 2025, the festival expanded to three locations — Baldwin Hills Crenshaw Plaza, Venice Beach, and Crenshaw High School — distributing thousands of backpacks plus 100 laptops. This is not a handout. This is the first day of a year-long relationship.",
    ],
  },
  {
    label: "Day One",
    heading: "Readiness Starts Before the Bell Rings",
    body: [
      "The Back 2 School Festival is not a one-day event — it is the entry point for families into IBTU's year-round programming. Every child who walks through receives a fully loaded backpack with grade-appropriate supplies. But backpacks are only the beginning. On-site partners provide free health screenings, dental checks, vision exams, and haircuts. Enrollment counselors connect families to resources they did not know existed.",
      "In 2025, the Crenshaw High School Court Dedication distributed 1,000 backpacks and 100 laptops, with 139 families completing on-site service applications. The estimated value of that single event: $174,567.",
    ],
  },
  {
    label: "Three Locations",
    heading: "Three Locations, One Standard",
    body: [
      "In 2025, IBTU expanded the Back 2 School Festival to three simultaneous locations across Los Angeles. Baldwin Hills Crenshaw Plaza served 2,500+ attendees with 60+ partner organizations and 150+ volunteers. Venice Beach reached 5,000+ community members. Crenshaw High School hosted the Court Dedication.",
      "Every site operates at the same standard. The same quality of resources, the same partner services, the same dignified experience — regardless of zip code. IBTU does not do pop-ups. We build platforms.",
    ],
  },
  {
    label: "Partners",
    heading: "190+ Organizations. One Standard.",
    body: [
      "Over six years, 190+ organizations have partnered with the Back 2 School Festival. These are not logo placements. Partner organizations send staff, donate supplies, and run service stations alongside IBTU volunteers. Corporate teams work shoulder-to-shoulder with community members.",
      "17,500+ attendees, 90+ schools, 123+ zip codes. The Back 2 School Festival has become one of the largest community-driven school readiness events in Los Angeles. The work speaks for itself — and the community keeps showing up because IBTU does.",
    ],
  },
  {
    label: "Who We Serve",
    heading: "Who Walks Through The Doors",
    body: [
      "Back 2 School is open to every family who shows up — no registration, no ID, no proof of need.",
    ],
    bullets: [
      "Families preparing children for the school year who need supplies, uniforms, and resources",
      "Parents and caregivers seeking free health screenings and enrollment support for their kids",
      "Students from 90+ schools and 123+ zip codes across Los Angeles",
      "Fire-impacted families rebuilding stability through back-to-school readiness",
      "Community members looking to connect with year-round IBTU programming",
    ],
  },
]

export const metadata: Metadata = {
  title: "Back 2 School Festival 2026 | IBTU — 7th Annual",
  description:
    "Aug 1, 2026 at Baldwin Hills Crenshaw Plaza. Free backpacks, school supplies, haircuts, health screenings, food, and community resources. No registration. Just show up. 18,550+ backpacks distributed across 6 years.",
  alternates: { canonical: "/b2s" },
}

const STATS = [
  { value: "7th", label: "Annual Festival" },
  { value: "18,550+", label: "Backpacks Distributed" },
  { value: "17,500+", label: "Cumulative Attendees" },
  { value: "Aug 1", label: "2026 — Save the Date" },
  { value: "60+", label: "Brand Partners (2025)" },
  { value: "Free", label: "No Registration. Just Show Up." },
]

const WHAT_HAPPENS = [
  {
    title: "Backpacks + Supplies",
    desc: "Every student walks out with a backpack pre-loaded with grade-appropriate supplies — notebooks, pencils, folders, calculators. Stocked for day one.",
  },
  {
    title: "Free Haircuts",
    desc: "A barber and stylist village. Every kid gets the first cut of the school year — fresh, free, and yours.",
  },
  {
    title: "Health Screenings",
    desc: "Partner-led basic health checks: vision, dental, blood pressure. Resources to follow up at no cost.",
  },
  {
    title: "Resource Tables",
    desc: "60+ community partners on-site: LAUSD enrollment, immunizations, library cards, summer programming, mental health, legal aid.",
  },
  {
    title: "Music + Programming",
    desc: "DJs, local performers, and a kids' carnival. A festival, not a giveaway line. Designed with dignity at every touchpoint.",
  },
]

const TITLE_PARTNERS = [
  {
    name: "Day One",
    price: "$50,000",
    booth: "20'×30' Prime",
    desc: "Logo on ALL materials. Homepage logo + link. Solo social post + 2 reshares. 3 story features. Email header logo. 2 on-site mentions. Recap video. Solo metrics report. Press release quote. The biggest stage at the biggest event.",
  },
  {
    name: "Champion",
    price: "$25,000",
    booth: "20'×30'",
    desc: "Logo on most materials. Tier 1 website banner. Solo social post. 2 story features. Email body logo. 1 on-site mention. Recap video. Group metrics. Press release name.",
  },
]

const IMPACT_SPONSORS = [
  {
    name: "Catalyst",
    price: "$15,000",
    booth: "10'×20'",
    desc: "Logo grouped on most materials. Tier 2 website banner. Solo carousel frame. 1 grouped story. Tier 2 email inclusion.",
  },
  {
    name: "Fam",
    price: "$10,000",
    booth: "10'×20'",
    desc: "Logo grouped on some materials. Tier 2 website banner. Solo carousel frame. Grouped story slide. Tier 2 email.",
  },
]

const COMMUNITY_SPONSORS = [
  {
    name: "Ally",
    price: "$5,000",
    booth: "10'×10'",
    desc: "Logo on banner. Tier 3 website listing. Group carousel frame. Tier 3 story + email.",
  },
  {
    name: "Giver",
    price: "$2,500",
    booth: "10'×10'",
    desc: "Logo on banner. Tier 3 website listing. Group social post. Tier 3 story + email.",
  },
  {
    name: "Backer",
    price: "$1,000",
    booth: "10'×10'",
    desc: "Listed on materials. Tier 3 website. Group social post. Listed in story + email.",
  },
]

// B2S 2026 SSOT participation URLs (reference_b2s_2026_urls.md, 2026-05-10)
const B2S_RSVP = "https://www.eventbrite.com/e/1989189304758?aff=oddtdtcreator"
const B2S_VOLUNTEER = "https://volunteer.bloomerang.co/volunteer/#/join-party?k=vyfna5f8jt5mkg"
const B2S_VENDOR_FORM = "https://forms.gle/Q8i4g2wXXo6ZP7A3A"
const B2S_SPONSOR_URL = "https://secure.qgiv.com/for/ibt/event/b2s26/"

export default async function Back2SchoolPage() {
  const events = await getEventsByProgram("back-2-school")
  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", overflow: "hidden", background: "#FFC700" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", opacity: 0.15 }}>
          <Image
            src="/images/b2s/2V8A1776.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
        <div style={{ position: "relative", zIndex: 1, padding: "clamp(120px, 15vh, 180px) clamp(32px, 5vw, 80px) clamp(80px, 10vh, 120px)", maxWidth: "var(--content-max)", margin: "0 auto", width: "100%" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", color: "#000", fontWeight: 700, display: "block", marginBottom: 20 }}>
            7th Annual · August 1, 2026 · Baldwin Hills Crenshaw Plaza
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px, 12vw, 180px)", lineHeight: 0.88, textTransform: "uppercase", color: "#000", letterSpacing: "-0.025em", marginBottom: 24 }}>
            Back 2<br />School<br />Festival
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(18px, 1.6vw, 26px)", color: "#000", lineHeight: 1.55, fontWeight: 700, maxWidth: 720, marginBottom: 32 }}>
            Free backpacks, school supplies, haircuts, health screenings, food, and community resources. No registration. No ID. Just show up.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#sponsor" style={{ display: "inline-block", background: "#000", color: "#FFC700", padding: "16px 40px", borderRadius: 999, fontFamily: "var(--font-body)", fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 800, textDecoration: "none" }}>
              Become a Sponsor
            </a>
            <a href={B2S_SPONSOR_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", border: "2px solid #000", color: "#000", padding: "14px 38px", borderRadius: 999, fontFamily: "var(--font-body)", fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 800, textDecoration: "none" }}>
              Donate $7
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: "#000", padding: "clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px)" }}>
        <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--grid-gap)" }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ padding: "clamp(20px, 3vw, 40px)" }}>
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "clamp(32px, 4vw, 56px)", color: "#FFC700", lineHeight: 1, display: "block", marginBottom: 8 }}>{s.value}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-sm)", fontWeight: 600, color: "#FFF", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── UPCOMING EVENTS — consistent across all program pages (all 2026 B2S stops + embeds) ── */}
      <UpcomingEvents events={events} heading="The 2026 Tour" />

      {/* ── PICK YOUR LANE — 4-TILE CTA CHECKERBOARD ── */}
      <section style={{ background: "#FFC700", padding: "clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px)", borderTop: "2px solid #000", borderBottom: "2px solid #000" }}>
        <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", color: "#000", fontWeight: 700, display: "block", marginBottom: 16 }}>
            Pick Your Lane
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 7vw, 96px)", lineHeight: 0.9, textTransform: "uppercase", color: "#000", letterSpacing: "-0.02em", marginBottom: "clamp(40px, 5vw, 64px)" }}>
            Four Ways In
          </h2>
          <div className="b2s-cta-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(12px, 1.5vw, 20px)" }}>
            {/* TILE 1 — ATTEND: image top, black card bottom */}
            <a href={B2S_RSVP} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", textDecoration: "none", border: "2px solid #000" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden", background: "#000" }}>
                <Image src="/email/b2s-2026-launch/gallery-stage.jpg" alt="Back 2 School drumline performing on the main stage." fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ background: "#000", padding: "32px 20px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", aspectRatio: "1 / 1" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", color: "#FFC700", fontWeight: 700, marginBottom: 10 }}>Open to all</span>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "clamp(22px, 2.4vw, 32px)", color: "#FFC700", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 24, lineHeight: 1 }}>Attend</h3>
                <span style={{ display: "inline-block", background: "#FFC700", color: "#000", borderRadius: 999, padding: "12px 22px", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase" }}>RSVP now →</span>
              </div>
            </a>
            {/* TILE 2 — VOLUNTEER: yellow card top, image bottom */}
            <a href={B2S_VOLUNTEER} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", textDecoration: "none", border: "2px solid #000" }}>
              <div style={{ background: "#FFC700", padding: "32px 20px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", aspectRatio: "1 / 1" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", color: "#000", fontWeight: 700, marginBottom: 10 }}>Join the crew</span>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "clamp(22px, 2.4vw, 32px)", color: "#000", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 24, lineHeight: 1 }}>Volunteer</h3>
                <span style={{ display: "inline-block", background: "#000", color: "#FFC700", borderRadius: 999, padding: "12px 22px", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase" }}>Sign up →</span>
              </div>
              <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden", background: "#000" }}>
                <Image src="/email/b2s-2026-launch/gallery-resources.jpg" alt="Volunteers staffing the resource station." fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: "cover" }} />
              </div>
            </a>
            {/* TILE 3 — VENDOR: image top, black card bottom */}
            <a href={B2S_VENDOR_FORM} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", textDecoration: "none", border: "2px solid #000" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden", background: "#000" }}>
                <Image src="/email/b2s-2026-launch/lead-b2s-tents.jpg" alt="Vendor tent row at Back 2 School." fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ background: "#000", padding: "32px 20px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", aspectRatio: "1 / 1" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", color: "#FFC700", fontWeight: 700, marginBottom: 10 }}>Bring a table</span>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "clamp(22px, 2.4vw, 32px)", color: "#FFC700", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 24, lineHeight: 1 }}>Vendor</h3>
                <span style={{ display: "inline-block", background: "#FFC700", color: "#000", borderRadius: 999, padding: "12px 22px", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase" }}>Apply today →</span>
              </div>
            </a>
            {/* TILE 4 — SPONSOR: yellow card top, image bottom */}
            <a href={B2S_SPONSOR_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", textDecoration: "none", border: "2px solid #000" }}>
              <div style={{ background: "#FFC700", padding: "32px 20px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", aspectRatio: "1 / 1" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", color: "#000", fontWeight: 700, marginBottom: 10 }}>Fuel the day</span>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "clamp(22px, 2.4vw, 32px)", color: "#000", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 24, lineHeight: 1 }}>Sponsor</h3>
                <span style={{ display: "inline-block", background: "#000", color: "#FFC700", borderRadius: 999, padding: "12px 22px", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase" }}>Back us →</span>
              </div>
              <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden", background: "#000" }}>
                <Image src="/email/b2s-2026-launch/gallery-drummers.jpg" alt="Drumline at Back 2 School." fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: "cover" }} />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS ── */}
      <section style={{ background: "#FFC700", padding: "clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)" }}>
        <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 6vw, 80px)", lineHeight: 0.92, textTransform: "uppercase", color: "#000", letterSpacing: "-0.02em", marginBottom: "clamp(40px, 5vw, 64px)" }}>
            What Happens at B2S
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 32px)" }}>
            {WHAT_HAPPENS.map((item) => (
              <div key={item.title} style={{ background: "#000", borderRadius: 16, padding: "clamp(24px, 3vw, 40px)" }}>
                <h3 style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.2vw, 18px)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#FFC700", marginBottom: 12 }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-sm)", color: "#FFF", lineHeight: 1.7, fontWeight: 500 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY TABS (consolidated from /our-programs/back-2-school) ── */}
      <ProgramStoryTabs
        eyebrow="The Full Story"
        title="Seven Years of B2S"
        tabs={STORY_TABS}
      />

      {/* ── SPONSOR ── */}
      <section id="sponsor" style={{ scrollMarginTop: 80, background: "#000", padding: "clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)" }}>
        <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", color: "#FFC700", fontWeight: 700, display: "block", marginBottom: 16 }}>
            Sponsor the 7th Annual
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 7vw, 96px)", lineHeight: 0.9, textTransform: "uppercase", color: "#FFC700", letterSpacing: "-0.02em", marginBottom: 24 }}>
            Put Your Name<br />on the Work
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-lg)", color: "#FFF", lineHeight: 1.7, fontWeight: 500, maxWidth: 720, marginBottom: "clamp(48px, 6vw, 80px)" }}>
            Six years. 18,550+ backpacks. 17,500+ families. Sponsoring B2S is not a logo on a banner — it's your name attached to the most trusted community event in Los Angeles.
          </p>

          {/* TIER 1 */}
          <div style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <h3 style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "#FFC700", marginBottom: 12 }}>
              Tier 1 — Title Partners
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-md)", color: "#FFF", lineHeight: 1.7, fontWeight: 500, marginBottom: 32, maxWidth: 720 }}>
              You are the headline. Solo visibility across every channel — dedicated social posts, individual story features, press release inclusion, and a recap video that lives on IBTU's platforms year-round.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)" }}>
              {TITLE_PARTNERS.map((t) => (
                <div key={t.name} style={{ background: "#FFC700", borderRadius: 16, padding: "clamp(28px, 3vw, 40px)" }}>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 44px)", textTransform: "uppercase", color: "#000", letterSpacing: "-0.01em", lineHeight: 1, marginBottom: 8 }}>
                    {t.name}
                  </h4>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 900, color: "#000", display: "block", marginBottom: 4 }}>{t.price}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#000", display: "block", marginBottom: 16 }}>{t.booth}</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-sm)", color: "#000", lineHeight: 1.6, fontWeight: 500 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TIER 2 */}
          <div style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <h3 style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "#FFC700", marginBottom: 12 }}>
              Tier 2 — Impact Sponsors
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-md)", color: "#FFF", lineHeight: 1.7, fontWeight: 500, marginBottom: 32, maxWidth: 720 }}>
              Visible, recognized, and woven into the fabric of the festival. Mid-size booth in a high-traffic area. You are part of the story families experience on the ground.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)" }}>
              {IMPACT_SPONSORS.map((t) => (
                <div key={t.name} style={{ background: "#FFC700", borderRadius: 16, padding: "clamp(28px, 3vw, 40px)" }}>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 44px)", textTransform: "uppercase", color: "#000", letterSpacing: "-0.01em", lineHeight: 1, marginBottom: 8 }}>
                    {t.name}
                  </h4>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 900, color: "#000", display: "block", marginBottom: 4 }}>{t.price}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#000", display: "block", marginBottom: 16 }}>{t.booth}</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-sm)", color: "#000", lineHeight: 1.6, fontWeight: 500 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TIER 3 */}
          <div style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <h3 style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "#FFC700", marginBottom: 12 }}>
              Tier 3 — Community Sponsors
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-md)", color: "#FFF", lineHeight: 1.7, fontWeight: 500, marginBottom: 32, maxWidth: 720 }}>
              Every dollar counts and every partner matters. The entry point for businesses and organizations that want to be part of something real — and that plan to come back bigger next year.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(16px, 2vw, 24px)" }}>
              {COMMUNITY_SPONSORS.map((t) => (
                <div key={t.name} style={{ background: "#FFC700", borderRadius: 16, padding: "clamp(24px, 3vw, 36px)" }}>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 2.5vw, 36px)", textTransform: "uppercase", color: "#000", letterSpacing: "-0.01em", lineHeight: 1, marginBottom: 8 }}>
                    {t.name}
                  </h4>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 900, color: "#000", display: "block", marginBottom: 4 }}>{t.price}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#000", display: "block", marginBottom: 16 }}>{t.booth}</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-sm)", color: "#000", lineHeight: 1.6, fontWeight: 500 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "clamp(40px, 5vw, 64px)" }}>
            <a href={B2S_SPONSOR_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#FFC700", color: "#000", padding: "20px 56px", borderRadius: 999, fontFamily: "var(--font-body)", fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 800, textDecoration: "none" }}>
              Lock in a Tier
            </a>
          </div>
        </div>
      </section>

      {/* ── VENDOR PORTAL NOW OPEN — ONE DAY ONE STOP CALLOUT ── */}
      <section style={{ background: "#FFC700", padding: "clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)", borderTop: "2px solid #000" }}>
        <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <div style={{ border: "2px solid #000", background: "#FFC700", padding: "clamp(40px, 5vw, 72px) clamp(28px, 4vw, 56px)" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", color: "#000", fontWeight: 700, display: "block", marginBottom: 24 }}>
              Vendor Portal Now Open
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 7vw, 96px)", lineHeight: 0.9, textTransform: "uppercase", color: "#000", letterSpacing: "-0.02em", marginBottom: 32 }}>
              One Day. One Stop.<br />Everything A Family Needs.
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-md)", color: "#000", lineHeight: 1.7, fontWeight: 500, maxWidth: 760, marginBottom: 40 }}>
              B2S is purpose-driven — access, equity, joy. We're curating mission-aligned vendors and service partners: <strong style={{ fontWeight: 700 }}>healthcare, dental, civic services, electeds, resource providers, community orgs</strong> bringing high-impact activations for students and families.
            </p>

            <div style={{ borderTop: "2px solid #000" }}>
              {[
                ["Booth fee", "$500 flat · nonprofits and community orgs may apply for a fee waiver (mission-fit review required — not automatic)"],
                ["Included", "One table + two chairs per booth"],
                ["Required", "Valid Certificate of Insurance (COI) — for IBTU + Baldwin Hills Crenshaw Plaza requirements"],
                ["Selection", "Curated by alignment, impact & proposed activation"],
              ].map(([label, value]) => (
                <div key={label} className="b2s-spec-row" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "clamp(16px, 2vw, 32px)", padding: "16px 0", borderBottom: "1px solid #000" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#000" }}>{label}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-sm)", color: "#000", lineHeight: 1.55, fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40 }}>
              <a href={B2S_VENDOR_FORM} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#000", color: "#FFC700", padding: "18px 44px", borderRadius: 999, fontFamily: "var(--font-body)", fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 800, textDecoration: "none" }}>
                Apply to vendor →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── VENDORS ── */}
      <section id="vendors" style={{ scrollMarginTop: 80, background: "#FFC700", padding: "clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)" }}>
        <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", color: "#000", fontWeight: 700, display: "block", marginBottom: 16 }}>
            Vendor Booths — Limited Availability
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 6vw, 80px)", lineHeight: 0.92, textTransform: "uppercase", color: "#000", letterSpacing: "-0.02em", marginBottom: 24 }}>
            Set Up<br />Where People Are
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-lg)", color: "#000", lineHeight: 1.7, fontWeight: 500, maxWidth: 720, marginBottom: "clamp(40px, 5vw, 64px)" }}>
            Local businesses, food vendors, health providers, and community organizations — your booth puts you face-to-face with thousands of families. Direct access to your community, not a trade show. Nonprofit and community-org vendors: booth fee waived. Just note it on the application.
          </p>

          <div style={{ textAlign: "center" }}>
            <a href={B2S_VENDOR_FORM} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#000", color: "#FFC700", padding: "20px 56px", borderRadius: 999, fontFamily: "var(--font-body)", fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 800, textDecoration: "none" }}>
              Apply for a Booth
            </a>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-sm)", color: "#000", marginTop: 16, fontWeight: 600 }}>
              Vendor requirements: 2 Certificates of Insurance (COI) + signed liability waiver. Sent automatically after application.
            </p>
          </div>
        </div>
      </section>

      {/* ── VOLUNTEER + DONATE ── */}
      <section style={{ background: "#000", padding: "clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)" }}>
        <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 32px)" }}>
            <div style={{ background: "#FFC700", borderRadius: 24, padding: "clamp(40px, 5vw, 72px)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 56px)", textTransform: "uppercase", color: "#000", letterSpacing: "-0.01em", lineHeight: 0.95, marginBottom: 16 }}>
                Volunteer<br />Aug 1
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-md)", color: "#000", lineHeight: 1.7, fontWeight: 500, marginBottom: 24 }}>
                Pick a shift — load-in, service station, or guest flow. Bring a team if you can. We'll build a station around you.
              </p>
              <a href={B2S_VOLUNTEER} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#000", color: "#FFC700", padding: "16px 40px", borderRadius: 999, fontFamily: "var(--font-body)", fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 800, textDecoration: "none" }}>
                Pick a Shift →
              </a>
            </div>
            <div style={{ background: "#FFC700", borderRadius: 24, padding: "clamp(40px, 5vw, 72px)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 56px)", textTransform: "uppercase", color: "#000", letterSpacing: "-0.01em", lineHeight: 0.95, marginBottom: 16 }}>
                $7 Stocks<br />a Backpack
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-md)", color: "#000", lineHeight: 1.7, fontWeight: 500, marginBottom: 24 }}>
                The math is simple. 5,000 of us at $7 each. Send the link to seven friends. Watch what we build.
              </p>
              <a href={B2S_SPONSOR_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#000", color: "#FFC700", padding: "16px 40px", borderRadius: 999, fontFamily: "var(--font-body)", fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 800, textDecoration: "none" }}>
                Give $7 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SACRED PHRASE ── */}
      <section style={{ background: "#FFC700", padding: "clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)", textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 0.9, textTransform: "uppercase", color: "#000", letterSpacing: "-0.02em", marginBottom: 24 }}>
            Community<br />is the<br />Infrastructure.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-lg)", color: "#000", lineHeight: 1.6, fontWeight: 700, marginBottom: 8 }}>
            We listen. We build. We stay.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-md)", color: "#000", fontStyle: "italic", fontWeight: 500 }}>
            Designed with dignity.
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .b2s-cta-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section > div > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          .b2s-spec-row { grid-template-columns: 1fr !important; gap: 4px !important; }
        }
      `}</style>

      <Footer />
    </main>
  )
}
