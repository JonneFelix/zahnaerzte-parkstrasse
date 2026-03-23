import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../../components/SeiteHero";
import SektionsHeader from "../../../components/SektionsHeader";
import CTABanner from "../../../components/CTABanner";

export const metadata: Metadata = {
  title: "Parodontosebehandlung Hamburg | Parodontologie Othmarschen",
  description:
    "Parodontosebehandlung in Hamburg-Othmarschen: Individuelle Therapie bei Zahnfleischentzündung und Knochenschwund. Konservative und chirurgische Behandlung.",
};

const warnsignale = [
  "Zahnfleischbluten beim Zähneputzen",
  "Rötung und Schwellung des Zahnfleisches",
  "Zahnfleischrückgang — Zähne wirken länger",
  "Mundgeruch trotz guter Mundhygiene",
  "Lockere Zähne oder veränderte Zahnstellung",
];

const behandlung = [
  { titel: "Diagnostik", text: "Gründliche Untersuchung mit Messung der Zahnfleischtaschen und Röntgendiagnostik." },
  { titel: "Konservative Therapie", text: "Gründliche Reinigung der Zahnfleischtaschen unter Betäubung — die Basis jeder Parodontosebehandlung." },
  { titel: "Chirurgische Therapie", text: "Bei fortgeschrittener Erkrankung: chirurgische Taschen-Reinigung und regenerative Verfahren durch Fachzahnärztin Dr. Schwegmann." },
  { titel: "Nachsorge", text: "Regelmäßige Kontrollen und Prophylaxe — damit die Parodontose dauerhaft unter Kontrolle bleibt." },
];

export default function ParodontologieSeite() {
  return (
    <>
      <SeiteHero
        label="Parodontologie"
        titel="Parodontologie —"
        titelAkzent="Ihre Zähne fest verankert"
        subtext="Parodontose ist im fortgeschrittenen Alter die häufigste Ursache für Zahnverlust — aber gut behandelbar. Wir bieten Ihnen das gesamte Spektrum: von der konservativen Therapie bis zur chirurgischen Parodontosebehandlung."
      />

      {/* Was ist Parodontose */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <SektionsHeader label="Verstehen" titel="Was ist" titelAkzent="Parodontose?" />
          <p className="text-base leading-relaxed" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.85 }}>
            Parodontose (Parodontitis) ist eine chronische Entzündung des Zahnhalteapparats — also des Zahnfleisches und des Knochens, der Ihre Zähne hält. Unbehandelt führt sie zum Knochenabbau und letztlich zum Zahnverlust. Die gute Nachricht: Früh erkannt, ist Parodontose sehr gut behandelbar.
          </p>
        </div>
      </section>

      {/* Warnsignale */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Erkennen" titel="Warnsignale" titelAkzent="ernst nehmen" />
          <div className="space-y-4">
            {warnsignale.map((w, i) => (
              <div key={i} className={`flex items-start gap-4 anim-einblenden d${i + 2}`}>
                <div className="w-6 h-6 shrink-0 mt-0.5 flex items-center justify-center rounded-full" style={{ background: "rgba(242,101,34,0.1)" }}>
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="#F26522" strokeWidth="2"><path d="M8 4v5M8 11v1" strokeLinecap="round" /></svg>
                </div>
                <p className="text-base" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.7 }}>{w}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Behandlung */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Behandlung" titel="Ihr Weg zu" titelAkzent="gesundem Zahnfleisch" />
          <div className="grid md:grid-cols-2 gap-7">
            {behandlung.map((b, i) => (
              <div key={b.titel} className={`p-7 karte-hover anim-einblenden d${i + 2}`} style={{ background: "rgba(255,255,255,0.6)", borderRadius: "22px", border: "1px solid rgba(105,123,123,0.07)" }}>
                <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{b.titel}</h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interne Links */}
      <section className="py-10" style={{ background: "#f0ede8" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 flex flex-wrap justify-center gap-4">
          {[
            { text: "Prophylaxe", href: "/leistungen/prophylaxe" },
            { text: "Oralchirurgie", href: "/leistungen/oralchirurgie" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="px-5 py-2.5 text-sm tracking-wider rounded-full transition-all duration-300 hover:bg-white" style={{ color: "#697B7B", fontWeight: 500, border: "1px solid rgba(105,123,123,0.15)", letterSpacing: "0.06em" }}>
              {l.text}
            </Link>
          ))}
        </div>
      </section>

      <CTABanner titel="Zahnfleischprobleme?" titelAkzent="Wir helfen" text="Vereinbaren Sie einen Beratungstermin — je früher, desto besser." />
    </>
  );
}
