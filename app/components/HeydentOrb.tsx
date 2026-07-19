"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  HEYDENT_BASE,
  HEYDENT_SLUG,
  grantHeydentConsent,
  hasHeydentConsent,
} from "../../lib/heydent";

/* Consent-Dialog-Texte (ausdrückliche Einwilligung vor dem ersten Laden) */
const dialogTexts: Record<
  string,
  { titel: string; hinweis: string; button: string; ablehnen: string; mehr: string }
> = {
  de: {
    titel: "Online-Terminbuchung",
    hinweis:
      "Beim Öffnen wird eine Verbindung zu unserem Dienstleister HeyDent hergestellt; dabei werden Daten (u.a. Ihre IP-Adresse) übertragen. Alternativ erreichen Sie uns telefonisch unter 040 880 21 50.",
    button: "Zustimmen & öffnen",
    ablehnen: "Abbrechen",
    mehr: "Datenschutzerklärung",
  },
  en: {
    titel: "Online appointment booking",
    hinweis:
      "Opening the tool establishes a connection to our service provider HeyDent; data (including your IP address) is transmitted. Alternatively, you can reach us by phone at +49 40 880 21 50.",
    button: "Agree & open",
    ablehnen: "Cancel",
    mehr: "Privacy policy",
  },
  fr: {
    titel: "Prise de rendez-vous en ligne",
    hinweis:
      "L'ouverture de l'outil établit une connexion avec notre prestataire HeyDent ; des données (dont votre adresse IP) sont transmises. Vous pouvez aussi nous joindre par téléphone au 040 880 21 50.",
    button: "Accepter et ouvrir",
    ablehnen: "Annuler",
    mehr: "Confidentialité",
  },
  es: {
    titel: "Reserva de citas en línea",
    hinweis:
      "Al abrir la herramienta se establece una conexión con nuestro proveedor HeyDent; se transmiten datos (incluida su dirección IP). También puede contactarnos por teléfono en el 040 880 21 50.",
    button: "Aceptar y abrir",
    ablehnen: "Cancelar",
    mehr: "Privacidad",
  },
};

/* Nach dieser Zeit ohne bereite App wird auf die Buchungsseite ausgewichen */
const READY_TIMEOUT_MS = 9000;

/**
 * Globale Steuerung des HeyDent-Orb-Widgets. Bindet `embed-orb.js` erst nach
 * Einwilligung ein, zeigt bei Bedarf einen Consent-Dialog und öffnet den Orb
 * über die Host-API `window.HeyDent.open()`. Fällt zurück auf /{locale}/termin,
 * wenn das Script nicht geladen werden kann.
 */
export default function HeydentOrb({ locale = "de" }: { locale?: string }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const localeRef = useRef(locale);
  const appReadyRef = useRef(false);
  const pendingOpenRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = dialogTexts[dialogOpen ? localeRef.current : locale] || dialogTexts.de;

  const navigateToTermin = useCallback((loc: string) => {
    window.location.href = `/${loc}/termin`;
  }, []);

  /* Orb-Loader-Script einmalig einbinden (idempotent) */
  const injectScript = useCallback(() => {
    if (document.querySelector("script[data-heydent-orb]")) return;
    const script = document.createElement("script");
    script.src = `${HEYDENT_BASE}/embed-orb.js`;
    script.async = true;
    script.setAttribute("data-slug", HEYDENT_SLUG);
    script.setAttribute("data-heydent-orb", "");
    script.onerror = () => {
      /* Script nicht ladbar — falls Öffnen angefragt war, auf /termin ausweichen */
      if (pendingOpenRef.current) {
        pendingOpenRef.current = false;
        if (timerRef.current) clearTimeout(timerRef.current);
        navigateToTermin(localeRef.current);
      }
    };
    document.body.appendChild(script);
  }, [navigateToTermin]);

  const heydentOpen = useCallback((): boolean => {
    const api = (window as unknown as { HeyDent?: { open?: () => void } }).HeyDent;
    if (api && typeof api.open === "function") {
      api.open();
      return true;
    }
    return false;
  }, []);

  /* Orb öffnen — sofort wenn App bereit, sonst auf heydent:ready warten */
  const openWhenReady = useCallback(
    (loc: string) => {
      localeRef.current = loc;
      injectScript();

      if (appReadyRef.current && heydentOpen()) return;

      pendingOpenRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (!pendingOpenRef.current) return;
        pendingOpenRef.current = false;
        /* Letzter Versuch, sonst Buchungsseite */
        if (!heydentOpen()) navigateToTermin(loc);
      }, READY_TIMEOUT_MS);
    },
    [heydentOpen, injectScript, navigateToTermin],
  );

  /* App-Bereitschaft aus dem Orb-iframe empfangen + ausstehendes Öffnen bedienen */
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== HEYDENT_BASE) return;
      if (!e.data || typeof e.data.type !== "string") return;
      if (e.data.type === "heydent:ready") {
        appReadyRef.current = true;
        if (pendingOpenRef.current) {
          pendingOpenRef.current = false;
          if (timerRef.current) clearTimeout(timerRef.current);
          heydentOpen();
        }
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [heydentOpen]);

  /* Bei vorhandener Einwilligung Orb direkt laden; auf Einwilligungs-Events hören */
  useEffect(() => {
    if (hasHeydentConsent()) injectScript();

    function onCookieConsent(e: Event) {
      if ((e as CustomEvent).detail === "all") injectScript();
    }
    function onHeydentConsent() {
      injectScript();
    }
    window.addEventListener("consent-changed", onCookieConsent);
    window.addEventListener("heydent-consent-changed", onHeydentConsent);
    return () => {
      window.removeEventListener("consent-changed", onCookieConsent);
      window.removeEventListener("heydent-consent-changed", onHeydentConsent);
    };
  }, [injectScript]);

  /* Öffnen-Wunsch der CTAs: direkt öffnen oder Consent-Dialog zeigen */
  useEffect(() => {
    function onRequestOpen(e: Event) {
      const loc = ((e as CustomEvent).detail?.locale as string) || locale;
      localeRef.current = loc;
      if (hasHeydentConsent()) {
        openWhenReady(loc);
      } else {
        setDialogOpen(true);
      }
    }
    window.addEventListener("heydent:request-open", onRequestOpen);
    return () => window.removeEventListener("heydent:request-open", onRequestOpen);
  }, [locale, openWhenReady]);

  /* Aufräumen des Timers beim Unmount */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function acceptDialog() {
    grantHeydentConsent();
    setDialogOpen(false);
    openWhenReady(localeRef.current);
  }

  if (!dialogOpen) return null;

  const datenschutzHref = `/${localeRef.current}/datenschutz`;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ background: "rgba(26, 36, 36, 0.55)", backdropFilter: "blur(6px)" }}
      onClick={() => setDialogOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label={t.titel}
    >
      <div
        className="w-full max-w-md p-7 md:p-8 text-center animate-orb-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#f4f1ec",
          borderRadius: "24px",
          border: "1px solid rgba(105, 123, 123, 0.12)",
          boxShadow: "0 28px 70px -14px rgba(26, 36, 36, 0.45)",
        }}
      >
        <div
          className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full"
          style={{ background: "rgba(242, 101, 34, 0.09)" }}
        >
          <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="#F26522" strokeWidth="1.5">
            <path d="M6.75 3v1.5M13.25 3v1.5M3 8.25h14M4.5 4.5h11a1.5 1.5 0 011.5 1.5v10a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16V6a1.5 1.5 0 011.5-1.5z" />
          </svg>
        </div>
        <h3
          className="text-2xl mb-3"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontWeight: 600,
            color: "#2d3a3a",
          }}
        >
          {t.titel}
        </h3>
        <p
          className="text-sm mb-2"
          style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.7 }}
        >
          {t.hinweis}
        </p>
        <Link
          href={datenschutzHref}
          className="inline-block text-xs mb-6 underline transition-colors duration-300 hover:text-[#F26522]"
          style={{ color: "#8a9a9a" }}
          onClick={() => setDialogOpen(false)}
        >
          {t.mehr}
        </Link>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => setDialogOpen(false)}
            className="flex-1 px-5 py-3 text-sm tracking-wide transition-all duration-300 cursor-pointer"
            style={{
              color: "#4a5959",
              fontWeight: 500,
              border: "1px solid rgba(105, 123, 123, 0.22)",
              borderRadius: "9999px",
              background: "transparent",
              letterSpacing: "0.03em",
            }}
          >
            {t.ablehnen}
          </button>
          <button
            type="button"
            onClick={acceptDialog}
            className="cta-schimmer flex-1 px-5 py-3 text-sm tracking-wide transition-all duration-300 cursor-pointer"
            style={{
              color: "#fff",
              fontWeight: 600,
              background: "linear-gradient(135deg, #F26522, #e3541a)",
              borderRadius: "9999px",
              border: "none",
              letterSpacing: "0.03em",
              boxShadow: "0 8px 24px rgba(242, 101, 34, 0.3)",
            }}
          >
            {t.button}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes orbDialog {
          from { transform: translateY(14px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-orb-dialog { animation: orbDialog 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
