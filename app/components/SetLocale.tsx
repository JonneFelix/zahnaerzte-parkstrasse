"use client";

import { useEffect } from "react";

/* Setzt das html lang-Attribut client-seitig auf die aktuelle Sprache */
export default function SetLocale({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
