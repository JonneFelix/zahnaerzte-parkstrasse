import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "../../../../lib/i18n";
import { getArtikel, getAlleSlugs, getAlleArtikel } from "../../../../lib/zahnwissen";
import SeiteHero from "../../../components/SeiteHero";
import CTABanner from "../../../components/CTABanner";

/* Statische Pfade für alle Artikel in allen Sprachen */
export function generateStaticParams() {
  return getAlleSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const artikel = getArtikel(slug, locale as Locale);

  if (!artikel) return { title: "Artikel nicht gefunden" };

  return {
    title: artikel.titel,
    description: artikel.beschreibung,
    alternates: {
      canonical: `https://zahnaerzte-parkstrasse.de/${locale}/zahnwissen/${slug}`,
    },
  };
}

/* Einfacher Markdown→HTML Renderer (ohne externe Lib) */
function renderMarkdown(text: string): string {
  return text
    .trim()
    .split("\n\n")
    .map((absatz) => {
      if (absatz.startsWith("## ")) {
        return `<h2 style="font-family: var(--font-cormorant), serif; font-size: 1.75rem; font-weight: 500; color: #2d3a3a; margin-top: 2rem; margin-bottom: 0.75rem;">${absatz.slice(3)}</h2>`;
      }
      if (absatz.startsWith("### ")) {
        return `<h3 style="font-family: var(--font-cormorant), serif; font-size: 1.35rem; font-weight: 500; color: #2d3a3a; margin-top: 1.5rem; margin-bottom: 0.5rem;">${absatz.slice(4)}</h3>`;
      }
      /* Inline-Formatting: **fett** und *kursiv* */
      let html = absatz
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>");
      return `<p style="color: #5a6a6a; font-weight: 300; line-height: 1.8; margin-bottom: 1rem;">${html}</p>`;
    })
    .join("\n");
}

const uiTexts: Record<string, { zurueck: string; von: string; weitereLesen: string }> = {
  de: { zurueck: "← Zurück zum Zahnwissen", von: "von", weitereLesen: "Weitere Artikel" },
  en: { zurueck: "← Back to Dental Knowledge", von: "by", weitereLesen: "More articles" },
  fr: { zurueck: "← Retour au Savoir dentaire", von: "par", weitereLesen: "Plus d'articles" },
  es: { zurueck: "← Volver al Conocimiento dental", von: "por", weitereLesen: "Más artículos" },
};

export default async function ArtikelSeite({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const artikel = getArtikel(slug, locale as Locale);
  const ui = uiTexts[locale] || uiTexts.de;

  if (!artikel) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f4f1ec" }}>
        <p style={{ color: "#697B7B" }}>Artikel nicht gefunden.</p>
      </div>
    );
  }

  /* Verwandte Artikel (gleiche Kategorie, max 3) */
  const alle = getAlleArtikel(locale as Locale);
  const verwandte = alle
    .filter((a) => a.slug !== slug && a.kategorie === artikel.kategorie)
    .slice(0, 3);

  return (
    <>
      <SeiteHero
        label={artikel.kategorie}
        titel={artikel.titel}
        titelAkzent=""
        subtext={artikel.beschreibung}
      />

      <section className="relative py-14 lg:py-24 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          {/* Zurück-Link */}
          <Link
            href={`/${locale}/zahnwissen`}
            className="inline-flex items-center gap-2 mb-8 text-sm transition-colors duration-300 hover:text-[#F26522]"
            style={{ color: "#697B7B", fontWeight: 400 }}
          >
            {ui.zurueck}
          </Link>

          {/* Meta */}
          <div className="mb-8 text-sm" style={{ color: "#8a9a9a" }}>
            {artikel.datum} · {ui.von} {artikel.autor}
          </div>

          {/* Tags */}
          {artikel.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {artikel.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs tracking-wider"
                  style={{
                    color: "#697B7B",
                    background: "rgba(105,123,123,0.06)",
                    borderRadius: "999px",
                    fontWeight: 400,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Artikel-Inhalt */}
          <div
            className="artikel-inhalt"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(artikel.inhalt) }}
          />

          {/* Verwandte Artikel */}
          {verwandte.length > 0 && (
            <div className="mt-16 pt-8" style={{ borderTop: "1px solid rgba(105,123,123,0.1)" }}>
              <h3
                className="text-xl mb-6"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  color: "#2d3a3a",
                }}
              >
                {ui.weitereLesen}
              </h3>
              <div className="space-y-4">
                {verwandte.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/${locale}/zahnwissen/${a.slug}`}
                    className="block p-4 transition-all duration-300 hover:bg-white/60"
                    style={{
                      borderRadius: "12px",
                      border: "1px solid rgba(105,123,123,0.07)",
                    }}
                  >
                    <h4 className="text-base mb-1" style={{ fontWeight: 500, color: "#2d3a3a" }}>
                      {a.titel}
                    </h4>
                    <p className="text-sm line-clamp-2" style={{ color: "#5a6a6a", fontWeight: 300 }}>
                      {a.beschreibung}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
