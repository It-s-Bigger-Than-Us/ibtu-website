"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const FLIP_IMGS = [
  "https://static.wixstatic.com/media/a11c28_c252e60a91f34fba9d020d2fc20b45bd~mv2.jpg",
  "https://static.wixstatic.com/media/a11c28_4a04e6873c9e4858ba9b0621e40c9bd0~mv2.jpg",
  "https://static.wixstatic.com/media/a11c28_d30b9d68051b4a61b205d5e8b7c77faa~mv2.jpg",
  "https://static.wixstatic.com/media/a11c28_00da205b7f55490391a902b27d2ed0a5~mv2.jpg",
  "https://static.wixstatic.com/media/a11c28_3266eae7be9641cc9902418912b2fe47~mv2.jpg",
  "https://static.wixstatic.com/media/a11c28_a1e0cc925ecf4df4bf8e015335666b3c~mv2.jpg",
];

const VOL_OPTIONS = [
  { label: "Volunteer With Us", href: "/get-involved#volunteer" },
  { label: "Become a Sponsor", href: "/get-involved#sponsor" },
  { label: "Donate Today", href: "/get-involved#donate" },
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

    return () => {
      if (flipInterval) clearInterval(flipInterval);
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
