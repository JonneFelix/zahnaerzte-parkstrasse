import type { Metadata } from "next";
import Link from "next/link";
import SeiteHero from "../../components/SeiteHero";
import SektionsHeader from "../../components/SektionsHeader";
import BaumDekor from "../../components/BaumDekor";
import GoogleMap from "../../components/GoogleMap";
import { getDictionary, type Locale } from "../../../lib/i18n";
import { createMetadata } from "../../../lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Kontakt as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return createMetadata(locale, "kontakt", meta);
}

export default async function KontaktSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Kontakt as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const kontaktdaten = t.kontaktdaten as Record<string, string>;
  const anfahrt = t.anfahrt as Record<string, unknown>;
  const sbahn = anfahrt.sbahn as Record<string, string>;
  const bus = anfahrt.bus as Record<string, string>;
  const auto = anfahrt.auto as Record<string, string>;
  const fortbildungen = t.fortbildungen as Record<string, string>;

  return (
    <>
      <SeiteHero
        label={hero.label}
        titel={hero.titel}
        titelAkzent={hero.titelAkzent}
      />

      {/* Kontaktdaten */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <BaumDekor className="absolute -right-16 top-10 w-64 opacity-[0.03] rotate-12 hidden lg:block" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-7">
            {/* Adresse */}
            <div className="text-center p-7 karte-hover" style={{ background: "rgba(255,255,255,0.6)", borderRadius: "22px", border: "1px solid rgba(105,123,123,0.07)" }}>
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full" style={{ background: "rgba(242,101,34,0.08)" }}>
                <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="#F26522" strokeWidth="1.5"><path d="M14 3C9 3 5 8 5 12C5 19 14 25 14 25C14 25 23 19 23 12C23 8 19 3 14 3Z" /><circle cx="14" cy="12" r="3.5" /></svg>
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{kontaktdaten.adresse}</h3>
              <a
                href="https://maps.google.com/?q=Parkstraße+10,+22605+Hamburg"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm transition-colors duration-300 hover:text-white hover:text-[#F26522]"
                style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.8 }}
              >
                Parkstraße 10<br />22605 Hamburg<br />Othmarschen
              </a>
            </div>

            {/* Telefon */}
            <div className="text-center p-7 karte-hover" style={{ background: "rgba(255,255,255,0.6)", borderRadius: "22px", border: "1px solid rgba(105,123,123,0.07)" }}>
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full" style={{ background: "rgba(242,101,34,0.08)" }}>
                <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="#F26522" strokeWidth="1.5"><path d="M7 3L10 3L12 8L9 11C11 15 13 17 17 19L20 16L25 18L25 22C25 23.5 23.5 25 22 25C15 25 3 17 3 7C3 5.5 4.5 3 7 3Z" /></svg>
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{kontaktdaten.telefonEmail}</h3>
              <a href="tel:+494088021050" className="block text-sm mb-1 transition-colors duration-300 hover:text-[#e3541a]" style={{ color: "#F26522", fontWeight: 600 }}>040 — 880 21 50</a>
              <a href="mailto:info@zahnarzt-othmarschen.de" className="block text-sm transition-colors duration-300 hover:text-[#2d3a3a]" style={{ color: "#5a6a6a", fontWeight: 300 }}>info@zahnarzt-othmarschen.de</a>
            </div>

            {/* Sprechzeiten */}
            <div className="text-center p-7 karte-hover" style={{ background: "rgba(255,255,255,0.6)", borderRadius: "22px", border: "1px solid rgba(105,123,123,0.07)" }}>
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full" style={{ background: "rgba(242,101,34,0.08)" }}>
                <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="#F26522" strokeWidth="1.5"><circle cx="14" cy="14" r="11" /><path d="M14 7L14 14L19 17.5" strokeLinecap="round" /></svg>
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{kontaktdaten.sprechzeiten}</h3>
              <div className="text-sm space-y-0.5" style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.7 }}>
                <p><span style={{ fontWeight: 500, color: "#4a5959" }}>Mo + Di</span> 9:00 — 18:00</p>
                <p><span style={{ fontWeight: 500, color: "#4a5959" }}>Mi</span> 9:00 — 16:00</p>
                <p><span style={{ fontWeight: 500, color: "#4a5959" }}>Do</span> 9:00 — 20:00</p>
                <p><span style={{ fontWeight: 500, color: "#4a5959" }}>Fr</span> 9:00 — 13:00</p>
                <p className="text-xs pt-1" style={{ color: "#8a9a9a", fontStyle: "italic" }}>{kontaktdaten.nachVereinbarung}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anfahrt */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={anfahrt.label as string} titel={anfahrt.titel as string} titelAkzent={anfahrt.titelAkzent as string} />

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Karte */}
            <div className="overflow-hidden" style={{ borderRadius: "22px", boxShadow: "0 16px 36px -8px rgba(105,123,123,0.14)" }}>
              <GoogleMap />
            </div>

            {/* Anfahrt-Details */}
            <div className="space-y-6">
              <div className="p-6" style={{ background: "rgba(255,255,255,0.6)", borderRadius: "18px", border: "1px solid rgba(105,123,123,0.07)" }}>
                <h3 className="text-base font-semibold mb-2" style={{ color: "#2d3a3a" }}>{sbahn.titel}</h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{sbahn.text}</p>
              </div>
              <div className="p-6" style={{ background: "rgba(255,255,255,0.6)", borderRadius: "18px", border: "1px solid rgba(105,123,123,0.07)" }}>
                <h3 className="text-base font-semibold mb-2" style={{ color: "#2d3a3a" }}>{bus.titel}</h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: bus.text.replace(/\n/g, "<br />") }} />
              </div>
              <div className="p-6" style={{ background: "rgba(255,255,255,0.6)", borderRadius: "18px", border: "1px solid rgba(105,123,123,0.07)" }}>
                <h3 className="text-base font-semibold mb-2" style={{ color: "#2d3a3a" }}>{auto.titel}</h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{auto.text}</p>
              </div>
              <div className="text-center mt-6">
                <Link
                  href={`/${locale}/termin`}
                  className="cta-schimmer inline-flex items-center gap-3 px-8 py-4 text-sm tracking-wider transition-all duration-500"
                  style={{ fontWeight: 600, color: "#fff", background: "linear-gradient(135deg, #F26522, #e3541a)", borderRadius: "9999px", letterSpacing: "0.1em", boxShadow: "0 8px 28px rgba(242,101,34,0.3)" }}
                >
                  TERMIN BUCHEN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hinweis Fortbildungen */}
      <section className="relative py-16 lg:py-20 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
          <div
            className="flex flex-col md:flex-row items-center gap-6 p-7"
            style={{
              background: "rgba(255,255,255,0.6)",
              borderRadius: "22px",
              border: "1px solid rgba(105,123,123,0.07)",
            }}
          >
            <div className="flex-1">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "#697B7B", fontWeight: 600, letterSpacing: "0.2em" }}
              >
                {fortbildungen.label}
              </span>
              <h3
                className="text-lg mt-2 mb-2"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}
              >
                {fortbildungen.titel}
              </h3>
              <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>
                {fortbildungen.text}
              </p>
            </div>
            <Link
              href={`/${locale}/fortbildungen`}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 text-sm tracking-wider transition-all duration-300"
              style={{
                color: "#697B7B",
                fontWeight: 600,
                border: "1.5px solid rgba(105,123,123,0.2)",
                borderRadius: "9999px",
                letterSpacing: "0.08em",
              }}
            >
              {fortbildungen.mehrErfahren}
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
