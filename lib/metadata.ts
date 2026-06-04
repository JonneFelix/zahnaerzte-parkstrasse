import type { Metadata } from "next";

const BASE_URL = "https://www.zahnarzt-othmarschen.de";

const OG_LOCALES: Record<string, string> = {
  de: "de_DE",
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

/**
 * Erzeugt seitenspezifische Metadata mit korrektem Canonical und hreflang.
 */
export function createMetadata(
  locale: string,
  path: string,
  meta: Record<string, string>,
  opts?: { alternatePaths?: Record<string, string>; image?: string }
): Metadata {
  const fullPath = `/${locale}${path ? `/${path}` : ""}`;
  const url = `${BASE_URL}${fullPath}/`;

  // hreflang: bei übersetzten Slugs (z.B. Zahnwissen-Artikel) echte Alternate-Pfade pro Sprache nutzen
  const hasAlt = opts?.alternatePaths && Object.keys(opts.alternatePaths).length > 0;
  const languages: Record<string, string> = hasAlt
    ? Object.fromEntries(
        Object.entries(opts!.alternatePaths!).map(([loc, p]) => [loc, `${BASE_URL}/${loc}/${p}/`])
      )
    : {
        de: `${BASE_URL}/de${path ? `/${path}` : ""}/`,
        en: `${BASE_URL}/en${path ? `/${path}` : ""}/`,
        fr: `${BASE_URL}/fr${path ? `/${path}` : ""}/`,
        es: `${BASE_URL}/es${path ? `/${path}` : ""}/`,
      };
  languages["x-default"] = languages.de || url;

  // Seitenspezifisches OG-Bild (z.B. Artikel), sonst das Praxisbild
  const ogImages = opts?.image
    ? [{ url: opts.image, alt: meta.title }]
    : [
        {
          url: "/images/praxis-mit-logo.jpg",
          width: 1200,
          height: 630,
          alt: "Zahnärzte Parkstrasse Othmarschen — Zahnarztpraxis in Hamburg",
        },
      ];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages,
    },
    // Seitenspezifisches OpenGraph/Twitter, sonst erben alle Unterseiten die Startseiten-Werte aus dem Layout
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: "Zahnärzte Parkstrasse Othmarschen",
      locale: OG_LOCALES[locale] || "de_DE",
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [opts?.image || "/images/praxis-mit-logo.jpg"],
    },
  };
}
