import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../../components/SeiteHero";
import SektionsHeader from "../../../components/SektionsHeader";
import CTABanner from "../../../components/CTABanner";

export const metadata: Metadata = {
  title: "Zahnersatz Hamburg Othmarschen | Kronen, Brücken & Prothesen",
  description:
    "Hochwertiger Zahnersatz in Hamburg-Othmarschen: Kronen, Brücken, Prothesen — gefertigt mit Intraoralscanner. Zahntechnik aus der Region, nicht aus dem Ausland.",
};

const optionen = [
  { titel: "Kronen", text: "Vollkeramik-Kronen für natürliche Ästhetik und maximale Haltbarkeit — passgenau dank digitalem Abdruck." },
  { titel: "Brücken", text: "Festsitzende Brücken zum Schließen von Zahnlücken — für ein lückenloses Lächeln und volle Kaufunktion." },
  { titel: "Teilprothesen", text: "Herausnehmbarer Zahnersatz mit präziser Passform — wenn mehrere Zähne fehlen." },
  { titel: "Vollprothesen", text: "Hochwertige Totalprothesen mit natürlichem Aussehen — für neuen Halt und Lebensqualität." },
  { titel: "Implantatgetragener Zahnersatz", text: "Festsitzende Zähne auf Implantaten — die komfortabelste Lösung, die sich wie eigene Zähne anfühlt." },
];

export default function ZahnersatzSeite() {
  return (
    <>
      <SeiteHero
        label="Zahnersatz"
        titel="Zahnersatz —"
        titelAkzent="so natürlich wie Ihre eigenen Zähne"
        subtext="Ob Krone, Brücke oder Prothese: Wir finden die beste Lösung für Sie — gefertigt von unserem Partnerlabor in Bönningstedt, mit modernster Scannertechnologie."
      />

      {/* Optionen */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <SektionsHeader label="Ihre Optionen" titel="Die richtige Lösung" titelAkzent="für Sie" />
          <div className="space-y-5">
            {optionen.map((o, i) => (
              <div key={o.titel} className={`p-6 lg:p-8 karte-hover anim-einblenden d${Math.min(i + 2, 8)}`} style={{ background: "rgba(255,255,255,0.6)", borderRadius: "18px", border: "1px solid rgba(105,123,123,0.07)" }}>
                <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{o.titel}</h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualität */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <SektionsHeader label="Qualität" titel="Zahnersatz aus" titelAkzent="der Region" />
          <div className="space-y-4">
            {[
              "Intraoralscanner statt unangenehmer Abdrücke — digital, präzise, schnell.",
              "Zahnersatz aus Bönningstedt, nicht aus China — regionale Qualität, kurze Wege.",
              "Transparente Kosten: Kassenleistung und Eigenanteil klar erklärt, bevor wir beginnen.",
            ].map((text, i) => (
              <div key={i} className={`flex items-start gap-4 text-left anim-einblenden d${i + 2}`}>
                <div className="w-6 h-6 shrink-0 mt-0.5 flex items-center justify-center rounded-full" style={{ background: "rgba(242,101,34,0.1)" }}>
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="#F26522" strokeWidth="2"><path d="M3 8l3.5 3.5L13 5" /></svg>
                </div>
                <p className="text-base" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.7 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interne Links */}
      <section className="py-10" style={{ background: "#f4f1ec" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 flex flex-wrap justify-center gap-4">
          {[
            { text: "Implantate", href: "/leistungen/implantate" },
            { text: "Ästhetik", href: "/leistungen/aesthetik" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="px-5 py-2.5 text-sm tracking-wider rounded-full transition-all duration-300 hover:bg-white" style={{ color: "#697B7B", fontWeight: 500, border: "1px solid rgba(105,123,123,0.15)", letterSpacing: "0.06em" }}>
              {l.text}
            </Link>
          ))}
        </div>
      </section>

      <CTABanner titel="Beratung zu" titelAkzent="Ihrem Zahnersatz" text="Wir finden gemeinsam die beste Lösung — vereinbaren Sie einen Beratungstermin." />
    </>
  );
}
