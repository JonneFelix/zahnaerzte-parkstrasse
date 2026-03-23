import type { Metadata } from "next";
import Image from "next/image";
import SeiteHero from "../components/SeiteHero";
import SektionsHeader from "../components/SektionsHeader";
import CTABanner from "../components/CTABanner";

export const metadata: Metadata = {
  title: "Innovationen",
  description:
    "Moderne Zahnmedizin in Hamburg-Othmarschen: Schmelzidentische Kronen, Zahntrauma-Behandlung, Mucogingivalchirurgie und Knochenerhalt durch eigene Zähne.",
};

const innovationen = [
  {
    titel: "Schmelzidentische Kronen und Füllungen",
    kurztext:
      "Zahnfarbene Keramiken mit der gleichen Härte wie natürlicher Zahnschmelz — fest aufgeklebt wie neuer Schmelz.",
    langtext:
      "Viele Kronen aus Keramik sind sehr hart und können die Gegenbezahnung oder den überkronten Zahn langfristig schädigen. Daher verwenden wir gerne zahnfarbene Keramiken, die die gleiche Härte wie natürlicher Zahnschmelz haben, und auf die Zähne fest aufgeklebt werden, wie neuer Schmelz. Besondere Bedeutung kommt dieses Verfahren bei komplexen Rehabilitationen, z.B. wenn die Zähne stark abgenutzt sind. Dank moderner KI-gestützter Abdrucktechniken (Scan) ohne Abdrucklöffel.",
    bild: "/images/patientenberatung.jpg",
  },
  {
    titel: "Zahntrauma",
    kurztext:
      "Spezialisierung auf die Behandlung und ästhetische Wiederherstellung verletzter Frontzähne.",
    langtext:
      "Bei einem Zahntrauma wird meistens einer oder mehrere Frontzähne verletzt. Im schlimmsten Fall können Zähne sogar ganz aus dem Mund herausgebrochen werden. Daraus entwickeln sich nicht selten langfristige Probleme, die aber in den richtigen Händen gut lösbar sind. Bei uns sind Sie genau richtig, wenn es um die Behandlung und ästhetische Wiederherstellung der Frontzähne geht.",
  },
  {
    titel: "Zahnfleischchirurgie",
    kurztext:
      "25 Jahre Expertise in der Wiederherstellung gesunder Zahnfleischverhältnisse.",
    langtext:
      "Zur Wiederherstellung gesunder Zahnfleischverhältnisse, wie Durchblutungsverbesserungen, ästhetische Verbesserungen im sichtbaren Bereich sowie vor oder nach dem Setzen von Implantaten braucht man gute Kenntnisse in Parodontologie und Mucogingivalchirurgie. Seit 25 Jahren haben wir hier Expertise, und können so Implantate und Zähne möglichst lebenslang im Mund unserer Patienten belassen.",
    bild: "/images/mikroskop-in-aktion.jpg",
  },
  {
    titel: "Knochenerhalt durch eigene Zähne",
    kurztext:
      "Teile des entfernten Zahnes werden zum Knochenerhalt verwendet — teure Knochenaufbauten entfallen oft.",
    langtext:
      "Damit bezeichnet man ein Verfahren, durch das beim Entfernen des Zahnes Teile des Zahnes zum Knochenerhalt verwendet werden können. So entfallen oft teure und langwierige Knochenaufbauten vor einer Implantation.",
  },
];

export default function InnovationenSeite() {
  return (
    <>
      <SeiteHero
        label="Was uns auszeichnet"
        titel="Innovationen"
        titelAkzent="in unserer Praxis"
        subtext="Moderne Methoden und besondere Kompetenzen, die Sie bei uns finden — für schonendere Behandlungen und bessere Ergebnisse."
      />

      {/* Innovationen-Blöcke */}
      <section
        className="relative py-14 lg:py-32 overflow-hidden"
        style={{ background: "#f4f1ec" }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
          <div className="space-y-16">
            {innovationen.map((item, i) => (
              <div
                key={item.titel}
                className={`anim-einblenden d${i + 2}`}
              >
                <div
                  className={`grid ${item.bild ? "lg:grid-cols-5" : ""} gap-8 items-start`}
                >
                  {/* Text */}
                  <div className={item.bild ? "lg:col-span-3" : ""}>
                    <h2
                      className="text-2xl lg:text-3xl mb-4"
                      style={{
                        fontFamily:
                          "var(--font-cormorant), 'Cormorant Garamond', serif",
                        fontWeight: 500,
                        color: "#2d3a3a",
                      }}
                    >
                      {item.titel}
                    </h2>
                    <p
                      className="text-base lg:text-lg mb-4"
                      style={{
                        color: "#F26522",
                        fontWeight: 500,
                        lineHeight: 1.6,
                      }}
                    >
                      {item.kurztext}
                    </p>
                    <p
                      className="text-base leading-relaxed"
                      style={{
                        color: "#5a6a6a",
                        fontWeight: 300,
                        lineHeight: 1.8,
                      }}
                    >
                      {item.langtext}
                    </p>
                  </div>

                  {/* Bild (optional) */}
                  {item.bild && (
                    <div className="lg:col-span-2">
                      <div
                        className="overflow-hidden"
                        style={{
                          borderRadius: "18px",
                          boxShadow:
                            "0 12px 32px -8px rgba(105, 123, 123, 0.15)",
                        }}
                      >
                        <Image
                          src={item.bild}
                          alt={item.titel}
                          width={400}
                          height={300}
                          className="w-full h-auto object-cover"
                          style={{ aspectRatio: "4/3" }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Trenner */}
                {i < innovationen.length - 1 && (
                  <div
                    className="mt-16 h-px"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(105, 123, 123, 0.1), transparent)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
