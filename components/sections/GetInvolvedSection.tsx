"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const FLIP_IMGS = [
  "/images/additional/IMG_0313.jpg",
  "/images/b2s/_D5A6030.jpg",
  "/images/school/IMG_5508.jpg",
  "/images/coastal/IMG_1814.jpg",
  "/images/additional/IMG_5867.jpg",
  "/images/b2s/_D5A7530.jpg",
];

const VOL_OPTIONS = [
  { label: "Volunteer With Us", href: "/get-involved#volunteer" },
  { label: "Become a Sponsor", href: "/get-involved#sponsor" },
  { label: "Donate Today", href: "https://secure.qgiv.com/for/ibt/" },
  { label: "Partner With IBTU", href: "/get-involved#partner" },
];

export default function GetInvolvedSection() {
  const flipPageRef = useRef<HTMLDivElement>(null);
  const flipImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let flipIdx = 0;
    let flipInterval: ReturnType<typeof setInterval> | null = null;

    function doFlip() {
      const page = flipPageRef.current;
      const img = flipImgRef.current;
      if (!page || !img) return;
      page.classList.remove("coming-in");
      page.classList.add("going-out");
      setTimeout(() => {
        flipIdx = (flipIdx + 1) % FLIP_IMGS.length;
        img.src = FLIP_IMGS[flipIdx];
        page.classList.remove("going-out");
        page.classList.add("coming-in");
      }, 320);
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#s-volunteer",
        start: "top 60%",
        once: true,
        onEnter: () => {
          flipInterval = setInterval(doFlip, 800);
        },
      });

      gsap.from(".vol-tag, .vol-head, .vol-options", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "#s-volunteer", start: "top 65%", once: true },
      });
    });

    return () => {
      if (flipInterval) clearInterval(flipInterval);
      ctx.revert();
    };
  }, []);

  return (
    <section id="s-volunteer">
      <div className="flip-col">
        <div className="flip-wrap">
          <div className="flip-page" ref={flipPageRef}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={flipImgRef}
              src={FLIP_IMGS[0]}
              alt="IBTU community"
            />
          </div>
        </div>
      </div>
      <div className="vol-col">
        <span className="vol-tag">Get Involved · Los Angeles</span>
        <h2 className="vol-head">THIS WORK DOES NOT HAPPEN WITHOUT YOU</h2>
        <div className="vol-options">
          {VOL_OPTIONS.map((opt) => (
            <Link key={opt.label} href={opt.href} className="vol-opt">
              <span className="vol-opt-name">{opt.label}</span>
              <span className="vol-opt-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
