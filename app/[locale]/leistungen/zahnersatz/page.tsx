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
  const t = dict.LeistungZahnersatz as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return createMetadata(locale, "leistungen/zahnersatz", meta);
}

export default async function ZahnersatzSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.LeistungZahnersatz as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const optionenSec = t.optionen as Record<string, unknown>;
  const optionenItems = optionenSec.items as Record<string, Record<string, string>>;
  const qualitaet = t.qualitaet as Record<string, unknown>;
  const qualitaetItems = qualitaet.items as string[];
  const interneLinks = t.interneLinks as Record<string, string>;
  const cta = t.cta as Record<string, string>;

  const optionenArr = Object.values(optionenItems).map((o) => ({
    titel: o.titel,
    text: o.text,
  }));

  return (
    <>
      <SeiteHero
        label={hero.label}
        titel={hero.titel}
        titelAkzent={hero.titelAkzent}
        subtext={hero.subtext}
      />

      {/* Optionen */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={optionenSec.label as string} titel={optionenSec.titel as string} titelAkzent={optionenSec.titelAkzent as string} />
          <div className="space-y-5">
            {optionenArr.map((o, i) => (
              <div key={o.titel} className={`p-6 lg:p-8 karte-hover anim-einblenden d${Math.min(i + 2, 8)}`} style={{ background: "rgba(255,255,255,0.6)", borderRadius: "18px", border: "1px solid rgba(105,123,123,0.07)" }}>
                <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{o.titel}</h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualität */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <SektionsHeader label={qualitaet.label as string} titel={qualitaet.titel as string} titelAkzent={qualitaet.titelAkzent as string} />
          <div className="space-y-4">
            {qualitaetItems.map((text, i) => (
              <div key={i} className={`flex items-start gap-4 text-left anim-einblenden d${i + 2}`}>
                <div className="w-6 h-6 shrink-0 mt-0.5 flex items-center justify-center rounded-full" style={{ background: "rgba(242,101,34,0.1)" }}>
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="#F26522" strokeWidth="2"><path d="M3 8l3.5 3.5L13 5" /></svg>
                </div>
                <p className="text-base" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.7 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interne Links */}
      <section className="py-10" style={{ background: "#f4f1ec" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 flex flex-wrap justify-center gap-4">
          {[
            { text: interneLinks.implantate, href: `/${locale}/leistungen/implantate` },
            { text: interneLinks.aesthetik, href: `/${locale}/leistungen/aesthetik` },
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
