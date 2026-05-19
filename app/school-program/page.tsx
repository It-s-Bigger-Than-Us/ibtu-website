import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "School Program | IBTU — Bring IBTU to Your Campus",
  description:
    "IBTU operates on 34 school sites across Los Angeles — lunchtime activations, parent empowerment, resource fairs, staff wellness, and youth leadership. 62,475+ students served since 2020.",
  alternates: { canonical: "/school-program" },
}

const PROGRAMS = [
  {
    title: 'Lunchtime Takeovers',
    desc: 'IBTU transforms school cafeterias into spaces of belonging. Hot meals, music, mentorship, and community resources — delivered during the lunch period so every student is reached without disrupting instruction.',
    stat: '800+ students per activation',
  },
  {
    title: 'Parent Empowerment Workshops',
    desc: 'Eight-week cohort programs for parents and caregivers. Topics include advocacy, financial literacy, nutrition, and navigating school systems. Rated 4.7–5.0/5 by every cohort. Now in its third year.',
    stat: '4.7–5.0/5 satisfaction rating',
  },
  {
    title: 'Staff Appreciation & Wellness Days',
    desc: 'Licensed fitness instructors, mental health practitioners, and wellness programming delivered directly to school staff. Because educators cannot pour from empty cups.',
    stat: '75+ educators per campus',
  },
  {
    title: 'Resource Fairs & Open Houses',
    desc: 'IBTU brings 15+ partner organizations onto campus in a single day — health screenings, dental, vision, legal aid, housing navigation, food assistance, and enrollment support.',
    stat: '15+ partner orgs per fair',
  },
  {
    title: 'Community Creators',
    desc: 'Youth media leadership program. Students learn photography, videography, and storytelling — producing content that documents their own community. Builds skills, agency, and narrative ownership.',
    stat: 'Youth-led media program',
  },
]

const STATS = [
  { value: '28,025', label: 'Students Served in 2025' },
  { value: '62,475+', label: 'Cumulative Since 2020' },
  { value: '34', label: 'School Sites' },
  { value: '$721,660', label: 'Invested Across 4 Years' },
  { value: '50%', label: 'Year-Over-Year Growth' },
  { value: '4.7–5.0', label: 'Satisfaction Rating' },
]

// Partners list removed — no named partners on public pages

export default function SchoolProgramPage() {
  return (
    <main style={{ background: '#000', minHeight: '100vh' }}>

      {/* ── HERO — Sky bg ── */}
      <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <Image
            src="/images/blue-sky.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
            style={{ objectFit: 'cover', /* pure sky — no overlay */ animation: 'skyPan 60s linear infinite', transform: 'scale(1.2)' }}
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(120px, 15vh, 180px) clamp(32px, 5vw, 80px) clamp(80px, 10vh, 120px)', maxWidth: 'var(--content-max)', margin: '0 auto', width: '100%' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#FFC700', fontWeight: 700, display: 'block', marginBottom: 20 }}>
            School &amp; Youth Stability
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 10vw, 160px)', lineHeight: 0.9, textTransform: 'uppercase', color: '#FFC700', letterSpacing: '-0.02em', marginBottom: 24, textShadow: '0 2px 30px rgba(0,0,0,0.3)' }}>
            Bring IBTU<br />to Your Campus
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.4vw, 22px)', color: '#FFF', lineHeight: 1.7, fontWeight: 700, maxWidth: 640 }}>
            When families face instability, students feel it first. IBTU works inside schools to protect attendance, engagement, and opportunity — because showing up is how trust gets built.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#FFC700', padding: 'clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--grid-gap)' }}>
          {STATS.map((stat) => (
            <div key={stat.label} style={{ padding: 'clamp(20px, 3vw, 40px)' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 900, fontSize: 'clamp(32px, 4vw, 56px)', color: '#000', lineHeight: 1, display: 'block', marginBottom: 8 }}>{stat.value}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', fontWeight: 600, color: '#000', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE MODEL — What we do ── */}
      <section style={{ background: '#000', padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 0.92, textTransform: 'uppercase', color: '#FFC700', letterSpacing: '-0.02em', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
            What We Bring to Your School
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px, 2vw, 32px)' }}>
            {PROGRAMS.map((prog) => (
              <div key={prog.title} style={{ background: '#FFC700', borderRadius: 16, padding: 'clamp(24px, 3vw, 40px)' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.2vw, 18px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#000', marginBottom: 12 }}>
                  {prog.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: '#000', lineHeight: 1.7, fontWeight: 600, marginBottom: 16 }}>
                  {prog.desc}
                </p>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#000' }}>
                  {prog.stat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: '#FFC700', padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 0.92, textTransform: 'uppercase', color: '#000', letterSpacing: '-0.02em', marginBottom: 'clamp(32px, 4vw, 48px)' }}>
            How It Works
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              { step: '01', title: 'CONNECT', desc: 'A school administrator, counselor, or community partner reaches out to IBTU. We schedule a campus visit to understand your school\'s specific needs, demographics, and challenges.' },
              { step: '02', title: 'DESIGN', desc: 'IBTU designs a custom program package for your campus — selecting from Lunchtime Takeovers, Parent Empowerment Workshops, Resource Fairs, Staff Wellness Days, and Community Creators based on what your community needs most.' },
              { step: '03', title: 'ACTIVATE', desc: 'IBTU deploys to your campus with partner organizations, volunteers, and resources. We handle logistics, setup, staffing, and follow-up — your team just opens the door.' },
              { step: '04', title: 'SUSTAIN', desc: 'We don\'t do one-offs. IBTU commits to recurring programming on your campus — building trust with students, families, and staff over time. We listen, we build, we stay.' },
            ].map((item) => (
              <div key={item.step} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 16, alignItems: 'start' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 40px)', color: '#000', lineHeight: 1 }}>{item.step}</span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.2vw, 18px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#000', marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-md)', color: '#000', lineHeight: 1.7, fontWeight: 600 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners section removed — no named partners on public pages */}

      {/* ── CTA ── */}
      <section style={{ background: '#FFC700', padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 72px)', lineHeight: 0.92, textTransform: 'uppercase', color: '#000', letterSpacing: '-0.02em', marginBottom: 24 }}>
            Bring IBTU to Your Campus
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-lg)', color: '#000', lineHeight: 1.8, fontWeight: 600, marginBottom: 40 }}>
            IBTU partners with schools at no cost to the campus. We bring the resources, the volunteers, and the infrastructure. Your community brings the trust.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:info@itsbiggerthanusla.org?subject=School%20Program%20Inquiry" style={{ display: 'inline-block', background: '#000', color: '#FFC700', padding: '16px 40px', borderRadius: '16px', fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>
              Contact Us
            </a>
            <a href="https://volunteer.bloomerang.co/JE/9bxg8o3ix6z1ih" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', border: '2px solid #000', color: '#000', padding: '16px 40px', borderRadius: '16px', fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>
              Volunteer for Schools
            </a>
          </div>
        </div>
      </section>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          section > div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </main>
  )
}
