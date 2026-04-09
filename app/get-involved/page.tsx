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

const IMPACT_TIERS = [
  { amount: '$25', title: 'Supply a Student', desc: 'Provides a fully loaded backpack with school supplies for one student at the Back 2 School Festival. 22,550+ distributed across six years.' },
  { amount: '$50', title: 'Feed a Family', desc: 'Covers a complete family food distribution package. 875,500+ pounds of food distributed since 2020 across 389+ events.' },
  { amount: '$100', title: 'Connect a Fire Survivor', desc: 'Funds one full intake assessment at the Relief Resource Hub — housing, mental health, and financial support for a fire-affected family.' },
  { amount: '$500', title: 'Sponsor a School Activation', desc: 'Covers one Lunchtime Takeover or Staff Appreciation Day at an LAUSD campus. $721,660 invested in school contracts across 4 years.' },
  { amount: '$1,000', title: 'Power a Parent Workshop', desc: 'Funds one full session of our 8-week Parent Empowerment Workshop — rated 4.7–5.0/5 by every cohort. Covers facilitator, materials, food, and childcare.' },
  { amount: '$5,000', title: 'Anchor a Community Event', desc: 'Sponsors a complete community resource fair or holiday distribution. These events serve 300–2,500+ families each — healthcare, legal aid, food, and essentials. Free. No ID required.' },
]

const SPONSOR_PROGRAMS = [
  { program: 'Back 2 School Festival', desc: 'Three-city, 20,000+ attendee annual event. Backpack distribution, partner activations, live programming. Brand visibility across 75+ media placements.', cta: 'Sponsor B2S 2026', href: '/our-programs/back-2-school' },
  { program: 'Fire Relief & The Hub', desc: 'Permanent disaster recovery center serving 324+ active clients. 15+ partner services under one roof. Case management, dental, vision, mental health.', cta: 'Support the Hub', href: '/fire-relief/hub' },
  { program: 'School Program', desc: '34 school sites across LAUSD, Alliance, and Inglewood USD. Lunchtime Takeovers, Parent Workshops, Resource Fairs, Staff Wellness Days.', cta: 'Sponsor a Campus', href: '/school-program' },
  { program: 'Coastal Care', desc: 'Monthly beach cleanups at Venice Pier. 20,463+ items removed. 27-category debris tracking. Environmental advocacy data.', cta: 'Sponsor Coastal Care', href: '/our-programs/coastal-care' },
  { program: 'Giving Season', desc: 'Year-end holiday distributions: toys, warm meals, wellness resources. 6,575+ individuals served in 2024 across 7 events.', cta: 'Sponsor Giving Season', href: '/our-programs/giving-season' },
  { program: 'Wellness & Health', desc: 'Licensed fitness, mental health, and wellness programming in community spaces — free, accessible, no barriers.', cta: 'Sponsor Wellness', href: '/our-programs/wellness' },
]

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

        {/* ── WHAT YOUR GIFT DOES ── */}
        <section style={{
          background: '#000',
          padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
        }}>
          <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 6vw, 80px)',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              color: '#FFC700',
              letterSpacing: '-0.02em',
              marginBottom: 'clamp(40px, 5vw, 64px)',
            }}>
              Your Dollars, Their Impact
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(16px, 2vw, 24px)',
            }}>
              {IMPACT_TIERS.map((tier) => (
                <div key={tier.amount} style={{
                  background: '#FFC700',
                  borderRadius: 16,
                  padding: 'clamp(24px, 3vw, 40px)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 900,
                    fontSize: 'clamp(28px, 3vw, 44px)',
                    color: '#000',
                    lineHeight: 1,
                    display: 'block',
                    marginBottom: 8,
                  }}>
                    {tier.amount}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(13px, 1.1vw, 16px)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: '#000',
                    marginBottom: 12,
                  }}>
                    {tier.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--body-sm)',
                    color: '#000',
                    lineHeight: 1.7,
                    fontWeight: 600,
                  }}>
                    {tier.desc}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 'clamp(32px, 4vw, 48px)' }}>
              <a
                href="https://secure.qgiv.com/for/ibt/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#FFC700',
                  color: '#000',
                  padding: '16px 48px',
                  borderRadius: '16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Donate Now
              </a>
            </div>
          </div>
        </section>

        {/* ── SPONSOR BY PROGRAM ── */}
        <section id="sponsor" style={{
          background: '#FFC700',
          padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
        }}>
          <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 6vw, 80px)',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              color: '#000',
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}>
              Sponsor by Program
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-md)',
              color: '#000',
              lineHeight: 1.8,
              fontWeight: 600,
              maxWidth: 640,
              marginBottom: 'clamp(40px, 5vw, 64px)',
            }}>
              We do not sell logo placements. We build branded community experiences that put your team on the ground with the families you serve. Your brand next to real work, in real neighborhoods, with real outcomes.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'clamp(16px, 2vw, 24px)',
            }}>
              {SPONSOR_PROGRAMS.map((sp) => (
                <div key={sp.program} style={{
                  background: '#000',
                  borderRadius: 16,
                  padding: 'clamp(24px, 3vw, 40px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(20px, 2.5vw, 32px)',
                      textTransform: 'uppercase',
                      color: '#FFC700',
                      lineHeight: 1,
                      marginBottom: 16,
                    }}>
                      {sp.program}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--body-sm)',
                      color: '#FFF',
                      lineHeight: 1.7,
                      fontWeight: 600,
                      marginBottom: 24,
                    }}>
                      {sp.desc}
                    </p>
                  </div>
                  <Link
                    href={sp.href}
                    style={{
                      display: 'inline-block',
                      background: '#FFC700',
                      color: '#000',
                      padding: '12px 28px',
                      borderRadius: '16px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      width: 'fit-content',
                    }}
                  >
                    {sp.cta}
                  </Link>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 'clamp(32px, 4vw, 48px)' }}>
              <a
                href="mailto:info@itsbiggerthanusla.org?subject=Sponsorship%20Inquiry"
                style={{
                  display: 'inline-block',
                  background: '#000',
                  color: '#FFC700',
                  padding: '16px 48px',
                  borderRadius: '16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Start a Partnership Conversation
              </a>
            </div>
          </div>
        </section>

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
