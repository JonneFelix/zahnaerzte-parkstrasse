"use client";

import { useEffect, useRef, useState } from "react";

type HeydentWidgetProps = {
  /** Slug der Praxis im HeyDent-Dashboard (z.B. "schwegmann-othmarschen") */
  slug: string;
  /** Mindesthöhe des iframes in px (default 700) */
  minHeight?: number;
  /** Base-URL der Booking-App (default Production) */
  baseUrl?: string;
  /** Sprache für die Consent-Platzhalter-Texte */
  locale?: string;
};

/* Consent-Platzhalter-Texte (eigene ausdrückliche Einwilligung vor dem Laden) */
const consentTexts: Record<string, { titel: string; hinweis: string; button: string }> = {
  de: {
    titel: "Online-Terminbuchung",
    hinweis:
      "Beim Laden des Terminbuchungs-Tools wird eine Verbindung zu unserem Dienstleister HeyDent hergestellt; dabei werden Daten (u.a. Ihre IP-Adresse) übertragen. Alternativ erreichen Sie uns telefonisch unter 040 880 21 50.",
    button: "Terminbuchung laden",
  },
  en: {
    titel: "Online appointment booking",
    hinweis:
      "Loading the booking tool establishes a connection to our service provider HeyDent; data (including your IP address) is transmitted. Alternatively, you can reach us by phone at +49 40 880 21 50.",
    button: "Load booking tool",
  },
  fr: {
    titel: "Prise de rendez-vous en ligne",
    hinweis:
      "Le chargement de l'outil de réservation établit une connexion avec notre prestataire HeyDent ; des données (dont votre adresse IP) sont transmises. Vous pouvez aussi nous joindre par téléphone au 040 880 21 50.",
    button: "Charger l'outil de réservation",
  },
  es: {
    titel: "Reserva de citas en línea",
    hinweis:
      "Al cargar la herramienta de reservas se establece una conexión con nuestro proveedor HeyDent; se transmiten datos (incluida su dirección IP). También puede contactarnos por teléfono en el 040 880 21 50.",
    button: "Cargar herramienta de reservas",
  },
};

/**
 * Bettet das HeyDent-Online-Terminbuchungs-Widget als iframe ein.
 * Das iframe lädt erst nach aktiver Zustimmung (2-Klick-Lösung), da eine
 * Online-Terminbuchung bei einer Praxis Gesundheitsbezug hat und beim Laden
 * Daten an den Drittanbieter übertragen werden. Höhe via postMessage.
 *
 * Kompatibel mit Next.js Static Export (`output: "export"`) — rein client-side.
 */
export default function HeydentWidget({
  slug,
  minHeight = 700,
  baseUrl = "https://termin.hey-dent.de",
  locale = "de",
}: HeydentWidgetProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [accepted, setAccepted] = useState(false);
  const t = consentTexts[locale] || consentTexts.de;

  useEffect(() => {
    if (!accepted) return;
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
  }, [baseUrl, minHeight, accepted]);

  // Platzhalter mit ausdrücklicher Zustimmung vor dem Laden
  if (!accepted) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center p-8"
        style={{
          minHeight: `${minHeight}px`,
          background: "linear-gradient(135deg, #e8e3dc, #ddd8d0)",
          borderRadius: "22px",
        }}
      >
        <div
          className="w-16 h-16 flex items-center justify-center rounded-full mb-5"
          style={{ background: "rgba(105,123,123,0.1)" }}
        >
          <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none" stroke="#697B7B" strokeWidth="1.5">
            <path d="M6.75 3v1.5M13.25 3v1.5M3 8.25h14M4.5 4.5h11a1.5 1.5 0 011.5 1.5v10a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16V6a1.5 1.5 0 011.5-1.5z" />
          </svg>
        </div>
        <p className="text-sm mb-1" style={{ color: "#4a5959", fontWeight: 500 }}>
          {t.titel}
        </p>
        <p
          className="text-xs mb-5"
          style={{ color: "#8a9a9a", fontWeight: 300, lineHeight: 1.6, maxWidth: "380px" }}
        >
          {t.hinweis}
        </p>
        <button
          onClick={() => setAccepted(true)}
          className="px-6 py-2.5 text-sm tracking-wide transition-all duration-300 cursor-pointer"
          style={{
            color: "#fff",
            fontWeight: 600,
            background: "linear-gradient(135deg, #697B7B, #5a6a6a)",
            borderRadius: "9999px",
            border: "none",
            letterSpacing: "0.03em",
            boxShadow: "0 4px 14px rgba(105,123,123,0.3)",
          }}
        >
          {t.button}
        </button>
      </div>
    );
  }

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
