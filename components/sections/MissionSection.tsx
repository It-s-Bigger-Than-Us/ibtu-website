"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROGRAM_VIDEOS } from "@/lib/data/video-urls";

gsap.registerPlugin(ScrollTrigger);

export default function MissionSection() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("#mission-text", {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "#s-mission", start: "top 65%", once: true },
      });
      gsap.to("#mission-detail-inner", {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#s-mission-detail",
          start: "top 60%",
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="s-mission">
        <video
          id="mission-video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source
            src={PROGRAM_VIDEOS['fire-relief'].highlight}
            type="video/mp4"
          />
        </video>
        <div id="mission-scrim" />
        <div id="mission-text">
          <span className="mission-eyebrow">Los Angeles</span>
          <h2 className="mission-big">
            OUR
            <br />
            MISSION
          </h2>
        </div>
      </section>

      <section id="s-mission-detail">
        <div id="mission-detail-inner">
          <span className="md-tag">Who We Are</span>
          <h3 className="md-head">
            TRUSTED, PLACE-BASED
            <br />
            PROGRAMS. DESIGNED
            <br />
            WITH DIGNITY.
          </h3>
          <p className="md-body">
            IBTU builds and operates programs rooted in the communities we
            serve — responsive to crisis, built to last. We don&apos;t
            parachute in. We listen, we build, and we stay. In Los Angeles and
            beyond, community is the infrastructure.
          </p>
        </div>
      </section>
    </>
  );
}
