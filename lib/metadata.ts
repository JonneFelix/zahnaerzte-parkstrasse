import type { Metadata } from "next";

const BASE_URL = "https://www.zahnarzt-othmarschen.de";

/**
 * Erzeugt seitenspezifische Metadata mit korrektem Canonical und hreflang.
 */
export function createMetadata(
  locale: string,
  path: string,
  meta: Record<string, string>
): Metadata {
  const fullPath = `/${locale}${path ? `/${path}` : ""}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}${fullPath}/`,
      languages: {
        de: `${BASE_URL}/de${path ? `/${path}` : ""}/`,
        en: `${BASE_URL}/en${path ? `/${path}` : ""}/`,
        fr: `${BASE_URL}/fr${path ? `/${path}` : ""}/`,
        es: `${BASE_URL}/es${path ? `/${path}` : ""}/`,
        "x-default": `${BASE_URL}/de${path ? `/${path}` : ""}/`,
      },
    },
  };
}
