import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import GetInvolvedHero from "@/components/sections/GetInvolvedHero";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Get Involved | IBTU — It's Bigger Than Us",
  description:
    "Volunteer, donate, or partner with IBTU. 62,475+ students served, 875,500+ lbs food distributed, 5,000+ families stabilized. Community is the infrastructure.",
};

/* 12 images for the sticky grid header */
const HERO_IMAGES = [
  '/images/b2s/6D5A1083.jpg',
  '/images/wellness/IMG_1583.jpg',
  '/images/additional/IMG_0020.jpg',
  '/images/b2s/_D5A7384.jpg',
  '/images/school/IMG_6078.jpg',
  '/images/wellness/IMG_4688.jpg',
  '/images/coastal/IMG_0561.jpg',
  '/images/b2s/6D5A0956.jpg',
  '/images/b2s/_D5A6045.jpg',
  '/images/additional/IMG_5667.jpg',
  '/images/additional/IMG_0150.jpg',
  '/images/coastal/IMG_4838.jpg',
];

const STATS = [
  { value: '62,475+', label: 'Students reached since 2020' },
  { value: '875,500+', label: 'Pounds of food distributed' },
  { value: '34', label: 'School sites across Los Angeles' },
  { value: '5,000+', label: 'Families stabilized after the LA fires' },
  { value: '7,500+', label: 'Volunteers activated' },
  { value: '300+', label: 'Partners building together' },
];

export default function GetInvolvedPage() {
  return (
    <>
      {/* ── 1. HERO — iridescent bg + scrolling photo strip ── */}
      <GetInvolvedHero images={HERO_IMAGES} />

      <main style={{ background: '#000' }}>

        {/* ── 2. THE CASE — Why IBTU ── */}
        <section style={{
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
              marginBottom: 'clamp(32px, 4vw, 56px)',
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
                In 2025, IBTU served 28,025 students across 34 school sites — more than every previous year combined. We have distributed 875,500+ pounds of food across Los Angeles since 2020. When the Palisades and Eaton fires displaced thousands, we opened a permanent Relief Resource Hub that now serves 324 active clients averaging 23 visits each. That is not a pop-up. That is infrastructure.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-md)',
                color: '#FFF',
                lineHeight: 1.8,
              }}>
                This reach is the result of 300+ partnerships, a volunteer force 7,500 strong, and an organization that has earned the trust to mobilize a city. Every dollar donated extends community-built infrastructure to more families and neighborhoods across Los Angeles.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-md)',
                color: '#FFF',
                lineHeight: 1.8,
              }}>
                We are not a seasonal organization. We run programs inside 34 schools year-round. We staff a crisis hub five days a week. We show up to the same neighborhoods, the same campuses, the same families — because consistency is what trust looks like. We listen, we build, we stay.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-md)',
                color: '#FFF',
                lineHeight: 1.8,
              }}>
                So why IBTU? Because we have spent six years proving that community-designed programs, run by people who live in these neighborhoods, produce results that outside interventions cannot replicate. 23 awards. Featured on the Jennifer Hudson Show. Trusted by LAUSD, lululemon, LA84 Foundation, and Baby2Baby. But the real proof is simpler: families keep coming back, and they bring their neighbors.
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. IMPACT PROOF — Stats ── */}
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
              <div key={stat.label} style={{
                padding: 'clamp(24px, 3vw, 40px)',
              }}>
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

        {/* ── 4. VOLUNTEER — Bloomerang widget placeholder ── */}
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
              Real Work. Real Impact.
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-md)',
              color: '#FFF',
              lineHeight: 1.8,
              marginBottom: 48,
              maxWidth: 640,
            }}>
              IBTU volunteers do not watch from the sidelines. You sort relief supplies at the Hub, run resource stations at school festivals, clean Venice Beach with Coastal Care crews, and distribute backpacks to thousands of students — because this work only moves at the speed of people who show up.
            </p>

            {/* Bloomerang volunteer widget */}
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

        {/* ── 5. DONATE — Donor tiers + Corporate ── */}
        <section style={{
          background: '#FFC700',
          padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 6vw, 72px)',
              lineHeight: 0.92,
              textTransform: 'uppercase',
              color: '#000',
              letterSpacing: '-0.02em',
              marginBottom: 'clamp(24px, 3vw, 40px)',
            }}>
              Invest in the Infrastructure
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: 48 }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-md)',
                color: '#000',
                lineHeight: 1.8,
              }}>
                There is no minimum to building a city. A $25 donation puts a fire-affected family through a full intake assessment and connects them to housing, mental health, and financial support. A $100 donation sponsors a Lunchtime Takeover that transforms a school cafeteria into a space of belonging for 800 students. A $1,000 donation funds a full resource fair that brings 15 partner organizations onto one campus in one day.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-md)',
                color: '#000',
                lineHeight: 1.8,
              }}>
                Every dollar is leveraged. IBTU&apos;s $18:$1 ratio means your investment does not sit in an account — it multiplies through partnerships, in-kind mobilization, and a volunteer infrastructure that has moved $4.5 million in resources to Los Angeles families since 2020.
              </p>
            </div>

            {/* Corporate Partnership */}
            <div style={{
              background: '#000',
              borderRadius: 16,
              padding: 'clamp(32px, 4vw, 56px)',
              marginBottom: 40,
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3vw, 40px)',
                textTransform: 'uppercase',
                color: '#FFC700',
                lineHeight: 1,
                marginBottom: 20,
              }}>
                Partner With Us
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-md)',
                color: '#FFF',
                lineHeight: 1.8,
                marginBottom: 24,
              }}>
                For organizations looking to align with trusted, community-led infrastructure in Los Angeles: IBTU offers brand visibility across flagship events reaching thousands, employee volunteer activations at the Hub and school sites, and co-branded programming backed by 75+ media placements and 2.47 million Instagram reach in 2025. Your brand next to real work, in real neighborhoods, with real outcomes.
              </p>
              <a
                href="mailto:info@itsbiggerthanusla.org?subject=Partnership%20Inquiry"
                className="holo-glass"
                style={{
                  display: 'inline-block',
                  background: '#FFC700',
                  color: '#000',
                  padding: '14px 36px',
                  borderRadius: '16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Start a Partnership Conversation →
              </a>
            </div>
          </div>
        </section>

        {/* ── 6. CLOSING CTA ── */}
        <section style={{
          background: '#FFC700',
          padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
          borderTop: '2px solid #000',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 6vw, 80px)',
              lineHeight: 0.88,
              textTransform: 'uppercase',
              color: '#000',
              letterSpacing: '-0.02em',
              marginBottom: 'clamp(24px, 3vw, 40px)',
            }}>
              There Is Room for You.
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-lg)',
              color: '#000',
              lineHeight: 1.8,
              maxWidth: '680px',
              margin: '0 auto clamp(32px, 4vw, 48px)',
            }}>
              Every program IBTU runs was designed with dignity, informed by community, and built to last. But infrastructure is not a building. It is people. It is you deciding that the family down the street, the school across town, the neighbor rebuilding after the fire — that their stability is your business too.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-lg)',
              color: '#000',
              lineHeight: 1.8,
              fontWeight: 600,
              marginBottom: 'clamp(32px, 4vw, 48px)',
            }}>
              We listen. We build. We stay. And there is room for you.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="#volunteer"
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
                Find Your Role
              </Link>
              <a
                href="mailto:info@itsbiggerthanusla.org?subject=Donation%20Inquiry"
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
                Donate Now
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          section > div > div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          section > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
