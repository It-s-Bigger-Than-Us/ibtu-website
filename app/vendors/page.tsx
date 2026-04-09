import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import VendorApplicationForm from "@/components/sections/VendorApplicationForm";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Become a Vendor | IBTU — It's Bigger Than Us",
  description:
    "Vendor booth opportunities at IBTU community events in Los Angeles. Back 2 School Festival, Coastal Care, wellness activations, food distributions, and more. 8,000+ attendees. 75+ media placements. Apply now.",
};

const VENDOR_TIERS = [
  {
    category: "COMMUNITY PARTNERS",
    price: "Free",
    color: "#FFC700",
    description:
      "You bring essential services that families need. We would not be able to do this work without you — so your spot is on us. Thank you for being part of this.",
    types: "City/county agencies, mobile medical units, LAUSD, elected offices, partner nonprofits",
    includes: "6ft table, 2 chairs, event program listing",
    note: "Cap: 15–20 comped booths per event. Application + COI still required.",
  },
  {
    category: "NONPROFIT RESOURCE TABLE",
    price: "$50–$75",
    color: "#FFC700",
    description:
      "You are a 501(c)(3) doing the same kind of work we do — connecting people to what they need. We charge a nominal fee to make sure you are committed, and every dollar you pay goes right back into the community you are here to serve. Thank you for showing up alongside us.",
    types: "Nonprofits, community orgs, churches, faith-based organizations",
    includes: "6ft table, 2 chairs, event program listing. +$25 for power outlet.",
    note: "Fee may be waived for orgs providing critical services (housing, food bank signups).",
  },
  {
    category: "EDUCATION VENDORS",
    price: "$75–$200",
    color: "#FFC700",
    description:
      "You help families invest in their children's future — and the families at our events are already looking for exactly what you offer. Thank you for bringing your resources to a community that values education. You belong at this table.",
    types: "Charter schools, after-school programs, tutoring companies, education nonprofits",
    includes: "6ft table or 10x10 booth depending on tier, event program listing, social media mention at $200 level.",
    note: "Public schools and districts are comped as Community Partners.",
  },
  {
    category: "HEALTH & WELLNESS",
    price: "$75–$250",
    color: "#FFC700",
    description:
      "You provide care that this community needs — and when you set up at an IBTU event, you are meeting families where they already are, in a space they already trust. Thank you for making health access more human. Your presence matters here.",
    types: "Chiropractors, wellness brands, insurance companies, mental health providers",
    includes: "6ft table or 10x10 booth, event program listing. Premium placement + social media at $250.",
    note: "Nonprofit health orgs: $75. Insurance navigators (Covered CA): comped.",
  },
  {
    category: "SMALL BUSINESS",
    price: "$150–$400",
    color: "#FFC700",
    description:
      "You are the heartbeat of the festival floor. Your booth, your products, your energy — that is what makes an IBTU event feel like a neighborhood, not a stage. Thank you for bringing your business to a community that will remember you long after the event ends. We are proud to have you.",
    types: "Retail, beauty/barber, clothing, jewelry, crafts, services, local entrepreneurs",
    includes: "10x10 booth, event program listing. Premium placement, social media, and early setup available at higher tiers.",
    note: "15% early bird discount (60+ days out). 10% returning vendor discount.",
  },
  {
    category: "FOOD TRUCKS",
    price: "$250–$500",
    color: "#FFC700",
    description:
      "You feed the people who build this city. At 8,000+ attendees, your line will not stop — and the families you serve will come back looking for you at the next event. Thank you for bringing your food, your craft, and your energy. We need you here.",
    types: "Mobile food vendors, BBQ, taco trucks, ice cream, smoothies, prepared food",
    includes: "Designated parking spot, event program listing, 1–3 social media mentions depending on tier.",
    note: "Alternative: $150 flat + 8% of gross over $2,000. All food vendors must have LA County TFF permit + LAFD fire permit.",
  },
  {
    category: "CORPORATE ACTIVATIONS",
    price: "$1,500–$10,000+",
    color: "#FFC700",
    description:
      "You are not just setting up a booth — you are building a brand moment inside the most trusted community platform in Los Angeles. Your team on the ground doing real work alongside 190+ partner organizations. Thank you for investing at a level that changes what is possible for an entire community. We are grateful for you.",
    types: "National brands, corporate partners, marketing activations, product sampling",
    includes: "Custom space (10x10 to 20x20+), dedicated social media campaign, logo on event materials, MC mentions, content package.",
    note: "Category exclusivity available. Contact info@itsbiggerthanusla.org for custom packages.",
  },
];

const STATS = [
  { value: "8,000+", label: "Attendees at flagship events" },
  { value: "75+", label: "Media placements in 2025" },
  { value: "2.47M", label: "Instagram impressions" },
  { value: "60+", label: "Brand partners at Back 2 School" },
  { value: "22,550+", label: "Backpacks distributed" },
  { value: "23", label: "Awards and recognitions" },
];

export default function VendorsPage() {
  return (
    <>
      <main style={{ background: "#000", minHeight: "100vh" }}>
        {/* ── HERO ── */}
        <section
          style={{
            background: "#000",
            padding: "160px clamp(32px, 5vw, 80px) clamp(80px, 10vw, 120px)",
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <span
              style={{
                display: "block",
                fontSize: 11,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#FFC700",
                marginBottom: 20,
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
              }}
            >
              Vendor Opportunities
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(48px, 8vw, 120px)",
                lineHeight: 0.9,
                textTransform: "uppercase",
                color: "#FFC700",
                letterSpacing: "-0.02em",
                marginBottom: "clamp(24px, 3vw, 40px)",
              }}
            >
              Your Booth.
              <br />
              Their Community.
              <br />
              Real Connection.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--body-lg)",
                color: "#FFF",
                lineHeight: 1.8,
                maxWidth: 700,
              }}
            >
              We are glad you are here. IBTU events are not trade shows — they
              are the most trusted community gatherings in Los Angeles, where
              thousands of families show up because they know the resources are
              real, the people are real, and every organization on that festival
              floor was chosen to be there. When you show up, you become part of
              that trust. And we want you there.
            </p>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section
          style={{
            background: "#FFC700",
            padding: "clamp(48px, 6vw, 80px) clamp(32px, 5vw, 80px)",
          }}
        >
          <div
            style={{
              maxWidth: "var(--content-max)",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--grid-gap)",
            }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} style={{ padding: "clamp(16px, 2vw, 32px)" }}>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 900,
                    fontSize: "clamp(28px, 3.5vw, 48px)",
                    color: "#000",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--body-sm)",
                    fontWeight: 600,
                    color: "#000",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY IBTU EVENTS ── */}
        <section
          style={{
            background: "#000",
            padding: "clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 6vw, 72px)",
                lineHeight: 0.92,
                textTransform: "uppercase",
                color: "#FFC700",
                letterSpacing: "-0.02em",
                marginBottom: "clamp(24px, 3vw, 40px)",
              }}
            >
              We Want You Here.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--body-md)",
                  color: "#FFF",
                  lineHeight: 1.8,
                }}
              >
                Most community events happen once and disappear. We have been
                showing up to the same neighborhoods, the same campuses, the
                same families for six years — and that is why we are so
                intentional about who joins us on the festival floor. When you
                table at an IBTU event, you are not renting a spot. You are
                being introduced to a community that already trusts us, and by
                extension, trusts you.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--body-md)",
                  color: "#FFF",
                  lineHeight: 1.8,
                }}
              >
                You could be in front of 8,000+ families at the Back 2 School
                Festival. You could be on the sand with Coastal Care crews who
                show up every single month. You could be serving meals at a food
                distribution that feeds hundreds of families weekly. You could
                be part of a wellness activation that brings free yoga and
                healing to public parks. These are your opportunities — and we
                built every one of them with partners like you in mind.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--body-md)",
                  color: "#FFF",
                  lineHeight: 1.8,
                }}
              >
                Thank you for considering IBTU. Your booth. Your products.
                Your presence. That is what turns an event into a community.
                And we are grateful you want to be part of it.
              </p>
            </div>
          </div>
        </section>

        {/* ── PRICING TIERS ── */}
        <section
          style={{
            background: "#FFC700",
            padding: "clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)",
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 6vw, 72px)",
                lineHeight: 0.92,
                textTransform: "uppercase",
                color: "#000",
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}
            >
              Claim Your Spot.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--body-md)",
                color: "#000",
                lineHeight: 1.8,
                marginBottom: "clamp(40px, 5vw, 64px)",
                maxWidth: 700,
              }}
            >
              We made pricing transparent so you can find where you fit before
              you apply. Review the tiers below, then scroll down to tell us
              about yourself. We review every application within 5 business
              days — and you do not pay a dollar until we say yes. We respect
              your time and your trust.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {VENDOR_TIERS.map((tier) => (
                <div
                  key={tier.category}
                  style={{
                    background: "#000",
                    borderRadius: 16,
                    padding: "clamp(24px, 3vw, 40px)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 16,
                      flexWrap: "wrap",
                      gap: 12,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(14px, 1.5vw, 18px)",
                        fontWeight: 700,
                        color: "#FFC700",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        margin: 0,
                      }}
                    >
                      {tier.category}
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(20px, 2.5vw, 32px)",
                        fontWeight: 900,
                        color: "#FFC700",
                      }}
                    >
                      {tier.price}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--body-md)",
                      color: "#FFF",
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    {tier.description}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#FFC700", margin: 0 }}>
                      <strong>Who:</strong>{" "}
                      <span style={{ color: "#FFF" }}>{tier.types}</span>
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#FFC700", margin: 0 }}>
                      <strong>Includes:</strong>{" "}
                      <span style={{ color: "#FFF" }}>{tier.includes}</span>
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#FFC700", margin: 0 }}>
                      <strong>Note:</strong>{" "}
                      <span style={{ color: "#FFF" }}>{tier.note}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT YOU NEED (COMPLIANCE) ── */}
        <section
          style={{
            background: "#000",
            padding: "clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 6vw, 72px)",
                lineHeight: 0.92,
                textTransform: "uppercase",
                color: "#FFC700",
                letterSpacing: "-0.02em",
                marginBottom: "clamp(24px, 3vw, 40px)",
              }}
            >
              We Set You Up to Succeed.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#FFC700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  All Vendors
                </h3>
                <ul style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-md)", color: "#FFF", lineHeight: 2, paddingLeft: 20 }}>
                  <li>2 Certificates of Insurance (COI) — $1M per occurrence / $2M aggregate minimum. IBTU named as additional insured.</li>
                  <li>Signed liability waiver / hold harmless agreement</li>
                  <li>W-9 form</li>
                  <li>City of LA Business Tax Registration Certificate</li>
                </ul>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#FFC700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Food Vendors / Food Trucks (Additional)
                </h3>
                <ul style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-md)", color: "#FFF", lineHeight: 2, paddingLeft: 20 }}>
                  <li>LA County Health Department Temporary Food Facility (TFF) permit</li>
                  <li>LAFD fire permit for cooking equipment</li>
                  <li>California Seller&apos;s Permit</li>
                  <li>Food Handler&apos;s Card for all food handlers</li>
                  <li>Mobile Food Facility permit (food trucks)</li>
                </ul>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#FFC700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Healthcare / Mobile Medical Units (Additional)
                </h3>
                <ul style={{ fontFamily: "var(--font-body)", fontSize: "var(--body-md)", color: "#FFF", lineHeight: 2, paddingLeft: 20 }}>
                  <li>California Mobile Health Care Unit license</li>
                  <li>Professional licenses for all medical personnel</li>
                  <li>Medical malpractice insurance</li>
                  <li>HIPAA compliance documentation</li>
                </ul>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--body-sm)",
                  color: "#FFC700",
                  lineHeight: 1.6,
                  fontWeight: 600,
                }}
              >
                Don&apos;t have all your documents yet? Apply anyway — we
                want to hear from you. We will work with you personally after
                approval to collect everything you need before the event.
                You are not in this alone.
              </p>
            </div>
          </div>
        </section>

        {/* ── APPLICATION FORM ── */}
        <section
          id="apply"
          style={{
            background: "#FFC700",
            padding: "clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 6vw, 72px)",
                lineHeight: 0.92,
                textTransform: "uppercase",
                color: "#000",
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}
            >
              We Want to Know You.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--body-md)",
                color: "#000",
                lineHeight: 1.8,
                marginBottom: "clamp(32px, 4vw, 48px)",
                maxWidth: 640,
              }}
            >
              Tell us about yourself and your business. We review every
              application within 5 business days because we take your time
              seriously. You do not pay until you are accepted — and once you
              are in, we are here to make sure your experience is everything
              you hoped for. Thank you for trusting us with your brand.
            </p>
            <VendorApplicationForm />
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <section
          style={{
            background: "#000",
            padding: "clamp(80px, 10vw, 120px) clamp(32px, 5vw, 80px)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 6vw, 80px)",
                lineHeight: 0.88,
                textTransform: "uppercase",
                color: "#FFC700",
                letterSpacing: "-0.02em",
                marginBottom: "clamp(16px, 2vw, 24px)",
              }}
            >
              There Is Room for You.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--body-lg)",
                color: "#FFF",
                lineHeight: 1.8,
                marginBottom: "clamp(24px, 3vw, 40px)",
              }}
            >
              We built these events for the community — and you are part of
              that community. Thank you for wanting to show up. Questions? Contact{" "}
              <a
                href="mailto:info@itsbiggerthanusla.org?subject=Vendor%20Inquiry"
                style={{ color: "#FFC700", textDecoration: "none" }}
              >
                info@itsbiggerthanusla.org
              </a>{" "}
              or call{" "}
              <a href="tel:+13232070221" style={{ color: "#FFC700", textDecoration: "none" }}>
                (323) 207-0221
              </a>
              .
            </p>
            <a
              href="#apply"
              style={{
                display: "inline-block",
                background: "#FFC700",
                color: "#000",
                padding: "18px 48px",
                borderRadius: 16,
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Claim Your Spot &rarr;
            </a>
          </div>
        </section>
      </main>

      <Footer />

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
