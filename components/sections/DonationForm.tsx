"use client";

import { useState, useEffect, useRef } from "react";

interface SponsorPackage {
  _id: string;
  tierName: string;
  price: number;
  priceDisplay: string;
}

const DEFAULT_AMOUNTS = [25, 50, 100, 250, 500, 1000];

export default function DonationForm({
  programTitle,
  programSlug,
  qgivUrl,
  sponsorPackages,
}: {
  programTitle: string;
  programSlug: string;
  qgivUrl?: string;
  sponsorPackages?: SponsorPackage[];
}) {
  const [amount, setAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [showEmbed, setShowEmbed] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);

  // Build preset amounts: merge sponsor package prices with defaults
  const sponsorAmounts = (sponsorPackages || [])
    .map((pkg) => pkg.price)
    .filter((p) => p > 0);
  const allAmounts = Array.from(new Set([...DEFAULT_AMOUNTS, ...sponsorAmounts]))
    .sort((a, b) => a - b);
  // Show at most 9 preset buttons to keep layout clean
  const presetAmounts = allAmounts.slice(0, 9);

  const finalAmount = amount || Number(customAmount) || 0;

  // Load Qgiv embed when user submits
  useEffect(() => {
    if (!showEmbed || !qgivUrl || !embedRef.current) return;

    // Clear any previous embed
    embedRef.current.innerHTML = "";

    // Create the Qgiv embed container
    const embedDiv = document.createElement("div");
    embedDiv.className = "qgiv-embed-container qgiv-form-embed";
    embedDiv.setAttribute("data-qgiv-embed", "true");
    embedDiv.setAttribute("data-embed-id", "");
    embedDiv.setAttribute("data-embed", `${qgivUrl}/embed`);
    embedRef.current.appendChild(embedDiv);

    // Load the Qgiv embed script
    if (!document.getElementById("qgiv-embedjs")) {
      const script = document.createElement("script");
      script.id = "qgiv-embedjs";
      script.src = "https://secure.qgiv.com/resources/core/js/embed.js";
      document.body.appendChild(script);
    } else {
      // Re-trigger if script already loaded
      const event = new Event("qgiv-embed-reload");
      window.dispatchEvent(event);
    }
  }, [showEmbed, qgivUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount <= 0) return;

    // Show the Qgiv embedded form on ibtu.la instead of redirecting
    if (qgivUrl) {
      setShowEmbed(true);
      return;
    }

    // Fallback: log to Bloomerang CRM via our API
    try {
      await fetch("/api/bloomerang/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          frequency,
          program: programSlug,
        }),
      });
      setShowEmbed(true);
    } catch {
      // Open external form as last resort
      if (qgivUrl) setShowEmbed(true);
    }
  };

  if (showEmbed && qgivUrl) {
    return (
      <div>
        <div
          style={{
            marginBottom: 20,
            padding: "16px 20px",
            background: "rgba(255,199,0,0.08)",
            border: "1px solid rgba(255,199,0,0.2)",
            borderRadius: 4,
          }}
        >
          <p style={{ fontSize: 14, color: "#FFC700", fontFamily: "Poppins, sans-serif", fontWeight: 600, margin: 0 }}>
            Complete your ${finalAmount.toLocaleString()} {frequency === "monthly" ? "monthly " : ""}gift to {programTitle} below.
          </p>
        </div>

        {/* Qgiv embed loads here */}
        <div
          ref={embedRef}
          style={{
            minHeight: 500,
            background: "#111",
            border: "1px solid rgba(255,199,0,0.15)",
            borderRadius: 6,
            overflow: "hidden",
          }}
        />

        {/* Fallback link */}
        <a
          href={`${qgivUrl}?amount=${finalAmount}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: 16,
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Having trouble? Open donation form in new window &rarr;
        </a>

        <button
          type="button"
          onClick={() => setShowEmbed(false)}
          style={{
            display: "block",
            marginTop: 12,
            fontSize: 12,
            color: "rgba(255,255,255,0.3)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "Poppins, sans-serif",
            textDecoration: "underline",
          }}
        >
          &larr; Change amount
        </button>

        {/* Security note */}
        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            textAlign: "center",
            marginTop: 16,
            lineHeight: 1.5,
          }}
        >
          501(c)(3) &middot; EIN: 85-3136505 &middot; Secure payment processing via Qgiv
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Frequency toggle */}
      <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
        {(["one-time", "monthly"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFrequency(f)}
            style={{
              flex: 1,
              padding: "14px 24px",
              background: frequency === f ? "#FFC700" : "transparent",
              color: frequency === f ? "#000" : "rgba(255,255,255,0.5)",
              border: `1px solid ${frequency === f ? "#FFC700" : "rgba(255,255,255,0.15)"}`,
              fontFamily: "Poppins, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {f === "one-time" ? "One-Time" : "Monthly"}
          </button>
        ))}
      </div>

      {/* Sponsor tier label if packages exist */}
      {sponsorPackages && sponsorPackages.length > 0 && (
        <p style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontFamily: "Poppins, sans-serif", fontWeight: 600, marginBottom: 12 }}>
          Choose an amount or match a sponsor tier
        </p>
      )}

      {/* Amount buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {presetAmounts.map((a) => {
          const matchingTier = (sponsorPackages || []).find((pkg) => pkg.price === a);
          return (
            <button
              key={a}
              type="button"
              onClick={() => {
                setAmount(a);
                setCustomAmount("");
              }}
              style={{
                padding: "18px 16px",
                background: amount === a ? "#FFC700" : "#111",
                color: amount === a ? "#000" : "#fff",
                border: `1px solid ${amount === a ? "#FFC700" : "rgba(255,199,0,0.2)"}`,
                fontFamily: "Poppins, sans-serif",
                fontSize: matchingTier ? 14 : 18,
                fontWeight: 900,
                cursor: "pointer",
                transition: "all 0.15s",
                borderRadius: 4,
                textAlign: "center",
              }}
            >
              ${a.toLocaleString()}
              {matchingTier && (
                <span
                  style={{
                    display: "block",
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginTop: 4,
                    color: amount === a ? "rgba(0,0,0,0.6)" : "rgba(255,199,0,0.5)",
                  }}
                >
                  {matchingTier.tierName}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom amount */}
      <div style={{ position: "relative", marginBottom: 24 }}>
        <span
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "rgba(255,255,255,0.4)",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          $
        </span>
        <input
          type="number"
          placeholder="Other amount"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setAmount(null);
          }}
          style={{
            width: "100%",
            padding: "18px 16px 18px 32px",
            background: "#111",
            border: `1px solid ${customAmount ? "#FFC700" : "rgba(255,199,0,0.15)"}`,
            color: "#fff",
            fontFamily: "Poppins, sans-serif",
            fontSize: 18,
            fontWeight: 700,
            outline: "none",
            borderRadius: 4,
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={finalAmount <= 0}
        style={{
          width: "100%",
          padding: "20px",
          background: finalAmount > 0 ? "#FFC700" : "rgba(255,199,0,0.3)",
          color: "#000",
          border: "none",
          fontFamily: "Poppins, sans-serif",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "3px",
          textTransform: "uppercase",
          cursor: finalAmount > 0 ? "pointer" : "not-allowed",
          borderRadius: 4,
          transition: "background 0.2s",
        }}
      >
        {finalAmount > 0
          ? `Donate $${finalAmount.toLocaleString()} ${frequency === "monthly" ? "/ month" : ""} \u2192`
          : "Select an amount"}
      </button>

      {/* Security note */}
      <p
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.3)",
          textAlign: "center",
          marginTop: 16,
          lineHeight: 1.5,
        }}
      >
        501(c)(3) &middot; EIN: 85-3136505 &middot; Secure payment via Qgiv on ibtu.la
      </p>
    </form>
  );
}
