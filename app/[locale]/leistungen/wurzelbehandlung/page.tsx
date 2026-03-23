import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../../components/SeiteHero";
import SektionsHeader from "../../../components/SektionsHeader";
import CTABanner from "../../../components/CTABanner";
import { getDictionary, type Locale } from "../../../../lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.LeistungWurzelbehandlung as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return { title: meta.title, description: meta.description };
}

export default async function WurzelbehandlungSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.LeistungWurzelbehandlung as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const zahnerhalt = t.zahnerhalt as Record<string, string>;
  const technikSec = t.technik as Record<string, unknown>;
  const technikItems = technikSec.items as Record<string, Record<string, string>>;
  const faqSec = t.faq as Record<string, unknown>;
  const faqFragen = faqSec.fragen as Record<string, Record<string, string>>;
  const interneLinks = t.interneLinks as Record<string, string>;
  const cta = t.cta as Record<string, string>;

  const technikArr = Object.values(technikItems).map((item) => ({
    titel: item.titel,
    text: item.text,
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

      {/* Warum Zahnerhalt */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={zahnerhalt.label} titel={zahnerhalt.titel} titelAkzent={zahnerhalt.titelAkzent} />
          <p className="text-base leading-relaxed text-center" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.85 }}>
            {zahnerhalt.text}
          </p>
        </div>
      </section>

      {/* Technik */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={technikSec.label as string} titel={technikSec.titel as string} titelAkzent={technikSec.titelAkzent as string} />
          <div className="grid md:grid-cols-2 gap-7">
            {technikArr.map((t2, i) => (
              <div
                key={t2.titel}
                className={`p-7 karte-hover anim-einblenden d${i + 2}`}
                style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", borderRadius: "22px", border: "1px solid rgba(105,123,123,0.07)" }}
              >
                <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{t2.titel}</h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{t2.text}</p>
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
            { text: interneLinks.team, href: `/${locale}/team` },
            { text: interneLinks.prophylaxe, href: `/${locale}/leistungen/prophylaxe` },
            { text: interneLinks.zahnersatz, href: `/${locale}/leistungen/zahnersatz` },
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
