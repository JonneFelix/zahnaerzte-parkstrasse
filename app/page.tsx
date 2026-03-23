"use client";

import { useEffect } from "react";

const SUPPORTED_LOCALES = ["de", "en", "fr", "es"] as const;
const DEFAULT_LOCALE = "de";

/* Root-Seite: Erkennt die Browser-Sprache und leitet weiter.
   WICHTIG: Prüft zuerst ob man bereits auf einer Sprach-Route ist,
   um Endlos-Redirects zu vermeiden (JS-Chunk wird auf allen Seiten geladen). */
export default function RootRedirect() {
  useEffect(() => {
    /* Wenn wir bereits auf einer Sprach-Route sind, NICHTS tun! */
    const path = window.location.pathname;
    const firstSegment = path.split("/")[1];
    if (SUPPORTED_LOCALES.includes(firstSegment as typeof SUPPORTED_LOCALES[number])) {
      return; /* Bereits auf /de/, /en/, /fr/ oder /es/ — kein Redirect */
    }

    /* Nur auf Root / weiterleiten */
    if (path !== "/" && path !== "") {
      return;
    }

    /* 1. Gespeicherte Präferenz */
    try {
      const saved = localStorage.getItem("preferred-locale");
      if (saved && SUPPORTED_LOCALES.includes(saved as typeof SUPPORTED_LOCALES[number])) {
        window.location.replace(`/${saved}/`);
        return;
      }
    } catch { /* localStorage nicht verfügbar */ }

    /* 2. Browser-Sprache */
    const browserLangs = navigator.languages || [navigator.language];
    const matched = browserLangs
      .map((lang) => lang.split("-")[0].toLowerCase())
      .find((lang) => SUPPORTED_LOCALES.includes(lang as typeof SUPPORTED_LOCALES[number]));

    window.location.replace(`/${matched || DEFAULT_LOCALE}/`);
  }, []);

  return null;
}
