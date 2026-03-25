import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getDictionary, type Locale } from "../../../lib/i18n";
import { getAlleArtikel } from "../../../lib/zahnwissen";
import SeiteHero from "../../components/SeiteHero";

const metaTexts: Record<string, { title: string; description: string }> = {
  de: { title: "Zahnwissen — Artikel rund um Zahngesundheit", description: "Zahnwissen: Informative Artikel rund um Zahngesundheit, Behandlungen und Vorsorge. Von den Zahnärzten Parkstrasse Othmarschen." },
  en: { title: "Dental Knowledge — Articles about dental health", description: "Dental Knowledge: Informative articles about dental health, treatments and prevention. From Zahnärzte Parkstrasse Othmarschen." },
  fr: { title: "Savoir dentaire — Articles sur la santé dentaire", description: "Savoir dentaire : Articles informatifs sur la santé dentaire, les traitements et la prévention. Par Zahnärzte Parkstrasse Othmarschen." },
  es: { title: "Conocimiento dental — Artículos sobre salud dental", description: "Conocimiento dental: Artículos informativos sobre salud dental, tratamientos y prevención. De Zahnärzte Parkstrasse Othmarschen." },
};

const heroTexts: Record<string, { label: string; titel: string; akzent: string; subtext: string }> = {
  de: { label: "Zahnwissen", titel: "Wissen für", akzent: "Ihre Zahngesundheit", subtext: "Informative Artikel rund um Zahnmedizin, Vorsorge und moderne Behandlungsmethoden." },
  en: { label: "Dental Knowledge", titel: "Knowledge for", akzent: "your dental health", subtext: "Informative articles about dentistry, prevention and modern treatment methods." },
  fr: { label: "Savoir dentaire", titel: "Savoir pour", akzent: "votre santé dentaire", subtext: "Articles informatifs sur la dentisterie, la prévention et les méthodes de traitement modernes." },
  es: { label: "Conocimiento dental", titel: "Conocimiento para", akzent: "su salud dental", subtext: "Artículos informativos sobre odontología, prevención y métodos de tratamiento modernos." },
};

const uiTexts: Record<string, { lesenMehr: string; keinArtikel: string; von: string }> = {
  de: { lesenMehr: "Weiterlesen", keinArtikel: "Noch keine Artikel vorhanden. Schauen Sie bald wieder vorbei!", von: "von" },
  en: { lesenMehr: "Read more", keinArtikel: "No articles yet. Check back soon!", von: "by" },
  fr: { lesenMehr: "Lire la suite", keinArtikel: "Aucun article pour le moment. Revenez bientôt !", von: "par" },
  es: { lesenMehr: "Leer más", keinArtikel: "Aún no hay artículos. ¡Vuelva pronto!", von: "por" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = metaTexts[locale] || metaTexts.de;
  return { title: m.title, description: m.description };
}

export default async function ZahnwissenSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const artikel = getAlleArtikel(locale as Locale);
  const hero = heroTexts[locale] || heroTexts.de;
  const ui = uiTexts[locale] || uiTexts.de;

  return (
    <>
      <SeiteHero label={hero.label} titel={hero.titel} titelAkzent={hero.akzent} subtext={hero.subtext} />

      <section className="relative py-14 lg:py-32 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          {artikel.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg" style={{ color: "#697B7B", fontWeight: 300 }}>{ui.keinArtikel}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artikel.map((a) => (
                <Link
                  key={a.slug}
                  href={`/${locale}/zahnwissen/${a.slug}`}
                  className="group block transition-all duration-300 hover:translate-y-[-2px]"
                >
                  <article
                    className="h-full flex flex-col overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      borderRadius: "18px",
                      border: "1px solid rgba(105,123,123,0.07)",
                      boxShadow: "0 4px 16px rgba(105,123,123,0.06)",
                    }}
                  >
                    {a.bild && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <Image
                          src={a.bild}
                          alt={a.titel}
                          width={600}
                          height={338}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-6">
                      <span
                        className="inline-block px-3 py-1 text-xs tracking-wider uppercase mb-3"
                        style={{
                          color: "#F26522",
                          background: "rgba(242,101,34,0.08)",
                          borderRadius: "999px",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                        }}
                      >
                        {a.kategorie}
                      </span>
                      <h2
                        className="text-xl mb-2"
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontWeight: 500,
                          color: "#2d3a3a",
                        }}
                      >
                        {a.titel}
                      </h2>
                      <p
                        className="text-sm mb-4 line-clamp-3"
                        style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.7 }}
                      >
                        {a.beschreibung}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs" style={{ color: "#8a9a9a" }}>
                          {a.datum} · {ui.von} {a.autor}
                        </span>
                        <span
                          className="text-sm transition-colors duration-300 group-hover:text-[#F26522]"
                          style={{ color: "#697B7B", fontWeight: 500 }}
                        >
                          {ui.lesenMehr} →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
