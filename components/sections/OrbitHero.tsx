"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const RING1_PANELS = [
  { name: "Fire Relief & The Hub", href: "/our-programs/fire-relief" },
  { name: "Back 2 School", href: "/our-programs/back-2-school" },
  { name: "Youth Programming", href: "/our-programs/youth-programming" },
  { name: "Giving Season", href: "/our-programs/giving-season" },
  { name: "Wellness & Health", href: "/our-programs/wellness" },
];

const RING2_PANELS = [
  { name: "Community Health & Food", href: "/our-programs/community-health" },
  { name: "Coastal Care", href: "/our-programs/coastal-care" },
  { name: "Fire Relief & The Hub", href: "/our-programs/fire-relief" },
  { name: "Youth Programming", href: "/our-programs/youth-programming" },
  { name: "Back 2 School", href: "/our-programs/back-2-school" },
];

export default function OrbitHero() {
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ring1 = ring1Ref.current;
    const ring2 = ring2Ref.current;
    const scene = sceneRef.current;
    if (!ring1 || !ring2 || !scene) return;

    const r1 = ring1;
    const r2 = ring2;

    let r1Y = 0;
    let r2X = 0;
    const AUTO_SPEED1 = 0.06;
    const AUTO_SPEED2 = 0.05;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0;
    let dragDist = 0;
    let wasDragging = false;
    let rafId: number;

    function renderSphere() {
      if (!isDragging) {
        if (Math.abs(velX) > 0.05) {
          velX *= 0.94;
          r1Y += velX;
          r2X += velX * 0.76;
        } else {
          velX = 0;
          r1Y += AUTO_SPEED1;
          r2X += AUTO_SPEED2;
        }
      }
      r1.style.transform = `rotateX(-10deg) rotateY(${r1Y}deg)`;
      r2.style.transform = `rotateY(28deg) rotateX(${r2X}deg)`;
      rafId = requestAnimationFrame(renderSphere);
    }
    rafId = requestAnimationFrame(renderSphere);

    // Mouse drag
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragDist = 0;
      velX = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      scene.classList.add("dragging");
      e.preventDefault();
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      dragDist += Math.abs(dx) + Math.abs(dy);
      velX = dx * 0.5;
      r1Y += dx * 0.42;
      r2X -= dy * 0.32;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      scene.classList.remove("dragging");
      wasDragging = dragDist > 6;
      setTimeout(() => {
        wasDragging = false;
      }, 150);
    };

    // Touch drag
    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      dragDist = 0;
      velX = 0;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - lastX;
      const dy = e.touches[0].clientY - lastY;
      dragDist += Math.abs(dx) + Math.abs(dy);
      r1Y += dx * 0.42;
      r2X -= dy * 0.32;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
    };
    const onTouchEnd = () => {
      isDragging = false;
      wasDragging = dragDist > 6;
      setTimeout(() => {
        wasDragging = false;
      }, 150);
    };

    scene.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    scene.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd);

    // Panel click handler
    const panels = scene.querySelectorAll<HTMLDivElement>(".v-panel");
    const panelHandlers: Array<() => void> = [];
    panels.forEach((panel) => {
      const href = panel.dataset.href;
      const handler = () => {
        if (wasDragging) return;
        if (href) router.push(href);
      };
      panel.addEventListener("click", handler);
      panelHandlers.push(() => panel.removeEventListener("click", handler));
    });

    // GSAP entrance animations
    gsap.from("#sphere-wrap", {
      scale: 0.45,
      opacity: 0,
      duration: 2.4,
      ease: "power3.out",
      delay: 0.2,
    });
    gsap.from("#gold-circle", {
      scale: 0.4,
      opacity: 0,
      duration: 1.8,
      ease: "power2.out",
      delay: 0.6,
    });
    gsap.from("#hero-logo-img", {
      opacity: 0,
      scale: 0.75,
      duration: 1.3,
      ease: "power2.out",
      delay: 1.2,
    });
    gsap.from("#hero-ring-halo, #hero-ring-halo-2", {
      opacity: 0,
      scale: 0.4,
      duration: 1.8,
      ease: "power2.out",
      delay: 1.4,
      stagger: 0.4,
    });
    gsap.from("#drag-hint", { opacity: 0, y: 8, duration: 0.8, delay: 2.8 });

    return () => {
      cancelAnimationFrame(rafId);
      scene.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      scene.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      panelHandlers.forEach((fn) => fn());
    };
  }, [router]);

  return (
    <section id="hero">
      <div id="hero-bg" />
      <div id="hero-overlay" />
      <div id="hero-vignette" />

      <div id="hero-ring-halo" />
      <div id="hero-ring-halo-2" />

      <div id="ring-scene" ref={sceneRef}>
        <div id="sphere-wrap">
          {/* Ring 1: equatorial — 5 panels + ribbon at 60° intervals */}
          <div id="ring1" ref={ring1Ref}>
            {RING1_PANELS.map((p, i) => (
              <div
                key={i}
                className="v-panel"
                data-href={p.href}
                style={{ transform: `rotateY(${i * 60}deg) translateZ(var(--ring-r))` }}
              >
                <div className="v-placeholder">
                  <span className="vp-eyebrow">Program</span>
                  <span className="vp-name">{p.name}</span>
                </div>
                <div className="panel-overlay">
                  <span className="panel-name">{p.name}</span>
                  <span className="panel-arrow">→</span>
                </div>
              </div>
            ))}
            {/* 3D Flowing Ribbon — "Community is the Infrastructure" with programs on the back */}
            <div className="ribbon-orbital">
              {/* Multi-segment wave ribbon */}
              {[
                { rotY: -30, rotX: 12, text: "COMM" },
                { rotY: -15, rotX: -8, text: "UNITY" },
                { rotY: 0, rotX: 5, text: " IS " },
                { rotY: 15, rotX: -10, text: "THE " },
                { rotY: 30, rotX: 8, text: "INFR" },
                { rotY: 45, rotX: -5, text: "ASTR" },
                { rotY: 60, rotX: 12, text: "UCTU" },
                { rotY: 75, rotX: -8, text: "RE." },
              ].map((seg, i) => (
                <div
                  key={i}
                  className="ribbon-wave-seg"
                  style={{
                    position: "absolute",
                    width: 110,
                    height: 70,
                    top: -35,
                    left: i * 95 - 380,
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${seg.rotY}deg) rotateX(${seg.rotX}deg) translateZ(var(--ring-r))`,
                    backfaceVisibility: "visible",
                  }}
                >
                  {/* Front face — gold with text */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backfaceVisibility: "hidden",
                    overflow: "hidden",
                  }}>
                    <span style={{
                      fontFamily: "LOT, Poppins, sans-serif",
                      fontSize: "clamp(16px, 1.8vw, 24px)",
                      fontWeight: 700,
                      color: "#000",
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}>
                      {seg.text}
                    </span>
                  </div>
                  {/* Back face — dark with program pill */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(30,30,30,0.95)",
                    border: "1px solid rgba(255,199,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    overflow: "hidden",
                  }}>
                    <span style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: 9,
                      fontWeight: 700,
                      color: "var(--gold)",
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      border: "1px solid rgba(255,199,0,0.4)",
                      borderRadius: 20,
                      whiteSpace: "nowrap",
                    }}>
                      {["Fire Relief", "B2S", "Youth", "Coastal", "Wellness", "Health", "Giving", "Link-Ups"][i]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="orbit-line orbit-line-equatorial" />
          </div>

          {/* Ring 2: meridian — 5 panels at 72° intervals */}
          <div id="ring2" ref={ring2Ref}>
            {RING2_PANELS.map((p, i) => (
              <div
                key={i}
                className="v-panel"
                data-href={p.href}
                style={{ transform: `rotateX(${i * 72}deg) translateZ(var(--ring-r))` }}
              >
                <div className="v-placeholder">
                  <span className="vp-eyebrow">Program</span>
                  <span className="vp-name">{p.name}</span>
                </div>
                <div className="panel-overlay">
                  <span className="panel-name">{p.name}</span>
                  <span className="panel-arrow">→</span>
                </div>
              </div>
            ))}
            <div className="orbit-line orbit-line-meridian" />
          </div>

          {/* Center */}
          <div id="gold-circle" />
          <div id="hero-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              id="hero-logo-img"
              src="https://static.wixstatic.com/media/a11c28_c704b654e72e4c769b26afe3dabe6384~mv2.png"
              alt="IBTU — It's Bigger Than Us"
            />
          </div>
        </div>
      </div>

      <div id="drag-hint">
        Drag to explore
        <div id="drag-hint-line" />
      </div>
    </section>
  );
}
