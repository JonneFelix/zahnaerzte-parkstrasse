import type { Metadata } from "next";
import SeiteHero from "../components/SeiteHero";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung der Zahnärzte Parkstrasse Othmarschen — Informationen zum Umgang mit Ihren personenbezogenen Daten.",
};

// Wiederverwendbare Styles
const h2Style = { fontFamily: "var(--font-cormorant), serif", fontWeight: 600 as const, color: "#2d3a3a" };
const h3Style = { color: "#2d3a3a" };
const textStyle = { fontWeight: 300 as const, lineHeight: 1.8 };

export default function DatenschutzSeite() {
  return (
    <>
      <SeiteHero titel="Datenschutzerklärung" />

      <section className="relative py-20 lg:py-28" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10" style={{ color: "#4a5959" }}>
          <div className="space-y-8">

            {/* 1. Überblick */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                1. Datenschutz auf einen Blick
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie den nachfolgenden Abschnitten.
              </p>
            </div>

            {/* 2. Verantwortliche Stelle */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                2. Verantwortliche Stelle
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="text-sm leading-relaxed mt-2" style={textStyle}>
                Dr. Claudia Schwegmann, Dr. Nina Janz &amp; Dr. Julia Prüter<br />
                Parkstraße 10<br />
                22605 Hamburg<br />
                Telefon: 040 — 880 21 50<br />
                E-Mail: info@zahnarzt-othmarschen.de
              </p>
              <p className="text-sm leading-relaxed mt-2" style={textStyle}>
                Die verantwortliche Stelle entscheidet allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung personenbezogener Daten (z.&nbsp;B. Namen, E-Mail-Adressen).
              </p>
            </div>

            {/* 3. Hosting */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                3. Hosting
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Diese Website wird auf einem eigenen Server in Deutschland gehostet. Wenn Sie unsere Website besuchen, erfasst der Webserver automatisch technische Zugriffsdaten (siehe Abschnitt „Server-Log-Dateien"). Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einer effizienten und sicheren Bereitstellung unserer Website (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO).
              </p>
            </div>

            {/* 4. SSL/TLS-Verschlüsselung */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                4. SSL- bzw. TLS-Verschlüsselung
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </div>

            {/* 5. Datenerfassung */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                5. Datenerfassung auf dieser Website
              </h2>

              <h3 className="text-base font-semibold mb-2" style={h3Style}>Server-Log-Dateien</h3>
              <p className="text-sm leading-relaxed mb-2" style={textStyle}>
                Der Webserver dieser Website erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="text-sm mb-2 space-y-0.5 list-disc list-inside" style={textStyle}>
                <li>Browsertyp und -version</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL (zuvor besuchte Seite)</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="text-sm leading-relaxed mb-4" style={textStyle}>
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO. Wir haben ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und Optimierung unserer Website. Die Server-Log-Dateien werden nach spätestens 14 Tagen automatisch gelöscht.
              </p>

              <h3 className="text-base font-semibold mb-2" style={h3Style}>Cookies</h3>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Diese Website verwendet keine Cookies — weder Tracking-Cookies noch technisch notwendige Cookies. Es werden keine Analyse-Tools von Drittanbietern eingesetzt. Ein Cookie-Banner ist daher nicht erforderlich.
              </p>
            </div>

            {/* 6. Externe Dienste */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                6. Externe Dienste
              </h2>

              <h3 className="text-base font-semibold mb-2" style={h3Style}>Schriftarten (Google Fonts — lokal)</h3>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Diese Website nutzt Schriftarten von Google Fonts. Die Schriftarten sind lokal auf unserem Server eingebunden und werden beim Aufruf unserer Website direkt von dort geladen. Es findet <strong>keine Verbindung zu Servern von Google</strong> statt. Ihre IP-Adresse wird nicht an Google übermittelt.
              </p>
            </div>

            {/* 7. Ihre Rechte */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                7. Ihre Rechte als betroffene Person
              </h2>
              <p className="text-sm leading-relaxed mb-2" style={textStyle}>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit folgende Rechte bezüglich Ihrer personenbezogenen Daten:
              </p>
              <ul className="text-sm mb-4 space-y-1 list-disc list-inside" style={textStyle}>
                <li><strong>Recht auf Auskunft</strong> über Ihre bei uns gespeicherten Daten (Art.&nbsp;15 DSGVO)</li>
                <li><strong>Recht auf Berichtigung</strong> unrichtiger Daten (Art.&nbsp;16 DSGVO)</li>
                <li><strong>Recht auf Löschung</strong> Ihrer Daten (Art.&nbsp;17 DSGVO)</li>
                <li><strong>Recht auf Einschränkung</strong> der Verarbeitung (Art.&nbsp;18 DSGVO)</li>
                <li><strong>Recht auf Datenübertragbarkeit</strong> (Art.&nbsp;20 DSGVO)</li>
                <li><strong>Widerspruchsrecht</strong> gegen die Verarbeitung (Art.&nbsp;21 DSGVO)</li>
              </ul>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Zur Ausübung Ihrer Rechte können Sie sich jederzeit an uns wenden (Kontaktdaten siehe oben).
              </p>
            </div>

            {/* 8. Beschwerderecht */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                8. Beschwerderecht bei der Aufsichtsbehörde
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt, haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art.&nbsp;77 DSGVO). Zuständig ist:
              </p>
              <p className="text-sm leading-relaxed mt-2" style={textStyle}>
                Der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit<br />
                Ludwig-Erhard-Str. 22, 7.&nbsp;OG<br />
                20459 Hamburg<br />
                <a href="https://datenschutz-hamburg.de" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#697B7B" }}>
                  datenschutz-hamburg.de
                </a>
              </p>
            </div>

            {/* 9. Aktualität */}
            <div>
              <h2 className="text-xl mb-3" style={h2Style}>
                9. Aktualität und Änderung dieser Datenschutzerklärung
              </h2>
              <p className="text-sm leading-relaxed" style={textStyle}>
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand März 2026. Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
