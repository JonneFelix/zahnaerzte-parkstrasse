import type { Metadata } from "next";
import SeiteHero from "../../components/SeiteHero";
import { getDictionary, type Locale } from "../../../lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Datenschutz as Record<string, unknown>;
  const meta = t.meta as Record<string, string>;
  return { title: meta.title, description: meta.description };
}

// Wiederverwendbare Styles
const h2Style = { fontFamily: "var(--font-cormorant), serif", fontWeight: 600 as const, color: "#2d3a3a" };
const h3Style = { color: "#2d3a3a" };
const textStyle = { fontWeight: 300 as const, lineHeight: 1.8 };

export default async function DatenschutzSeite({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.Datenschutz as Record<string, unknown>;
  const titel = t.titel as string;
  const ueberblick = t.ueberblick as Record<string, string>;
  const verantwortlich = t.verantwortlich as Record<string, string>;
  const hosting = t.hosting as Record<string, string>;
  const ssl = t.ssl as Record<string, string>;
  const datenerfassung = t.datenerfassung as Record<string, unknown>;
  const serverLog = datenerfassung.serverLog as Record<string, unknown>;
  const serverLogItems = serverLog.items as string[];
  const cookies = datenerfassung.cookies as Record<string, string>;
  const externeDienste = t.externeDienste as Record<string, unknown>;
  const fonts = externeDienste.fonts as Record<string, string>;
  const maps = externeDienste.maps as Record<string, string>;
  const rechte = t.rechte as Record<string, unknown>;
  const rechteItems = rechte.items as Record<string, string>;
  const beschwerde = t.beschwerde as Record<string, string>;
  const aktualitaet = t.aktualitaet as Record<string, string>;

  return (
    <>
      <SeiteHero titel={titel} />

      <section className="relative py-20 lg:py-28" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10" style={{ color: "#4a5959" }}>
          <div className="space-y-8">

            {/* 1. Überblick */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{ueberblick.titel}</h2>
              <p className="text-sm leading-relaxed" style={textStyle}>{ueberblick.text}</p>
            </div>

            {/* 2. Verantwortliche Stelle */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{verantwortlich.titel}</h2>
              <p className="text-sm leading-relaxed" style={textStyle}>{verantwortlich.text}</p>
              <p className="text-sm leading-relaxed mt-2" style={textStyle} dangerouslySetInnerHTML={{ __html: verantwortlich.details.replace(/\n/g, "<br />") }} />
              <p className="text-sm leading-relaxed mt-2" style={textStyle}>{verantwortlich.erklaerung}</p>
            </div>

            {/* 3. Hosting */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{hosting.titel}</h2>
              <p className="text-sm leading-relaxed" style={textStyle}>{hosting.text}</p>
            </div>

            {/* 4. SSL/TLS */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{ssl.titel}</h2>
              <p className="text-sm leading-relaxed" style={textStyle}>{ssl.text}</p>
            </div>

            {/* 5. Datenerfassung */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{datenerfassung.titel as string}</h2>

              <h3 className="text-base font-semibold mb-2" style={h3Style}>{serverLog.titel as string}</h3>
              <p className="text-sm leading-relaxed mb-2" style={textStyle}>{serverLog.text as string}</p>
              <ul className="text-sm mb-2 space-y-0.5 list-disc list-inside" style={textStyle}>
                {serverLogItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-sm leading-relaxed mb-4" style={textStyle}>{serverLog.hinweis as string}</p>

              <h3 className="text-base font-semibold mb-2" style={h3Style}>{cookies.titel}</h3>
              <p className="text-sm leading-relaxed" style={textStyle}>{cookies.text}</p>
            </div>

            {/* 6. Externe Dienste */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{externeDienste.titel as string}</h2>

              <h3 className="text-base font-semibold mb-2" style={h3Style}>{fonts.titel}</h3>
              <p className="text-sm leading-relaxed mb-4" style={textStyle}>{fonts.text}</p>

              <h3 className="text-base font-semibold mb-2" style={h3Style}>{maps.titel}</h3>
              <p className="text-sm leading-relaxed" style={textStyle}>
                {maps.text}{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#697B7B" }}>
                  Datenschutzerklärung von Google
                </a>.
              </p>
            </div>

            {/* 7. Ihre Rechte */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{rechte.titel as string}</h2>
              <p className="text-sm leading-relaxed mb-2" style={textStyle}>{rechte.text as string}</p>
              <ul className="text-sm mb-4 space-y-1 list-disc list-inside" style={textStyle}>
                {Object.values(rechteItems).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-sm leading-relaxed" style={textStyle}>{rechte.kontaktHinweis as string}</p>
            </div>

            {/* 8. Beschwerderecht */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{beschwerde.titel}</h2>
              <p className="text-sm leading-relaxed" style={textStyle}>{beschwerde.text}</p>
              <p className="text-sm leading-relaxed mt-2" style={textStyle} dangerouslySetInnerHTML={{ __html: beschwerde.behoerde.replace(/\n/g, "<br />") }} />
              <a href="https://datenschutz-hamburg.de" target="_blank" rel="noopener noreferrer" className="text-sm underline" style={{ color: "#697B7B" }}>
                datenschutz-hamburg.de
              </a>
            </div>

            {/* 9. Aktualität */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>{aktualitaet.titel}</h2>
              <p className="text-sm leading-relaxed" style={textStyle}>{aktualitaet.text}</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
