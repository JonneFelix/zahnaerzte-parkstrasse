import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SeiteHero from "../../components/SeiteHero";
import SektionsHeader from "../../components/SektionsHeader";
import CTABanner from "../../components/CTABanner";
import BaumDekor from "../../components/BaumDekor";
import { getDictionary, type Locale } from "../../../lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Team as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return { title: meta.title, description: meta.description };
}

/* Nicht-übersetzbare Daten */
const aerztinnenBilder = ["/images/team/dr-schwegmann-portrait-neu.jpg", "/images/dr-janz.jpg", "/images/team/dr-prueter.jpg"];
const aerztinnenBildPosition = ["55% 10%", "center center", "center center"];
const aerztinnenNamen = ["Dr. Claudia Schwegmann", "Dr. Nina Janz", "Dr. Julia Prüter"];
const aerztinnenKeys = ["schwegmann", "janz", "prueter"];

export default async function TeamSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Team as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const aerztinnenData = t.aerztinnen as Record<string, Record<string, unknown>>;
  const praxisteam = t.praxisteam as Record<string, string>;
  const cta = t.cta as Record<string, string>;

  // Ärztinnen-Daten zusammenbauen
  const aerztinnen = aerztinnenKeys.map((key, i) => {
    const a = aerztinnenData[key];
    const timeline = a.timeline as Record<string, Record<string, string>>;
    const timelineArr = Object.values(timeline).map((entry) => ({
      jahr: entry.jahr,
      text: entry.text,
    }));
    return {
      name: aerztinnenNamen[i],
      bild: aerztinnenBilder[i],
      bildPosition: aerztinnenBildPosition[i] || "center center",
      rolle: a.rolle as string,
      zitat: a.zitat as string,
      ueber: a.ueber as string,
      timeline: timelineArr,
      tags: a.tags as string[],
    };
  });

  return (
    <>
      <SeiteHero
        label={hero.label}
        titel={hero.titel}
        titelAkzent={hero.titelAkzent}
        subtext={hero.subtext}
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
                        objectPosition: a.bildPosition,
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
                  {a.timeline.map((tl) => (
                    <div key={tl.jahr} className="flex gap-4 items-baseline">
                      <span
                        className="text-xs shrink-0 w-24 text-right tracking-wider"
                        style={{
                          color: "#697B7B",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {tl.jahr}
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
                        {tl.text}
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
            label={praxisteam.label}
            titel={praxisteam.titel}
            titelAkzent={praxisteam.titelAkzent}
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
                alt={praxisteam.gruppenfotoAlt}
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
                {praxisteam.text}
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
                  alt={praxisteam.gruppenfoto2Alt}
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
        titel={cta.titel}
        titelAkzent={cta.titelAkzent}
        text={cta.text}
      />
    </>
  );
}
