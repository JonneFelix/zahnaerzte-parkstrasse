import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../../components/SeiteHero";
import SektionsHeader from "../../../components/SektionsHeader";
import CTABanner from "../../../components/CTABanner";

export const metadata: Metadata = {
  title: "Prophylaxe & Zahnreinigung Hamburg | Zahnärzte Parkstrasse Othmarschen",
  description:
    "Professionelle Zahnreinigung in Hamburg-Othmarschen: Individuelle Prophylaxe-Programme für gesunde Zähne und gesundes Zahnfleisch. Ein Leben lang.",
};

const ablauf = [
  { titel: "Befundaufnahme", text: "Wir prüfen den Zustand Ihrer Zähne und Ihres Zahnfleisches und besprechen Ihre individuellen Bedürfnisse." },
  { titel: "Reinigung", text: "Entfernung von Zahnstein, Belägen und Verfärbungen — mit Ultraschall und feinen Handinstrumenten." },
  { titel: "Politur", text: "Glatte Zahnoberflächen sind der beste Schutz gegen neue Beläge — Ihre Zähne fühlen sich sofort sauberer an." },
  { titel: "Fluoridierung", text: "Schutzlack für den Zahnschmelz — stärkt Ihre Zähne und macht sie widerstandsfähiger." },
  { titel: "Beratung", text: "Individuelle Tipps für Ihre Mundhygiene zu Hause — damit die Wirkung lange anhält." },
];

export default function ProphylaxeSeite() {
  return (
    <>
      <SeiteHero
        label="Prophylaxe"
        titel="Prophylaxe —"
        titelAkzent="Vorsorge ist die beste Medizin"
        subtext="Professionelle Zahnreinigung und individuelle Prophylaxe-Programme — für strahlend saubere Zähne und gesundes Zahnfleisch. Regelmäßige Vorsorge ist der beste Schutz vor Karies und Parodontose."
      />

      {/* Warum Prophylaxe */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <SektionsHeader label="Warum Prophylaxe" titel="Vorsorge statt" titelAkzent="Nachsorge" />
          <p className="text-base leading-relaxed" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.85 }}>
            Auch bei bester Zahnpflege zu Hause erreicht die Zahnbürste nicht alle Stellen. Die professionelle Zahnreinigung entfernt Beläge und Bakterien dort, wo Sie selbst nicht hinkommen — und senkt das Risiko für Karies, Parodontose und Zahnverlust erheblich.
          </p>
        </div>
      </section>

      {/* Ablauf */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Ablauf" titel="So läuft Ihre" titelAkzent="Zahnreinigung ab" />
          <div className="space-y-6">
            {ablauf.map((s, i) => (
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
            Wir erinnern Sie
          </h2>
          <p className="text-base" style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.8 }}>
            Unser Recall-System erinnert Sie rechtzeitig an Ihren nächsten Prophylaxe-Termin — damit Sie die Vorsorge nie vergessen. Wir empfehlen eine professionelle Zahnreinigung alle 6 Monate.
          </p>
        </div>
      </section>

      {/* Interne Links */}
      <section className="py-10" style={{ background: "#f0ede8" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 flex flex-wrap justify-center gap-4">
          {[
            { text: "Parodontologie", href: "/leistungen/parodontologie" },
            { text: "Kinderzahnheilkunde", href: "/leistungen/kinderzahnheilkunde" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="px-5 py-2.5 text-sm tracking-wider rounded-full transition-all duration-300 hover:bg-white" style={{ color: "#697B7B", fontWeight: 500, border: "1px solid rgba(105,123,123,0.15)", letterSpacing: "0.06em" }}>
              {l.text}
            </Link>
          ))}
        </div>
      </section>

      <CTABanner titel="Zeit für Ihre" titelAkzent="Zahnreinigung?" text="Buchen Sie jetzt Ihren Prophylaxe-Termin." />
    </>
  );
}
