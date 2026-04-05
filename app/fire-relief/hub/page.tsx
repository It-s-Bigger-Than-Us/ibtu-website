import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/layout/Footer"
import { PROGRAM_VIDEOS } from "@/lib/data/video-urls"

export const metadata: Metadata = {
  title: "Relief Resource Hub | IBTU — It's Bigger Than Us",
  description:
    "The IBTU Relief Resource Hub at Baldwin Hills Crenshaw Plaza — permanent, community-led fire recovery. Case management, mental health, dental, housing, and more. Open Tue–Thu 12–4 PM.",
}

const HUB_STATS = [
  { value: '324', label: 'Active Clients' },
  { value: '7,581', label: 'Assistance Instances' },
  { value: '14,000+', label: 'Items Distributed' },
  { value: '90+', label: 'Zip Codes Served' },
  { value: '5+', label: 'Languages Spoken' },
  { value: '23.4', label: 'Avg Visits Per Client' },
]

const SERVICES = [
  { title: 'Material Aid', desc: 'Brand-new clothing, shoes, groceries, hygiene kits, household goods, baby supplies, and pet essentials — shoppable, not handout.' },
  { title: 'Case Management', desc: 'Comprehensive intake assessing housing, health, employment, and family needs at every visit. Long-term follow-up, not one-time.' },
  { title: 'FEMA Navigation', desc: 'Direct support navigating FEMA applications, appeals, and documentation — with bilingual staff across 5+ languages.' },
  { title: 'Mental Health', desc: 'Referrals and ongoing counseling connections for fire-related trauma, grief, and displacement stress.' },
  { title: 'Dental & Vision', desc: 'On-site dental services via Liberty Dental Plan and same-day vision screenings with glasses.' },
  { title: 'Employment Resources', desc: 'Job loss navigation for the 89+ individuals who lost employment due to the fires.' },
  { title: 'Housing Navigation', desc: 'Connections to temporary and permanent housing resources for the 79% of clients permanently displaced.' },
  { title: 'Legal & Immigration', desc: 'Legal aid and immigration support. We serve all survivors regardless of documentation status.' },
]

const PHASES = [
  {
    number: '01', title: 'RELIEF', subtitle: 'Essential Resources & Volunteer Activation',
    items: ['Rapid assessment & mobilization', 'Essential resource distribution', 'Volunteer activation & coordination', 'Emergency shelter & housing assistance', 'Crisis support & mental health resources'],
  },
  {
    number: '02', title: 'REBUILD', subtitle: 'Linkage to Services',
    items: ['Education & school support', 'Connections to community organizations', 'Government & legal assistance', 'Employment & workforce development'],
  },
  {
    number: '03', title: 'RENEW', subtitle: 'Long-Term Relational Building',
    items: ['Ongoing community support networks', 'Resilience planning & disaster preparedness', 'Mental health & trauma recovery services', 'Housing & economic stability programs', 'Policy advocacy & systemic change'],
  },
]

const FAQ = [
  {
    q: 'Who do you serve?',
    a: 'We serve survivors of the Eaton and Palisades fires — regardless of immigration status, documentation, or background. Since opening, we\'ve served families across 5+ languages (English, Spanish, Mandarin, Japanese, and Russian) including 38 seniors, 23 people with disabilities, 67 families with babies and young children, and 89 people who lost their jobs due to the fires.',
  },
  {
    q: 'What counts as proof of fire impact?',
    a: 'We work with whatever documentation you have: photo ID with affected address, lease or rental agreement, deed of trust, homeowner\'s or renter\'s insurance claim, Red Cross assistance letter, or FEMA registration number plus one supporting document. FEMA registration alone is not sufficient — we require at least one additional document showing your specific address was impacted.',
  },
  {
    q: 'What if I lost everything, including my ID?',
    a: 'We work with what you have. We accept passports, temporary IDs, and foreign-issued IDs. Combined with FEMA paperwork, insurance documents, utility bills, or bank statements showing your affected address, we will do our best to verify your situation.',
  },
  {
    q: 'What if I am undocumented?',
    a: 'You are welcome here. We accept foreign-issued IDs, utility bills, and lease agreements. We are committed to serving our full community with dignity and discretion.',
  },
  {
    q: 'What about smoke damage in neighboring areas?',
    a: 'If you were forced to leave your home due to smoke damage and cannot return, you may qualify. We\'ll need proof that you are still displaced — such as an uninhabitable notice, hotel receipts, or a temporary housing lease.',
  },
  {
    q: 'Why do you verify fire impact?',
    a: 'We verify because we want limited resources to reach the people who need them most. This is not about distrust — it\'s about accountability to our funders and to our community. We work hard to make verification easy, private, and dignified.',
  },
  {
    q: 'Do I need an appointment?',
    a: 'Appointments are recommended. Walk-ins are always welcome but may experience a longer wait time. The Hub is closed on holidays.',
  },
]

export default function HubPage() {
  return (
    <main style={{ background: '#000', minHeight: '100vh' }}>

      {/* ── HERO — Sky bg, gold type ── */}
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
            Crisis &amp; Disaster Stabilization
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 10vw, 160px)', lineHeight: 0.9, textTransform: 'uppercase', color: '#FFC700', letterSpacing: '-0.02em', marginBottom: 24, textShadow: '0 2px 30px rgba(0,0,0,0.3)' }}>
            The Relief<br />Resource Hub
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.4vw, 22px)', color: '#FFF', lineHeight: 1.7, fontWeight: 700, maxWidth: 640 }}>
            More than a relief site. A full-service recovery space — not a one-time handout, but ongoing, relationship-based support for every family that walks through our doors.
          </p>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <section style={{ background: '#000', padding: 'clamp(40px, 5vw, 60px) 0' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 clamp(32px, 5vw, 80px)' }}>
          <video
            src={PROGRAM_VIDEOS['fire-relief'].highlight}
            controls
            playsInline
            preload="metadata"
            style={{ width: '100%', borderRadius: 16, background: '#000' }}
            poster="/images/fire-relief/IMG_8047.jpg"
          />
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#FFC700', padding: 'clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--grid-gap)' }}>
          {HUB_STATS.map((stat) => (
            <div key={stat.label} style={{ padding: 'clamp(20px, 3vw, 40px)' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 900, fontSize: 'clamp(32px, 4vw, 56px)', color: '#000', lineHeight: 1, display: 'block', marginBottom: 8 }}>{stat.value}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', fontWeight: 600, color: '#000', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── LOCATION & HOURS ── */}
      <section style={{ background: '#000', padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 4vw, 64px)', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 0.92, textTransform: 'uppercase', color: '#FFC700', letterSpacing: '-0.02em', marginBottom: 24 }}>
              Visit the Hub
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-md)', color: '#FFF', lineHeight: 1.8, fontWeight: 700 }}>
              Baldwin Hills Crenshaw Plaza<br />
              Suite 224-226, Second Floor<br />
              3650 W. Martin Luther King Jr. Blvd<br />
              Los Angeles, CA 90008
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#FFC700', fontWeight: 700, marginBottom: 16 }}>Hours</h3>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-md)', color: '#FFF', lineHeight: 2.2, fontWeight: 600 }}>
              <p style={{ margin: 0 }}>Tuesday — 12:00 PM – 4:00 PM</p>
              <p style={{ margin: 0 }}>Wednesday — 12:00 PM – 4:00 PM</p>
              <p style={{ margin: 0 }}>Thursday — 12:00 PM – 4:00 PM</p>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: '#FFC700', marginTop: 16, fontWeight: 600 }}>
              Appointments recommended. Walk-ins welcome.
            </p>
            <a href="mailto:help@itsbiggerthanusla.org" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: '#FFC700', fontWeight: 700, display: 'block', marginTop: 8 }}>
              help@itsbiggerthanusla.org
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ background: '#FFC700', padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 0.92, textTransform: 'uppercase', color: '#000', letterSpacing: '-0.02em', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
            What We Provide
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(16px, 2vw, 32px)' }}>
            {SERVICES.map((svc) => (
              <div key={svc.title} style={{ background: '#000', borderRadius: 16, padding: 'clamp(24px, 3vw, 40px)' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.2vw, 18px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#FFC700', marginBottom: 12 }}>
                  {svc.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: '#FFF', lineHeight: 1.7, fontWeight: 600 }}>
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE-PHASE RECOVERY ── */}
      <section style={{ background: '#000', padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 0.92, textTransform: 'uppercase', color: '#FFC700', letterSpacing: '-0.02em', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
            Three-Phase Recovery
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(16px, 2vw, 32px)' }}>
            {PHASES.map((phase) => (
              <div key={phase.number} style={{ background: '#FFC700', borderRadius: 16, padding: 'clamp(24px, 3vw, 40px)' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#000', fontWeight: 700, display: 'block', marginBottom: 8 }}>
                  Phase {phase.number}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 40px)', textTransform: 'uppercase', color: '#000', lineHeight: 1, marginBottom: 8 }}>
                  {phase.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', fontWeight: 700, color: '#000', marginBottom: 16 }}>
                  {phase.subtitle}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {phase.items.map((item) => (
                    <li key={item} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: '#000', lineHeight: 2, fontWeight: 600, paddingLeft: 16, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: '#FFC700', padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 0.92, textTransform: 'uppercase', color: '#000', letterSpacing: '-0.02em', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
            Frequently Asked Questions
          </h2>
          {FAQ.map((item, i) => (
            <div key={i} style={{ borderTop: i === 0 ? 'none' : '1px solid #000', paddingTop: i === 0 ? 0 : 32, paddingBottom: 32 }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.4vw, 22px)', fontWeight: 800, color: '#000', marginBottom: 12 }}>
                {item.q}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-md)', color: '#000', lineHeight: 1.8, fontWeight: 600 }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#000', padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 72px)', lineHeight: 0.92, textTransform: 'uppercase', color: '#FFC700', letterSpacing: '-0.02em', marginBottom: 24 }}>
            We Were Here Before the Fires. We Are Here Now. We Are Not Leaving.
          </h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
            <a href="https://volunteer.bloomerang.co/JE/7haetjfrq5g190" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#FFC700', color: '#000', padding: '16px 40px', borderRadius: '16px', fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>
              Volunteer at the Hub
            </a>
            <a href="https://secure.qgiv.com/for/firerelief" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', border: '2px solid #FFC700', color: '#FFC700', padding: '16px 40px', borderRadius: '16px', fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>
              Support the Hub
            </a>
            <Link href="/fire-relief" style={{ display: 'inline-block', border: '2px solid #FFC700', color: '#FFC700', padding: '16px 40px', borderRadius: '16px', fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>
              Full Fire Relief Story
            </Link>
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
