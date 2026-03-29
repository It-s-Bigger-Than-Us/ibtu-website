"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/our-programs" },
  { label: "Impact", href: "/impact" },
  { label: "Events", href: "/calendar" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export default function FloatingNav() {
  const [showLogo, setShowLogo] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowLogo(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating logo button — appears after scrolling past hero */}
      <div
        style={{
          position: "fixed",
          top: 24,
          right: 24,
          zIndex: 1000,
          opacity: showLogo ? 1 : 0,
          transform: showLogo ? "scale(1)" : "scale(0.6)",
          transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          pointerEvents: showLogo ? "auto" : "none",
        }}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#FFC700",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: menuOpen
              ? "0 0 0 3px rgba(255,199,0,0.5), 0 8px 32px rgba(0,0,0,0.4)"
              : "0 4px 20px rgba(0,0,0,0.3)",
            transition: "box-shadow 0.3s, transform 0.2s",
            transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ibtu-logo.svg" alt="IBTU" style={{ width: 32, height: 32, filter: "brightness(0)" }} />
        </button>
      </div>

      {/* Dropdown menu */}
      {menuOpen && showLogo && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: 88,
              right: 24,
              zIndex: 1001,
              background: "rgba(0,0,0,0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,199,0,0.2)",
              borderRadius: 8,
              padding: "12px 0",
              minWidth: 220,
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 28px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#fff",
                  textDecoration: "none",
                  letterSpacing: "1px",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,199,0,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#FFC700";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ margin: "8px 28px", height: 1, background: "rgba(255,199,0,0.15)" }} />
            <a
              href="https://secure.qgiv.com/for/firerelief"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "14px 28px",
                fontFamily: "Poppins, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#FFC700",
                textDecoration: "none",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Donate →
            </a>
          </div>
        </div>
      )}
    </>
  );
}
