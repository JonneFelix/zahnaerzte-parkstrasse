import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../../components/SeiteHero";
import SektionsHeader from "../../../components/SektionsHeader";
import CTABanner from "../../../components/CTABanner";
import BaumDekor from "../../../components/BaumDekor";

export const metadata: Metadata = {
  title: "Zahnimplantate Hamburg | Implantologie Dr. Schwegmann — Othmarschen",
  description:
    "Zahnimplantate in Hamburg-Othmarschen: Feste dritte Zähne mit körpereigenem Knochenaufbau. Fachzahnärztin für Oralchirurgie. Individuelle Beratung.",
};

const ablauf = [
  { nr: "01", titel: "Beratung & Planung", text: "Ausführliches Erstgespräch, digitales Röntgen und 3D-Planung." },
  { nr: "02", titel: "Vorbereitung", text: "Falls nötig: Knochenaufbau mit körpereigenem Gewebe." },
  { nr: "03", titel: "Implantation", text: "Der eigentliche Eingriff dauert meist nur 30–60 Minuten pro Implantat." },
  { nr: "04", titel: "Einheilphase", text: "2–6 Monate, in denen das Implantat fest mit dem Knochen verwächst." },
  { nr: "05", titel: "Versorgung", text: "Ihr neuer Zahn wird eingesetzt — gefertigt von unserem Partnerlabor in Bönningstedt." },
];

const vorteile = [
  "Fachzahnärztin für Oralchirurgie — höchste chirurgische Kompetenz",
  "Körpereigener Knochenaufbau — kein Fremdmaterial",
  "Zahnersatz aus Hamburg — nicht aus dem Ausland",
  "Über 25 Jahre Erfahrung mit Implantaten",
];

const fragen = [
  {
    frage: "Wie lange halten Implantate?",
    antwort: "Bei guter Pflege und regelmäßiger Prophylaxe halten Zahnimplantate ein Leben lang. Die aufgesetzte Krone hält durchschnittlich 15–20 Jahre.",
  },
  {
    frage: "Ist die Implantation schmerzhaft?",
    antwort: "Unter örtlicher Betäubung spüren Sie nichts. Nach dem Eingriff kann es zu leichten Schwellungen kommen, die mit einfachen Schmerzmitteln gut zu behandeln sind.",
  },
  {
    frage: "Geht das auch ohne Knochenaufbau?",
    antwort: "Oft ja. Ob ein Knochenaufbau nötig ist, klären wir im Erstgespräch mit einer 3D-Aufnahme.",
  },
];

export default function ImplantateSeite() {
  return (
    <>
      <SeiteHero
        label="Implantologie"
        titel="Zahnimplantate —"
        titelAkzent="feste Zähne, natürliches Gefühl"
        subtext="Ein Implantat ist mehr als ein Zahnersatz — es gibt Ihnen ein Stück Lebensqualität zurück. Als Fachzahnärztin für Oralchirurgie ist Dr. Schwegmann Ihre Spezialistin für Implantologie."
      />

      {/* Was sind Implantate? */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Grundlagen" titel="Was ist ein" titelAkzent="Zahnimplantat?" />
          <p className="text-base leading-relaxed text-center" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.85 }}>
            Ein Zahnimplantat ist eine kleine Schraube aus Titan oder Keramik, die in den Kieferknochen eingesetzt wird. Darauf wird der eigentliche Zahnersatz — eine Krone, Brücke oder Prothese — fest verankert. Das Ergebnis: Zähne, die aussehen, sich anfühlen und funktionieren wie Ihre eigenen.
          </p>
        </div>
      </section>

      {/* Ablauf */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Ihr Weg zum Implantat" titel="So läuft eine" titelAkzent="Implantation ab" />

          <div className="space-y-6">
            {ablauf.map((s, i) => (
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
          <SektionsHeader label="Ihre Vorteile" titel="Was uns" titelAkzent="auszeichnet" />
          <div className="space-y-4">
            {vorteile.map((v, i) => (
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
          <SektionsHeader label="Transparenz" titel="Was kosten" titelAkzent="Zahnimplantate?" />
          <div className="p-7" style={{ background: "rgba(255,255,255,0.6)", borderRadius: "18px", border: "1px solid rgba(105,123,123,0.07)" }}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.8 }}>
              Die Kosten für ein Zahnimplantat variieren je nach Aufwand und individuellem Befund. Wir erstellen Ihnen immer einen transparenten Heil- und Kostenplan — bevor wir mit der Behandlung beginnen. Gesetzliche Krankenkassen übernehmen den Festzuschuss für den Zahnersatz, den Implantatkörper zahlen Sie als Eigenanteil.
            </p>
            <p className="text-sm" style={{ color: "#697B7B", fontWeight: 500, lineHeight: 1.7 }}>
              Orientierung: Ein einzelnes Implantat mit Krone liegt in der Regel zwischen 1.800 und 3.500 Euro.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Häufige Fragen" titel="Ihre Fragen zu" titelAkzent="Implantaten" />
          <div className="space-y-5">
            {fragen.map((f, i) => (
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
            { text: "Oralchirurgie", href: "/leistungen/oralchirurgie" },
            { text: "Zahnersatz", href: "/leistungen/zahnersatz" },
            { text: "Dr. Schwegmann", href: "/team" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="px-5 py-2.5 text-sm tracking-wider rounded-full transition-all duration-300 hover:bg-white" style={{ color: "#697B7B", fontWeight: 500, border: "1px solid rgba(105,123,123,0.15)", letterSpacing: "0.06em" }}>
              {l.text}
            </Link>
          ))}
        </div>
      </section>

      <CTABanner
        titel="Kostenlose Erstberatung"
        titelAkzent="zu Implantaten"
        text="Lassen Sie sich unverbindlich beraten — wir nehmen uns Zeit für Ihre Fragen."
      />
    </>
  );
}
