import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../../components/SeiteHero";
import SektionsHeader from "../../../components/SektionsHeader";
import CTABanner from "../../../components/CTABanner";

export const metadata: Metadata = {
  title: "Ästhetische Zahnheilkunde Hamburg | Bleaching & Veneers Othmarschen",
  description:
    "Ästhetische Zahnheilkunde in Hamburg-Othmarschen: Professionelles Bleaching, Veneers und ästhetische Korrekturen für Ihr schönstes Lächeln.",
};

const behandlungen = [
  {
    titel: "Professionelles Bleaching",
    text: "Schonende Aufhellung Ihrer Zähne — in der Praxis (In-Office) oder komfortabel zu Hause (Home-Bleaching). Sichtbare Ergebnisse nach einer Sitzung.",
  },
  {
    titel: "Veneers",
    text: "Hauchdünne Keramikschalen für perfekte Zahnformen und -farben. Ideal bei Verfärbungen, leichten Fehlstellungen oder abgebrochenen Kanten.",
  },
  {
    titel: "Ästhetische Füllungen",
    text: "Zahnfarbene Composite-Füllungen statt dunklem Amalgam — unsichtbar und haltbar. Für ein natürliches Lächeln ohne Kompromisse.",
  },
  {
    titel: "Zahnfleischkorrektur",
    text: "Ästhetische Korrektur des Zahnfleischverlaufs — für ein harmonisches Lächeln. Durch Fachzahnärztin Dr. Schwegmann mit chirurgischer Präzision.",
  },
];

export default function AesthetikSeite() {
  return (
    <>
      <SeiteHero
        label="Ästhetik"
        titel="Ästhetische Zahnheilkunde —"
        titelAkzent="für Ihr schönstes Lächeln"
        subtext="Manchmal geht es nicht nur um Gesundheit, sondern auch um Ästhetik. Wir bieten Ihnen schonende Verfahren für strahlend weiße und perfekt geformte Zähne."
      />

      {/* Behandlungen */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Behandlungen" titel="Ihr Weg zum" titelAkzent="perfekten Lächeln" />
          <div className="grid md:grid-cols-2 gap-7">
            {behandlungen.map((b, i) => (
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
            { text: "Zahnersatz", href: "/leistungen/zahnersatz" },
            { text: "Oralchirurgie", href: "/leistungen/oralchirurgie" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="px-5 py-2.5 text-sm tracking-wider rounded-full transition-all duration-300 hover:bg-white" style={{ color: "#697B7B", fontWeight: 500, border: "1px solid rgba(105,123,123,0.15)", letterSpacing: "0.06em" }}>
              {l.text}
            </Link>
          ))}
        </div>
      </section>

      <CTABanner titel="Beratung für Ihr" titelAkzent="schönstes Lächeln" text="Lassen Sie sich unverbindlich beraten — wir finden die passende ästhetische Lösung für Sie." />
    </>
  );
}
