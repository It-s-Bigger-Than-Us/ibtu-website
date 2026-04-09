import type { Metadata } from "next"
import Link from "next/link"
import Footer from "@/components/layout/Footer"
import GetInvolvedHero from "@/components/sections/GetInvolvedHero"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Get Involved | IBTU — It's Bigger Than Us",
  description:
    "Volunteer, donate, sponsor, or partner with IBTU. $18:$1 leverage ratio. 62,475+ students served, 875,500+ lbs food distributed. Community is the infrastructure.",
}

const HERO_IMAGES = [
  '/images/b2s/6D5A0503.jpg',
  '/images/additional/IMG_5870.jpg',
  '/images/additional/IMG_0020.jpg',
  '/images/b2s/_D5A7384.jpg',
  '/images/school/IMG_6078.jpg',
  '/images/additional/IMG_0295.jpg',
  '/images/coastal/IMG_0561.jpg',
  '/images/b2s/6D5A0956.jpg',
  '/images/b2s/_D5A6045.jpg',
  '/images/additional/IMG_5667.jpg',
  '/images/additional/IMG_0285.jpg',
  '/images/coastal/IMG_4913.jpg',
]

// Sponsorship tiers removed — donations handled through Bloomerang/QGIV

const STATS = [
  { value: '62,475+', label: 'Students reached since 2020' },
  { value: '875,500+', label: 'Pounds of food distributed' },
  { value: '34', label: 'School sites across Los Angeles' },
  { value: '5,000+', label: 'Families stabilized after the LA fires' },
  { value: '7,500+', label: 'Volunteers activated' },
  { value: '300+', label: 'Partners building together' },
]

export default function GetInvolvedPage() {
  return (
    <>
      <GetInvolvedHero images={HERO_IMAGES} />

      <main style={{ background: '#000' }}>

        {/* ── THE NUMBERS DON'T LIE — 2-column ── */}
        <section style={{
          background: '#000',
          padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
        }}>
          <div style={{
            maxWidth: 'var(--content-max)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(32px, 4vw, 64px)',
            alignItems: 'start',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 6vw, 80px)',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              color: '#FFC700',
              letterSpacing: '-0.02em',
            }}>
              The Numbers Don&apos;t Lie
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-md)',
                color: '#FFF',
                lineHeight: 1.8,
              }}>
                Every $1 donated to IBTU moves $18 in essential resources to families. That is not a projection. That is our verified leverage ratio from $4.5M+ in mobilized in-kind support in 2025 alone. We are not a startup. We are infrastructure.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-md)',
                color: '#FFF',
                lineHeight: 1.8,
              }}>
                28,025 students across 34 school sites in 2025. 875,500+ pounds of food since 2020. A permanent Relief Resource Hub serving 324 clients. 23 government awards. This reach is the result of 300+ partnerships and a volunteer force 7,500 strong.
              </p>
            </div>
          </div>
        </section>

        {/* ── IMPACT PROOF — Stats ── */}
        <section style={{
          background: '#FFC700',
          padding: 'clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px)',
        }}>
          <div style={{
            maxWidth: 'var(--content-max)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--grid-gap)',
          }}>
            {STATS.map((stat) => (
              <div key={stat.label} style={{ padding: 'clamp(20px, 3vw, 40px)' }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 900,
                  fontSize: 'clamp(32px, 4vw, 56px)',
                  color: '#000',
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: 8,
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--body-sm)',
                  fontWeight: 600,
                  color: '#000',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Sponsorship tiers and sponsor-by-program sections removed — donations through Bloomerang */}

        {/* ── VOLUNTEER ── */}
        <section id="volunteer" style={{
          background: '#000',
          padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 6vw, 72px)',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              color: '#FFC700',
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}>
              Show Up. Do the Work.
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-md)',
              color: '#FFF',
              lineHeight: 1.8,
              marginBottom: 48,
              maxWidth: 640,
            }}>
              7,500+ people are in IBTU&apos;s volunteer network. They sort relief supplies at the Hub, run Lunchtime Takeovers at schools, clean Venice Beach with Coastal Care crews, and distribute backpacks to thousands of students. Every shift is structured, purposeful, and designed so you see exactly what your time accomplished.
            </p>

            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                background: '#000',
                border: '2px solid #FFC700',
              }}
            >
              <iframe
                src="https://volunteer.bloomerang.co:443/volunteer/embed/cards.html?mode=event&org_id=3917&show_description=true&show_language=true&default_language=eng_can"
                style={{
                  border: 'none',
                  width: '100%',
                  height: '600px',
                }}
                title="IBTU Volunteer Opportunities"
              />
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <section style={{
          background: '#FFC700',
          padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 6vw, 80px)',
              lineHeight: 0.88,
              textTransform: 'uppercase',
              color: '#000',
              letterSpacing: '-0.02em',
              marginBottom: 24,
            }}>
              This Work Does Not Happen Without You
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-lg)',
              color: '#000',
              lineHeight: 1.8,
              fontWeight: 600,
              marginBottom: 'clamp(32px, 4vw, 48px)',
            }}>
              We do not ask for help. We show you what we have built and invite you to build with us.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://secure.qgiv.com/for/ibt/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#000',
                  color: '#FFC700',
                  padding: '16px 40px',
                  borderRadius: '16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Donate Now
              </a>
              <a
                href="https://volunteer.bloomerang.co/volunteer/#/join-party?k=u9uiz8g1753qfr"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  border: '2px solid #000',
                  color: '#000',
                  padding: '16px 40px',
                  borderRadius: '16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Volunteer
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          section > div[style*="grid-template-columns: repeat(2"] {
            grid-template-columns: 1fr !important;
          }
          section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
