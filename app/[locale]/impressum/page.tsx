import type { Metadata } from "next";
import SeiteHero from "../../components/SeiteHero";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der Zahnärzte Parkstrasse Othmarschen — Dr. Schwegmann, Dr. Janz & Dr. Prüter, Hamburg.",
};

// Wiederverwendbare Styles
const h2Style = { fontFamily: "var(--font-cormorant), serif", fontWeight: 600 as const, color: "#2d3a3a" };
const textStyle = { fontWeight: 300 as const, lineHeight: 1.8 };

export default function ImpressumSeite() {
  return (
    <>
      <SeiteHero titel="Impressum" />

      <section className="relative py-20 lg:py-28" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 prose-sm" style={{ color: "#4a5959" }}>
          <div className="space-y-8">

            {/* Angaben gemäß DDG */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                Angaben gemäß § 5 DDG
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Dr. Claudia Schwegmann<br />
                Zahnärztin (Praxisinhaberin)<br />
                Parkstraße 10<br />
                22605 Hamburg
              </p>
            </div>

            {/* Kontakt */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                Kontakt
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Telefon: 040 — 880 21 50<br />
                E-Mail: info@zahnarzt-othmarschen.de
              </p>
            </div>

            {/* Berufsbezeichnung */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                Berufsbezeichnung
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Gesetzliche Berufsbezeichnung: Zahnärztinnen<br />
                (verliehen in der Bundesrepublik Deutschland)
              </p>
              <p className="text-sm leading-relaxed mt-2" style={textStyle}>
                Dr. Claudia Schwegmann: Fachzahnärztin für Oralchirurgie<br />
                Dr. Nina Janz: Zahnärztin — Curriculum Endodontie<br />
                Dr. Julia Prüter: Zahnärztin
              </p>
            </div>

            {/* Zuständige Kammer */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                Zuständige Kammer
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Zahnärztekammer Hamburg<br />
                Möllner Landstraße 31<br />
                22111 Hamburg<br />
                <a href="https://www.zahnaerztekammer-hh.de" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#697B7B" }}>
                  www.zahnaerztekammer-hh.de
                </a>
              </p>
            </div>

            {/* Zuständige Aufsichtsbehörde */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                Zuständige Aufsichtsbehörde
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Behörde für Arbeit, Gesundheit, Soziales, Familie und Integration (Sozialbehörde)<br />
                Hamburger Straße 47<br />
                22083 Hamburg
              </p>
            </div>

            {/* Kassenzahnärztliche Vereinigung */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                Kassenzahnärztliche Vereinigung
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Kassenzahnärztliche Vereinigung Hamburg<br />
                Große Bleichen 23<br />
                20354 Hamburg<br />
                <a href="https://www.kzv-hamburg.de" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#697B7B" }}>
                  www.kzv-hamburg.de
                </a>
              </p>
            </div>

            {/* Berufsrechtliche Regelungen */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                Berufsrechtliche Regelungen
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Es gelten folgende berufsrechtliche Regelungen:
              </p>
              <ul className="text-sm mt-2 space-y-1" style={textStyle}>
                <li>Zahnheilkundegesetz (ZHG)</li>
                <li>Hamburgisches Kammergesetz für die Heilberufe (HmbKGH)</li>
                <li>Berufsordnung der Zahnärztekammer Hamburg</li>
                <li>Gebührenordnung für Zahnärzte (GOZ)</li>
              </ul>
              <p className="text-sm leading-relaxed mt-2" style={textStyle}>
                Die Regelungen sind einsehbar unter:{" "}
                <a href="https://www.zahnaerztekammer-hh.de" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#697B7B" }}>
                  www.zahnaerztekammer-hh.de
                </a>
              </p>
            </div>

            {/* Streitschlichtung */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                Streitschlichtung
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#697B7B" }}>
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-sm leading-relaxed mt-2" style={textStyle}>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
