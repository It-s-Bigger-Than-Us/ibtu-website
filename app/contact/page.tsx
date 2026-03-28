import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact | IBTU",
  description:
    "Reach It's Bigger Than Us — general inquiries, volunteer coordination, partnerships, and media. Based at Baldwin Hills Crenshaw Plaza, Los Angeles.",
};

export default function ContactPage() {
  const contactInfo = [
    { label: "General", value: "info@itsbiggerthanusla.org", href: "mailto:info@itsbiggerthanusla.org" },
    { label: "Volunteer", value: "volunteers@itsbiggerthanusla.org", href: "mailto:volunteers@itsbiggerthanusla.org" },
    { label: "Phone", value: "(323) 207-0221", href: "tel:+13232070221" },
    { label: "Address", value: "Baldwin Hills Crenshaw Plaza, Suite 224-226, 3650 W. Martin Luther King Jr. Blvd, Los Angeles, CA 90008", href: undefined },
    { label: "Social", value: "@itsbiggerthanus", href: "https://instagram.com/itsbiggerthanus" },
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
      <Nav />
      <main style={{ background: "#000", minHeight: "100vh", paddingRight: "var(--nav-w)" }}>

        {/* Hero */}
        <div style={{ padding: "140px 80px 80px 80px" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 20,
              fontFamily: "LOT, Poppins, sans-serif",
              fontWeight: 700,
            }}
          >
            Contact
          </span>
          <h1
            style={{
              fontFamily: "LOT, Poppins, sans-serif",
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
              color: "rgba(255,255,255,0.7)",
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
            padding: "0 80px 100px 80px",
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
                fontFamily: "LOT, Poppins, sans-serif",
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
                      color: "rgba(255,255,255,0.4)",
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
                        fontFamily: "Poppins, sans-serif",
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
                        fontFamily: "Poppins, sans-serif",
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
                fontFamily: "LOT, Poppins, sans-serif",
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
                    color: "rgba(255,255,255,0.4)",
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
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    fontSize: 15,
                    fontFamily: "Poppins, sans-serif",
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
                    color: "rgba(255,255,255,0.4)",
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
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    fontSize: 15,
                    fontFamily: "Poppins, sans-serif",
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
                    color: "rgba(255,255,255,0.4)",
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
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    fontSize: 15,
                    fontFamily: "Poppins, sans-serif",
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
                    color: "rgba(255,255,255,0.4)",
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
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    fontSize: 15,
                    fontFamily: "Poppins, sans-serif",
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
                  fontFamily: "LOT, Poppins, sans-serif",
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
            borderTop: "1px solid rgba(255,255,255,0.08)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "1px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            501(c)(3) &nbsp;|&nbsp; EIN: 85-3136505 &nbsp;|&nbsp; LAUSD Vendor
            #1000024018
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
