"use client";

import { useEffect, useState } from "react";

const SUPPORTED_LOCALES = ["de", "en", "fr", "es"] as const;
const DEFAULT_LOCALE = "de";

export default function RootPage() {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (redirecting) return;
    setRedirecting(true);

    /* 1. Gespeicherte Präferenz prüfen */
    const saved = localStorage.getItem("preferred-locale");
    if (saved && SUPPORTED_LOCALES.includes(saved as typeof SUPPORTED_LOCALES[number])) {
      window.location.replace(`/${saved}/`);
      return;
    }

    /* 2. Browser-Sprache erkennen */
    const browserLangs = navigator.languages || [navigator.language];
    const matched = browserLangs
      .map((lang) => lang.split("-")[0].toLowerCase())
      .find((lang) => SUPPORTED_LOCALES.includes(lang as typeof SUPPORTED_LOCALES[number]));

    const targetLocale = matched || DEFAULT_LOCALE;
    window.location.replace(`/${targetLocale}/`);
  }, [redirecting]);

  return null;
}
