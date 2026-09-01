"use client";

import { openOrb } from "../../lib/heydent";

/**
 * Client-Button für Server-Komponenten (z.B. CTABanner), der die
 * Online-Terminbuchung öffnet. Optik identisch zum bisherigen CTA-Link.
 * Ein externer `href` (http/https) wird als normaler Link gerendert.
 */
export default function OrbCTAButton({
  label,
  locale = "de",
  href,
  className: classNameProp,
}: {
  label: string;
  locale?: string;
  href?: string;
  /* Überschreibt die Layout-Klassen (Abstände/Padding), Farbe/Form bleiben */
  className?: string;
}) {
  const isExternal = !!href && /^https?:/.test(href);

  const className =
    classNameProp ??
    "cta-schimmer group inline-flex items-center gap-3 mt-8 px-10 py-4 text-sm tracking-wider transition-all duration-500 cursor-pointer";
  const style: React.CSSProperties = {
    fontWeight: 600,
    color: "#fff",
    background: "linear-gradient(135deg, #F26522, #e3541a)",
    borderRadius: "9999px",
    letterSpacing: "0.12em",
    boxShadow: "0 8px 28px rgba(242, 101, 34, 0.3)",
    border: "none",
  };

  const inner = (
    <>
      {label}
      <svg
        viewBox="0 0 20 20"
        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      >
        <path d="M4 10h12M11 5l5 5-5 5" />
      </svg>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} className={className} style={style}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={() => openOrb(locale)} className={className} style={style}>
      {inner}
    </button>
  );
}
