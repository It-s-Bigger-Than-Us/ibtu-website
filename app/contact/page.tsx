import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact | IBTU",
  description:
    "Reach It's Bigger Than Us — general inquiries, volunteer coordination, partnerships, and media. Based at Baldwin Hills Crenshaw Plaza, Los Angeles.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const contactInfo = [
    { label: "General", value: "info@itsbiggerthanusla.org", href: "mailto:info@itsbiggerthanusla.org" },
    { label: "Volunteer", value: "volunteers@itsbiggerthanusla.org", href: "mailto:volunteers@itsbiggerthanusla.org" },
    { label: "Phone", value: "(323) 207-0221", href: "tel:+13232070221" },
    { label: "Address", value: "Baldwin Hills Crenshaw Plaza, Suite 224-226, 3650 W. Martin Luther King Jr. Blvd, Los Angeles, CA 90008", href: undefined },
    { label: "Social", value: "@itsbiggerthanus_", href: "https://instagram.com/itsbiggerthanus_" },
  ];

  const subjectOptions = [
    "General Inquiry",
    "Volunteer",
    "Partnership / Sponsorship",
    "Media / Press",
    "School Programs",
    "Fire Relief / Hub",
    "Other",
  ];

  return (
    <>

      <main style={{ background: "#000", minHeight: "100vh"}}>

        {/* Hero */}
        <div style={{ padding: "clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px) clamp(48px, 6vw, 80px)" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 20,
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
            }}
          >
            Contact
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: "clamp(60px, 9vw, 140px)",
              lineHeight: 0.9,
              color: "#fff",
              marginBottom: 32,
            }}
          >
            REACH OUT
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 1.5vw, 22px)",
              color: "#fff",
              maxWidth: 640,
              lineHeight: 1.75,
            }}
          >
            Questions, partnerships, volunteer coordination, or media
            inquiries — we&apos;re here.
          </p>
        </div>

        {/* Contact Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            padding: "0 clamp(24px, 5vw, 80px) clamp(60px, 8vw, 100px)",
            alignItems: "start",
          }}
        >
          {/* Left — Contact Info */}
          <div>
            <span
              style={{
                display: "block",
                fontSize: 11,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                marginBottom: 32,
              }}
            >
              Contact Details
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {contactInfo.map((item, i) => (
                <div key={i}>
                  <span
                    style={{
                      display: "block",
                      fontSize: 11,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      fontWeight: 600,
                      marginBottom: 6,
                    }}
                  >
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{
                        fontSize: 16,
                        color: "#fff",
                        textDecoration: "none",
                        fontFamily: 'var(--font-body)',
                        lineHeight: 1.5,
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p
                      style={{
                        fontSize: 16,
                        color: "#fff",
                        fontFamily: 'var(--font-body)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Contact Form */}
          <div>
            <span
              style={{
                display: "block",
                fontSize: 11,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                marginBottom: 32,
              }}
            >
              Send a Message
            </span>
            <form
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              <div>
                <label
                  htmlFor="name"
                  style={{
                    display: "block",
                    fontSize: 11,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "#000",
                    border: "1px solid var(--gold)",
                    color: "#fff",
                    fontSize: 15,
                    fontFamily: 'var(--font-body)',
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    fontSize: 11,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "#000",
                    border: "1px solid var(--gold)",
                    color: "#fff",
                    fontSize: 15,
                    fontFamily: 'var(--font-body)',
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  style={{
                    display: "block",
                    fontSize: 11,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "#000",
                    border: "1px solid var(--gold)",
                    color: "#fff",
                    fontSize: 15,
                    fontFamily: 'var(--font-body)',
                    outline: "none",
                    appearance: "none",
                  }}
                >
                  <option value="" style={{ background: "#000" }}>
                    Select a topic
                  </option>
                  {subjectOptions.map((opt) => (
                    <option key={opt} value={opt} style={{ background: "#000" }}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    fontSize: 11,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "#000",
                    border: "1px solid var(--gold)",
                    color: "#fff",
                    fontSize: 15,
                    fontFamily: 'var(--font-body)',
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  alignSelf: "flex-start",
                  background: "var(--gold)",
                  color: "#000",
                  padding: "18px 48px",
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Send Message &rarr;
              </button>
            </form>
          </div>
        </div>

        {/* Legal Strip */}
        <div
          style={{
            padding: "40px 80px",
            borderTop: "1px solid var(--gold)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "var(--gold)",
              letterSpacing: "1px",
              fontFamily: 'var(--font-body)',
            }}
          >
            501(c)(3) &nbsp;|&nbsp; EIN: 85-3136505 &nbsp;|&nbsp; LAUSD Vendor
            #1000024018
          </p>
        </div>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          main > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </>
  );
}
