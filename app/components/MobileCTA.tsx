"use client";

import { useState, useEffect } from "react";
import { type Locale } from "../../lib/i18n";
import { openOrb, hasHeydentConsent } from "../../lib/heydent";

const ctaTexts: Record<string, { anrufen: string; termin: string }> = {
  de: { anrufen: "Anrufen", termin: "Termin buchen" },
  en: { anrufen: "Call us", termin: "Book appointment" },
  fr: { anrufen: "Appeler", termin: "Rendez-vous" },
  es: { anrufen: "Llamar", termin: "Pedir cita" },
};

export default function MobileCTA({ locale = "de" as Locale }: { locale?: Locale }) {
  const ct = ctaTexts[locale] || ctaTexts.de;
  const [sichtbar, setSichtbar] = useState(false);
  const [menuOffen, setMenuOffen] = useState(false);
  /* Ist der schwebende Orb aktiv? Dann rechts Platz lassen, damit er die
     Buttons nicht überlagert (Orb sitzt unten rechts, z weit über der Leiste). */
  const [orbAktiv, setOrbAktiv] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSichtbar(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Menü-Status beobachten (Header setzt data-menu-open auf body)
    const observer = new MutationObserver(() => {
      setMenuOffen(document.body.dataset.menuOpen === "true");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-menu-open"] });

    // Orb-Einwilligung beobachten (steuert die Kollisions-Reserve rechts)
    setOrbAktiv(hasHeydentConsent());
    const onCookieConsent = (e: Event) => {
      if ((e as CustomEvent).detail === "all") setOrbAktiv(true);
    };
    const onHeydentConsent = () => setOrbAktiv(true);
    window.addEventListener("consent-changed", onCookieConsent);
    window.addEventListener("heydent-consent-changed", onHeydentConsent);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      window.removeEventListener("consent-changed", onCookieConsent);
      window.removeEventListener("heydent-consent-changed", onHeydentConsent);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden
        transition-transform duration-300 ease-out
        ${sichtbar && !menuOffen ? "translate-y-0" : "translate-y-full"}`}
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(105,123,123,0.1)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div
        className="flex items-center gap-3 py-3"
        style={{
          paddingLeft: "1rem",
          /* Rechts mehr Platz, wenn der Orb unten rechts schwebt */
          paddingRight: orbAktiv ? "5.5rem" : "1rem",
          transition: "padding-right 0.3s ease-out",
        }}
      >
        {/* Anrufen */}
        <a
          href="tel:+494088021050"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-medium text-sm"
          style={{
            border: "1.5px solid rgba(105,123,123,0.2)",
            color: "#4a5959",
          }}
        >
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 3.5A1.5 1.5 0 013.5 2h2.879a1.5 1.5 0 011.414 1.002l.675 2.7a1.5 1.5 0 01-.76 1.67l-.833.555a10.5 10.5 0 005.196 5.196l.555-.833a1.5 1.5 0 011.67-.76l2.7.675A1.5 1.5 0 0118 13.621V16.5a1.5 1.5 0 01-1.5 1.5A15.5 15.5 0 012 3.5z" />
          </svg>
          {ct.anrufen}
        </a>

        {/* Termin buchen — öffnet die Online-Terminbuchung (Orb) */}
        <button
          type="button"
          onClick={() => openOrb(locale)}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm text-white cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #F26522 0%, #e3541a 100%)",
            boxShadow: "0 4px 12px rgba(242,101,34,0.3)",
            border: "none",
          }}
        >
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6.75 3v1.5M13.25 3v1.5M3 8.25h14M4.5 4.5h11a1.5 1.5 0 011.5 1.5v10a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16V6a1.5 1.5 0 011.5-1.5z" />
          </svg>
          {ct.termin}
        </button>
      </div>
    </div>
  );
}
