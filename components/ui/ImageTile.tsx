"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Parallax image tile — image moves at a different speed than scroll.
 * Creates the layered, editorial photo feel.
 */
export default function ImageTile({
  src,
  alt,
  width,
  height,
  parallaxSpeed = 0.15,
  style,
}: {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  parallaxSpeed?: number;
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imgRef.current) return;
    const container = containerRef.current;
    const img = imgRef.current;

    const ctx = gsap.context(() => {
      // Parallax: image moves slower than scroll
      gsap.fromTo(
        img,
        { y: -50 * parallaxSpeed },
        {
          y: 50 * parallaxSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Fade in on reveal
      gsap.fromTo(
        container,
        { opacity: 0, scale: 1.02 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [parallaxSpeed]);

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        width: width || "100%",
        height: height || "auto",
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "120%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}
