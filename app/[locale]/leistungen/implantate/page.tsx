import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../../components/SeiteHero";
import SektionsHeader from "../../../components/SektionsHeader";
import CTABanner from "../../../components/CTABanner";
import BaumDekor from "../../../components/BaumDekor";
import { getDictionary, type Locale } from "../../../../lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.LeistungImplantate as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return { title: meta.title, description: meta.description };
}

export default async function ImplantateSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.LeistungImplantate as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const grundlagen = t.grundlagen as Record<string, string>;
  const ablaufSec = t.ablauf as Record<string, unknown>;
  const schritte = ablaufSec.schritte as Record<string, Record<string, string>>;
  const vorteileSec = t.vorteile as Record<string, unknown>;
  const vorteilItems = vorteileSec.items as string[];
  const kosten = t.kosten as Record<string, string>;
  const faqSec = t.faq as Record<string, unknown>;
  const faqFragen = faqSec.fragen as Record<string, Record<string, string>>;
  const interneLinks = t.interneLinks as Record<string, string>;
  const cta = t.cta as Record<string, string>;

  const ablaufArr = Object.values(schritte).map((s) => ({
    nr: s.nr,
    titel: s.titel,
    text: s.text,
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
      />

      {/* Was sind Implantate? */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={grundlagen.label} titel={grundlagen.titel} titelAkzent={grundlagen.titelAkzent} />
          <p className="text-base leading-relaxed text-center" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.85 }}>
            {grundlagen.text}
          </p>
        </div>
      </section>

      {/* Ablauf */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={ablaufSec.label as string} titel={ablaufSec.titel as string} titelAkzent={ablaufSec.titelAkzent as string} />

          <div className="space-y-6">
            {ablaufArr.map((s, i) => (
              <div key={s.nr} className={`flex gap-6 items-start anim-einblenden d${Math.min(i + 2, 8)}`}>
                <div
                  className="w-14 h-14 shrink-0 flex items-center justify-center rounded-full"
                  style={{ background: "rgba(242, 101, 34, 0.08)", border: "1.5px solid rgba(242, 101, 34, 0.15)" }}
                >
                  <span style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, color: "#F26522", fontSize: "1.1rem" }}>{s.nr}</span>
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

      {/* Vorteile */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <BaumDekor className="absolute -left-16 bottom-10 w-48 opacity-[0.03] -rotate-12 hidden lg:block" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={vorteileSec.label as string} titel={vorteileSec.titel as string} titelAkzent={vorteileSec.titelAkzent as string} />
          <div className="space-y-4">
            {vorteilItems.map((v, i) => (
              <div key={i} className={`flex items-start gap-4 anim-einblenden d${i + 2}`}>
                <div className="w-6 h-6 shrink-0 mt-0.5 flex items-center justify-center rounded-full" style={{ background: "rgba(242, 101, 34, 0.1)" }}>
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="#F26522" strokeWidth="2"><path d="M3 8l3.5 3.5L13 5" /></svg>
                </div>
                <p className="text-base" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.7 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kosten */}
      <section className="relative py-16 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={kosten.label} titel={kosten.titel} titelAkzent={kosten.titelAkzent} />
          <div className="p-7" style={{ background: "rgba(255,255,255,0.6)", borderRadius: "18px", border: "1px solid rgba(105,123,123,0.07)" }}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.8 }}>
              {kosten.text}
            </p>
            <p className="text-sm" style={{ color: "#697B7B", fontWeight: 500, lineHeight: 1.7 }}>
              {kosten.orientierung}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={faqSec.label as string} titel={faqSec.titel as string} titelAkzent={faqSec.titelAkzent as string} />
          <div className="space-y-5">
            {fragenArr.map((f, i) => (
              <div key={i} className={`p-6 anim-einblenden d${i + 2}`} style={{ background: "rgba(255,255,255,0.6)", borderRadius: "18px", border: "1px solid rgba(105,123,123,0.07)" }}>
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
            { text: interneLinks.oralchirurgie, href: "/leistungen/oralchirurgie" },
            { text: interneLinks.zahnersatz, href: "/leistungen/zahnersatz" },
            { text: interneLinks.team, href: "/team" },
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
