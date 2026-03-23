import type { Metadata } from "next";
import Image from "next/image";
import SeiteHero from "../../components/SeiteHero";
import SektionsHeader from "../../components/SektionsHeader";
import CTABanner from "../../components/CTABanner";
import { getDictionary, type Locale } from "../../../lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Innovationen as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return { title: meta.title, description: meta.description };
}

const innovationsBilder: Record<string, string | undefined> = {
  kronen: "/images/patientenberatung.jpg",
  zahntrauma: undefined,
  zahnfleisch: "/images/mikroskop-in-aktion.jpg",
  knochenerhalt: undefined,
};

export default async function InnovationenSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Innovationen as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const items = t.items as Record<string, Record<string, string>>;

  const innovationsKeys = ["kronen", "zahntrauma", "zahnfleisch", "knochenerhalt"];
  const innovationen = innovationsKeys.map((key) => ({
    titel: items[key].titel,
    kurztext: items[key].kurztext,
    langtext: items[key].langtext,
    bild: innovationsBilder[key],
  }));

  return (
    <>
      <SeiteHero
        label={hero.label}
        titel={hero.titel}
        titelAkzent={hero.titelAkzent}
        subtext={hero.subtext}
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
