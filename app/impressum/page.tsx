import type { Metadata } from "next";
import SeiteHero from "../components/SeiteHero";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der Zahnärzte Parkstrasse Othmarschen — Dr. Schwegmann & Dr. Janz, Hamburg.",
};

export default function ImpressumSeite() {
  return (
    <>
      <SeiteHero titel="Impressum" />

      <section className="relative py-20 lg:py-28" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 prose-sm" style={{ color: "#4a5959" }}>
          <div className="space-y-8">
            <div>
              <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                Angaben gemäß § 5 TMG
              </h2>
              <p className="text-sm leading-relaxed" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                Dr. Claudia Schwegmann &amp; Dr. Nina Janz<br />
                Zahnärztinnen<br />
                Parkstraße 10<br />
                22605 Hamburg
              </p>
            </div>

            <div>
              <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                Kontakt
              </h2>
              <p className="text-sm leading-relaxed" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                Telefon: 040 — 880 21 50<br />
                E-Mail: info@zahnarzt-othmarschen.de
              </p>
            </div>

            <div>
              <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                Berufsbezeichnung
              </h2>
              <p className="text-sm leading-relaxed" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                Berufsbezeichnung: Zahnärztinnen (verliehen in der Bundesrepublik Deutschland)<br />
                Dr. Claudia Schwegmann: Fachzahnärztin für Oralchirurgie
              </p>
            </div>

            <div>
              <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                Zuständige Kammer
              </h2>
              <p className="text-sm leading-relaxed" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                Zahnärztekammer Hamburg<br />
                Möllner Landstraße 31<br />
                22111 Hamburg
              </p>
            </div>

            <div>
              <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                Zuständige Aufsichtsbehörde
              </h2>
              <p className="text-sm leading-relaxed" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                Kassenzahnärztliche Vereinigung Hamburg<br />
                Große Bleichen 23<br />
                20354 Hamburg
              </p>
            </div>

            <div>
              <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                Berufsrechtliche Regelungen
              </h2>
              <p className="text-sm leading-relaxed" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                Zahnheilkundegesetz (ZHG)<br />
                Berufsordnung der Zahnärztekammer Hamburg<br />
                Gebührenordnung für Zahnärzte (GOZ)
              </p>
            </div>

            <div>
              <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                Streitschlichtung
              </h2>
              <p className="text-sm leading-relaxed" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
