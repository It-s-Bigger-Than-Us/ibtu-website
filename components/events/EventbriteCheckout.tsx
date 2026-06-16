"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    EBWidgets?: {
      createWidget: (opts: Record<string, unknown>) => void;
    };
  }
}

const EB_SCRIPT_SRC = "https://www.eventbrite.com/static/widgets/eb_widgets.js";

interface Props {
  eventId: string;
  /** Public Eventbrite URL for the noscript SEO fallback link. */
  eventUrl?: string;
}

/**
 * Eventbrite checkout as a MODAL trigger (not an inline iframe): a compact "Register Now"
 * button that opens the branded checkout in an overlay, plus a <noscript> link for SEO /
 * no-JS. Theme is locked to brand — gold background, black text. Only one instance mounts
 * at a time (inside EventModal), so there are never competing widgets on a page.
 */
export default function EventbriteCheckout({ eventId, eventUrl }: Props) {
  const triggerId = `eventbrite-widget-modal-trigger-${eventId}`;
  const created = useRef(false);

  useEffect(() => {
    if (!eventId) return;
    created.current = false;
    let cancelled = false;

    const create = () => {
      if (cancelled || created.current || !window.EBWidgets) return;
      if (!document.getElementById(triggerId)) return;
      window.EBWidgets.createWidget({
        widgetType: "checkout",
        eventId,
        modal: true,
        modalTriggerElementId: triggerId,
        themeSettings: { brandColor: "#000000", fontColor: "#000000", background: "#ffc700" },
      });
      created.current = true;
    };

    if (window.EBWidgets) {
      create();
      return () => { cancelled = true; };
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${EB_SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = EB_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", create);
    return () => {
      cancelled = true;
      script?.removeEventListener("load", create);
    };
  }, [eventId, triggerId]);

  if (!eventId) return null;

  return (
    <>
      {/* Noscript content for added SEO / no-JS fallback */}
      <noscript>
        <a
          href={eventUrl || `https://www.eventbrite.com/e/${eventId}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Buy Tickets on Eventbrite
        </a>
      </noscript>
      <button id={triggerId} type="button" className="btn btn-primary" style={{ cursor: "pointer" }}>
        Register Now →
      </button>
    </>
  );
}
