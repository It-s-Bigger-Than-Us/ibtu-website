"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/our-programs" },
  { label: "Impact", href: "/impact" },
  { label: "Get Involved", href: "/get-involved" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const tabs = navRef.current?.querySelectorAll(".nav-tab");
    if (!tabs) return;

    const handleScroll = () => {
      // Hide sidenav when floating nav appears (same threshold)
      setHidden(window.scrollY > window.innerHeight * 0.8);

      const sections = [
        { id: "hero", label: "Home" },
        { id: "s-stats", label: "Impact" },
        { id: "s-mission", label: "Our Work" },
        { id: "s-programs", label: "Programs" },
        { id: "s-volunteer", label: "Get Involved" },
      ];

      let active = "Home";
      for (const { id, label } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) active = label;
      }

      tabs.forEach((t) => {
        t.classList.toggle("active", t.textContent?.trim() === active);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="sidenav"
      ref={navRef}
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
        transition: "opacity 0.4s ease",
      }}
    >
      {NAV_ITEMS.map(({ label, href }) => (
        <Link key={label} href={href} className="nav-tab">
          {label}
        </Link>
      ))}
    </nav>
  );
}
