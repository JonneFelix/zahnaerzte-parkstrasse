"use client";

import { useEffect, useRef, useState } from "react";
import { type Locale } from "../../lib/i18n";
import { openOrb, hasHeydentConsent } from "../../lib/heydent";

/*
 * Lokale Ruhezustands-Karte für Besucher OHNE HeyDent-Einwilligung.
 *
 * Das echte Widget (embed-orb.js) darf erst nach Einwilligung laden — bis dahin
 * gäbe es unten rechts gar keinen Buchungs-Einstieg. Diese Karte kopiert Position
 * und Geometrie des HeyDent-v3-Ruhezustands (Desktop: rechts unten, 74 px hoch;
 * Handy ≤520px: volle Breite, schrumpft beim Herunterscrollen zum Kreis), lädt
 * aber nichts von Dritten. Klick löst den bestehenden Consent-Dialog aus
 * (HeydentOrb); nach erteilter Einwilligung übernimmt das echte Widget nahtlos
 * dieselbe Stelle und die Karte verschwindet.
 */

const texts: Record<string, { titel: string; sub: string }> = {
  de: { titel: "Termin online buchen", sub: "Rund um die Uhr · in 2 Minuten" },
  en: { titel: "Book online", sub: "Around the clock · in 2 minutes" },
  fr: { titel: "Rendez-vous en ligne", sub: "24 h/24 · en 2 minutes" },
  es: { titel: "Pedir cita online", sub: "A cualquier hora · en 2 minutos" },
};

export default function OrbPlatzhalter({ locale = "de" as Locale }: { locale?: Locale }) {
  /* Erst nach Mount entscheiden — bei bestehender Einwilligung rendert sonst
     kurz eine zweite Karte neben dem echten Widget. */
  const [sichtbar, setSichtbar] = useState(false);
  const [klein, setKlein] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    setSichtbar(!hasHeydentConsent());

    /* Einwilligung erteilt (Banner „Alle akzeptieren" oder Consent-Dialog):
       das echte Widget lädt, die Karte räumt das Feld. */
    const onCookieConsent = (e: Event) => {
      if ((e as CustomEvent).detail === "all") setSichtbar(false);
    };
    const onHeydentConsent = () => setSichtbar(false);
    /* Script trotz Einwilligung nicht ladbar (Blocker, Netz): Karte zurückholen,
       damit der Buchungseinstieg samt /termin-Fallback erhalten bleibt. */
    const onOrbUnavailable = () => setSichtbar(true);
    /* Einwilligung in einem anderen Tab erteilt/widerrufen */
    const onStorage = (e: StorageEvent) => {
      if (e.key === "heydent-consent") setSichtbar(e.newValue !== "granted");
    };
    window.addEventListener("consent-changed", onCookieConsent);
    window.addEventListener("heydent-consent-changed", onHeydentConsent);
    window.addEventListener("heydent:orb-unavailable", onOrbUnavailable);
    window.addEventListener("storage", onStorage);

    /* Scroll-Verhalten wie beim echten Widget: runter → Kreis, hoch → Karte.
       Nur ≤520px relevant — oberhalb spart der Frühausstieg die Re-Renders. */
    const schmal = window.matchMedia("(max-width: 520px)");
    lastY.current = window.pageYOffset || 0;
    const onScroll = () => {
      if (!schmal.matches) return;
      const y = window.pageYOffset || 0;
      const delta = y - lastY.current;
      if (Math.abs(delta) < 12) return;
      lastY.current = y;
      setKlein(delta > 0 && y > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("consent-changed", onCookieConsent);
      window.removeEventListener("heydent-consent-changed", onHeydentConsent);
      window.removeEventListener("heydent:orb-unavailable", onOrbUnavailable);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!sichtbar) return null;

  const t = texts[locale] || texts.de;

  return (
    <div className={`orb-ph${klein ? " orb-ph--klein" : ""}`}>
      <button
        type="button"
        className="orb-ph-card"
        aria-label={t.titel}
        onClick={() => {
          /* Einwilligung kam z.B. aus einem anderen Tab, ohne dass hier ein
             Event ankam: Karte sofort räumen, sonst liegt das echte Widget
             gleich doppelt darüber. */
          if (hasHeydentConsent()) setSichtbar(false);
          openOrb(locale);
        }}
      >
        <span className="orb-ph-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3.7c-1.7 0-2.3.9-3.9.9C5.8 4.6 4.7 6.4 4.9 9c.2 2.6 1.1 4.8 1.9 7.3.6 1.7 1 3.1 1.9 3.1 1.1 0 1.2-2.1 1.6-3.7.3-1.2.6-1.7 1.7-1.7s1.4.5 1.7 1.7c.4 1.6.5 3.7 1.6 3.7.9 0 1.3-1.4 1.9-3.1.8-2.5 1.7-4.7 1.9-7.3.2-2.6-.9-4.4-3.2-4.4-1.6 0-2.2-.9-3.9-.9Z" />
          </svg>
        </span>
        <span className="orb-ph-txt">
          <b>{t.titel}</b>
          <span>{t.sub}</span>
        </span>
        <span className="orb-ph-chev" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="m9.5 5 7 7-7 7" />
          </svg>
        </span>
      </button>
      <style>{`
        .orb-ph {
          position: fixed; right: 26px; bottom: 26px; z-index: 30;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
        }
        .orb-ph-card {
          display: flex; align-items: center; gap: 13px; min-height: 74px;
          padding: 10px 14px 10px 10px; background: #fff;
          border: 1px solid rgba(27,24,21,.12); border-radius: 16px;
          cursor: pointer; text-align: left; font: inherit; color: #1B1815;
          box-shadow: 0 16px 36px -14px rgba(30,20,14,.42), 0 2px 6px rgba(30,20,14,.08);
        }
        .orb-ph-card:focus-visible { outline: 3px solid #F26522; outline-offset: 3px; }
        .orb-ph-mark {
          width: 52px; height: 52px; flex: none; border-radius: 12px;
          background: #F26522; color: #fff; display: grid; place-items: center;
        }
        .orb-ph-txt { line-height: 1.3; padding-right: 2px; min-width: 0; }
        .orb-ph-txt b { display: block; font-size: 17px; font-weight: 600; letter-spacing: -.005em; white-space: nowrap; }
        .orb-ph-txt > span { display: block; font-size: 13.5px; color: #6B635C; margin-top: 3px; white-space: nowrap; }
        .orb-ph-chev {
          width: 34px; height: 34px; flex: none; border-radius: 50%;
          background: #FEF0E9; color: #F26522; display: grid; place-items: center;
        }
        .orb-ph-card:hover .orb-ph-chev { background: #F26522; color: #fff; }
        @media (max-width: 520px) {
          .orb-ph { left: 16px; right: 16px; bottom: 16px; display: flex; justify-content: flex-end; }
          .orb-ph-card { width: 100%; overflow: hidden; }
          .orb-ph--klein .orb-ph-card { width: 56px; min-height: 56px; padding: 2px; border-radius: 50%; justify-content: center; gap: 0; }
          .orb-ph--klein .orb-ph-txt, .orb-ph--klein .orb-ph-chev { opacity: 0; }
          .orb-ph--klein .orb-ph-mark { width: 50px; height: 50px; border-radius: 50%; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .orb-ph-card { transition: transform .18s ease, box-shadow .18s ease; }
          .orb-ph-card:hover { transform: translateY(-2px); box-shadow: 0 22px 44px -16px rgba(30,20,14,.48); }
          @media (max-width: 520px) {
            .orb-ph-card { transition: width .26s cubic-bezier(.2,.8,.2,1), padding .26s cubic-bezier(.2,.8,.2,1), border-radius .26s ease; }
            .orb-ph-txt, .orb-ph-chev { transition: opacity .16s ease; }
            .orb-ph-mark { transition: width .26s cubic-bezier(.2,.8,.2,1), height .26s cubic-bezier(.2,.8,.2,1), border-radius .26s ease; }
          }
        }
      `}</style>
    </div>
  );
}
