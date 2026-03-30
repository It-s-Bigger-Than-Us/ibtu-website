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

  useEffect(() => {
    // Animate the big mantra text on scroll
    const words = mantraRef.current?.querySelectorAll(".foot-mantra-word");
    if (words) {
      gsap.fromTo(
        words,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
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

  // Break mantra into 3 lines: Community / is the / Infrastructure
  const mantraLines = ["Community", "is the", "Infrastructure."];

  return (
    <footer
      ref={footerRef}
      style={{
        background: "#000",
        borderTop: "2px solid var(--gold)",
        padding: "clamp(80px, 10vw, 160px) clamp(32px, 5vw, 80px) 48px",
      }}
    >
      {/* Big editorial mantra */}
      <div
        ref={mantraRef}
        style={{
          maxWidth: "1200px",
          margin: "0 auto 80px",
        }}
      >
        <h2
          style={{
            fontFamily: "'LOT', 'Bebas Neue', sans-serif",
            fontSize: "clamp(48px, 10vw, 160px)",
            lineHeight: 0.92,
            textTransform: "uppercase",
            color: "var(--gold)",
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

      {/* Footer content grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "48px",
          paddingTop: "48px",
          borderTop: "1px solid var(--gold)",
        }}
      >
        {/* Left — logo + org info */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ibtu-logo.svg"
            alt="IBTU — It's Bigger Than Us"
            style={{ height: "40px", filter: "brightness(0) invert(1)", marginBottom: "16px" }}
          />
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "12px",
              color: "#fff",
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
              color: "var(--gold)",
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
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600,
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#fff"; }}
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
              color: "var(--gold)",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            Connect
          </span>
          <a
            href="https://instagram.com/itsbiggerthanus"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#fff"; }}
          >
            @itsbiggerthanus
          </a>
          <a
            href="mailto:info@itsbiggerthanusla.org"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#fff"; }}
          >
            info@itsbiggerthanusla.org
          </a>
          <a
            href="tel:+13232070221"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#fff"; }}
          >
            (323) 207-0221
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "48px auto 0",
          paddingTop: "24px",
          borderTop: "1px solid var(--gold)",
          textAlign: "center",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "#fff",
          fontWeight: 500,
        }}
      >
        &copy; {new Date().getFullYear()} It&apos;s Bigger Than Us. All rights reserved.
      </div>
    </footer>
  );
}
