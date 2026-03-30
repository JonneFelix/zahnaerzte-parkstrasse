import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../../components/SeiteHero";
import SektionsHeader from "../../../components/SektionsHeader";
import CTABanner from "../../../components/CTABanner";
import { getDictionary, type Locale } from "../../../../lib/i18n";
import { createMetadata } from "../../../../lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.LeistungKinderzahnheilkunde as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return createMetadata(locale, "leistungen/kinderzahnheilkunde", meta);
}

export default async function KinderzahnheilkundeSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.LeistungKinderzahnheilkunde as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const ansatz = t.ansatz as Record<string, string>;
  const leistungenSec = t.leistungen as Record<string, unknown>;
  const leistungenItems = leistungenSec.items as Record<string, Record<string, string>>;
  const ersterBesuch = t.ersterBesuch as Record<string, string>;
  const interneLinks = t.interneLinks as Record<string, string>;
  const cta = t.cta as Record<string, string>;

  const leistungenArr = Object.values(leistungenItems).map((l) => ({
    titel: l.titel,
    text: l.text,
  }));

  return (
    <>
      <SeiteHero
        label={hero.label}
        titel={hero.titel}
        titelAkzent={hero.titelAkzent}
        subtext={hero.subtext}
      />

      {/* Persönlicher Ansatz */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <SektionsHeader label={ansatz.label} titel={ansatz.titel} titelAkzent={ansatz.titelAkzent} />
          <p className="text-base leading-relaxed" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.85 }}>
            {ansatz.text}
          </p>
        </div>
      </section>

      {/* Leistungen */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={leistungenSec.label as string} titel={leistungenSec.titel as string} titelAkzent={leistungenSec.titelAkzent as string} />
          <div className="space-y-5">
            {leistungenArr.map((l, i) => (
              <div key={l.titel} className={`p-6 lg:p-8 karte-hover anim-einblenden d${Math.min(i + 2, 8)}`} style={{ background: "rgba(255,255,255,0.6)", borderRadius: "18px", border: "1px solid rgba(105,123,123,0.07)" }}>
                <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{l.titel}</h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{l.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Erster Besuch */}
      <section className="relative py-16 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a", fontSize: "1.5rem" }}>
            {ersterBesuch.titel}
          </h2>
          <p className="text-base" style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.8 }}>
            {ersterBesuch.text}
          </p>
        </div>
      </section>

      {/* Interne Links */}
      <section className="py-10" style={{ background: "#f0ede8" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 flex flex-wrap justify-center gap-4">
          {[
            { text: interneLinks.prophylaxe, href: `/${locale}/leistungen/prophylaxe` },
            { text: interneLinks.ersterBesuch, href: "/erster-besuch" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="px-5 py-2.5 text-sm tracking-wider rounded-full transition-all duration-300 hover:bg-white" style={{ color: "#697B7B", fontWeight: 500, border: "1px solid rgba(105,123,123,0.15)", letterSpacing: "0.06em" }}>
              {l.text}
            </Link>
          ))}
        </div>
      </section>

      <CTABanner titel={cta.titel} titelAkzent={cta.titelAkzent} text={cta.text} />
    </>
  );
}
