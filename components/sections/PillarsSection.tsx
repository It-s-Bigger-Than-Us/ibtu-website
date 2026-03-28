"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    id: "pc0",
    num: "1",
    tag: "Pillar 01",
    title: "Crisis &\nDisaster\nStabilization",
    stat: "5,000+ families stabilized · 2025",
    href: "/our-programs/fire-relief",
  },
  {
    id: "pc1",
    num: "2",
    tag: "Pillar 02",
    title: "School &\nYouth\nStability",
    stat: "28,025 students served · 2025",
    href: "/our-programs/youth-programming",
  },
  {
    id: "pc2",
    num: "3",
    tag: "Pillar 03",
    title: "Community\nHealth &\nResources",
    stat: "875,500+ lbs food distributed",
    href: "/our-programs/community-health",
  },
];

export default function PillarsSection() {
  useEffect(() => {
    gsap.set("#pc0", { x: "-100%" });
    gsap.set("#pc1", { y: "100%" });
    gsap.set("#pc2", { x: "100%" });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#s-pillars",
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
        },
      })
      .to("#pc0", { x: 0, ease: "power3.out", duration: 0.4 }, 0)
      .to("#pc1", { y: 0, ease: "power3.out", duration: 0.4 }, 0.05)
      .to("#pc2", { x: 0, ease: "power3.out", duration: 0.4 }, 0.1)
      .to("#pc0 .pc-detail", { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.55)
      .to("#pc1 .pc-detail", { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.62)
      .to("#pc2 .pc-detail", { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.69);
  }, []);

  return (
    <section id="s-pillars">
      {PILLARS.map((p) => (
        <div className="pillar-card" id={p.id} key={p.id}>
          <span className="pc-num">{p.num}</span>
          <span className="pc-tag">{p.tag}</span>
          <span className="pc-title">
            {p.title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < p.title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </span>
          <div className="pc-detail">
            <span className="pc-stat">{p.stat}</span>
            <Link href={p.href} className="pc-link">
              Explore this pillar →
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
