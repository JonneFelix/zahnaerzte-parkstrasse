import type { Metadata } from "next";
import SeiteHero from "../components/SeiteHero";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung der Zahnärzte Parkstrasse Othmarschen — Informationen zum Umgang mit Ihren personenbezogenen Daten.",
};

export default function DatenschutzSeite() {
  const textStyle = { fontWeight: 300 as const, lineHeight: 1.8 };

  return (
    <>
      <SeiteHero titel="Datenschutzerklärung" />

      <section className="relative py-20 lg:py-28" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10" style={{ color: "#4a5959" }}>
          <div className="space-y-8">
            <div>
              <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                1. Datenschutz auf einen Blick
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
            </div>

            <div>
              <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                2. Verantwortliche Stelle
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Dr. Claudia Schwegmann &amp; Dr. Nina Janz<br />
                Parkstraße 10, 22605 Hamburg<br />
                Telefon: 040 — 880 21 50<br />
                E-Mail: info@zahnarzt-othmarschen.de
              </p>
            </div>

            <div>
              <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                3. Datenerfassung auf dieser Website
              </h2>
              <h3 className="text-base font-semibold mb-2" style={{ color: "#2d3a3a" }}>Server-Log-Dateien</h3>
              <p className="text-sm leading-relaxed mb-4" style={textStyle}>
                Der Provider dieser Website erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind: Browsertyp und -version, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
              </p>
              <h3 className="text-base font-semibold mb-2" style={{ color: "#2d3a3a" }}>Cookies</h3>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Diese Website verwendet keine Tracking-Cookies und keine Analyse-Tools von Drittanbietern. Es werden nur technisch notwendige Cookies eingesetzt.
              </p>
            </div>

            <div>
              <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                4. Ihre Rechte
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
              </p>
            </div>

            <div>
              <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                5. Externe Dienste
              </h2>
              <h3 className="text-base font-semibold mb-2" style={{ color: "#2d3a3a" }}>Google Fonts</h3>
              <p className="text-sm leading-relaxed mb-4" style={textStyle}>
                Diese Seite nutzt Google Fonts, die lokal eingebunden sind. Es findet keine Verbindung zu Google-Servern statt.
              </p>
              <h3 className="text-base font-semibold mb-2" style={{ color: "#2d3a3a" }}>Google Maps</h3>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Auf der Kontaktseite wird Google Maps eingebunden. Durch die Nutzung von Google Maps können Informationen über Ihre Benutzung dieser Website (einschließlich Ihrer IP-Adresse) an einen Server von Google übertragen und dort gespeichert werden. Weitere Informationen finden Sie in der Datenschutzerklärung von Google.
              </p>
            </div>

            <div>
              <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>
                6. Aktualität und Änderung dieser Datenschutzerklärung
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand März 2026. Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
