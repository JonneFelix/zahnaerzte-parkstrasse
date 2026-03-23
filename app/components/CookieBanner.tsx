"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ConsentStatus = "all" | "necessary" | null;

export function getConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cookie-consent") as ConsentStatus;
}

/* Übersetzungen für den Cookie-Banner */
const texts: Record<string, { text: string; link: string; necessary: string; accept: string }> = {
  de: {
    text: "Wir nutzen Google Maps, um Ihnen unseren Standort zu zeigen. Dabei können Daten an Google übermittelt werden.",
    link: "Mehr erfahren",
    necessary: "Nur notwendige",
    accept: "Alle akzeptieren",
  },
  en: {
    text: "We use Google Maps to show you our location. Data may be transmitted to Google.",
    link: "Learn more",
    necessary: "Only necessary",
    accept: "Accept all",
  },
  fr: {
    text: "Nous utilisons Google Maps pour vous montrer notre emplacement. Des données peuvent être transmises à Google.",
    link: "En savoir plus",
    necessary: "Uniquement nécessaires",
    accept: "Tout accepter",
  },
  es: {
    text: "Utilizamos Google Maps para mostrarle nuestra ubicación. Los datos pueden ser transmitidos a Google.",
    link: "Más información",
    necessary: "Solo necesarias",
    accept: "Aceptar todas",
  },
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  /* Sprache aus dem URL-Pfad erkennen */
  const locale = pathname.split("/")[1] || "de";
  const t = texts[locale] || texts.de;
  const datenschutzPath = `/${locale}/datenschutz`;

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleConsent(type: "all" | "necessary") {
    localStorage.setItem("cookie-consent", type);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("consent-changed", { detail: type }));
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] px-4 pb-4 animate-slide-up"
      style={{ animation: "slideUp 0.5s ease-out forwards" }}
    >
      <div
        className="max-w-3xl mx-auto p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4"
        style={{
          background: "rgba(44, 58, 58, 0.97)",
          backdropFilter: "blur(12px)",
          borderRadius: "18px",
          boxShadow: "0 -4px 30px rgba(0,0,0,0.15)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex-1">
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.9)", fontWeight: 300, lineHeight: 1.7 }}>
            {t.text}{" "}
            <Link href={datenschutzPath} className="underline transition-colors duration-300 hover:text-[#F26522]" style={{ color: "rgba(255,255,255,0.7)" }}>
              {t.link}
            </Link>
          </p>
        </div>
        <div className="flex gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={() => handleConsent("necessary")}
            className="flex-1 md:flex-initial px-5 py-2.5 text-sm tracking-wide transition-all duration-300 cursor-pointer"
            style={{
              color: "rgba(255,255,255,0.8)", fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.2)", borderRadius: "9999px",
              background: "transparent", letterSpacing: "0.03em",
            }}
          >
            {t.necessary}
          </button>
          <button
            onClick={() => handleConsent("all")}
            className="flex-1 md:flex-initial px-5 py-2.5 text-sm tracking-wide transition-all duration-300 cursor-pointer"
            style={{
              color: "#fff", fontWeight: 600,
              background: "linear-gradient(135deg, #F26522, #e3541a)",
              borderRadius: "9999px", border: "none",
              letterSpacing: "0.03em", boxShadow: "0 4px 14px rgba(242,101,34,0.3)",
            }}
          >
            {t.accept}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
