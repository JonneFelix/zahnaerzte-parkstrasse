import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../../components/SeiteHero";
import SektionsHeader from "../../../components/SektionsHeader";
import CTABanner from "../../../components/CTABanner";
import { getDictionary, type Locale } from "../../../../lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.LeistungAesthetik as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return { title: meta.title, description: meta.description };
}

export default async function AesthetikSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.LeistungAesthetik as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const behandlungenSec = t.behandlungen as Record<string, unknown>;
  const behandlungenItems = behandlungenSec.items as Record<string, Record<string, string>>;
  const interneLinks = t.interneLinks as Record<string, string>;
  const cta = t.cta as Record<string, string>;

  const behandlungenArr = Object.values(behandlungenItems).map((b) => ({
    titel: b.titel,
    text: b.text,
  }));

  return (
    <>
      <SeiteHero
        label={hero.label}
        titel={hero.titel}
        titelAkzent={hero.titelAkzent}
        subtext={hero.subtext}
      />

      {/* Behandlungen */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={behandlungenSec.label as string} titel={behandlungenSec.titel as string} titelAkzent={behandlungenSec.titelAkzent as string} />
          <div className="grid md:grid-cols-2 gap-7">
            {behandlungenArr.map((b, i) => (
              <div key={b.titel} className={`p-7 karte-hover anim-einblenden d${i + 2}`} style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", borderRadius: "22px", border: "1px solid rgba(105,123,123,0.07)" }}>
                <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{b.titel}</h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interne Links */}
      <section className="py-10" style={{ background: "#f0ede8" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 flex flex-wrap justify-center gap-4">
          {[
            { text: interneLinks.zahnersatz, href: "/leistungen/zahnersatz" },
            { text: interneLinks.oralchirurgie, href: "/leistungen/oralchirurgie" },
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
