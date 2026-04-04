"use client";

import { useState } from "react";

interface GalleryEvent {
  _id: string;
  title: string;
  year: number;
  dateStart?: string;
  location?: string;
  shortDescription?: string;
  proofStats?: string;
  galleryImages?: Array<{ asset?: { _ref: string }; caption?: string }>;
}

export default function EventGallery({ events }: { events: GalleryEvent[] }) {
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);

  if (!events || events.length === 0) return null;

  // Only show events that have gallery images OR proof stats (for the MVP, show all past events as cards)
  const displayEvents = events;

  return (
    <>
      <div style={{ padding: "0 80px 80px 80px" }}>
        <h2
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: "clamp(32px, 4vw, 56px)",
            color: "#fff",
            marginBottom: 32,
            lineHeight: 0.95,
          }}
        >
          PAST EVENTS
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 2,
          }}
        >
          {displayEvents.map((ev) => (
            <div
              key={ev._id}
              onClick={() => setSelectedEvent(ev)}
              style={{
                background: "#000",
                border: "1px solid #FFC700",
                padding: "28px 24px",
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 160,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#FFC700";
                (e.currentTarget as HTMLDivElement).style.background = "#000";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#FFC700";
                (e.currentTarget as HTMLDivElement).style.background = "#000";
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 10,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#FFC700",
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {ev.year} · {ev.location}
                </span>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: "clamp(16px, 1.6vw, 22px)",
                    color: "#fff",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    marginBottom: 8,
                  }}
                >
                  {ev.title}
                </div>
                {ev.proofStats && (
                  <div style={{ fontSize: 13, color: "#fff", lineHeight: 1.5 }}>
                    {ev.proofStats}
                  </div>
                )}
              </div>
              <span
                style={{
                  marginTop: 16,
                  fontSize: 10,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                }}
              >
                View Details →
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Popup */}
      {selectedEvent && (
        <div
          onClick={() => setSelectedEvent(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "#000",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
            cursor: "pointer",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#000",
              border: "1px solid #FFC700",
              maxWidth: 700,
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "48px 44px",
              position: "relative",
              cursor: "default",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedEvent(null)}
              style={{
                position: "absolute",
                top: 16,
                right: 20,
                background: "none",
                border: "none",
                color: "var(--gold)",
                fontSize: 24,
                cursor: "pointer",
                fontFamily: 'var(--font-body)',
              }}
            >
              ×
            </button>

            {/* Event info */}
            <span
              style={{
                display: "block",
                fontSize: 11,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 16,
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
              }}
            >
              {selectedEvent.year} · {selectedEvent.dateStart}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: "clamp(28px, 3.5vw, 48px)",
                color: "#fff",
                lineHeight: 0.95,
                marginBottom: 12,
              }}
            >
              {selectedEvent.title.toUpperCase()}
            </h3>
            {selectedEvent.location && (
              <div style={{ fontSize: 15, color: "#fff", marginBottom: 20 }}>
                {selectedEvent.location}
              </div>
            )}
            {selectedEvent.shortDescription && (
              <p style={{ fontSize: 16, color: "#fff", lineHeight: 1.7, marginBottom: 24 }}>
                {selectedEvent.shortDescription}
              </p>
            )}
            {selectedEvent.proofStats && (
              <div
                style={{
                  background: "var(--gold)",
                  padding: "20px 24px",
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#000",
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Impact
                </span>
                <div style={{ fontSize: 15, color: "#000", fontWeight: 600, lineHeight: 1.6 }}>
                  {selectedEvent.proofStats}
                </div>
              </div>
            )}

            {/* Gallery images placeholder — will show when images are uploaded to Sanity */}
            {selectedEvent.galleryImages && selectedEvent.galleryImages.length > 0 && (
              <div style={{ fontSize: 13, color: "var(--gold)", fontStyle: "italic" }}>
                {selectedEvent.galleryImages.length} photos available
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
