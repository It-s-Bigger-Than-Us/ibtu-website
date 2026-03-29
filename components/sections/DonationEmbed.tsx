"use client";

import { useEffect, useRef } from "react";

/**
 * Embeds a Qgiv/Bloomerang donation form directly on the page.
 * Uses Qgiv's official embed script for PCI-compliant payment processing.
 * The form loads inside an iframe styled to match IBTU's brand.
 */
export default function DonationEmbed({
  formUrl,
  title,
  description,
}: {
  formUrl: string;
  title?: string;
  description?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the Qgiv embed container
    const embedDiv = document.createElement("div");
    embedDiv.className = "qgiv-embed-container qgiv-form-embed";
    embedDiv.setAttribute("data-qgiv-embed", "true");
    embedDiv.setAttribute("data-embed-id", "");
    embedDiv.setAttribute("data-embed", `${formUrl}/embed`);
    containerRef.current.appendChild(embedDiv);

    // Load the Qgiv embed script
    if (!document.getElementById("qgiv-embedjs")) {
      const script = document.createElement("script");
      script.id = "qgiv-embedjs";
      script.src = "https://secure.qgiv.com/resources/core/js/embed.js";
      document.body.appendChild(script);
    } else {
      // If script already loaded, trigger re-initialization
      const event = new Event("qgiv-embed-reload");
      window.dispatchEvent(event);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [formUrl]);

  return (
    <div
      style={{
        background: "#000",
        padding: "80px 80px",
        borderTop: "1px solid rgba(255,199,0,0.15)",
      }}
    >
      {title && (
        <h2
          style={{
            fontFamily: "LOT, Poppins, sans-serif",
            fontSize: "clamp(36px, 5vw, 72px)",
            lineHeight: 0.95,
            color: "#fff",
            marginBottom: 16,
          }}
        >
          {title}
        </h2>
      )}
      {description && (
        <p
          style={{
            fontSize: "clamp(15px, 1.3vw, 19px)",
            color: "rgba(255,255,255,0.6)",
            maxWidth: 580,
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          {description}
        </p>
      )}

      {/* Qgiv embed loads here */}
      <div
        ref={containerRef}
        style={{
          maxWidth: 600,
          minHeight: 400,
          background: "#111",
          border: "1px solid rgba(255,199,0,0.15)",
          borderRadius: 6,
          overflow: "hidden",
        }}
      />

      {/* Fallback link if embed doesn't load */}
      <a
        href={formUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: 20,
          fontSize: 13,
          color: "rgba(255,255,255,0.4)",
          textDecoration: "none",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Having trouble? Open donation form in new window →
      </a>
    </div>
  );
}
