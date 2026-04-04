"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VOLUNTEER_URL =
  "https://volunteer.bloomerang.co/volunteer/#/join-party?k=u9uiz8g1753qfr";

const volunteerBtnStyle: React.CSSProperties = {
  display: "inline-block",
  background: "#FFC700",
  color: "#000",
  borderRadius: 16,
  fontFamily: "Poppins, sans-serif",
  fontSize: 13,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  padding: "12px 24px",
  textDecoration: "none",
  whiteSpace: "nowrap",
  border: "none",
  cursor: "pointer",
  transition: "opacity 0.2s",
};

const STATUS_COLORS: Record<string, string> = {
  Upcoming: "var(--gold)",
  Active: "var(--gold)",
  Closed: "var(--gold)",
};

interface EventsPageClientProps {
  events: any[];
  upcoming: any[];
  programs: any[];
  allByProgram: { program: any; events: any[] }[];
}

export default function EventsPageClient({
  events,
  upcoming,
  programs,
  allByProgram,
}: EventsPageClientProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const upcomingHeadlineRef = useRef<HTMLHeadingElement>(null);
  const upcomingCardsRef = useRef<HTMLDivElement>(null);
  const allHeadlineRef = useRef<HTMLHeadingElement>(null);
  const programSectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header slide in
      if (headerRef.current) {
        const headerChildren = headerRef.current.children;
        gsap.fromTo(
          headerChildren,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // "HAPPENING NOW & UPCOMING" headline slide in
      if (upcomingHeadlineRef.current) {
        gsap.fromTo(
          upcomingHeadlineRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: upcomingHeadlineRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Upcoming event cards stagger in
      if (upcomingCardsRef.current) {
        const cards = upcomingCardsRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: upcomingCardsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // "ALL EVENTS BY PROGRAM" headline slide in
      if (allHeadlineRef.current) {
        gsap.fromTo(
          allHeadlineRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: allHeadlineRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Program sections — each program block staggers its event rows
      if (programSectionsRef.current) {
        const sections =
          programSectionsRef.current.querySelectorAll("[data-program-block]");
        sections.forEach((section) => {
          // Program heading
          const heading = section.querySelector("[data-program-heading]");
          if (heading) {
            gsap.fromTo(
              heading,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: heading,
                  start: "top 90%",
                  once: true,
                },
              }
            );
          }
          // Event rows
          const rows = section.querySelectorAll("[data-event-row]");
          if (rows.length > 0) {
            gsap.fromTo(
              rows,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: rows[0],
                  start: "top 90%",
                  once: true,
                },
              }
            );
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          padding: "140px 80px 80px 80px",
          borderBottom: "1px solid #FFC700",
        }}
      >
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
            opacity: 0,
          }}
        >
          54 Events · 7 Programs · Los Angeles
        </span>
        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(60px, 9vw, 140px)",
            lineHeight: 0.9,
            color: "#fff",
            marginBottom: 32,
            opacity: 0,
          }}
        >
          EVENTS
        </h1>
        <p
          style={{
            fontSize: "clamp(16px, 1.4vw, 20px)",
            color: "#fff",
            maxWidth: 640,
            lineHeight: 1.75,
            opacity: 0,
          }}
        >
          Every year, every month, every week — IBTU shows up.
        </p>
      </div>

      {/* Upcoming & Active */}
      {upcoming.length > 0 && (
        <div style={{ padding: "80px 80px 60px 80px" }}>
          <h2
            ref={upcomingHeadlineRef}
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 0.95,
              color: "var(--gold)",
              marginBottom: 40,
              opacity: 0,
            }}
          >
            HAPPENING NOW & UPCOMING
          </h2>
          <div
            ref={upcomingCardsRef}
            style={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {upcoming.map((ev: any, i: number) => {
              const prog = programs.find(
                (p: any) => p.slug === ev.programSlug
              );
              return (
                <div key={i} style={{ opacity: 0 }}>
                  <Link
                    href={`/our-programs/${ev.programSlug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        background: "#000",
                        border: "1px solid #FFC700",
                        padding: "28px 32px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 24,
                        transition: "border-color 0.2s",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <span
                          style={{
                            display: "inline-block",
                            background: "var(--gold)",
                            color: "#000",
                            fontSize: 10,
                            letterSpacing: "2px",
                            fontWeight: 700,
                            padding: "3px 10px",
                            marginBottom: 10,
                            fontFamily: "Poppins, sans-serif",
                            textTransform: "uppercase",
                          }}
                        >
                          {ev.status}
                        </span>
                        <div
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "clamp(18px, 2vw, 28px)",
                            color: "#fff",
                            fontWeight: 700,
                            lineHeight: 1.1,
                            marginBottom: 8,
                          }}
                        >
                          {ev.title}
                        </div>
                        <div style={{ fontSize: 13, color: "var(--gold)" }}>
                          {prog?.title} · {ev.location}
                          {ev.proofStats && <> · {ev.proofStats}</>}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            fontSize: 13,
                            color: "var(--gold)",
                            fontWeight: 600,
                          }}
                        >
                          {ev.dateStart}
                          {ev.dateEnd && <> – {ev.dateEnd}</>}
                        </div>
                        <a
                          href={VOLUNTEER_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={volunteerBtnStyle}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {"VOLUNTEER \u2192"}
                        </a>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All events by program */}
      <div style={{ padding: "40px 80px 80px 80px" }}>
        <h2
          ref={allHeadlineRef}
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(36px, 5vw, 72px)",
            lineHeight: 0.95,
            color: "#fff",
            marginBottom: 60,
            opacity: 0,
          }}
        >
          ALL EVENTS BY PROGRAM
        </h2>

        <div ref={programSectionsRef}>
          {allByProgram.map(
            ({ program: prog, events: progEvents }: any) => (
              <div
                key={prog.slug}
                style={{ marginBottom: 60 }}
                data-program-block
              >
                <div
                  data-program-heading
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    borderBottom: "1px solid #FFC700",
                    paddingBottom: 16,
                    marginBottom: 16,
                    opacity: 0,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "clamp(24px, 3vw, 40px)",
                      color: "var(--gold)",
                      fontWeight: 700,
                    }}
                  >
                    {prog.title.toUpperCase()}
                  </h3>
                  <Link
                    href={`/our-programs/${prog.slug}`}
                    style={{
                      fontSize: 11,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      textDecoration: "none",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    View Program →
                  </Link>
                </div>

                {progEvents.map((ev: any, i: number) => (
                  <div
                    key={i}
                    data-event-row
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 24,
                      padding: "16px 0",
                      borderBottom: "1px solid var(--gold)",
                      opacity: 0,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 6,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 9,
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            color: STATUS_COLORS[ev.status] || "#fff",
                            fontWeight: 700,
                          }}
                        >
                          {ev.status}
                        </span>
                        <span
                          style={{
                            fontSize: 15,
                            color:
                              ev.status === "Closed"
                                ? "var(--gold)"
                                : "#fff",
                            fontWeight: 600,
                          }}
                        >
                          {ev.title}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: "var(--gold)" }}>
                        {ev.location}
                        {ev.proofStats && <> · {ev.proofStats}</>}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          whiteSpace: "nowrap",
                          fontSize: 13,
                          color: "var(--gold)",
                        }}
                      >
                        {ev.dateStart}
                      </div>
                      <a
                        href={VOLUNTEER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={volunteerBtnStyle}
                      >
                        {"VOLUNTEER \u2192"}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
