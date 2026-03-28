"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { programs } from "@/lib/data/programs";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, React.ReactNode> = {
  fire: (
    <svg viewBox="0 0 32 32">
      <path d="M16 2C16 2 8 10 8 17C8 21.5 10.5 24 10.5 24C10.5 24 9.5 21.5 11.5 19.5C11.5 19.5 11.5 23.5 16 26C20.5 23.5 20.5 19.5 20.5 19.5C22.5 21.5 21.5 24 21.5 24C21.5 24 24 21.5 24 17C24 10 16 2 16 2Z" />
    </svg>
  ),
  school: (
    <svg viewBox="0 0 32 32">
      <path d="M7 11L7 27L25 27L25 11L20 11L20 7C20 6 18.5 5 16 5C13.5 5 12 6 12 7L12 11ZM13 16L19 16L19 22L13 22Z" />
    </svg>
  ),
  youth: (
    <svg viewBox="0 0 32 32">
      <path d="M16 4L29 11L16 18L3 11ZM7 14L7 23C7 23 11.5 28 16 28C20.5 28 25 23 25 23L25 14L16 18Z" />
    </svg>
  ),
  beach: (
    <svg viewBox="0 0 32 32">
      <rect x="14" y="2" width="4" height="16" rx="2" />
      <path d="M10 18L22 18L24 30L8 30Z" />
    </svg>
  ),
  gift: (
    <svg viewBox="0 0 32 32">
      <rect x="5" y="14" width="22" height="13" rx="1" />
      <rect x="3" y="9" width="26" height="7" rx="1" />
      <line x1="16" y1="9" x2="16" y2="27" strokeWidth="2" />
      <path d="M16 9C16 9 10 4 7 6C4 8 10 9 16 9Z" />
      <path d="M16 9C16 9 22 4 25 6C28 8 22 9 16 9Z" />
    </svg>
  ),
  wellness: (
    <svg viewBox="0 0 32 32">
      <path d="M16 28C16 28 2 20 2 11C2 6 6 3.5 9.5 3.5C12.5 3.5 15 5.5 16 8C17 5.5 19.5 3.5 22.5 3.5C26 3.5 30 6 30 11C30 20 16 28 16 28Z" />
    </svg>
  ),
  food: (
    <svg viewBox="0 0 32 32">
      <path d="M9 17C5 17 3 21 3 25L3 30L12 30L12 25C12 25 10 25 10 23L10 17ZM23 17C27 17 29 21 29 25L29 30L20 30L20 25C20 25 22 25 22 23L22 17ZM12 19L12 15C12 8 20 8 20 15L20 19C20 24 12 24 12 19Z" />
    </svg>
  ),
};

export default function ProgramsGrid() {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    gsap.from(".prog-card", {
      y: 60,
      opacity: 0,
      stagger: 0.04,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: { trigger: "#s-programs", start: "top 75%" },
    });

    // Photo hover cycle
    cardRefs.current.forEach((card) => {
      if (!card) return;
      const imgs = JSON.parse(card.dataset.imgs || "[]") as string[];
      if (!imgs.length) return;
      const photo = card.querySelector<HTMLImageElement>(".prog-photo");
      if (!photo) return;
      photo.src = imgs[0];
      let idx = 0;
      let timer: ReturnType<typeof setInterval> | null = null;

      card.addEventListener("mouseenter", () => {
        photo.style.opacity = "1";
        if (imgs.length < 2) return;
        timer = setInterval(() => {
          photo.style.opacity = "0";
          setTimeout(() => {
            idx = (idx + 1) % imgs.length;
            photo.src = imgs[idx];
            photo.style.opacity = "1";
          }, 450);
        }, 950);
      });
      card.addEventListener("mouseleave", () => {
        if (timer) clearInterval(timer);
        photo.style.opacity = "0";
      });
    });
  }, []);

  return (
    <section id="s-programs">
      <div className="prog-grid">
        {programs.map((prog, i) => (
          <Link
            key={prog.slug}
            href={`/our-programs/${prog.slug}`}
            className="prog-card"
            data-imgs={JSON.stringify(prog.cardImages)}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="prog-photo" src="" alt={`${prog.title} photo`} />
            <div className="prog-card-body">
              <span className="prog-icon">{ICONS[prog.icon]}</span>
              <span className="prog-card-name">{prog.title}</span>
              <span className="prog-card-stat">{prog.cardStat}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
