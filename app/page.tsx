"use client";

import { useEffect } from "react";

const SUPPORTED_LOCALES = ["de", "en", "fr", "es"] as const;
const DEFAULT_LOCALE = "de";

/* Root-Seite: Erkennt die Browser-Sprache und leitet weiter */
export default function RootRedirect() {
  useEffect(() => {
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

  /* Zeige nichts — der meta-refresh im Root-Layout leitet sofort nach /de/ weiter */
  return null;
}
