import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SeiteHero from "../components/SeiteHero";
import SektionsHeader from "../components/SektionsHeader";
import CTABanner from "../components/CTABanner";
import BaumDekor from "../components/BaumDekor";

export const metadata: Metadata = {
  title: "Unser Team — Dr. Schwegmann, Dr. Janz & Dr. Prüter",
  description:
    "Lernen Sie unsere Zahnärztinnen kennen: Dr. Claudia Schwegmann (Fachzahnärztin Oralchirurgie), Dr. Nina Janz (Endodontie) und Dr. Julia Prüter. Seit 1998 in Othmarschen.",
};

/* ============================================================
   Ärztinnen-Daten
   ============================================================ */
const aerztinnen = [
  {
    name: "Dr. Claudia Schwegmann",
    rolle: "Praxisinhaberin · Fachzahnärztin für Oralchirurgie",
    bild: "/images/dr-schwegmann.jpg",
    zitat:
      "Ich möchte, dass meine Patienten mit einem guten Gefühl nach Hause gehen — nicht nur mit gesunden Zähnen.",
    ueber:
      "Dr. Claudia Schwegmann ist seit 1998 in Othmarschen tätig und hat sich als Fachzahnärztin für Oralchirurgie einen Namen gemacht. Ihr Schwerpunkt liegt auf Implantologie und Knochenaufbau — dabei setzt sie fast ausschließlich auf körpereigenes Gewebe.",
    timeline: [
      { jahr: "1988–1993", text: "Studium der Zahnmedizin" },
      {
        jahr: "1993–1998",
        text: "AK Altona, Mund-Kiefer-Gesichtschirurgie",
      },
      { jahr: "1997", text: "Fachzahnärztin für Oralchirurgie" },
      { jahr: "1998", text: "Niederlassung in Hamburg-Othmarschen" },
      {
        jahr: "2000–2009",
        text: "Study Group Dragoo (Parodontologie & Implantologie)",
      },
      { jahr: "Seit 2008", text: "Vorträge und Study Clubs für Zahnärzte" },
    ],
    tags: [
      "Oralchirurgie",
      "Implantologie",
      "Knochenaufbau",
      "Schleimhautchirurgie",
    ],
  },
  {
    name: "Dr. Nina Janz",
    rolle: "Zahnärztin · Spezialistin für Endodontie",
    bild: "/images/dr-janz.jpg",
    zitat:
      "Eine gute Wurzelbehandlung kann einen Zahn retten, der sonst verloren wäre. Das motiviert mich jeden Tag.",
    ueber:
      "Dr. Nina Janz verstärkt die Praxis seit 2008. Ihr besonderer Schwerpunkt ist die Endodontie — die Behandlung des Zahninneren. Mit ihrem Curriculum Endodontie und modernster Technik rettet sie Zähne, die andere aufgeben würden.",
    timeline: [
      { jahr: "1995–2001", text: "Studium der Zahnmedizin" },
      { jahr: "2001–2008", text: "Praxiserfahrung in Tostedt" },
      { jahr: "Seit 2008", text: "Gemeinsam mit Dr. Schwegmann" },
      { jahr: "2012–2014", text: "Curriculum Endodontie" },
    ],
    tags: ["Endodontie", "Wurzelbehandlung", "Allgemeine Zahnheilkunde"],
  },
  {
    name: "Dr. Julia Prüter",
    rolle: "Zahnärztin",
    bild: "/images/team/dr-prueter.jpg",
    zitat:
      "Ich freue mich, Teil dieses erfahrenen Teams zu sein und von den Besten zu lernen.",
    ueber:
      "Dr. Julia Prüter ist die jüngste Verstärkung unseres Teams. Nach ihrem Examen 2022 am UKE Hamburg bringt sie frisches Wissen und aktuelle Behandlungsmethoden in die Praxis ein.",
    timeline: [
      { jahr: "2022", text: "Staatsexamen am UKE Hamburg" },
      { jahr: "Seit 10/2024", text: "Zahnärztin in der Praxis" },
    ],
    tags: ["Allgemeine Zahnheilkunde"],
  },
];

export default function TeamSeite() {
  return (
    <>
      <SeiteHero
        label="Unser Team"
        titel="Die Menschen hinter"
        titelAkzent="Ihrem Lächeln"
        subtext="Drei Zahnärztinnen, ein eingespieltes Team und eine gemeinsame Überzeugung: Jeder Patient verdient unsere volle Aufmerksamkeit."
      />

      {/* ============================================================
          Ärztinnen-Portraits
          ============================================================ */}
      {aerztinnen.map((a, idx) => (
        <section
          key={a.name}
          className="relative py-20 lg:py-28 overflow-hidden"
          style={{ background: idx % 2 === 0 ? "#f4f1ec" : "#f0ede8" }}
        >
          <BaumDekor
            className={`absolute ${idx % 2 === 0 ? "-right-16 top-10" : "-left-16 bottom-10"} w-64 opacity-[0.03] ${idx % 2 === 0 ? "rotate-12" : "-rotate-12"} hidden lg:block`}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
            <div
              className={`grid lg:grid-cols-2 gap-14 items-start ${idx % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}
            >
              {/* Portrait */}
              <div
                className={`${idx % 2 !== 0 ? "lg:col-start-2" : ""} anim-einblenden`}
              >
                <div className="relative inline-block w-full max-w-md mx-auto lg:mx-0">
                  <div
                    className="absolute -inset-4 anim-blob opacity-30"
                    style={{
                      border: "1.5px solid rgba(242, 101, 34, 0.12)",
                      borderRadius: "54% 46% 51% 49% / 49% 54% 46% 51%",
                      animationDelay: `${idx * 2}s`,
                    }}
                  />
                  <div
                    className="team-bild-hover relative overflow-hidden"
                    style={{
                      borderRadius:
                        "50% 50% 44% 56% / 54% 44% 56% 46%",
                      boxShadow:
                        "0 24px 48px -12px rgba(105, 123, 123, 0.18)",
                      aspectRatio: "4/5",
                    }}
                  >
                    <Image
                      src={a.bild}
                      alt={a.name}
                      fill
                      className="object-cover"
                      style={{
                        filter: "saturate(0.92) brightness(1.02)",
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(105, 123, 123, 0.08), transparent 40%)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Inhalt */}
              <div className="anim-einblenden d2">
                <h2
                  className="text-3xl lg:text-4xl mb-2"
                  style={{
                    fontFamily:
                      "var(--font-cormorant), 'Cormorant Garamond', serif",
                    fontWeight: 600,
                    color: "#2d3a3a",
                  }}
                >
                  {a.name}
                </h2>
                <p
                  className="text-sm tracking-wider mb-6"
                  style={{
                    color: "#F26522",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                  }}
                >
                  {a.rolle}
                </p>

                {/* Zitat */}
                <blockquote
                  className="relative pl-5 mb-8"
                  style={{
                    borderLeft: "3px solid rgba(242, 101, 34, 0.3)",
                  }}
                >
                  <p
                    className="text-base italic"
                    style={{
                      color: "#4a5959",
                      fontWeight: 300,
                      lineHeight: 1.8,
                    }}
                  >
                    &bdquo;{a.zitat}&ldquo;
                  </p>
                </blockquote>

                <p
                  className="text-base leading-relaxed mb-8"
                  style={{
                    color: "#4a5959",
                    fontWeight: 300,
                    lineHeight: 1.85,
                  }}
                >
                  {a.ueber}
                </p>

                {/* Timeline */}
                <div className="space-y-3 mb-8">
                  {a.timeline.map((t) => (
                    <div key={t.jahr} className="flex gap-4 items-baseline">
                      <span
                        className="text-xs shrink-0 w-24 text-right tracking-wider"
                        style={{
                          color: "#697B7B",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {t.jahr}
                      </span>
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                        style={{ background: "#F26522", opacity: 0.4 }}
                      />
                      <span
                        className="text-sm"
                        style={{
                          color: "#5a6a6a",
                          fontWeight: 300,
                          lineHeight: 1.6,
                        }}
                      >
                        {t.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {a.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs tracking-wider rounded-full"
                      style={{
                        background: "rgba(105, 123, 123, 0.07)",
                        color: "#697B7B",
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ============================================================
          Praxisteam & Gruppenfoto
          ============================================================ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#f4f1ec" }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <SektionsHeader
            label="Unser Praxisteam"
            titel="Eingespielt, herzlich,"
            titelAkzent="kompetent"
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className="relative overflow-hidden anim-einblenden"
              style={{
                borderRadius: "24px",
                boxShadow:
                  "0 20px 44px -10px rgba(105, 123, 123, 0.16)",
              }}
            >
              <Image
                src="/images/team/team-gruppenfoto-treppe.jpg"
                alt="Das gesamte Praxisteam der Zahnärzte Parkstrasse"
                width={700}
                height={500}
                className="w-full h-auto object-cover"
                style={{
                  filter: "saturate(0.90) brightness(1.02)",
                }}
              />
            </div>

            <div className="anim-einblenden d2">
              <p
                className="text-lg leading-relaxed mb-6"
                style={{
                  color: "#4a5959",
                  fontWeight: 300,
                  lineHeight: 1.85,
                }}
              >
                Was wäre eine gute Praxis ohne hervorragende
                Mitarbeiterinnen? Viele sind schon lange Jahre dabei und
                haben uns trotz Familienzuwachs die Treue gehalten. Unser
                Team am Empfang und in der Behandlung sorgt dafür, dass
                Sie sich von der ersten Sekunde an wohlfühlen.
              </p>

              <div
                className="relative overflow-hidden mt-8"
                style={{
                  borderRadius: "20px",
                  boxShadow:
                    "0 16px 36px -8px rgba(105, 123, 123, 0.14)",
                }}
              >
                <Image
                  src="/images/team/team-gruppenfoto-stehend.webp"
                  alt="Das Praxisteam vor der Praxis"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  style={{
                    filter: "saturate(0.90) brightness(1.02)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        titel="Lernen Sie uns"
        titelAkzent="persönlich kennen"
        text="Wir freuen uns darauf, Sie in unserer Praxis begrüßen zu dürfen."
      />
    </>
  );
}
