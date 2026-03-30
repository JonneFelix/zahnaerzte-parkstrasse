import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../components/SeiteHero";
import SektionsHeader from "../../components/SektionsHeader";
import CTABanner from "../../components/CTABanner";
import { getDictionary, type Locale } from "../../../lib/i18n";
import { createMetadata } from "../../../lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Wissenswertes as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return createMetadata(locale, "wissenswertes", meta);
}

const artikelLinks: Record<string, string> = {
  angst: "/leistungen/prophylaxe",
  implantate: "/leistungen/implantate",
  kinderzaehne: "/leistungen/kinderzahnheilkunde",
  zahnschmerzen: "/leistungen/wurzelbehandlung",
  parodontose: "/leistungen/parodontologie",
  wurzelbehandlung: "/leistungen/wurzelbehandlung",
};

export default async function WissenswertesSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Wissenswertes as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const artikelData = t.artikel as Record<string, Record<string, string>>;
  const mehrErfahren = t.mehrErfahren as string;
  const fortbildungenHinweis = t.fortbildungenHinweis as Record<string, string>;
  const cta = t.cta as Record<string, string>;

  const artikelKeys = ["angst", "implantate", "kinderzaehne", "zahnschmerzen", "parodontose", "wurzelbehandlung"];
  const artikel = artikelKeys.map((key) => ({
    titel: artikelData[key].titel,
    kategorie: artikelData[key].kategorie,
    kurz: artikelData[key].kurz,
    leistung: artikelLinks[key],
  }));

  return (
    <>
      <SeiteHero
        label={hero.label}
        titel={hero.titel}
        titelAkzent={hero.titelAkzent}
        subtext={hero.subtext}
      />

      {/* Artikel-Grid */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {artikel.map((a, i) => (
              <div
                key={a.titel}
                className={`karte-hover p-7 anim-einblenden d${Math.min(i + 2, 8)}`}
                style={{
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "22px",
                  border: "1px solid rgba(105,123,123,0.07)",
                }}
              >
                <span
                  className="text-xs tracking-wider uppercase"
                  style={{
                    color: "#F26522",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                  }}
                >
                  {a.kategorie}
                </span>
                <h3
                  className="text-lg mt-2 mb-3"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 600,
                    color: "#2d3a3a",
                  }}
                >
                  {a.titel}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{
                    color: "#6a7a7a",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {a.kurz}
                </p>
                <Link
                  href={a.leistung}
                  className="inline-flex items-center gap-1.5 text-sm transition-colors duration-300 hover:text-[#e3541a]"
                  style={{ color: "#F26522", fontWeight: 500 }}
                >
                  {mehrErfahren}
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3.5 h-3.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hinweis Fortbildungen */}
      <section className="relative py-16 lg:py-20 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <div
            className="p-8 karte-hover"
            style={{
              background: "rgba(255,255,255,0.6)",
              borderRadius: "22px",
              border: "1px solid rgba(105,123,123,0.07)",
            }}
          >
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "#697B7B", fontWeight: 600, letterSpacing: "0.2em" }}
            >
              {fortbildungenHinweis.label}
            </span>
            <h3
              className="text-xl mt-3 mb-3"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 600,
                color: "#2d3a3a",
              }}
            >
              {fortbildungenHinweis.titel}
            </h3>
            <p className="text-sm mb-5" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.8 }}>
              {fortbildungenHinweis.text}
            </p>
            <Link
              href={`/${locale}/fortbildungen`}
              className="inline-flex items-center gap-2 text-sm transition-colors duration-300 hover:text-[#e3541a]"
              style={{ color: "#F26522", fontWeight: 600 }}
            >
              {fortbildungenHinweis.link}
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        titel={cta.titel}
        titelAkzent={cta.titelAkzent}
        text={cta.text}
      />
    </>
  );
}
