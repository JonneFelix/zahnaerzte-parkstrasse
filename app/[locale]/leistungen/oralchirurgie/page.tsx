import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../../components/SeiteHero";
import SektionsHeader from "../../../components/SektionsHeader";
import CTABanner from "../../../components/CTABanner";
import BaumDekor from "../../../components/BaumDekor";

export const metadata: Metadata = {
  title: "Oralchirurgie Hamburg Othmarschen | Fachzahnärztin Dr. Schwegmann",
  description:
    "Oralchirurgie in Hamburg-Othmarschen: Implantate, Knochenaufbau, Weisheitszahn-OP, Schleimhautchirurgie. Fachzahnärztin Dr. Schwegmann — über 25 Jahre Erfahrung.",
};

const bereiche = [
  {
    titel: "Implantate & Knochenaufbau",
    text: "Festsitzende Zähne auf Implantaten — bei Bedarf mit Knochenaufbau aus körpereigenem Gewebe. Wir vermeiden Fremdmaterial wo immer möglich.",
    link: "/leistungen/implantate",
  },
  {
    titel: "Schleimhautchirurgie",
    text: "Wiederherstellung von Schleimhaut und Zahnfleisch: bei freiliegenden Zahnhälsen, nach Implantationen oder zur ästhetischen Korrektur.",
  },
  {
    titel: "Weisheitszahn-Entfernung",
    text: "Schonend und kompetent — auch bei schwierigen Verhältnissen. In unserer Praxis, nicht im Krankenhaus.",
  },
  {
    titel: "Chirurgische Parodontose-Therapie",
    text: "Wenn die konservative Behandlung nicht ausreicht: chirurgische Taschen-Reinigung und regenerative Verfahren.",
    link: "/leistungen/parodontologie",
  },
  {
    titel: "Präprothetische Chirurgie",
    text: "Vorbereitung des Kiefers für Zahnersatz: Knochenaufbau, Schleimhautkorrektur, Alveolarkamm-Plastik.",
  },
];

const vorteile = [
  {
    titel: "Fachzahnärztin",
    text: "Nicht jeder Zahnarzt darf sich so nennen. Die Weiterbildung umfasst 4 Jahre klinische Chirurgie.",
  },
  {
    titel: "Körpereigenes Gewebe",
    text: "Knochenaufbau bevorzugt mit Ihrem eigenen Material — für bessere Einheilung.",
  },
  {
    titel: "Lupenbrille & Mikroskop",
    text: "Höchste Präzision auch bei kleinsten Strukturen.",
  },
  {
    titel: "Minimalinvasiv",
    text: "So viel wie nötig, so schonend wie möglich.",
  },
];

const fragen = [
  {
    frage: "Ist eine Oralchirurgie schmerzhaft?",
    antwort:
      "Nein. Dank moderner Betäubung spüren Sie während des Eingriffs nichts. Danach erhalten Sie ein individuelles Schmerzmanagement.",
  },
  {
    frage: "Was ist der Unterschied zwischen Zahnarzt und Oralchirurg?",
    antwort:
      "Eine Fachzahnärztin für Oralchirurgie hat nach dem Studium eine 4-jährige klinische Weiterbildung in Chirurgie absolviert — vergleichbar mit einer Facharzt-Ausbildung in der Medizin.",
  },
  {
    frage: "Brauche ich eine Überweisung?",
    antwort:
      "Nein. Sie können sich direkt bei uns vorstellen.",
  },
];

export default function OralchirurgieSeite() {
  return (
    <>
      <SeiteHero
        label="Unser Schwerpunkt"
        titel="Oralchirurgie —"
        titelAkzent="unser Schwerpunkt"
        subtext="Chirurgische Eingriffe erfordern Erfahrung, Präzision und Einfühlungsvermögen. Als Fachzahnärztin für Oralchirurgie vereint Dr. Schwegmann alle drei — seit über 25 Jahren."
        badge="Dr. Claudia Schwegmann — Fachzahnärztin für Oralchirurgie"
      />

      {/* ============================================================
          Leistungs-Übersicht
          ============================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <BaumDekor className="absolute -right-16 top-10 w-64 opacity-[0.03] rotate-12 hidden lg:block" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Behandlungsspektrum" titel="Was wir für" titelAkzent="Sie tun" />

          <div className="space-y-5">
            {bereiche.map((b, i) => (
              <div
                key={b.titel}
                className={`p-6 lg:p-8 karte-hover anim-einblenden d${Math.min(i + 2, 8)}`}
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "18px",
                  border: "1px solid rgba(105, 123, 123, 0.07)",
                }}
              >
                <h3
                  className="text-xl mb-2"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 600,
                    color: "#2d3a3a",
                  }}
                >
                  {b.titel}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>
                  {b.text}
                </p>
                {b.link && (
                  <Link
                    href={b.link}
                    className="inline-flex items-center gap-1.5 mt-3 text-sm transition-colors duration-300 hover:text-[#e3541a]"
                    style={{ color: "#F26522", fontWeight: 500 }}
                  >
                    Mehr erfahren
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2" fill="none"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          Vorteile
          ============================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Ihre Vorteile" titel="Warum Oralchirurgie" titelAkzent="bei uns?" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {vorteile.map((v, i) => (
              <div
                key={v.titel}
                className={`text-center p-7 karte-hover anim-einblenden d${i + 2}`}
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "22px",
                  border: "1px solid rgba(105, 123, 123, 0.07)",
                }}
              >
                <div
                  className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full"
                  style={{ background: "rgba(242, 101, 34, 0.08)" }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#F26522" strokeWidth="2"><path d="M5 12l5 5L20 7" /></svg>
                </div>
                <h3 className="text-base mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                  {v.titel}
                </h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ
          ============================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Häufige Fragen" titel="Ihre Fragen," titelAkzent="unsere Antworten" />

          <div className="space-y-5">
            {fragen.map((f, i) => (
              <div
                key={i}
                className={`p-6 anim-einblenden d${i + 2}`}
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "18px",
                  border: "1px solid rgba(105, 123, 123, 0.07)",
                }}
              >
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
            { text: "Implantate", href: "/leistungen/implantate" },
            { text: "Parodontologie", href: "/leistungen/parodontologie" },
            { text: "Unser Team", href: "/team" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-5 py-2.5 text-sm tracking-wider rounded-full transition-all duration-300 hover:bg-white"
              style={{ color: "#697B7B", fontWeight: 500, border: "1px solid rgba(105, 123, 123, 0.15)", letterSpacing: "0.06em" }}
            >
              {l.text}
            </Link>
          ))}
        </div>
      </section>

      <CTABanner
        titel="Beratungstermin für"
        titelAkzent="chirurgische Fragen"
        text="Vereinbaren Sie einen unverbindlichen Beratungstermin."
      />
    </>
  );
}
