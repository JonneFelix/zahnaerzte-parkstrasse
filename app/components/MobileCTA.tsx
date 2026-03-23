"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { type Locale } from "../../lib/i18n";

export default function MobileCTA({ locale = "de" as Locale }: { locale?: Locale }) {
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSichtbar(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden
        transition-transform duration-300 ease-out
        ${sichtbar ? "translate-y-0" : "translate-y-full"}`}
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(105,123,123,0.1)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
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
          Anrufen
        </a>

        {/* Termin buchen */}
        <Link
          href={`/${locale}/termin`}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm text-white"
          style={{
            background: "linear-gradient(135deg, #F26522 0%, #e3541a 100%)",
            boxShadow: "0 4px 12px rgba(242,101,34,0.3)",
          }}
        >
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6.75 3v1.5M13.25 3v1.5M3 8.25h14M4.5 4.5h11a1.5 1.5 0 011.5 1.5v10a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16V6a1.5 1.5 0 011.5-1.5z" />
          </svg>
          Termin buchen
        </Link>
      </div>
    </div>
  );
}
