'use client'

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/our-programs" },
  { label: "Impact", href: "/impact" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const mantraRef = useRef<HTMLDivElement>(null);

  // Break mantra into 3 lines: Community / is the / Infrastructure
  const mantraLines = ["Community", "is the", "Infrastructure."];

  useEffect(() => {
    const words = mantraRef.current?.querySelectorAll(".foot-mantra-word");
    if (words) {
      gsap.fromTo(
        words,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        background: "var(--gold)",
        padding: "clamp(80px, 10vw, 160px) clamp(32px, 5vw, 80px) 48px",
      }}
    >
      {/* Big editorial mantra — black on gold */}
      <div
        ref={mantraRef}
        style={{ maxWidth: "1200px", margin: "0 auto 80px" }}
      >
        <h2
          style={{
            fontFamily: "'LOT', 'Bebas Neue', sans-serif",
            fontSize: "clamp(48px, 10vw, 160px)",
            lineHeight: 0.92,
            textTransform: "uppercase",
            color: "#000",
            letterSpacing: "-0.02em",
          }}
        >
          {mantraLines.map((line, i) => (
            <span
              key={i}
              className="foot-mantra-word"
              style={{ display: "block", opacity: 0 }}
            >
              {line}
            </span>
          ))}
        </h2>
      </div>

      {/* Footer content grid — black text on gold */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "48px",
          paddingTop: "48px",
          borderTop: "2px solid #000",
        }}
      >
        {/* Left — logo + org info */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ibtu-logo.svg"
            alt="IBTU — It's Bigger Than Us"
            style={{ height: "40px", filter: "brightness(0)", marginBottom: "16px" }}
          />
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "12px",
              color: "#000",
              lineHeight: 2,
              fontWeight: 500,
            }}
          >
            501(c)(3) &middot; EIN: 85-3136505
            <br />
            Baldwin Hills Crenshaw Plaza
            <br />
            Suite 224-226
            <br />
            Los Angeles, CA 90008
          </p>
        </div>

        {/* Center — nav links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "10px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#000",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            Navigate
          </span>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14px",
                color: "#000",
                textDecoration: "none",
                fontWeight: 600,
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#000"; }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right — contact + social */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "right" }}>
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "10px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#000",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            Connect
          </span>
          <a
            href="mailto:info@itsbiggerthanusla.org"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: "#000", textDecoration: "none", fontWeight: 600, transition: "color 0.25s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#000"; }}
          >
            info@itsbiggerthanusla.org
          </a>
          <a
            href="tel:+13232070221"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: "#000", textDecoration: "none", fontWeight: 600, transition: "color 0.25s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#000"; }}
          >
            (323) 207-0221
          </a>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end", marginTop: "16px" }}>
            <a
              href="https://instagram.com/itsbiggerthanus_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #000", transition: "background 0.25s, color 0.25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#000"; (e.currentTarget.firstChild as HTMLElement).style.color = "var(--gold)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; (e.currentTarget.firstChild as HTMLElement).style.color = "#000"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#000" }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/itsbiggerthanus"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #000", transition: "background 0.25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#000"; (e.currentTarget.firstChild as HTMLElement).style.color = "var(--gold)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; (e.currentTarget.firstChild as HTMLElement).style.color = "#000"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#000" }}>
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@itsbiggerthanus_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #000", transition: "background 0.25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#000"; (e.currentTarget.firstChild as HTMLElement).style.color = "var(--gold)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; (e.currentTarget.firstChild as HTMLElement).style.color = "#000"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#000" }}>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.81.11v-3.5a6.37 6.37 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.24 8.24 0 0 0 4.76 1.5V6.73a4.83 4.83 0 0 1-1-.04z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "48px auto 0",
          paddingTop: "24px",
          borderTop: "2px solid #000",
          textAlign: "center",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "#000",
          fontWeight: 600,
        }}
      >
        &copy; {new Date().getFullYear()} It&apos;s Bigger Than Us. All rights reserved.
      </div>
    </footer>
  );
}
