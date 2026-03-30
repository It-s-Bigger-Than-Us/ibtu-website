"use client";

import { useState, useEffect } from "react";

/**
 * Cinematic intro that plays before the orbit hero loads.
 * Big 3D-style iridescent text: "IT'S BIGGER THAN US" → "COMMUNITY IS THE INFRASTRUCTURE"
 * Then fades away to reveal the orbit scene.
 */
export default function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0); // 0=title, 1=tagline, 2=fading out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 2000),  // Show tagline after 2s
      setTimeout(() => setPhase(2), 4000),  // Start fade at 4s
      setTimeout(() => onComplete(), 5000), // Complete at 5s
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase >= 2) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          background: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transition: "opacity 1s ease-out",
          pointerEvents: "none",
        }}
      />
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 1s ease-out",
      }}
    >
      {/* Main title */}
      <h1
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "clamp(48px, 10vw, 140px)",
          lineHeight: 0.9,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "-2px",
          opacity: phase === 0 ? 1 : 0.3,
          transform: phase === 0 ? "scale(1)" : "scale(0.85)",
          transition: "all 1s cubic-bezier(0.23, 1, 0.32, 1)",
          // Iridescent text effect
          background: "linear-gradient(105deg, #fff 0%, #FFC700 15%, #fff 30%, #7fffff 45%, #fff 55%, #FFC700 70%, #c084fc 80%, #fff 90%)",
          backgroundSize: "300% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "holoShift 3s linear infinite",
        }}
      >
        IT&apos;S BIGGER
        <br />
        THAN US
      </h1>

      {/* Tagline */}
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "clamp(14px, 2vw, 24px)",
          color: "#FFC700",
          letterSpacing: "6px",
          textTransform: "uppercase",
          marginTop: 40,
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        Community is the infrastructure.
      </p>
    </div>
  );
}
