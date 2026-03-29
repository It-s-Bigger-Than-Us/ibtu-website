"use client";

import { useState } from "react";

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

export default function DonationForm({
  programTitle,
  programSlug,
  qgivUrl,
}: {
  programTitle: string;
  programSlug: string;
  qgivUrl?: string;
}) {
  const [amount, setAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const finalAmount = amount || Number(customAmount) || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount <= 0) return;

    // If Qgiv URL exists, redirect to their secure payment page with amount pre-filled
    if (qgivUrl) {
      window.open(`${qgivUrl}?amount=${finalAmount}`, "_blank");
      setSubmitted(true);
      return;
    }

    // Fallback: log to Bloomerang CRM via our API
    try {
      await fetch("/api/bloomerang/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          amount: finalAmount,
          frequency,
          program: programSlug,
        }),
      });
      setSubmitted(true);
    } catch {
      // Still redirect to Qgiv as fallback
      if (qgivUrl) window.open(qgivUrl, "_blank");
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          padding: "80px 40px",
          textAlign: "center",
          background: "#0a0a0a",
          border: "1px solid rgba(255,199,0,0.2)",
          borderRadius: 6,
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 20 }}>Thank you.</div>
        <h3
          style={{
            fontFamily: "LOT, Poppins, sans-serif",
            fontSize: "clamp(28px, 3vw, 44px)",
            color: "#FFC700",
            marginBottom: 16,
          }}
        >
          YOUR SUPPORT MATTERS
        </h3>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", maxWidth: 400, margin: "0 auto", lineHeight: 1.7 }}>
          Your ${finalAmount} {frequency === "monthly" ? "monthly " : ""}donation to {programTitle} helps build
          community infrastructure that lasts.
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

      {/* Amount buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {PRESET_AMOUNTS.map((a) => (
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
              fontSize: 18,
              fontWeight: 900,
              cursor: "pointer",
              transition: "all 0.15s",
              borderRadius: 4,
            }}
          >
            ${a.toLocaleString()}
          </button>
        ))}
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

      {/* Name + Email */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "16px",
            background: "#111",
            border: "1px solid rgba(255,199,0,0.15)",
            color: "#fff",
            fontFamily: "Poppins, sans-serif",
            fontSize: 14,
            outline: "none",
            borderRadius: 4,
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "16px",
            background: "#111",
            border: "1px solid rgba(255,199,0,0.15)",
            color: "#fff",
            fontFamily: "Poppins, sans-serif",
            fontSize: 14,
            outline: "none",
            borderRadius: 4,
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
          ? `Donate $${finalAmount.toLocaleString()} ${frequency === "monthly" ? "/ month" : ""} →`
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
        501(c)(3) · EIN: 85-3136505 · Secure payment processing via Bloomerang
      </p>
    </form>
  );
}
