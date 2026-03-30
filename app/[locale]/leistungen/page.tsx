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
  const t = dict.Leistungen as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return createMetadata(locale, "leistungen", meta);
}

const leistungsBilder: Record<string, string> = {
  oralchirurgie: "/images/behandlung.jpg",
  implantate: "/images/mikroskop-ausstattung.jpg",
  zahnersatz: "/images/zahnmodell.jpg",
  wurzelbehandlung: "/images/wurzelbehandlung.jpg",
  prophylaxe: "/images/prophylaxe.jpg",
  parodontologie: "/images/praxis-mit-logo.jpg",
  kinderzahnheilkunde: "/images/kinder-behandlung.jpg",
  aesthetik: "/images/aligner-schiene.jpg",
};

const leistungsHrefs: Record<string, string> = {
  oralchirurgie: "/leistungen/oralchirurgie",
  implantate: "/leistungen/implantate",
  zahnersatz: "/leistungen/zahnersatz",
  wurzelbehandlung: "/leistungen/wurzelbehandlung",
  prophylaxe: "/leistungen/prophylaxe",
  parodontologie: "/leistungen/parodontologie",
  kinderzahnheilkunde: "/leistungen/kinderzahnheilkunde",
  aesthetik: "/leistungen/aesthetik",
};

export default async function LeistungenSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Leistungen as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const items = t.items as Record<string, Record<string, string>>;
  const mehrErfahren = t.mehrErfahren as string;
  const schwerpunkt = t.schwerpunkt as Record<string, string>;
  const cta = t.cta as Record<string, string>;

  const leistungsKeys = ["oralchirurgie", "implantate", "zahnersatz", "wurzelbehandlung", "prophylaxe", "parodontologie", "kinderzahnheilkunde", "aesthetik"];
  const leistungen = leistungsKeys.map((key) => ({
    titel: items[key].titel,
    kurz: items[key].kurz,
    bild: leistungsBilder[key],
    href: leistungsHrefs[key],
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
          Leistungs-Grid
          ============================================================ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#f4f1ec" }}
      >
        <BaumDekor className="absolute -left-16 top-1/4 w-64 opacity-[0.03] -rotate-12 hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {leistungen.map((l, i) => (
              <Link
                key={l.titel}
                href={l.href}
                className={`karte-hover relative group block anim-einblenden d${Math.min(i + 2, 8)}`}
                style={{
                  background: "rgba(255, 255, 255, 0.72)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "22px",
                  border: "1px solid rgba(105, 123, 123, 0.07)",
                  overflow: "hidden",
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={l.bild}
                    alt={l.titel}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{
                      filter: "saturate(0.88) brightness(1.02)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.92))",
                    }}
                  />
                </div>
                <div className="p-6 pt-4">
                  <h3
                    className="text-xl mb-2"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 600,
                      color: "#2d3a3a",
                    }}
                  >
                    {l.titel}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "#6a7a7a",
                      fontWeight: 300,
                      lineHeight: 1.7,
                    }}
                  >
                    {l.kurz}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: "#F26522", fontWeight: 500 }}>
                    {mehrErfahren}
                    <svg viewBox="0 0 20 20" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          Schwerpunkt-Highlight
          ============================================================ */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "#f0ede8" }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="anim-einblenden">
              <span
                className="text-xs tracking-widest uppercase"
                style={{
                  color: "#F26522",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                }}
              >
                {schwerpunkt.label}
              </span>
              <h2
                className="mt-4 mb-6"
                style={{
                  fontFamily:
                    "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontWeight: 400,
                  color: "#2d3a3a",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  lineHeight: 1.2,
                }}
              >
                {schwerpunkt.titel}{" "}
                <span style={{ fontWeight: 600, color: "#697B7B" }}>
                  {schwerpunkt.titelAkzent}
                </span>
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{
                  color: "#4a5959",
                  fontWeight: 300,
                  lineHeight: 1.85,
                }}
              >
                {schwerpunkt.text}
              </p>
              <Link
                href={`/${locale}/leistungen/oralchirurgie`}
                className="inline-flex items-center gap-2 text-sm tracking-wider transition-colors duration-300 hover:text-[#e3541a]"
                style={{
                  color: "#F26522",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                }}
              >
                {schwerpunkt.link}
                <svg
                  viewBox="0 0 20 20"
                  className="w-4 h-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                >
                  <path d="M4 10h12M11 5l5 5-5 5" />
                </svg>
              </Link>
            </div>

            <div
              className="relative overflow-hidden anim-einblenden-rechts d3"
              style={{
                borderRadius: "22px",
                boxShadow:
                  "0 20px 44px -10px rgba(105, 123, 123, 0.16)",
              }}
            >
              <Image
                src="/images/team/dr-schwegmann-portrait-neu.jpg"
                alt={schwerpunkt.bildAlt}
                width={500}
                height={600}
                className="w-full h-auto object-cover"
                style={{
                  aspectRatio: "4/5",
                  filter: "saturate(0.90) brightness(1.02)",
                }}
              />
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
