import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../components/SeiteHero";
import SektionsHeader from "../../components/SektionsHeader";
import CTABanner from "../../components/CTABanner";

export const metadata: Metadata = {
  title: "Kinderzahnarzt Hamburg Othmarschen | Zahnärzte Parkstrasse",
  description:
    "Kinderzahnheilkunde in Hamburg-Othmarschen: Einfühlsame Behandlung für Kinder jeden Alters. Weil wir selbst Kinder haben, wissen wir, worauf es ankommt.",
};

const leistungen = [
  { titel: "Vorsorge-Untersuchungen", text: "Regelmäßige Kontrollen ab dem ersten Zahn — spielerisch und ohne Druck." },
  { titel: "Fissurenversiegelung", text: "Schutz der Backenzähne vor Karies — eine der wirksamsten Vorsorgemaßnahmen für Kinder." },
  { titel: "Fluoridierung", text: "Stärkung des Zahnschmelzes mit altersgerechter Fluoridierung — für widerstandsfähige Zähne." },
  { titel: "Füllungen", text: "Wenn doch mal eine Karies entsteht: schmerzarme Behandlung mit modernen, zahnfarbenen Materialien." },
  { titel: "Zahnpflege-Beratung", text: "Tipps für Eltern und Kinder — damit die Zahnpflege zu Hause Spaß macht und richtig funktioniert." },
];

export default function KinderzahnheilkundeSeite() {
  return (
    <>
      <SeiteHero
        label="Kinderzahnheilkunde"
        titel="Gesunde Zähne"
        titelAkzent="von Anfang an"
        subtext="Da wir selber Kinder haben, wissen wir, wie wichtig eine vertrauensvolle und angstfreie Atmosphäre für die Kleinen ist. Bei uns lernen Kinder spielerisch, dass der Zahnarztbesuch gar nicht schlimm ist."
      />

      {/* Persönlicher Ansatz */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <SektionsHeader label="Unser Ansatz" titel="Wir sind" titelAkzent="selbst Mütter" />
          <p className="text-base leading-relaxed" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.85 }}>
            Othmarschen ist ein Familienstadtteil — und wir sind ein Familienteam. Als Mütter wissen wir genau, wie wichtig es ist, dass Kinder positive Erfahrungen beim Zahnarzt machen. Deshalb nehmen wir uns besonders viel Zeit, erklären kindgerecht und arbeiten ganz ohne Druck.
          </p>
        </div>
      </section>

      {/* Leistungen */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Für Ihre Kinder" titel="Was wir für die" titelAkzent="Kleinen tun" />
          <div className="space-y-5">
            {leistungen.map((l, i) => (
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
            Ab wann zum Zahnarzt?
          </h2>
          <p className="text-base" style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.8 }}>
            Wir empfehlen den ersten Zahnarztbesuch ab dem ersten Milchzahn — meist um den 6. Lebensmonat. So gewöhnen sich die Kleinen früh an die Umgebung und lernen, dass ein Zahnarztbesuch nichts Schlimmes ist. Milchzähne sind wichtige Platzhalter für die bleibenden Zähne und verdienen genauso viel Aufmerksamkeit.
          </p>
        </div>
      </section>

      {/* Interne Links */}
      <section className="py-10" style={{ background: "#f0ede8" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 flex flex-wrap justify-center gap-4">
          {[
            { text: "Prophylaxe", href: "/leistungen/prophylaxe" },
            { text: "Erster Besuch", href: "/erster-besuch" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="px-5 py-2.5 text-sm tracking-wider rounded-full transition-all duration-300 hover:bg-white" style={{ color: "#697B7B", fontWeight: 500, border: "1px solid rgba(105,123,123,0.15)", letterSpacing: "0.06em" }}>
              {l.text}
            </Link>
          ))}
        </div>
      </section>

      <CTABanner titel="Termin für Ihr" titelAkzent="Kind buchen" text="Vereinbaren Sie einen kindgerechten Kennenlerntermin — wir freuen uns auf die Kleinen." />
    </>
  );
}
