import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../../components/SeiteHero";
import SektionsHeader from "../../../components/SektionsHeader";
import CTABanner from "../../../components/CTABanner";
import { getDictionary, type Locale } from "../../../../lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.LeistungProphylaxe as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return { title: meta.title, description: meta.description };
}

export default async function ProphylaxeSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.LeistungProphylaxe as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const warum = t.warum as Record<string, string>;
  const ablaufSec = t.ablauf as Record<string, unknown>;
  const schritte = ablaufSec.schritte as Record<string, Record<string, string>>;
  const recall = t.recall as Record<string, string>;
  const interneLinks = t.interneLinks as Record<string, string>;
  const cta = t.cta as Record<string, string>;

  const ablaufArr = Object.values(schritte).map((s) => ({
    titel: s.titel,
    text: s.text,
  }));

  return (
    <>
      <SeiteHero
        label={hero.label}
        titel={hero.titel}
        titelAkzent={hero.titelAkzent}
        subtext={hero.subtext}
      />

      {/* Warum Prophylaxe */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <SektionsHeader label={warum.label} titel={warum.titel} titelAkzent={warum.titelAkzent} />
          <p className="text-base leading-relaxed" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.85 }}>
            {warum.text}
          </p>
        </div>
      </section>

      {/* Ablauf */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={ablaufSec.label as string} titel={ablaufSec.titel as string} titelAkzent={ablaufSec.titelAkzent as string} />
          <div className="space-y-6">
            {ablaufArr.map((s, i) => (
              <div key={s.titel} className={`flex gap-6 items-start anim-einblenden d${Math.min(i + 2, 8)}`}>
                <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full" style={{ background: "rgba(242,101,34,0.08)", border: "1.5px solid rgba(242,101,34,0.15)" }}>
                  <span style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, color: "#F26522", fontSize: "0.9rem" }}>{i + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg mb-1" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{s.titel}</h3>
                  <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recall */}
      <section className="relative py-16 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a", fontSize: "1.5rem" }}>
            {recall.titel}
          </h2>
          <p className="text-base" style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.8 }}>
            {recall.text}
          </p>
        </div>
      </section>

      {/* Interne Links */}
      <section className="py-10" style={{ background: "#f0ede8" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 flex flex-wrap justify-center gap-4">
          {[
            { text: interneLinks.parodontologie, href: `/${locale}/leistungen/parodontologie` },
            { text: interneLinks.kinderzahnheilkunde, href: `/${locale}/leistungen/kinderzahnheilkunde` },
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
