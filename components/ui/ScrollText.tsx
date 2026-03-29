"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Big parallax text that moves as you scroll.
 * Used for section headings — Poppins Black, massive, editorial.
 */
export default function ScrollText({
  children,
  as: Tag = "h2",
  speed = 0.3,
  direction = "left",
  color = "#fff",
  size = "clamp(60px, 12vw, 180px)",
  className,
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "span";
  speed?: number;
  direction?: "left" | "right" | "up";
  color?: string;
  size?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const xMove = direction === "left" ? -100 * speed : direction === "right" ? 100 * speed : 0;
    const yMove = direction === "up" ? -80 * speed : 0;

    gsap.fromTo(
      el,
      { x: direction !== "up" ? -xMove : 0, y: direction === "up" ? 60 : 30, opacity: 0 },
      {
        x: xMove,
        y: yMove,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "bottom 20%",
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [speed, direction]);

  return (
    <div ref={ref} className={className}>
      <Tag
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 900,
          fontSize: size,
          lineHeight: 0.9,
          color,
          letterSpacing: "-2px",
          textTransform: "uppercase",
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </Tag>
    </div>
  );
}
