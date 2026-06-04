import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type Locale } from "./i18n";

const CONTENT_DIR = path.join(process.cwd(), "content/zahnwissen");

export interface ZahnwissenArtikel {
  slug: string;
  titel: string;
  beschreibung: string;
  kategorie: string;
  datum: string;
  autor: string;
  bild?: string;
  pillar?: string;
  translationKey?: string;
  tags: string[];
  locale: string;
  inhalt: string;
}

/* Alle Artikel für eine Sprache laden */
export function getAlleArtikel(locale: Locale): ZahnwissenArtikel[] {
  const localeDir = path.join(CONTENT_DIR, locale);

  if (!fs.existsSync(localeDir)) return [];

  const dateien = fs.readdirSync(localeDir).filter((f) => f.endsWith(".md"));

  return dateien
    .map((datei) => {
      const slug = datei.replace(".md", "");
      const inhalt = fs.readFileSync(path.join(localeDir, datei), "utf-8");
      const { data, content } = matter(inhalt);

      return {
        slug,
        titel: data.titel || data.title || slug,
        beschreibung: data.beschreibung || data.description || "",
        kategorie: data.kategorie || data.category || "Allgemein",
        datum: data.datum || data.date || "",
        autor: data.autor || data.author || "Dr. Claudia Schwegmann",
        bild: data.bild || data.image || undefined,
        pillar: data.pillar || undefined,
        translationKey: data.translationKey || undefined,
        tags: data.tags || [],
        locale,
        inhalt: content,
      };
    })
    .sort((a, b) => (b.datum > a.datum ? 1 : -1));
}

/* Einzelnen Artikel laden */
export function getArtikel(slug: string, locale: Locale): ZahnwissenArtikel | null {
  const dateiPfad = path.join(CONTENT_DIR, locale, `${slug}.md`);

  if (!fs.existsSync(dateiPfad)) return null;

  const inhalt = fs.readFileSync(dateiPfad, "utf-8");
  const { data, content } = matter(inhalt);

  return {
    slug,
    titel: data.titel || data.title || slug,
    beschreibung: data.beschreibung || data.description || "",
    kategorie: data.kategorie || data.category || "Allgemein",
    datum: data.datum || data.date || "",
    autor: data.autor || data.author || "Dr. Claudia Schwegmann",
    bild: data.bild || data.image || undefined,
    pillar: data.pillar || undefined,
    translationKey: data.translationKey || undefined,
    tags: data.tags || [],
    locale,
    inhalt: content,
  };
}

/* Alle Slugs für generateStaticParams */
export function getAlleSlugs(): { locale: string; slug: string }[] {
  const ergebnis: { locale: string; slug: string }[] = [];

  for (const locale of ["de", "en", "fr", "es"]) {
    const localeDir = path.join(CONTENT_DIR, locale);
    if (!fs.existsSync(localeDir)) continue;

    const dateien = fs.readdirSync(localeDir).filter((f) => f.endsWith(".md"));
    for (const datei of dateien) {
      ergebnis.push({ locale, slug: datei.replace(".md", "") });
    }
  }

  return ergebnis;
}

/* Alle einzigartigen Tags über alle Sprachen */
export function getAlleTags(locale: Locale): string[] {
  const artikel = getAlleArtikel(locale);
  const tags = new Set<string>();
  artikel.forEach((a) => a.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

/* Alternate-Slugs eines Artikels über alle Sprachen (für hreflang + Sprachwechsel) */
export function getArtikelAlternates(translationKey?: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!translationKey) return result;
  for (const loc of ["de", "en", "fr", "es"] as Locale[]) {
    const match = getAlleArtikel(loc).find((a) => a.translationKey === translationKey);
    if (match) result[loc] = match.slug;
  }
  return result;
}
