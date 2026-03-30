import type { Metadata } from "next";
import SeiteHero from "../../components/SeiteHero";
import SektionsHeader from "../../components/SektionsHeader";
import BaumDekor from "../../components/BaumDekor";
import { getDictionary, type Locale } from "../../../lib/i18n";
import { createMetadata } from "../../../lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Fortbildungen as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return createMetadata(locale, "fortbildungen", meta);
}

export default async function FortbildungenSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Fortbildungen as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const einleitung = t.einleitung as Record<string, string>;
  const prinzip = t.prinzip as Record<string, unknown>;
  const tag1 = prinzip.tag1 as Record<string, string>;
  const tag2 = prinzip.tag2 as Record<string, string>;
  const vorteile = t.vorteile as Record<string, unknown>;
  const vorteilItems = vorteile.items as Record<string, Record<string, string>>;
  const termine = t.termine as Record<string, unknown>;
  const studyClubs = termine.studyClubs as Record<string, Record<string, unknown>>;
  const kontaktSection = t.kontaktSection as Record<string, string>;

  const termineArr = Object.values(studyClubs).map((sc) => ({
    titel: sc.titel as string,
    daten: sc.daten as string[],
  }));

  const vorteilKeys = ["eigenePatienten", "supervision", "echteFaelle", "selbstvertrauen"];

  return (
    <>
      <SeiteHero
        label={hero.label}
        titel={hero.titel}
        titelAkzent={hero.titelAkzent}
        subtext={hero.subtext}
      />

      {/* Einleitung */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <BaumDekor className="absolute -right-16 top-10 w-64 opacity-[0.03] rotate-12 hidden lg:block" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Text */}
            <div className="lg:col-span-3 space-y-6">
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 400,
                  color: "#2d3a3a",
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  lineHeight: 1.2,
                }}
              >
                {einleitung.titel}{" "}
                <span style={{ fontWeight: 600, color: "#697B7B" }}>{einleitung.titelAkzent}</span>
              </h2>
              <p className="text-sm" style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.9 }}>
                {einleitung.text1}
              </p>
              <p className="text-sm" style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.9 }}>
                {einleitung.text2}
              </p>
              <p className="text-sm" style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.9 }}>
                {einleitung.text3.split("Fraga Dental")[0]}
                <a
                  href="https://www.fraga-dental.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-[#e3541a]"
                  style={{ color: "#F26522", fontWeight: 500 }}
                >
                  Fraga Dental
                </a>
                {einleitung.text3.split("Fraga Dental").slice(1).join("Fraga Dental")}
              </p>
              <p className="text-xs mt-4" style={{ color: "#697B7B", fontWeight: 500, fontStyle: "italic" }}>
                {einleitung.signatur}
              </p>
            </div>

            {/* Info-Karte: Das Prinzip */}
            <div className="lg:col-span-2">
              <div
                className="p-7 karte-hover"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "22px",
                  border: "1px solid rgba(105,123,123,0.07)",
                }}
              >
                <h3
                  className="text-lg mb-4"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 600,
                    color: "#2d3a3a",
                  }}
                >
                  {prinzip.titel as string}
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div
                      className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full text-xs"
                      style={{ background: "rgba(242,101,34,0.08)", color: "#F26522", fontWeight: 700 }}
                    >
                      1
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: "#2d3a3a", fontWeight: 500 }}>{tag1.titel}</p>
                      <p className="text-xs mt-1" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.6 }}>
                        {tag1.text}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div
                      className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full text-xs"
                      style={{ background: "rgba(242,101,34,0.08)", color: "#F26522", fontWeight: 700 }}
                    >
                      2
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: "#2d3a3a", fontWeight: 500 }}>{tag2.titel}</p>
                      <p className="text-xs mt-1" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.6 }}>
                        {tag2.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vorteile */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={vorteile.label as string} titel={vorteile.titel as string} titelAkzent={vorteile.titelAkzent as string} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {vorteilKeys.map((key, i) => (
              <div
                key={key}
                className="text-center p-6 karte-hover"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "22px",
                  border: "1px solid rgba(105,123,123,0.07)",
                }}
              >
                <div
                  className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full"
                  style={{ background: "rgba(242,101,34,0.08)" }}
                >
                  {[
                    <svg key="1" viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="#F26522" strokeWidth="1.5"><circle cx="14" cy="8" r="5" /><path d="M5 25c0-5 4-9 9-9s9 4 9 9" /></svg>,
                    <svg key="2" viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="#F26522" strokeWidth="1.5"><path d="M14 3v22M3 14h22" strokeLinecap="round" /><circle cx="14" cy="14" r="11" /></svg>,
                    <svg key="3" viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="#F26522" strokeWidth="1.5"><path d="M4 14h5l3-8 4 16 3-8h5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                    <svg key="4" viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="#F26522" strokeWidth="1.5"><path d="M14 3l3 8h8l-6.5 5 2.5 8L14 19l-7 5 2.5-8L3 11h8z" /></svg>,
                  ][i]}
                </div>
                <h3 className="text-sm mb-2" style={{ color: "#2d3a3a", fontWeight: 600 }}>{vorteilItems[key].titel}</h3>
                <p className="text-xs" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{vorteilItems[key].text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Termine */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <BaumDekor className="absolute -left-12 bottom-10 w-48 opacity-[0.03] -rotate-12 hidden lg:block" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={termine.label as string} titel={termine.titel as string} titelAkzent={termine.titelAkzent as string} />

          <div className="grid md:grid-cols-2 gap-7">
            {termineArr.map((sc, i) => (
              <div
                key={i}
                className="p-7 karte-hover"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "22px",
                  border: "1px solid rgba(105,123,123,0.07)",
                }}
              >
                <h3
                  className="text-base mb-4"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 600,
                    color: "#2d3a3a",
                    lineHeight: 1.3,
                  }}
                >
                  {sc.titel}
                </h3>
                <div className="space-y-2">
                  {sc.daten.map((d, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-3 py-2"
                      style={{ borderBottom: "1px solid rgba(105,123,123,0.06)" }}
                    >
                      <div
                        className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full text-xs"
                        style={{ background: "rgba(242,101,34,0.08)", color: "#F26522", fontWeight: 600 }}
                      >
                        {j + 1}
                      </div>
                      <span className="text-sm" style={{ color: "#4a5959", fontWeight: 400 }}>{d}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="https://www.study-club.de/termine-orte/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-5 text-sm transition-colors duration-300 hover:text-[#e3541a]"
                  style={{ color: "#F26522", fontWeight: 500 }}
                >
                  {termine.detailsLink as string}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt für Fortbildungen */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <SektionsHeader label={kontaktSection.label} titel={kontaktSection.titel} titelAkzent={kontaktSection.titelAkzent} />

          <div
            className="p-8 karte-hover"
            style={{
              background: "rgba(255,255,255,0.6)",
              borderRadius: "22px",
              border: "1px solid rgba(105,123,123,0.07)",
            }}
          >
            <p className="text-sm mb-6" style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.8 }}>
              {kontaktSection.text.split("Fraga Dental")[0]}
              <a
                href="https://www.fraga-dental.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[#e3541a]"
                style={{ color: "#F26522", fontWeight: 500 }}
              >
                Fraga Dental
              </a>
              {kontaktSection.text.split("Fraga Dental").slice(1).join("Fraga Dental")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a
                href="tel:+494088021050"
                className="inline-flex items-center gap-2 text-sm transition-colors duration-300 hover:text-[#e3541a]"
                style={{ color: "#F26522", fontWeight: 600 }}
              >
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 2l2 0 1.5 4-2.5 2.5c1.5 3 3 4.5 6 6l2.5-2.5 4 1.5v2.5c0 1-1 2-2 2C9 18 2 11 2 5c0-1 1-2.5 3-3z" />
                </svg>
                040 — 880 21 50
              </a>
              <a
                href="mailto:info@zahnarzt-othmarschen.de"
                className="inline-flex items-center gap-2 text-sm transition-colors duration-300 hover:text-[#2d3a3a]"
                style={{ color: "#5a6a6a", fontWeight: 400 }}
              >
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="16" height="12" rx="2" />
                  <path d="M2 6l8 5.5L18 6" />
                </svg>
                info@zahnarzt-othmarschen.de
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
