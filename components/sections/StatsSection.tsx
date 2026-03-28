"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    id: "si0",
    numId: "sn0",
    barId: "bf0",
    target: 62475,
    barW: "62%",
    label: "Students Served",
    caption:
      "Across 34 school sites over 6 years — building routines and community when it mattered most.",
  },
  {
    id: "si1",
    numId: "sn1",
    barId: "bf1",
    target: 5000,
    barW: "83%",
    label: "Families Stabilized",
    caption:
      "IBTU mobilized within 72 hours after the LA fires. 5,000+ families received supplies and support through The Hub.",
  },
  {
    id: "si2",
    numId: "sn2",
    barId: "bf2",
    target: 875500,
    barW: "75%",
    label: "Pounds of Food Distributed",
    caption:
      "875,500 lbs — enough to provide over 700,000 meals to Los Angeles families.",
  },
  {
    id: "si3",
    numId: "sn3",
    barId: "bf3",
    target: 300,
    barW: "55%",
    label: "Partners & Sponsors",
    caption:
      "300+ organizations trust IBTU to connect resources directly to people who need them most.",
  },
];

export default function StatsSection() {
  useEffect(() => {
    let visibleStats = new Set<number>();

    function animateCounter(i: number) {
      const s = STATS[i];
      const el = document.getElementById(s.numId);
      if (!el) return;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: s.target,
        duration: 1.4,
        ease: "power2.out",
        onUpdate() {
          el.textContent = Math.round(obj.v).toLocaleString() + "+";
        },
      });
      const bar = document.getElementById(s.barId);
      if (!bar) return;
      bar.classList.remove("run");
      void bar.offsetWidth;
      requestAnimationFrame(() => bar.classList.add("run"));
    }

    function updateStats(step: number) {
      const target = new Set<number>();
      if (step >= 1) target.add(0);
      if (step >= 2) target.add(1);
      if (step >= 3) {
        target.add(2);
        target.add(3);
      }
      target.forEach((i) => {
        if (!visibleStats.has(i)) {
          gsap.to("#" + STATS[i].id, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          });
          animateCounter(i);
        }
      });
      visibleStats.forEach((i) => {
        if (!target.has(i))
          gsap.to("#" + STATS[i].id, {
            opacity: 0,
            y: 40,
            duration: 0.35,
            ease: "power2.in",
          });
      });
      visibleStats = new Set(target);
    }

    ScrollTrigger.create({
      trigger: "#s-stats",
      start: "top top",
      end: "+=300%",
      pin: true,
      pinSpacing: true,
      onUpdate(self) {
        updateStats(self.progress < 0.3 ? 1 : self.progress < 0.65 ? 2 : 3);
      },
      onEnter: () => updateStats(1),
      onLeaveBack: () => updateStats(0),
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="s-stats">
      <div className="stats-grid">
        {STATS.map((s) => (
          <div className="stat-item" id={s.id} key={s.id}>
            <span className="stat-num" id={s.numId}>
              0+
            </span>
            <span className="stat-label">{s.label}</span>
            <div className="stat-bar">
              <div className="bar-track">
                <div
                  className="bar-fill"
                  id={s.barId}
                  style={{ ["--w" as string]: s.barW }}
                />
              </div>
            </div>
            <p className="stat-caption">{s.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
