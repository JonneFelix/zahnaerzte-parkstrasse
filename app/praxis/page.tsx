import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SeiteHero from "../components/SeiteHero";
import SektionsHeader from "../components/SektionsHeader";
import CTABanner from "../components/CTABanner";
import BaumDekor from "../components/BaumDekor";

export const metadata: Metadata = {
  title: "Unsere Praxis in Hamburg-Othmarschen",
  description:
    "Lernen Sie unsere Zahnarztpraxis in der Parkstraße kennen: Moderne Ausstattung, einfühlsame Atmosphäre und über 25 Jahre Erfahrung in Hamburg-Othmarschen.",
};

/* Ausstattung */
const ausstattung = [
  {
    titel: "Intraoralscanner",
    text: "Digitale Abdrücke ohne unangenehme Abformmasse",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="10" y="6" width="12" height="20" rx="3" />
        <path d="M14 22h4M13 10h6" opacity="0.5" />
      </svg>
    ),
  },
  {
    titel: "Lupenbrille & Mikroskop",
    text: "Höchste Präzision bei jeder Behandlung",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="14" r="5" />
        <circle cx="22" cy="14" r="5" />
        <path d="M17 14h0M7 14L4 10M27 14l3-4" />
      </svg>
    ),
  },
  {
    titel: "Digitales Röntgen",
    text: "Weniger Strahlung, sofortige Ergebnisse",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="8" width="20" height="16" rx="2" />
        <path d="M16 12v8M13 16h6" />
      </svg>
    ),
  },
  {
    titel: "Körpereigenes Gewebe",
    text: "Knochenaufbau mit Ihrem eigenen Material",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 6c-3 4-8 8-8 14a8 8 0 0016 0c0-6-5-10-8-14z" />
      </svg>
    ),
  },
];

/* Partner */
const partner = [
  {
    name: "Hamburger Zahntechnik",
    text: "Unser Zahnersatz kommt aus Bönningstedt — nicht aus dem Ausland.",
  },
  {
    name: "FairImplant",
    text: "Hochwertige Implantatsysteme für langlebige Ergebnisse.",
  },
  {
    name: "Fraga Dental",
    text: "Partner für Fortbildung und Praxisbedarf.",
  },
];

export default function PraxisSeite() {
  return (
    <>
      <SeiteHero
        label="Unsere Praxis"
        titel="Wo Zahnmedizin sich wie"
        titelAkzent="Zuhause anfühlt"
        subtext="Seit 1998 in der Parkstraße — ein Ort, an dem Kompetenz und Menschlichkeit zusammenfinden."
      />

      {/* ============================================================
          Philosophie
          ============================================================ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#f4f1ec" }}
      >
        <BaumDekor className="absolute -right-16 top-10 w-72 opacity-[0.03] rotate-12 hidden lg:block" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <SektionsHeader
            label="Unsere Philosophie"
            titel="Mehr als"
            titelAkzent="perfekte Technik"
          />

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div
              className="relative overflow-hidden anim-einblenden"
              style={{
                borderRadius: "40% 60% 45% 55% / 55% 38% 62% 45%",
                boxShadow: "0 20px 44px -10px rgba(105, 123, 123, 0.16)",
              }}
            >
              <Image
                src="/images/home-banner.jpg"
                alt="Einladende Praxisräume"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
                style={{
                  aspectRatio: "6/5",
                  filter: "saturate(0.88) brightness(1.03)",
                }}
              />
            </div>

            <div className="anim-einblenden d2">
              <p
                className="text-lg leading-relaxed mb-5"
                style={{
                  color: "#4a5959",
                  fontWeight: 300,
                  lineHeight: 1.85,
                }}
              >
                Wir glauben, dass gute Zahnmedizin mehr ist als perfekte
                Technik. Es geht darum, Menschen zu sehen, zuzuhören und
                individuell zu behandeln. In unserer Praxis nehmen wir uns
                die Zeit, die Ihre Gesundheit verdient.
              </p>
              <p
                className="text-lg leading-relaxed"
                style={{
                  color: "#4a5959",
                  fontWeight: 300,
                  lineHeight: 1.85,
                }}
              >
                Unser Ansatz: Wir behandeln nicht nur Zähne, wir behandeln
                Menschen. Jede Patientin und jeder Patient bringt eine
                eigene Geschichte mit — darauf gehen wir ein.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          Praxis-Rundgang (Bildergalerie)
          ============================================================ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#f0ede8" }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <SektionsHeader
            label="Unsere Räume"
            titel="Helle Räume,"
            titelAkzent="warme Atmosphäre"
            subtext="Helle, freundliche Räume mit Blick ins Grüne — mitten im Herzen von Othmarschen. Unsere Praxis verbindet moderne Ausstattung mit einer Atmosphäre, in der Sie sich wohlfühlen können."
          />

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                src: "/images/behandlung.jpg",
                alt: "Moderner Behandlungsraum",
              },
              {
                src: "/images/team-foto.webp",
                alt: "Unser Empfangsbereich",
              },
            ].map((bild, i) => (
              <div
                key={bild.src}
                className={`relative overflow-hidden anim-einblenden d${i + 2}`}
                style={{
                  borderRadius: "20px",
                  boxShadow:
                    "0 16px 36px -8px rgba(105, 123, 123, 0.14)",
                }}
              >
                <Image
                  src={bild.src}
                  alt={bild.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  style={{
                    aspectRatio: "3/2",
                    filter: "saturate(0.90) brightness(1.02)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          Ausstattung & Technik
          ============================================================ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#f4f1ec" }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <SektionsHeader
            label="Ausstattung"
            titel="Modernste Technik,"
            titelAkzent="schonende Behandlung"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {ausstattung.map((a, i) => (
              <div
                key={a.titel}
                className={`text-center p-7 karte-hover anim-einblenden d${i + 2}`}
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "22px",
                  border: "1px solid rgba(105, 123, 123, 0.07)",
                }}
              >
                <div
                  className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full"
                  style={{
                    background: "rgba(242, 101, 34, 0.08)",
                    color: "#F26522",
                  }}
                >
                  {a.icon}
                </div>
                <h3
                  className="text-base mb-2"
                  style={{
                    fontFamily:
                      "var(--font-cormorant), serif",
                    fontWeight: 600,
                    color: "#2d3a3a",
                  }}
                >
                  {a.titel}
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color: "#6a7a7a",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          Sprachen
          ============================================================ */}
      <section
        className="relative py-12 overflow-hidden"
        style={{ background: "#f0ede8" }}
      >
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p
            className="text-base"
            style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.8 }}
          >
            <span style={{ color: "#697B7B", fontWeight: 500 }}>
              Sprachen:
            </span>{" "}
            Wir behandeln und beraten auf Deutsch, Englisch und Französisch.
          </p>
        </div>
      </section>

      {/* ============================================================
          Unser Netzwerk
          ============================================================ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#f4f1ec" }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <SektionsHeader
            label="Unser Netzwerk"
            titel="Starke Partner für"
            titelAkzent="beste Ergebnisse"
          />

          <div className="grid md:grid-cols-3 gap-7">
            {partner.map((p, i) => (
              <div
                key={p.name}
                className={`p-7 karte-hover anim-einblenden d${i + 2}`}
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "22px",
                  border: "1px solid rgba(105, 123, 123, 0.07)",
                }}
              >
                <h3
                  className="text-lg mb-2"
                  style={{
                    fontFamily:
                      "var(--font-cormorant), serif",
                    fontWeight: 600,
                    color: "#2d3a3a",
                  }}
                >
                  {p.name}
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color: "#6a7a7a",
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}
                >
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        titel="Überzeugen Sie"
        titelAkzent="sich selbst"
        text="Besuchen Sie uns in der Parkstraße und erleben Sie unsere Praxis persönlich."
      />
    </>
  );
}
