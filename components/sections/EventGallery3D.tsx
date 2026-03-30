"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface GalleryEvent {
  _id: string;
  title: string;
  year: number;
  dateStart?: string;
  location?: string;
  shortDescription?: string;
  proofStats?: string;
}

export default function EventGallery3D({ events }: { events: GalleryEvent[] }) {
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  // Use grid layout — 3D perspective has cross-browser issues in this context
  const supports3D = false;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  if (!events || events.length === 0) return null;

  // Take up to 12 events for the gallery
  const displayEvents = events.slice(0, 12);
  const rotateX = (mousePos.y - 0.5) * -8;
  const rotateY = (mousePos.x - 0.5) * 12;

  // Shared card content renderer
  const renderCardContent = (ev: GalleryEvent) => (
    <>
      {/* Year badge */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          fontFamily: "Poppins, sans-serif",
          fontWeight: 900,
          fontSize: 42,
          color: "rgba(255, 199, 0, 0.12)",
          lineHeight: 1,
          pointerEvents: "none",
        }}
      >
        {ev.year}
      </div>

      {/* Gold accent line */}
      <div
        style={{
          width: 32,
          height: 2,
          background: "#FFC700",
          marginBottom: 14,
          opacity: 0.7,
        }}
      />

      <div
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "clamp(16px, 1.4vw, 22px)",
          color: "#fff",
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: 8,
        }}
      >
        {ev.title}
      </div>

      {ev.location && (
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 6 }}>
          {ev.location}
        </div>
      )}

      {ev.dateStart && (
        <div style={{ fontSize: 12, color: "#FFC700", opacity: 0.7 }}>
          {ev.dateStart}
        </div>
      )}

      {ev.proofStats && (
        <div
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.35)",
            marginTop: 10,
            lineHeight: 1.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {ev.proofStats}
        </div>
      )}
    </>
  );

  // Fallback: simple responsive grid
  if (!supports3D) {
    return (
      <>
        <div style={{ padding: "0 0 40px 0" }}>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(32px, 4vw, 56px)",
              color: "#fff",
              marginBottom: 16,
              lineHeight: 0.95,
            }}
          >
            PAST EVENTS
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 40, fontFamily: "Poppins, sans-serif" }}>
            Click any card to view details
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {displayEvents.map((ev) => (
            <div
              key={ev._id}
              onClick={() => setSelectedEvent(ev)}
              style={{
                position: "relative",
                padding: "28px 24px",
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                cursor: "pointer",
                borderRadius: 6,
                background: "rgba(20, 20, 20, 0.6)",
                border: "1px solid rgba(255, 199, 0, 0.15)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 199, 0, 0.4)";
                e.currentTarget.style.boxShadow = "0 8px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 199, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 199, 0, 0.15)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.4)";
              }}
            >
              {renderCardContent(ev)}
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedEvent && renderModal(selectedEvent, () => setSelectedEvent(null))}
      </>
    );
  }

  // 3D perspective gallery
  return (
    <>
      <div style={{ padding: "0 0 40px 0" }}>
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(32px, 4vw, 56px)",
            color: "#fff",
            marginBottom: 16,
            lineHeight: 0.95,
          }}
        >
          PAST EVENTS
        </h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 40, fontFamily: "Poppins, sans-serif" }}>
          Click any card to view details
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(500px, 60vh, 700px)",
          minHeight: 500,
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
          overflow: "visible",
          cursor: "pointer",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          {displayEvents.map((ev, i) => {
            const total = displayEvents.length;
            const centerIndex = total / 2;
            const offset = i - centerIndex;

            // Fan layout — cards spread horizontally with depth
            const translateX = offset * 180;
            const translateZ = -Math.abs(offset) * 80 - 100;
            const rotateCardY = offset * -6;
            const translateY = Math.abs(offset) * 15 - 20;

            return (
              <div
                key={ev._id}
                onClick={() => setSelectedEvent(ev)}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: "clamp(260px, 22vw, 340px)",
                  height: "clamp(340px, 30vh, 440px)",
                  marginLeft: "clamp(-130px, -11vw, -170px)",
                  marginTop: "clamp(-170px, -15vh, -220px)",
                  transformStyle: "preserve-3d",
                  transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateCardY}deg)`,
                  transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s",
                  cursor: "pointer",
                  borderRadius: 6,
                  overflow: "hidden",
                  background: "rgba(20, 20, 20, 0.6)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 199, 0, 0.15)",
                  boxShadow: `
                    0 0 0 1px rgba(255, 199, 0, 0.08),
                    0 20px 60px rgba(0, 0, 0, 0.6),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05)
                  `,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = `translateX(${translateX}px) translateY(${translateY - 20}px) translateZ(${translateZ + 60}px) rotateY(${rotateCardY}deg) scale(1.05)`;
                  el.style.boxShadow = `
                    0 0 0 2px rgba(255, 199, 0, 0.4),
                    0 30px 80px rgba(0, 0, 0, 0.7),
                    0 0 40px rgba(255, 199, 0, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `;
                  el.style.zIndex = "10";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateCardY}deg)`;
                  el.style.boxShadow = `
                    0 0 0 1px rgba(255, 199, 0, 0.08),
                    0 20px 60px rgba(0, 0, 0, 0.6),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05)
                  `;
                  el.style.zIndex = "auto";
                }}
              >
                {/* Glass reflection stripe */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-50%",
                    width: "200%",
                    height: "100%",
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "28px 24px",
                  }}
                >
                  {renderCardContent(ev)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && renderModal(selectedEvent, () => setSelectedEvent(null))}
    </>
  );
}

function renderModal(event: { _id: string; title: string; year: number; dateStart?: string; location?: string; shortDescription?: string; proofStats?: string }, onClose: () => void) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(8px)",
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
          background: "rgba(20,20,20,0.9)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,199,0,0.25)",
          maxWidth: 700,
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          padding: "48px 44px",
          position: "relative",
          cursor: "default",
          borderRadius: 6,
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 20,
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.5)",
            fontSize: 24,
            cursor: "pointer",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          ×
        </button>

        <span
          style={{
            display: "block",
            fontSize: 11,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#FFC700",
            marginBottom: 16,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
          }}
        >
          {event.year} · {event.dateStart}
        </span>
        <h3
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            color: "#fff",
            lineHeight: 0.95,
            marginBottom: 12,
          }}
        >
          {event.title.toUpperCase()}
        </h3>
        {event.location && (
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
            {event.location}
          </div>
        )}
        {event.shortDescription && (
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: 24 }}>
            {event.shortDescription}
          </p>
        )}
        {event.proofStats && (
          <div
            style={{
              background: "#FFC700",
              padding: "20px 24px",
              borderRadius: 4,
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.5)",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                display: "block",
                marginBottom: 8,
              }}
            >
              Impact
            </span>
            <div style={{ fontSize: 15, color: "#000", fontWeight: 600, lineHeight: 1.6 }}>
              {event.proofStats}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
