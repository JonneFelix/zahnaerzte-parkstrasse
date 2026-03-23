import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../../components/SeiteHero";
import SektionsHeader from "../../../components/SektionsHeader";
import CTABanner from "../../../components/CTABanner";

export const metadata: Metadata = {
  title: "Wurzelbehandlung Hamburg | Endodontie Dr. Janz — Othmarschen",
  description:
    "Schmerzfreie Wurzelbehandlung in Hamburg-Othmarschen: Modernste Endodontie mit Mikroskop und elektronischer Längenmessung. Dr. Nina Janz — Spezialistin für Zahnerhalt.",
};

const technik = [
  { titel: "Mikroskop-Einsatz", text: "Vergrößerung bis 25-fach — für maximale Übersicht und Präzision in den feinen Wurzelkanälen." },
  { titel: "Biegsame Instrumente", text: "Maschinelle Aufbereitung mit flexiblen Nickel-Titan-Feilen — schonend und gründlich." },
  { titel: "Elektronische Längenmessung", text: "Exakte Bestimmung der Kanallänge — weniger Röntgenbilder, mehr Sicherheit." },
  { titel: "Thermoplastische Füllung", text: "Dreidimensionale Versiegelung der Kanäle — für einen dauerhaften Verschluss." },
];

const fragen = [
  {
    frage: "Tut eine Wurzelbehandlung weh?",
    antwort: "Nein. Unter Betäubung spüren Sie nichts — viele Patienten sind überrascht, wie wenig sie merken.",
  },
  {
    frage: "Wie lange dauert eine Wurzelbehandlung?",
    antwort: "In der Regel 60–90 Minuten, manchmal verteilt auf zwei Sitzungen.",
  },
  {
    frage: "Ist der Zahn danach tot?",
    antwort: "Der Zahn hat keinen Nerv mehr, bleibt aber als fester Bestandteil Ihres Gebisses erhalten und funktionsfähig.",
  },
];

export default function WurzelbehandlungSeite() {
  return (
    <>
      <SeiteHero
        label="Endodontie"
        titel="Wurzelbehandlung —"
        titelAkzent="Zahnerhalt auf höchstem Niveau"
        subtext="Eine Wurzelbehandlung hat heute nichts mehr mit ihrem alten Ruf zu tun. Dr. Nina Janz behandelt mit modernster Technik — sanft, präzise und mit dem Ziel, Ihren Zahn zu retten."
        badge="Dr. Nina Janz — Curriculum Endodontie"
      />

      {/* Warum Zahnerhalt */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Zahnerhalt" titel="Warum Ihr eigener Zahn" titelAkzent="der beste ist" />
          <p className="text-base leading-relaxed text-center" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.85 }}>
            Kein Implantat und kein Zahnersatz kann einen eigenen, gesunden Zahn vollständig ersetzen. Deshalb setzen wir alles daran, Ihren natürlichen Zahn zu erhalten — auch wenn er stark geschädigt ist. Die moderne Endodontie macht es möglich.
          </p>
        </div>
      </section>

      {/* Technik */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Modernste Technik" titel="So behandeln wir" titelAkzent="Ihre Wurzelkanäle" />
          <div className="grid md:grid-cols-2 gap-7">
            {technik.map((t, i) => (
              <div
                key={t.titel}
                className={`p-7 karte-hover anim-einblenden d${i + 2}`}
                style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", borderRadius: "22px", border: "1px solid rgba(105,123,123,0.07)" }}
              >
                <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{t.titel}</h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Häufige Fragen" titel="Ihre Fragen zur" titelAkzent="Wurzelbehandlung" />
          <div className="space-y-5">
            {fragen.map((f, i) => (
              <div key={i} className={`p-6 anim-einblenden d${i + 2}`} style={{ background: "rgba(255,255,255,0.6)", borderRadius: "18px", border: "1px solid rgba(105,123,123,0.07)" }}>
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
            { text: "Dr. Nina Janz", href: "/team" },
            { text: "Prophylaxe", href: "/leistungen/prophylaxe" },
            { text: "Zahnersatz", href: "/leistungen/zahnersatz" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="px-5 py-2.5 text-sm tracking-wider rounded-full transition-all duration-300 hover:bg-white" style={{ color: "#697B7B", fontWeight: 500, border: "1px solid rgba(105,123,123,0.15)", letterSpacing: "0.06em" }}>
              {l.text}
            </Link>
          ))}
        </div>
      </section>

      <CTABanner
        titel="Zahnschmerzen?"
        titelAkzent="Wir helfen Ihnen"
        text="Vereinbaren Sie schnell einen Termin — wir kümmern uns um Ihren Zahn."
      />
    </>
  );
}
