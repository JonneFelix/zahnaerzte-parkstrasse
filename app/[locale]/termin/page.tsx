import type { Metadata } from "next";
import SeiteHero from "../../components/SeiteHero";
import SektionsHeader from "../../components/SektionsHeader";
import BaumDekor from "../../components/BaumDekor";
import { getDictionary, type Locale } from "../../../lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Termin as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return { title: meta.title, description: meta.description };
}

export default async function TerminSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Termin as Record<string, unknown>;
  const hero = t.hero as Record<string, string>;
  const optionen = t.optionen as Record<string, string>;
  const online = t.online as Record<string, string>;
  const sprechzeiten = t.sprechzeiten as Record<string, unknown>;
  const tage = sprechzeiten.tage as Record<string, string>;
  const zeiten = sprechzeiten.zeiten as Record<string, string>;
  const mitbringen = t.mitbringen as Record<string, unknown>;
  const mitbringenItems = mitbringen.items as string[];

  const sprechzeitenArr = ["montag", "dienstag", "mittwoch", "donnerstag", "freitag"].map((key) => ({
    tag: tage[key],
    zeit: zeiten[key],
  }));

  return (
    <>
      <SeiteHero
        label={hero.label}
        titel={hero.titel}
        titelAkzent={hero.titelAkzent}
        subtext={hero.subtext}
      />

      {/* Kontakt-Optionen */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <BaumDekor className="absolute -right-16 bottom-10 w-52 opacity-[0.03] rotate-[20deg] hidden lg:block" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-7">
            {/* Telefon */}
            <div className="text-center p-7 karte-hover" style={{ background: "rgba(255,255,255,0.6)", borderRadius: "22px", border: "1px solid rgba(105,123,123,0.07)" }}>
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full" style={{ background: "rgba(242,101,34,0.08)" }}>
                <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="#F26522" strokeWidth="1.5"><path d="M7 3L10 3L12 8L9 11C11 15 13 17 17 19L20 16L25 18L25 22C25 23.5 23.5 25 22 25C15 25 3 17 3 7C3 5.5 4.5 3 7 3Z" /></svg>
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{optionen.telefon}</h3>
              <a href="tel:+494088021050" className="block text-lg transition-colors duration-300 hover:text-[#e3541a]" style={{ color: "#F26522", fontWeight: 600 }}>
                040 — 880 21 50
              </a>
            </div>

            {/* E-Mail */}
            <div className="text-center p-7 karte-hover" style={{ background: "rgba(255,255,255,0.6)", borderRadius: "22px", border: "1px solid rgba(105,123,123,0.07)" }}>
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full" style={{ background: "rgba(242,101,34,0.08)" }}>
                <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="#F26522" strokeWidth="1.5"><rect x="3" y="6" width="22" height="16" rx="2" /><path d="M3 8l11 8 11-8" /></svg>
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{optionen.email}</h3>
              <a href="mailto:info@zahnarzt-othmarschen.de" className="block text-sm transition-colors duration-300 hover:text-[#2d3a3a]" style={{ color: "#5a6a6a", fontWeight: 400 }}>
                info@zahnarzt-othmarschen.de
              </a>
            </div>

            {/* Vor Ort */}
            <div className="text-center p-7 karte-hover" style={{ background: "rgba(255,255,255,0.6)", borderRadius: "22px", border: "1px solid rgba(105,123,123,0.07)" }}>
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full" style={{ background: "rgba(242,101,34,0.08)" }}>
                <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="#F26522" strokeWidth="1.5"><path d="M14 3C9 3 5 8 5 12C5 19 14 25 14 25C14 25 23 19 23 12C23 8 19 3 14 3Z" /><circle cx="14" cy="12" r="3.5" /></svg>
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{optionen.vorOrt}</h3>
              <p className="text-sm" style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.7 }}>
                Parkstraße 10<br />22605 Hamburg
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Online-Kalender Platzhalter */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f0ede8" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={online.label} titel={online.titel} titelAkzent={online.titelAkzent} />
          <div className="p-10 text-center" style={{ background: "rgba(255,255,255,0.6)", borderRadius: "22px", border: "1px solid rgba(105,123,123,0.07)" }}>
            <p className="text-base mb-4" style={{ color: "#697B7B", fontWeight: 400 }}>
              {online.platzhalter}
            </p>
            <p className="text-sm" style={{ color: "#8a9a9a", fontWeight: 300, lineHeight: 1.7 }}>
              {online.bissDahin.replace("{telefon}", "")}{" "}
              <a href="tel:+494088021050" className="transition-colors hover:text-[#F26522]" style={{ color: "#F26522", fontWeight: 500 }}>
                040 — 880 21 50
              </a>{" "}
            </p>
          </div>
        </div>
      </section>

      {/* Sprechzeiten */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={sprechzeiten.label as string} titel={sprechzeiten.titel as string} titelAkzent={sprechzeiten.titelAkzent as string} />
          <div className="p-7" style={{ background: "rgba(255,255,255,0.6)", borderRadius: "22px", border: "1px solid rgba(105,123,123,0.07)" }}>
            <div className="space-y-3">
              {sprechzeitenArr.map((s) => (
                <div key={s.tag} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(105,123,123,0.06)" }}>
                  <span className="text-sm" style={{ color: "#2d3a3a", fontWeight: 500 }}>{s.tag}</span>
                  <span className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300 }}>{s.zeit}</span>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4 text-center" style={{ color: "#8a9a9a", fontStyle: "italic" }}>{sprechzeiten.nachVereinbarung as string}</p>
          </div>
          <p className="text-sm mt-6 text-center" style={{ color: "#697B7B", fontWeight: 400 }}>
            {sprechzeiten.erstbesuchHinweis as string}
          </p>

          {/* Was mitbringen — aufklappbar */}
          <details className="mt-8 group" style={{ background: "rgba(255,255,255,0.6)", borderRadius: "22px", border: "1px solid rgba(105,123,123,0.07)" }}>
            <summary
              className="flex items-center justify-between cursor-pointer px-7 py-5 text-base"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500, color: "#2d3a3a" }}
            >
              {mitbringen.titel as string}
              <span className="text-sm transition-transform duration-300 group-open:rotate-180" style={{ color: "#F26522" }}>▾</span>
            </summary>
            <div className="px-7 pb-6 space-y-3">
              {mitbringenItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 shrink-0 mt-0.5 flex items-center justify-center rounded-full" style={{ background: "rgba(242,101,34,0.1)" }}>
                    <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="#F26522" strokeWidth="2"><path d="M3 8l3.5 3.5L13 5" /></svg>
                  </div>
                  <p className="text-sm" style={{ color: "#5a6a6a", fontWeight: 300 }}>{item}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
