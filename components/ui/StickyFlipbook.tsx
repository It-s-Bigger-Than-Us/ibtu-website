"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky flipbook — images stay pinned while user scrolls,
 * each new image flips in like turning a page.
 */
export default function StickyFlipbook({
  images,
  height = "300vh",
}: {
  images: Array<{ src: string; alt: string; caption?: string }>;
  height?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipDirection, setFlipDirection] = useState<"in" | "out" | "none">("none");
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // containerHeight - viewportHeight is exactly the pinned scroll range
    // ScrollTrigger covers with start "top top" / end "bottom bottom", so
    // self.progress reproduces the original -rect.top / range math.
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const newIndex = Math.min(
          images.length - 1,
          Math.floor(self.progress * images.length)
        );

        if (newIndex !== activeIndexRef.current) {
          setFlipDirection("out");
          setTimeout(() => {
            setActiveIndex(newIndex);
            setFlipDirection("in");
            setTimeout(() => setFlipDirection("none"), 0.4 * 1000);
          }, 0.2 * 1000);
        }
      },
    });

    return () => trigger.kill();
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div
      ref={containerRef}
      style={{
        height,
        position: "relative",
      }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
        }}
      >
        {/* Flipbook page */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            perspective: "1200px",
          }}
        >
          {/* Current image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              transformStyle: "preserve-3d",
              transform:
                flipDirection === "out"
                  ? "rotateY(-90deg)"
                  : flipDirection === "in"
                  ? "rotateY(0deg)"
                  : "rotateY(0deg)",
              opacity: flipDirection === "out" ? 0 : 1,
              transition: "transform var(--dur-base) cubic-bezier(0.4, 0, 0.2, 1), opacity var(--dur-fast)",
              transformOrigin: "left center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* Caption overlay */}
            {/* Caption moved to gold bar below image — no text over image */}
            {images[activeIndex].caption && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "16px 32px",
                  background: "var(--gold)",
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: "#000",
                    fontWeight: 600,
                    maxWidth: 500,
                    lineHeight: 1.4,
                  }}
                >
                  {images[activeIndex].caption}
                </p>
              </div>
            )}
          </div>

          {/* Progress indicator */}
          <div
            style={{
              position: "absolute",
              bottom: 32,
              right: 80,
              display: "flex",
              gap: 6,
              zIndex: 10,
            }}
          >
            {images.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === activeIndex ? 24 : 8,
                  height: 4,
                  background: i === activeIndex ? "#FFC700" : "var(--gold)",
                  borderRadius: 2,
                  transition: "all var(--dur-base)",
                }}
              />
            ))}
          </div>

          {/* Counter */}
          <div
            style={{
              position: "absolute",
              top: 32,
              right: 80,
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              color: "#FFC700",
              letterSpacing: "2px",
              zIndex: 10,
            }}
          >
            {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}
