"use client";

import { useState, useEffect } from "react";

const MAPS_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2372.8!2d9.8836!3d53.5524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18f3d2c6d7c69%3A0x4263df27bd0ab0f5!2sParkstra%C3%9Fe%2010%2C%2022605%20Hamburg!5e0!3m2!1sde!2sde!4v1";

export default function GoogleMap() {
  const [consent, setConsent] = useState(false);
  const [manualAccept, setManualAccept] = useState(false);

  useEffect(() => {
    // Consent aus localStorage prüfen
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "all") setConsent(true);

    // Auf Consent-Änderungen hören
    function onConsentChanged(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail === "all") setConsent(true);
    }
    window.addEventListener("consent-changed", onConsentChanged);
    return () => window.removeEventListener("consent-changed", onConsentChanged);
  }, []);

  const showMap = consent || manualAccept;

  if (showMap) {
    return (
      <iframe
        src={MAPS_URL}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Standort Zahnärzte Parkstrasse — Parkstraße 10, Hamburg-Othmarschen"
      />
    );
  }

  // Platzhalter mit Klick-zum-Laden
  return (
    <div
      className="flex flex-col items-center justify-center text-center p-8"
      style={{
        height: "400px",
        background: "linear-gradient(135deg, #e8e3dc, #ddd8d0)",
        borderRadius: "inherit",
      }}
    >
      {/* Karten-Icon */}
      <div
        className="w-16 h-16 flex items-center justify-center rounded-full mb-5"
        style={{ background: "rgba(105,123,123,0.1)" }}
      >
        <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none" stroke="#697B7B" strokeWidth="1.5">
          <path d="M14 3C9 3 5 8 5 12C5 19 14 25 14 25C14 25 23 19 23 12C23 8 19 3 14 3Z" />
          <circle cx="14" cy="12" r="3.5" />
        </svg>
      </div>

      <p className="text-sm mb-1" style={{ color: "#4a5959", fontWeight: 500 }}>
        Google Maps Karte
      </p>
      <p className="text-xs mb-5" style={{ color: "#8a9a9a", fontWeight: 300, lineHeight: 1.6, maxWidth: "280px" }}>
        Beim Laden der Karte werden Daten an Google übermittelt.
      </p>

      <button
        onClick={() => setManualAccept(true)}
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
        Karte laden
      </button>
    </div>
  );
}
