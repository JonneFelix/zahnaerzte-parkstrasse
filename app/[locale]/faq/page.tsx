import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../components/SeiteHero";
import SektionsHeader from "../../components/SektionsHeader";
import CTABanner from "../../components/CTABanner";

export const metadata: Metadata = {
  title: "Häufige Fragen",
  description:
    "Antworten auf die häufigsten Fragen: Kosten, Ablauf, Versicherung, Angstpatienten. Zahnärzte Parkstrasse in Hamburg-Othmarschen.",
};

const kategorien = [
  {
    titel: "Allgemein",
    fragen: [
      {
        frage: "Muss ich lange auf einen Termin warten?",
        antwort: "In der Regel können wir Ihnen innerhalb von 1–2 Wochen einen Termin anbieten. Bei akuten Beschwerden bemühen wir uns um einen kurzfristigen Termin.",
      },
      {
        frage: "Behandeln Sie auch Angstpatienten?",
        antwort: "Ja, ausdrücklich. Wir nehmen uns besonders viel Zeit und erklären jeden Schritt. Viele unserer Patienten kamen anfangs mit Zahnarztangst zu uns.",
      },
      {
        frage: "Welche Sprachen sprechen Sie?",
        antwort: "Deutsch, Englisch, Französisch und Spanisch.",
      },
    ],
  },
  {
    titel: "Kosten & Versicherung",
    fragen: [
      {
        frage: "Was kostet eine Behandlung?",
        antwort: "Wir erstellen immer vorab einen transparenten Kostenplan. Gesetzlich Versicherte erhalten die Kassenleistung; Zusatzleistungen werden vorher besprochen.",
      },
      {
        frage: "Nehmen Sie Privatpatienten?",
        antwort: "Ja, wir behandeln sowohl gesetzlich als auch privat versicherte Patienten.",
      },
      {
        frage: "Bieten Sie Ratenzahlung an?",
        antwort: "Bei größeren Behandlungen bieten wir Ihnen individuelle Zahlungsvereinbarungen an.",
      },
    ],
  },
  {
    titel: "Behandlungen",
    fragen: [
      {
        frage: "Tut eine Wurzelbehandlung weh?",
        antwort: "Nein — unter Betäubung spüren Sie nichts. Mehr dazu auf unserer Seite zur Wurzelbehandlung.",
        link: "/leistungen/wurzelbehandlung",
      },
      {
        frage: "Wie lange halten Implantate?",
        antwort: "Bei guter Pflege ein Leben lang. Die aufgesetzte Krone hält durchschnittlich 15–20 Jahre.",
        link: "/leistungen/implantate",
      },
      {
        frage: "Ab welchem Alter sollte mein Kind zum Zahnarzt?",
        antwort: "Ab dem ersten Milchzahn — meist um den 6. Lebensmonat.",
        link: "/leistungen/kinderzahnheilkunde",
      },
    ],
  },
];

export default function FAQSeite() {
  return (
    <>
      <SeiteHero
        label="FAQ"
        titel="Häufig gestellte"
        titelAkzent="Fragen"
        subtext="Hier finden Sie Antworten auf die Fragen, die uns am häufigsten gestellt werden."
      />

      {kategorien.map((kat, katIdx) => (
        <section
          key={kat.titel}
          className="relative py-20 lg:py-28 overflow-hidden"
          style={{ background: katIdx % 2 === 0 ? "#f4f1ec" : "#f0ede8" }}
        >
          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
            <SektionsHeader label={kat.titel} titel="" titelAkzent={kat.titel} />

            <div className="space-y-5">
              {kat.fragen.map((f, i) => (
                <div
                  key={i}
                  className={`p-6 anim-einblenden d${i + 2}`}
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    borderRadius: "18px",
                    border: "1px solid rgba(105,123,123,0.07)",
                  }}
                >
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ color: "#2d3a3a" }}
                  >
                    {f.frage}
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      color: "#6a7a7a",
                      fontWeight: 300,
                      lineHeight: 1.7,
                    }}
                  >
                    {f.antwort}
                  </p>
                  {"link" in f && f.link && (
                    <Link
                      href={f.link}
                      className="inline-flex items-center gap-1.5 mt-3 text-sm transition-colors duration-300 hover:text-[#e3541a]"
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
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTABanner
        titel="Noch Fragen?"
        titelAkzent="Rufen Sie uns an"
        text="Wir beantworten gern alle weiteren Fragen persönlich."
      />
    </>
  );
}
