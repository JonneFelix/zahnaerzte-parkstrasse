import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SeiteHero from "../../components/SeiteHero";
import SektionsHeader from "../../components/SektionsHeader";
import CTABanner from "../../components/CTABanner";
import BaumDekor from "../../components/BaumDekor";
import { getDictionary, type Locale } from "../../../lib/i18n";
import { createMetadata } from "../../../lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Praxis as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return createMetadata(locale, "praxis", meta);
}

export default async function PraxisSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Praxis as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const philosophie = t.philosophie as Record<string, string>;
  const raeume = t.raeume as Record<string, unknown>;
  const bilder = raeume.bilder as Record<string, string>;
  const ausstattung = t.ausstattung as Record<string, unknown>;
  const ausstattungItems = ausstattung.items as Record<string, Record<string, string>>;
  const sprachen = t.sprachen as Record<string, string>;
  const netzwerk = t.netzwerk as Record<string, unknown>;
  const partner = netzwerk.partner as Record<string, Record<string, string>>;
  const cta = t.cta as Record<string, string>;

  const ausstattungKeys = ["intraoralscanner", "lupenbrille", "roentgen", "gewebe"];
  const ausstattungArr = ausstattungKeys.map((key) => ({
    titel: ausstattungItems[key].titel,
    text: ausstattungItems[key].text,
    icon: {
      intraoralscanner: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="10" y="6" width="12" height="20" rx="3" />
          <path d="M14 22h4M13 10h6" opacity="0.5" />
        </svg>
      ),
      lupenbrille: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="14" r="5" />
          <circle cx="22" cy="14" r="5" />
          <path d="M17 14h0M7 14L4 10M27 14l3-4" />
        </svg>
      ),
      roentgen: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="6" y="8" width="20" height="16" rx="2" />
          <path d="M16 12v8M13 16h6" />
        </svg>
      ),
      gewebe: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 6c-3 4-8 8-8 14a8 8 0 0016 0c0-6-5-10-8-14z" />
        </svg>
      ),
    }[key],
  }));

  const partnerArr = Object.values(partner).map((p) => ({
    name: p.name,
    text: p.text,
  }));

  return (
    <>
      <SeiteHero
        label={hero.label}
        titel={hero.titel}
        titelAkzent={hero.titelAkzent}
        subtext={hero.subtext}
      />

      {/* ============================================================
          Philosophie
          ============================================================ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#f4f1ec" }}
      >
        <BaumDekor className="absolute -right-16 top-10 w-72 opacity-[0.03] rotate-12 hidden lg:block" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <SektionsHeader
            label={philosophie.label}
            titel={philosophie.titel}
            titelAkzent={philosophie.titelAkzent}
          />

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div
              className="relative overflow-hidden anim-einblenden"
              style={{
                borderRadius: "40% 60% 45% 55% / 55% 38% 62% 45%",
                boxShadow: "0 20px 44px -10px rgba(105, 123, 123, 0.16)",
              }}
            >
              <Image
                src="/images/home-banner.jpg"
                alt={philosophie.bildAlt}
                width={600}
                height={500}
                className="w-full h-auto object-cover"
                style={{
                  aspectRatio: "6/5",
                  filter: "saturate(0.88) brightness(1.03)",
                }}
              />
            </div>

            <div className="anim-einblenden d2">
              <p
                className="text-lg leading-relaxed mb-5"
                style={{
                  color: "#4a5959",
                  fontWeight: 300,
                  lineHeight: 1.85,
                }}
              >
                {philosophie.text1}
              </p>
              <p
                className="text-lg leading-relaxed"
                style={{
                  color: "#4a5959",
                  fontWeight: 300,
                  lineHeight: 1.85,
                }}
              >
                {philosophie.text2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          Praxis-Rundgang
          ============================================================ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#f0ede8" }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <SektionsHeader
            label={raeume.label as string}
            titel={raeume.titel as string}
            titelAkzent={raeume.titelAkzent as string}
            subtext={raeume.subtext as string}
          />

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { src: "/images/behandlung.jpg", alt: bilder.behandlung },
              { src: "/images/team-foto.webp", alt: bilder.empfang },
            ].map((bild, i) => (
              <div
                key={bild.src}
                className={`relative overflow-hidden anim-einblenden d${i + 2}`}
                style={{
                  borderRadius: "20px",
                  boxShadow: "0 16px 36px -8px rgba(105, 123, 123, 0.14)",
                }}
              >
                <Image
                  src={bild.src}
                  alt={bild.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  style={{
                    aspectRatio: "3/2",
                    filter: "saturate(0.90) brightness(1.02)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          Ausstattung
          ============================================================ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#f4f1ec" }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <SektionsHeader
            label={ausstattung.label as string}
            titel={ausstattung.titel as string}
            titelAkzent={ausstattung.titelAkzent as string}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {ausstattungArr.map((a, i) => (
              <div
                key={a.titel}
                className={`text-center p-7 karte-hover anim-einblenden d${i + 2}`}
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "22px",
                  border: "1px solid rgba(105, 123, 123, 0.07)",
                }}
              >
                <div
                  className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full"
                  style={{ background: "rgba(242, 101, 34, 0.08)", color: "#F26522" }}
                >
                  {a.icon}
                </div>
                <h3
                  className="text-base mb-2"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}
                >
                  {a.titel}
                </h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          Sprachen
          ============================================================ */}
      <section className="relative py-12 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-base" style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.8 }}>
            <span style={{ color: "#697B7B", fontWeight: 500 }}>{sprachen.label}</span>{" "}
            {sprachen.text}
          </p>
        </div>
      </section>

      {/* ============================================================
          Netzwerk
          ============================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <SektionsHeader
            label={netzwerk.label as string}
            titel={netzwerk.titel as string}
            titelAkzent={netzwerk.titelAkzent as string}
          />

          <div className="grid md:grid-cols-3 gap-7">
            {partnerArr.map((p, i) => (
              <div
                key={p.name}
                className={`p-7 karte-hover anim-einblenden d${i + 2}`}
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "22px",
                  border: "1px solid rgba(105, 123, 123, 0.07)",
                }}
              >
                <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                  {p.name}
                </h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>
                  {p.text}
                </p>
              </div>
            ))}
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
