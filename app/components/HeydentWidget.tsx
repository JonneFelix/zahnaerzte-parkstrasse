"use client";

import { useEffect, useRef } from "react";

type HeydentWidgetProps = {
  /** Slug der Praxis im HeyDent-Dashboard (z.B. "schwegmann-othmarschen") */
  slug: string;
  /** Mindesthöhe des iframes in px (default 700) */
  minHeight?: number;
  /** Base-URL der Booking-App (default Production) */
  baseUrl?: string;
};

/**
 * Bettet das HeyDent-Online-Terminbuchungs-Widget als iframe ein.
 * Höhe wird via postMessage automatisch vom Booking-App angepasst.
 *
 * Kompatibel mit Next.js Static Export (`output: "export"`) — rein client-side.
 */
export default function HeydentWidget({
  slug,
  minHeight = 700,
  baseUrl = "https://termin.hey-dent.de",
}: HeydentWidgetProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      // Nur Messages vom Booking-Origin akzeptieren
      if (event.origin !== baseUrl) return;
      if (!event.data || typeof event.data.type !== "string") return;
      if (event.source !== iframeRef.current?.contentWindow) return;

      switch (event.data.type) {
        case "heydent:resize": {
          const height = parseInt(String(event.data.height), 10);
          if (height && height > 0 && iframeRef.current) {
            iframeRef.current.style.height = `${Math.max(height, minHeight)}px`;
          }
          break;
        }
        case "heydent:booked": {
          // Custom Event auf dem Container — kann z.B. für Analytics genutzt werden
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("heydent:booked", { detail: event.data, bubbles: true }),
            );
          }
          break;
        }
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [baseUrl, minHeight]);

  return (
    <div className="heydent-widget-container" style={{ width: "100%", overflow: "hidden", borderRadius: "22px" }}>
      <iframe
        ref={iframeRef}
        src={`${baseUrl}/${slug}?embed=true`}
        title="HeyDent Online-Terminbuchung"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        allow="clipboard-write"
        style={{
          width: "100%",
          minHeight: `${minHeight}px`,
          height: `${minHeight}px`,
          border: "none",
          display: "block",
          background: "transparent",
        }}
      />
    </div>
  );
}
