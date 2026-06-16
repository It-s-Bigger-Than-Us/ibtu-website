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
  height?: number;
  brandColor?: string;
}

/**
 * Embedded Eventbrite checkout. Use on event DETAIL pages (one primary event,
 * room for the iframe). For list/grid views, link out with a button instead —
 * see the embedded-vs-button rule. SSR-safe: the widget is created in useEffect.
 */
export default function EventbriteCheckout({
  eventId,
  height = 425,
  brandColor = "#ffc700",
}: Props) {
  const created = useRef(false);

  useEffect(() => {
    if (!eventId || created.current) return;

    const containerId = `eventbrite-widget-container-${eventId}`;

    const create = () => {
      if (created.current || !window.EBWidgets) return;
      window.EBWidgets.createWidget({
        widgetType: "checkout",
        eventId,
        iframeContainerId: containerId,
        iframeContainerHeight: height,
        ...(brandColor ? { themeSettings: { brandColor } } : {}),
      });
      created.current = true;
    };

    if (window.EBWidgets) {
      create();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${EB_SCRIPT_SRC}"]`
    );
    if (!script) {
      script = document.createElement("script");
      script.src = EB_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", create);
    return () => script?.removeEventListener("load", create);
  }, [eventId, height, brandColor]);

  if (!eventId) return null;

  return (
    <div
      id={`eventbrite-widget-container-${eventId}`}
      style={{ width: "100%", minHeight: height }}
    />
  );
}
