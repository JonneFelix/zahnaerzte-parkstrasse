import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SeiteHero from "../components/SeiteHero";
import SektionsHeader from "../components/SektionsHeader";
import CTABanner from "../components/CTABanner";
import BaumDekor from "../components/BaumDekor";

export const metadata: Metadata = {
  title: "Unsere Leistungen",
  description:
    "Unser Leistungsspektrum: Oralchirurgie, Implantate, Zahnersatz, Wurzelbehandlung, Prophylaxe, Parodontologie, Kinderzähne und ästhetische Zahnheilkunde in Othmarschen.",
};

const leistungen = [
  {
    titel: "Oralchirurgie",
    kurz: "Implantate, Knochen- und Schleimhautaufbau, Weisheitszahn-Entfernungen und chirurgische Parodontose-Therapie — bei Fachzahnärztin Dr. Schwegmann sind Sie bestens aufgehoben.",
    bild: "/images/behandlung.jpg",
    href: "/leistungen/oralchirurgie",
  },
  {
    titel: "Zahnimplantate",
    kurz: "Festsitzender Zahnersatz auf Implantaten — wir verwenden fast ausschließlich körpereigenes Gewebe für den Knochen- und Schleimhautaufbau.",
    bild: "/images/lupenbrille.jpg",
    href: "/leistungen/implantate",
  },
  {
    titel: "Zahnersatz",
    kurz: "Kronen, Brücken und Prothesen — gefertigt mit Intraoralscanner von unserem Partnerlabor in Bönningstedt. Qualität aus der Region.",
    bild: "/images/zahnmodell.jpg",
    href: "/leistungen/zahnersatz",
  },
  {
    titel: "Wurzelbehandlung",
    kurz: "Dr. Nina Janz bringt ihr Curriculum Endodontie ein — mit maschineller Aufbereitung und elektronischer Längenmessung für den bestmöglichen Zahnerhalt.",
    bild: "/images/wurzelbehandlung.jpg",
    href: "/leistungen/wurzelbehandlung",
  },
  {
    titel: "Prophylaxe & Dentalhygiene",
    kurz: "Professionelle Zahnreinigung und individuelle Prophylaxe-Programme — für strahlend saubere Zähne und gesundes Zahnfleisch, ein Leben lang.",
    bild: "/images/prophylaxe.jpg",
    href: "/leistungen/prophylaxe",
  },
  {
    titel: "Parodontologie",
    kurz: "Individuelle Therapie bei Zahnfleischentzündung und Knochenschwund — konservativ und chirurgisch.",
    bild: "/images/behandlung.jpg",
    href: "/leistungen/parodontologie",
  },
  {
    titel: "Kinderzahnheilkunde",
    kurz: "Da wir selber Kinder haben, wissen wir, wie wichtig eine vertrauensvolle und angstfreie Atmosphäre für die Kleinen ist.",
    bild: "/images/kinder-behandlung.jpg",
    href: "/leistungen/kinderzahnheilkunde",
  },
  {
    titel: "Ästhetische Zahnheilkunde",
    kurz: "Professionelles Bleaching, Veneers und ästhetische Korrekturen für Ihr schönstes Lächeln.",
    bild: "/images/zahnmodell.jpg",
    href: "/leistungen/aesthetik",
  },
];

export default function LeistungenSeite() {
  return (
    <>
      <SeiteHero
        label="Unsere Leistungen"
        titel="Verwurzelt in"
        titelAkzent="Kompetenz"
        subtext="Von der sanften Prophylaxe bis zur anspruchsvollen Implantologie — wir bieten Ihnen das gesamte Spektrum moderner Zahnmedizin unter einem Dach."
      />

      {/* ============================================================
          Leistungs-Grid
          ============================================================ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#f4f1ec" }}
      >
        <BaumDekor className="absolute -left-16 top-1/4 w-64 opacity-[0.03] -rotate-12 hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {leistungen.map((l, i) => (
              <Link
                key={l.titel}
                href={l.href}
                className={`karte-hover relative group block anim-einblenden d${Math.min(i + 2, 8)}`}
                style={{
                  background: "rgba(255, 255, 255, 0.72)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "22px",
                  border: "1px solid rgba(105, 123, 123, 0.07)",
                  overflow: "hidden",
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={l.bild}
                    alt={l.titel}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{
                      filter: "saturate(0.88) brightness(1.02)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.92))",
                    }}
                  />
                </div>
                <div className="p-6 pt-4">
                  <h3
                    className="text-xl mb-2"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 600,
                      color: "#2d3a3a",
                    }}
                  >
                    {l.titel}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "#6a7a7a",
                      fontWeight: 300,
                      lineHeight: 1.7,
                    }}
                  >
                    {l.kurz}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: "#F26522", fontWeight: 500 }}>
                    Mehr erfahren
                    <svg viewBox="0 0 20 20" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          Schwerpunkt-Highlight
          ============================================================ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#f0ede8" }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="anim-einblenden">
              <span
                className="text-xs tracking-widest uppercase"
                style={{
                  color: "#F26522",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                }}
              >
                Unser Schwerpunkt
              </span>
              <h2
                className="mt-4 mb-6"
                style={{
                  fontFamily:
                    "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontWeight: 400,
                  color: "#2d3a3a",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  lineHeight: 1.2,
                }}
              >
                Oralchirurgie &{" "}
                <span style={{ fontWeight: 600, color: "#697B7B" }}>
                  Implantologie
                </span>
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{
                  color: "#4a5959",
                  fontWeight: 300,
                  lineHeight: 1.85,
                }}
              >
                Dr. Claudia Schwegmann ist eine von wenigen Fachzahnärztinnen
                für Oralchirurgie in Hamburg. Diese Spezialisierung bedeutet
                für Sie: chirurgische Eingriffe auf höchstem Niveau,
                minimalinvasiv und mit körpereigenen Materialien.
              </p>
              <Link
                href="/leistungen/oralchirurgie"
                className="inline-flex items-center gap-2 text-sm tracking-wider transition-colors duration-300 hover:text-[#e3541a]"
                style={{
                  color: "#F26522",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                }}
              >
                MEHR ÜBER ORALCHIRURGIE
                <svg
                  viewBox="0 0 20 20"
                  className="w-4 h-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                >
                  <path d="M4 10h12M11 5l5 5-5 5" />
                </svg>
              </Link>
            </div>

            <div
              className="relative overflow-hidden anim-einblenden-rechts d3"
              style={{
                borderRadius: "22px",
                boxShadow:
                  "0 20px 44px -10px rgba(105, 123, 123, 0.16)",
              }}
            >
              <Image
                src="/images/team/dr-schwegmann-portrait.jpg"
                alt="Dr. Claudia Schwegmann — Fachzahnärztin für Oralchirurgie"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
                style={{
                  aspectRatio: "4/5",
                  filter: "saturate(0.90) brightness(1.02)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        titel="Welche Behandlung"
        titelAkzent="brauchen Sie?"
        text="Wir beraten Sie gern — vereinbaren Sie einen Termin für ein unverbindliches Gespräch."
      />
    </>
  );
}
