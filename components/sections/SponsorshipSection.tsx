"use client";

import { useState } from "react";

interface Package {
  _id: string;
  tierName: string;
  tierGroup: string;
  price: number;
  priceDisplay: string;
  deliverables: string[];
  boothSize?: string;
  bloomerangFormUrl?: string;
  featured?: boolean;
}

export default function SponsorshipSection({ packages, programTitle }: { packages: Package[]; programTitle: string }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!packages || packages.length === 0) return null;

  const groups: Record<string, Package[]> = {};
  for (const pkg of packages) {
    const g = pkg.tierGroup || "Other";
    if (!groups[g]) groups[g] = [];
    groups[g].push(pkg);
  }

  return (
    <div style={{ padding: "80px 80px", borderTop: "1px solid rgba(255,199,0,0.15)" }}>
      <span
        style={{
          display: "block",
          fontSize: 11,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: 20,
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
        }}
      >
        Sponsorship Opportunities · {programTitle}
      </span>
      <h2
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "clamp(36px, 5vw, 72px)",
          lineHeight: 0.95,
          color: "#fff",
          marginBottom: 48,
        }}
      >
        SPONSOR THIS PROGRAM
      </h2>

      {Object.entries(groups).map(([groupName, pkgs]) => (
        <div key={groupName} style={{ marginBottom: 40 }}>
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(18px, 2vw, 26px)",
              color: "var(--gold)",
              marginBottom: 16,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            {groupName}
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 2,
            }}
          >
            {pkgs.map((pkg) => {
              const isExpanded = expandedId === pkg._id;
              return (
                <div
                  key={pkg._id}
                  onClick={() => setExpandedId(isExpanded ? null : pkg._id)}
                  style={{
                    background: pkg.featured ? "var(--gold)" : "#0e0e0e",
                    border: pkg.featured ? "none" : "1px solid rgba(255,199,0,0.15)",
                    padding: "36px 32px",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: isExpanded ? "auto" : 200,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "clamp(20px, 2.2vw, 30px)",
                        color: pkg.featured ? "#000" : "#fff",
                        lineHeight: 1,
                        marginBottom: 8,
                      }}
                    >
                      {pkg.tierName}
                    </div>
                    <div
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 900,
                        fontSize: "clamp(28px, 3.5vw, 48px)",
                        color: pkg.featured ? "#000" : "var(--gold)",
                        letterSpacing: -1,
                        lineHeight: 1,
                        marginBottom: 16,
                      }}
                    >
                      {pkg.priceDisplay}
                    </div>
                    {pkg.boothSize && (
                      <div
                        style={{
                          fontSize: 13,
                          color: pkg.featured ? "rgba(0,0,0,0.6)" : "var(--gold)",
                          marginBottom: 12,
                        }}
                      >
                        Booth: {pkg.boothSize}
                      </div>
                    )}
                    {isExpanded && pkg.deliverables && (
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: "16px 0 0 0",
                        }}
                      >
                        {pkg.deliverables.map((d, i) => (
                          <li
                            key={i}
                            style={{
                              fontSize: 14,
                              color: pkg.featured ? "#000" : "#fff",
                              lineHeight: 1.6,
                              paddingLeft: 16,
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                left: 0,
                                color: pkg.featured ? "#000" : "var(--gold)",
                              }}
                            >
                              +
                            </span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div style={{ marginTop: 20 }}>
                    {!isExpanded && (
                      <span
                        style={{
                          fontSize: 11,
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          color: pkg.featured ? "rgba(0,0,0,0.5)" : "var(--gold)",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        Click to see deliverables
                      </span>
                    )}
                    {isExpanded && (
                      <a
                        href={pkg.bloomerangFormUrl || "/get-involved#sponsor"}
                        target={pkg.bloomerangFormUrl ? "_blank" : undefined}
                        rel={pkg.bloomerangFormUrl ? "noopener noreferrer" : undefined}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "inline-block",
                          background: pkg.featured ? "#000" : "var(--gold)",
                          color: pkg.featured ? "var(--gold)" : "#000",
                          padding: "14px 32px",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: 12,
                          letterSpacing: "3px",
                          textTransform: "uppercase",
                          fontWeight: 700,
                          textDecoration: "none",
                        }}
                      >
                        Sponsor Now →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
