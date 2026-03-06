import type { Metadata } from "next";
import SeiteHero from "../components/SeiteHero";
import SektionsHeader from "../components/SektionsHeader";
import CTABanner from "../components/CTABanner";

export const metadata: Metadata = {
  title: "Ihr erster Besuch",
  description:
    "Alles, was Sie für Ihren ersten Besuch bei uns wissen sollten: Ablauf, was mitbringen, wie wir Sie empfangen. Wir freuen uns auf Sie.",
};

const mitbringen = [
  "Versichertenkarte",
  "Aktuelle Röntgenbilder (falls vorhanden)",
  "Medikamentenliste (falls zutreffend)",
  "Bonusheft",
];

const ablauf = [
  { titel: "Empfang", text: "Unsere Mitarbeiterinnen begrüßen Sie herzlich und nehmen Ihre Daten auf." },
  { titel: "Anamnesegespräch", text: "Wir fragen nach Ihrer Krankengeschichte, Medikamenten und Ihren Wünschen." },
  { titel: "Untersuchung", text: "Gründliche Untersuchung Ihrer Zähne, des Zahnfleischs und der Mundschleimhaut." },
  { titel: "Besprechung", text: "Wir erklären Ihnen unsere Befunde und besprechen gemeinsam die nächsten Schritte." },
];

export default function ErsterBesuchSeite() {
  return (
    <>
      <SeiteHero
        label="Für neue Patienten"
        titel="Ihr erster Besuch"
        titelAkzent="bei uns"
        subtext="Wir freuen uns, Sie kennenzulernen. Damit Ihr erster Termin entspannt verläuft, haben wir die wichtigsten Informationen für Sie zusammengestellt."
      />

      {/* Was mitbringen */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Vorbereitung" titel="Was Sie" titelAkzent="mitbringen sollten" />
          <div className="space-y-4">
            {mitbringen.map((m, i) => (
              <div key={i} className={`flex items-start gap-4 anim-einblenden d${i + 2}`}>
                <div className="w-6 h-6 shrink-0 mt-0.5 flex items-center justify-center rounded-full" style={{ background: "rgba(242,101,34,0.1)" }}>
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="#F26522" strokeWidth="2"><path d="M3 8l3.5 3.5L13 5" /></svg>
                </div>
                <p className="text-base" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.7 }}>{m}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Ablauf" titel="So läuft Ihr erster" titelAkzent="Besuch ab" />
          <div className="grid md:grid-cols-2 gap-7">
            {ablauf.map((a, i) => (
              <div key={a.titel} className={`p-7 karte-hover anim-einblenden d${i + 2}`} style={{ background: "rgba(255,255,255,0.6)", borderRadius: "22px", border: "1px solid rgba(105,123,123,0.07)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: "rgba(242,101,34,0.08)", border: "1.5px solid rgba(242,101,34,0.15)" }}>
                    <span style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, color: "#F26522" }}>{i + 1}</span>
                  </div>
                  <h3 className="text-lg" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{a.titel}</h3>
                </div>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vorerkrankungen */}
      <section className="relative py-16 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <div className="p-7" style={{ background: "rgba(255,255,255,0.6)", borderRadius: "18px", border: "1px solid rgba(105,123,123,0.07)" }}>
            <h3 className="text-lg mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>Für Patienten mit Vorerkrankungen</h3>
            <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>
              Bitte informieren Sie uns über alle Vorerkrankungen und Medikamente — besonders Blutverdünner, Bisphosphonate oder Diabetes. Wir stimmen Ihre Behandlung individuell darauf ab.
            </p>
          </div>
          <div className="mt-6 text-center">
            <p className="text-base" style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.8 }}>
              <span style={{ color: "#697B7B", fontWeight: 500 }}>Sprachen:</span> Wir behandeln und beraten auf Deutsch, Englisch und Französisch.
            </p>
          </div>
        </div>
      </section>

      <CTABanner titel="Jetzt ersten" titelAkzent="Termin buchen" text="Planen Sie bitte ca. 45 Minuten für Ihren ersten Besuch ein." />
    </>
  );
}
