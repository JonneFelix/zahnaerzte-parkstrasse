import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../components/SeiteHero";
import SektionsHeader from "../../components/SektionsHeader";
import CTABanner from "../../components/CTABanner";

export const metadata: Metadata = {
  title: "Wissenswertes — Ratgeber für Ihre Zahngesundheit",
  description:
    "Hilfreiche Artikel rund um Zahngesundheit: Implantate, Prophylaxe, Kinderzähne, Angstpatienten und mehr. Von Ihren Zahnärztinnen in Othmarschen.",
};

/* Platzhalter-Artikel — werden später durch ein CMS/MDX ersetzt */
const artikel = [
  {
    titel: "Angst vor dem Zahnarzt? So helfen wir Ihnen",
    kategorie: "Wohlbefinden",
    kurz: "Zahnarztangst betrifft viele Menschen. Erfahren Sie, wie wir in unserer Praxis gezielt darauf eingehen und Ihnen den Besuch so angenehm wie möglich machen.",
    leistung: "/leistungen/prophylaxe",
  },
  {
    titel: "Implantate: Was Sie wissen sollten",
    kategorie: "Behandlung",
    kurz: "Alles Wichtige zu Zahnimplantaten — von der Planung bis zur Nachsorge. Wann sind Implantate sinnvoll und was kostet die Behandlung?",
    leistung: "/leistungen/implantate",
  },
  {
    titel: "Zahnpflege-Tipps für Kinder",
    kategorie: "Kinderzähne",
    kurz: "Ab wann Zähne putzen? Welche Zahnpasta? Wie motiviere ich mein Kind? Praktische Tipps für gesunde Kinderzähne von Anfang an.",
    leistung: "/leistungen/kinderzahnheilkunde",
  },
  {
    titel: "Was tun bei Zahnschmerzen?",
    kategorie: "Erste Hilfe",
    kurz: "Plötzliche Zahnschmerzen können verunsichern. Erfahren Sie, was Sie sofort tun können und wann ein Zahnarztbesuch nötig ist.",
    leistung: "/leistungen/wurzelbehandlung",
  },
  {
    titel: "Parodontose erkennen und behandeln",
    kategorie: "Vorsorge",
    kurz: "Parodontose ist die häufigste Ursache für Zahnverlust bei Erwachsenen — aber gut behandelbar. So erkennen Sie die Warnsignale.",
    leistung: "/leistungen/parodontologie",
  },
  {
    titel: "Wurzelbehandlung: 5 Mythen aufgeklärt",
    kategorie: "Behandlung",
    kurz: "Die Wurzelbehandlung hat einen schlechten Ruf — zu Unrecht. Wir räumen mit den häufigsten Vorurteilen auf.",
    leistung: "/leistungen/wurzelbehandlung",
  },
];

export default function WissenswertesSeite() {
  return (
    <>
      <SeiteHero
        label="Wissenswertes"
        titel="Gut informiert,"
        titelAkzent="besser versorgt"
        subtext="Unsere Ratgeber-Artikel helfen Ihnen, fundierte Entscheidungen für Ihre Zahngesundheit zu treffen."
      />

      {/* Artikel-Grid */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {artikel.map((a, i) => (
              <div
                key={a.titel}
                className={`karte-hover p-7 anim-einblenden d${Math.min(i + 2, 8)}`}
                style={{
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "22px",
                  border: "1px solid rgba(105,123,123,0.07)",
                }}
              >
                <span
                  className="text-xs tracking-wider uppercase"
                  style={{
                    color: "#F26522",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                  }}
                >
                  {a.kategorie}
                </span>
                <h3
                  className="text-lg mt-2 mb-3"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 600,
                    color: "#2d3a3a",
                  }}
                >
                  {a.titel}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{
                    color: "#6a7a7a",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {a.kurz}
                </p>
                <Link
                  href={a.leistung}
                  className="inline-flex items-center gap-1.5 text-sm transition-colors duration-300 hover:text-[#e3541a]"
                  style={{ color: "#F26522", fontWeight: 500 }}
                >
                  Mehr erfahren
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3.5 h-3.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hinweis Fortbildungen */}
      <section className="relative py-16 lg:py-20 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <div
            className="p-8 karte-hover"
            style={{
              background: "rgba(255,255,255,0.6)",
              borderRadius: "22px",
              border: "1px solid rgba(105,123,123,0.07)",
            }}
          >
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "#697B7B", fontWeight: 600, letterSpacing: "0.2em" }}
            >
              Für Kolleginnen & Kollegen
            </span>
            <h3
              className="text-xl mt-3 mb-3"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 600,
                color: "#2d3a3a",
              }}
            >
              Fortbildungen für Zahnärzte
            </h3>
            <p className="text-sm mb-5" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.8 }}>
              Dr. Schwegmann leitet seit 2005 Study Clubs in Implantologie und Parodontologie — mit OP-Training an eigenen Patienten unter Supervision.
            </p>
            <Link
              href="/fortbildungen"
              className="inline-flex items-center gap-2 text-sm transition-colors duration-300 hover:text-[#e3541a]"
              style={{ color: "#F26522", fontWeight: 600 }}
            >
              Zu den Fortbildungen
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        titel="Haben Sie"
        titelAkzent="noch Fragen?"
        text="Wir beraten Sie gern persönlich — vereinbaren Sie einen Termin."
      />
    </>
  );
}
