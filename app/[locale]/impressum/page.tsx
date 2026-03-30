import type { Metadata } from "next";
import SeiteHero from "../../components/SeiteHero";
import { getDictionary, type Locale } from "../../../lib/i18n";
import { createMetadata } from "../../../lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Impressum as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return createMetadata(locale, "impressum", meta);
}

// Wiederverwendbare Styles
const h2Style = { fontFamily: "var(--font-cormorant), serif", fontWeight: 600 as const, color: "#2d3a3a" };
const textStyle = { fontWeight: 300 as const, lineHeight: 1.8 };

export default async function ImpressumSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Impressum as Record<string, unknown>;
  const titel = t.titel as string;
  const angabenDDG = t.angabenDDG as Record<string, string>;
  const kontakt = t.kontakt as Record<string, string>;
  const berufsbezeichnung = t.berufsbezeichnung as Record<string, string>;
  const kammer = t.kammer as Record<string, string>;
  const aufsicht = t.aufsicht as Record<string, string>;
  const kzv = t.kzv as Record<string, string>;
  const berufsrecht = t.berufsrecht as Record<string, unknown>;
  const berufsrechtItems = berufsrecht.items as string[];
  const streitschlichtung = t.streitschlichtung as Record<string, string>;

  return (
    <>
      <SeiteHero titel={titel} />

      <section className="relative py-20 lg:py-28" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 prose-sm" style={{ color: "#4a5959" }}>
          <div className="space-y-8">

            {/* Angaben gemäß DDG */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{angabenDDG.titel}</h2>
              <p className="text-sm leading-relaxed" style={textStyle} dangerouslySetInnerHTML={{ __html: angabenDDG.text.replace(/\n/g, "<br />") }} />
            </div>

            {/* Kontakt */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{kontakt.titel}</h2>
              <p className="text-sm leading-relaxed" style={textStyle} dangerouslySetInnerHTML={{ __html: kontakt.text.replace(/\n/g, "<br />") }} />
            </div>

            {/* Berufsbezeichnung */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{berufsbezeichnung.titel}</h2>
              <p className="text-sm leading-relaxed" style={textStyle} dangerouslySetInnerHTML={{ __html: berufsbezeichnung.text.replace(/\n/g, "<br />") }} />
              <p className="text-sm leading-relaxed mt-2" style={textStyle} dangerouslySetInnerHTML={{ __html: berufsbezeichnung.details.replace(/\n/g, "<br />") }} />
            </div>

            {/* Zuständige Kammer */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{kammer.titel}</h2>
              <p className="text-sm leading-relaxed" style={textStyle} dangerouslySetInnerHTML={{ __html: kammer.text.replace(/\n/g, "<br />") }} />
              <a href="https://www.zahnaerztekammer-hh.de" target="_blank" rel="noopener noreferrer" className="text-sm underline" style={{ color: "#697B7B" }}>
                www.zahnaerztekammer-hh.de
              </a>
            </div>

            {/* Zuständige Aufsichtsbehörde */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{aufsicht.titel}</h2>
              <p className="text-sm leading-relaxed" style={textStyle} dangerouslySetInnerHTML={{ __html: aufsicht.text.replace(/\n/g, "<br />") }} />
            </div>

            {/* Kassenzahnärztliche Vereinigung */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{kzv.titel}</h2>
              <p className="text-sm leading-relaxed" style={textStyle} dangerouslySetInnerHTML={{ __html: kzv.text.replace(/\n/g, "<br />") }} />
              <a href="https://www.kzv-hamburg.de" target="_blank" rel="noopener noreferrer" className="text-sm underline" style={{ color: "#697B7B" }}>
                www.kzv-hamburg.de
              </a>
            </div>

            {/* Berufsrechtliche Regelungen */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{berufsrecht.titel as string}</h2>
              <p className="text-sm leading-relaxed" style={textStyle}>{berufsrecht.text as string}</p>
              <ul className="text-sm mt-2 space-y-1" style={textStyle}>
                {berufsrechtItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-sm leading-relaxed mt-2" style={textStyle}>
                {(berufsrecht.hinweis as string).split("www.zahnaerztekammer-hh.de")[0]}
                <a href="https://www.zahnaerztekammer-hh.de" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#697B7B" }}>
                  www.zahnaerztekammer-hh.de
                </a>
              </p>
            </div>

            {/* Streitschlichtung */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{streitschlichtung.titel}</h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                {streitschlichtung.text}{" "}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#697B7B" }}>
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-sm leading-relaxed mt-2" style={textStyle}>
                {streitschlichtung.nichtBereit}
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
