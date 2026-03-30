import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../../components/SeiteHero";
import SektionsHeader from "../../../components/SektionsHeader";
import CTABanner from "../../../components/CTABanner";
import BaumDekor from "../../../components/BaumDekor";
import { getDictionary, type Locale } from "../../../../lib/i18n";
import { createMetadata } from "../../../../lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.LeistungOralchirurgie as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return createMetadata(locale, "leistungen/oralchirurgie", meta);
}

const bereicheLinks: Record<string, string | undefined> = {
  implantate: "/leistungen/implantate",
  parodontose: "/leistungen/parodontologie",
};

export default async function OralchirurgieSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.LeistungOralchirurgie as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const bereiche = t.bereiche as Record<string, unknown>;
  const bereicheItems = bereiche.items as Record<string, Record<string, string>>;
  const vorteileSec = t.vorteile as Record<string, unknown>;
  const vorteilItems = vorteileSec.items as Record<string, Record<string, string>>;
  const faqSec = t.faq as Record<string, unknown>;
  const faqFragen = faqSec.fragen as Record<string, Record<string, string>>;
  const interneLinks = t.interneLinks as Record<string, string>;
  const cta = t.cta as Record<string, string>;

  const bereicheKeys = ["implantate", "schleimhaut", "weisheitszahn", "parodontose", "praeprothetisch"];
  const bereicheArr = bereicheKeys.map((key) => ({
    titel: bereicheItems[key].titel,
    text: bereicheItems[key].text,
    link: bereicheLinks[key],
  }));

  const vorteilKeys = ["fachzahnaerztin", "gewebe", "lupenbrille", "minimalinvasiv"];
  const vorteilArr = vorteilKeys.map((key) => ({
    titel: vorteilItems[key].titel,
    text: vorteilItems[key].text,
  }));

  const fragenArr = Object.values(faqFragen).map((f) => ({
    frage: f.frage,
    antwort: f.antwort,
  }));

  return (
    <>
      <SeiteHero
        label={hero.label}
        titel={hero.titel}
        titelAkzent={hero.titelAkzent}
        subtext={hero.subtext}
        badge={hero.badge}
      />

      {/* Leistungs-Übersicht */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <BaumDekor className="absolute -right-16 top-10 w-64 opacity-[0.03] rotate-12 hidden lg:block" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={bereiche.label as string} titel={bereiche.titel as string} titelAkzent={bereiche.titelAkzent as string} />

          <div className="space-y-5">
            {bereicheArr.map((b, i) => (
              <div
                key={b.titel}
                className={`p-6 lg:p-8 karte-hover anim-einblenden d${Math.min(i + 2, 8)}`}
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "18px",
                  border: "1px solid rgba(105, 123, 123, 0.07)",
                }}
              >
                <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                  {b.titel}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>
                  {b.text}
                </p>
                {b.link && (
                  <Link
                    href={b.link}
                    className="inline-flex items-center gap-1.5 mt-3 text-sm transition-colors duration-300 hover:text-[#e3541a]"
                    style={{ color: "#F26522", fontWeight: 500 }}
                  >
                    {bereiche.mehrErfahren as string}
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2" fill="none"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vorteile */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={vorteileSec.label as string} titel={vorteileSec.titel as string} titelAkzent={vorteileSec.titelAkzent as string} />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {vorteilArr.map((v, i) => (
              <div
                key={v.titel}
                className={`text-center p-7 karte-hover anim-einblenden d${i + 2}`}
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "22px",
                  border: "1px solid rgba(105, 123, 123, 0.07)",
                }}
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full" style={{ background: "rgba(242, 101, 34, 0.08)" }}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#F26522" strokeWidth="2"><path d="M5 12l5 5L20 7" /></svg>
                </div>
                <h3 className="text-base mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                  {v.titel}
                </h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={faqSec.label as string} titel={faqSec.titel as string} titelAkzent={faqSec.titelAkzent as string} />

          <div className="space-y-5">
            {fragenArr.map((f, i) => (
              <div
                key={i}
                className={`p-6 anim-einblenden d${i + 2}`}
                style={{ background: "rgba(255, 255, 255, 0.6)", borderRadius: "18px", border: "1px solid rgba(105, 123, 123, 0.07)" }}
              >
                <h3 className="text-base font-semibold mb-2" style={{ color: "#2d3a3a" }}>{f.frage}</h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{f.antwort}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interne Links */}
      <section className="py-10" style={{ background: "#f0ede8" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 flex flex-wrap justify-center gap-4">
          {[
            { text: interneLinks.implantate, href: `/${locale}/leistungen/implantate` },
            { text: interneLinks.parodontologie, href: `/${locale}/leistungen/parodontologie` },
            { text: interneLinks.team, href: `/${locale}/team` },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-5 py-2.5 text-sm tracking-wider rounded-full transition-all duration-300 hover:bg-white"
              style={{ color: "#697B7B", fontWeight: 500, border: "1px solid rgba(105, 123, 123, 0.15)", letterSpacing: "0.06em" }}
            >
              {l.text}
            </Link>
          ))}
        </div>
      </section>

      <CTABanner titel={cta.titel} titelAkzent={cta.titelAkzent} text={cta.text} />
    </>
  );
}
