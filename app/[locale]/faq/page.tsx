import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../components/SeiteHero";
import SektionsHeader from "../../components/SektionsHeader";
import CTABanner from "../../components/CTABanner";
import { getDictionary, type Locale } from "../../../lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.FAQ as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return { title: meta.title, description: meta.description };
}

const faqLinks: Record<string, string | undefined> = {
  wurzelbehandlung: "/leistungen/wurzelbehandlung",
  implantate: "/leistungen/implantate",
  kinderzahnarzt: "/leistungen/kinderzahnheilkunde",
};

export default async function FAQSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.FAQ as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const kategorien = t.kategorien as Record<string, Record<string, unknown>>;
  const mehrErfahren = t.mehrErfahren as string;
  const cta = t.cta as Record<string, string>;

  const katKeys = ["allgemein", "kostenVersicherung", "behandlungen"];
  const kats = katKeys.map((key) => {
    const kat = kategorien[key];
    const fragen = kat.fragen as Record<string, Record<string, string>>;
    return {
      titel: kat.titel as string,
      fragen: Object.entries(fragen).map(([frageKey, f]) => ({
        frage: f.frage,
        antwort: f.antwort,
        link: faqLinks[frageKey],
      })),
    };
  });

  /* FAQPage Schema.org für Rich Snippets in Google */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": kats.flatMap((kat) =>
      kat.fragen.map((f) => ({
        "@type": "Question",
        "name": f.frage,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.antwort,
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SeiteHero
        label={hero.label}
        titel={hero.titel}
        titelAkzent={hero.titelAkzent}
        subtext={hero.subtext}
      />

      {kats.map((kat, katIdx) => (
        <section
          key={kat.titel}
          className="relative py-20 lg:py-28 overflow-hidden"
          style={{ background: katIdx % 2 === 0 ? "#f4f1ec" : "#f0ede8" }}
        >
          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
            <SektionsHeader label={kat.titel} titel="" titelAkzent={kat.titel} />

            <div className="space-y-5">
              {kat.fragen.map((f, i) => (
                <div
                  key={i}
                  className={`p-6 anim-einblenden d${i + 2}`}
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    borderRadius: "18px",
                    border: "1px solid rgba(105,123,123,0.07)",
                  }}
                >
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ color: "#2d3a3a" }}
                  >
                    {f.frage}
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      color: "#6a7a7a",
                      fontWeight: 300,
                      lineHeight: 1.7,
                    }}
                  >
                    {f.antwort}
                  </p>
                  {f.link && (
                    <Link
                      href={f.link}
                      className="inline-flex items-center gap-1.5 mt-3 text-sm transition-colors duration-300 hover:text-[#e3541a]"
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
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTABanner
        titel={cta.titel}
        titelAkzent={cta.titelAkzent}
        text={cta.text}
      />
    </>
  );
}
