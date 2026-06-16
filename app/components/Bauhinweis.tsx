/**
 * Temporärer Anfahrts-/Bauarbeiten-Hinweis.
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │  EIN / AUS — nur diese eine Zeile ändern:                     │
 * │     HINWEIS_AKTIV = true   → Hinweis wird angezeigt           │
 * │     HINWEIS_AKTIV = false  → Hinweis ist komplett aus         │
 * └─────────────────────────────────────────────────────────────┘
 *
 * Erscheint automatisch an beiden Stellen: Startseite (unter dem Hero)
 * UND Kontaktseite (Anfahrts-Bereich).
 *
 * Idee: Da die Auto-Zufahrt gesperrt ist, navigiert man in ZWEI Schritten —
 *   1) mit dem Auto zum Parken an den Klein Flottbeker Weg,
 *   2) von dort zu Fuß zur Praxis (Parkstraße 10).
 * Karten-Apps können "fahren + laufen" nicht in einem Link kombinieren,
 * darum zwei getrennte Routen-Links (je Apple + Google).
 *
 * BEIM BAUENDE ZWEI STELLEN ZURÜCKSETZEN:
 *   1) Hier HINWEIS_AKTIV = false.
 *   2) messages/{de,en,fr,es}.json → Kontakt.anfahrt.auto.text wieder auf den
 *      Original-Text (de: "Parkplätze direkt in der Straße vorhanden. Anfahrt
 *      über Waitzstraße oder Reventlowstraße." — analog en/fr/es).
 *
 * Text/Straße ändern: `texte` + STRASSE + die Karten-Links (KFW_ENC / ADRESSE_ENC)
 * unten anpassen. Deutsche Texte mit echten Umlauten.
 */
const HINWEIS_AKTIV = true;

// Straße, über die geparkt wird — muss exakt einmal in jedem `satz` vorkommen (wird hervorgehoben)
const STRASSE = "Klein Flottbeker Weg";

// Ziele als URL-kodierte Strings (KEINE Koordinaten — iOS-Snapping-Regression)
const KFW_ENC = "Klein%20Flottbeker%20Weg%2C%20Hamburg"; // Park-Stelle
const ADRESSE_ENC = "Parkstra%C3%9Fe%2010%2C%2022605%20Hamburg"; // Praxis "Parkstraße 10, 22605 Hamburg"

// Schritt 1 — mit dem Auto zum Parken am Klein Flottbeker Weg
const AUTO_GOOGLE = `https://www.google.com/maps/dir/?api=1&destination=${KFW_ENC}&travelmode=driving`;
const AUTO_APPLE = `https://maps.apple.com/?daddr=${KFW_ENC}&dirflg=d`;
// Schritt 2 — zu Fuß zur Praxis (Ziel: Parkstraße 10), Start = aktueller Standort am Parkplatz
const FUSS_GOOGLE = `https://www.google.com/maps/dir/?api=1&destination=${ADRESSE_ENC}&travelmode=walking`;
const FUSS_APPLE = `https://maps.apple.com/?daddr=${ADRESSE_ENC}&dirflg=w`;
// Telefon — E.164 ohne Leerzeichen (aus "040 880 21 50"); am echten Handy gegenprüfen
const TELEFON_TEL = "tel:+49408802150";
const TELEFON_TEXT = "040 880 21 50";

type Texte = { titel: string; satz: string; autoSchritt: string; fussSchritt: string; hilfssatz: string };
const texte: Record<string, Texte> = {
  de: {
    titel: "Hinweis zur Anfahrt",
    satz: "Wegen Bauarbeiten auf der Parkstraße ist die direkte Zufahrt zur Praxis derzeit gesperrt. Parken Sie bitte kostenfrei in einer der umliegenden Straßen — gut geeignet ist der Klein Flottbeker Weg — und kommen Sie die letzten Minuten zu Fuß zur Parkstraße 10. Mit Bus und S-Bahn erreichen Sie uns wie gewohnt.",
    autoSchritt: "Mit dem Auto zum Parken am Klein Flottbeker Weg",
    fussSchritt: "Von dort zu Fuß zur Praxis (Parkstraße 10)",
    hilfssatz: "Unsicher beim Weg? Rufen Sie uns gern an:",
  },
  en: {
    titel: "How to reach us",
    satz: "Due to construction work on Parkstraße, direct access to the practice is currently closed. Please park free of charge in one of the surrounding streets — Klein Flottbeker Weg works well — and walk the last few minutes to Parkstraße 10. By bus and train you can reach us as usual.",
    autoSchritt: "By car to parking on Klein Flottbeker Weg",
    fussSchritt: "Then on foot to the practice (Parkstraße 10)",
    hilfssatz: "Unsure of the way? Just give us a call:",
  },
  fr: {
    titel: "Comment nous rejoindre",
    satz: "En raison de travaux sur la Parkstraße, l'accès direct au cabinet est actuellement fermé. Garez-vous gratuitement dans l'une des rues voisines — le Klein Flottbeker Weg convient bien — puis rejoignez la Parkstraße 10 à pied en quelques minutes. En bus et en train, vous nous rejoignez comme d'habitude.",
    autoSchritt: "En voiture jusqu'au stationnement (Klein Flottbeker Weg)",
    fussSchritt: "Puis à pied jusqu'au cabinet (Parkstraße 10)",
    hilfssatz: "Un doute sur le chemin ? Appelez-nous :",
  },
  es: {
    titel: "Cómo llegar",
    satz: "Debido a obras en la Parkstraße, el acceso directo a la clínica está cerrado actualmente. Aparque gratis en una de las calles cercanas — el Klein Flottbeker Weg es una buena opción — y llegue a pie en pocos minutos a Parkstraße 10. En autobús y en tren puede llegar como de costumbre.",
    autoSchritt: "En coche hasta el aparcamiento (Klein Flottbeker Weg)",
    fussSchritt: "Luego a pie hasta la clínica (Parkstraße 10)",
    hilfssatz: "¿Dudas sobre el camino? Llámenos:",
  },
};

type App = { google: string; apple: string };
const appLabel: Record<string, App> = {
  de: { google: "Google Maps", apple: "Apple Karten" },
  en: { google: "Google Maps", apple: "Apple Maps" },
  fr: { google: "Google Maps", apple: "Plans (Apple)" },
  es: { google: "Google Maps", apple: "Apple Maps" },
};

const pillStil = {
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
  minHeight: "44px",
  padding: "0 16px",
  background: "transparent",
  color: "#7A3000",
  fontWeight: 600,
  fontSize: "14px",
  border: "1.5px solid rgba(188,64,21,0.45)",
  borderRadius: "9999px",
  textDecoration: "none",
} as const;

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#7A3000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function StepNum({ n }: { n: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "22px", height: "22px", borderRadius: "9999px", background: "#BC4015", color: "#fff", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>
      {n}
    </span>
  );
}

function MapPill({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-[1.02]" style={pillStil}>
      <PinIcon />
      {label}
    </a>
  );
}

export default function Bauhinweis({ locale = "de" }: { locale?: string }) {
  if (!HINWEIS_AKTIV) return null;
  const t = texte[locale] || texte.de;
  const app = appLabel[locale] || appLabel.de;
  const [vor, nach] = t.satz.split(STRASSE);

  return (
    <div
      role="region"
      aria-label={t.titel}
      className="flex items-start gap-3.5 p-5"
      style={{
        background: "rgba(242,101,34,0.07)",
        border: "1px solid rgba(242,101,34,0.3)",
        borderRadius: "16px",
      }}
    >
      {/* Hinweis-Dreieck */}
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 shrink-0 mt-1"
        fill="none"
        stroke="#BC4015"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>

      <div style={{ flex: 1 }}>
        <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500, fontSize: "1.2rem", color: "#2d3a3a", margin: "0 0 6px" }}>
          {t.titel}
        </h3>

        <p style={{ color: "#2d3a3a", fontWeight: 400, fontSize: "15px", lineHeight: 1.6, margin: 0 }}>
          {vor}
          <strong style={{ fontWeight: 700, color: "#7A3000" }}>{STRASSE}</strong>
          {nach || ""}
        </p>

        {/* Zwei-Schritte-Navigation */}
        <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <StepNum n={1} />
              <span style={{ fontWeight: 600, fontSize: "14px", color: "#2d3a3a" }}>{t.autoSchritt}</span>
            </div>
            <div className="flex flex-wrap gap-2" style={{ paddingLeft: "30px" }}>
              <MapPill href={AUTO_APPLE} label={app.apple} />
              <MapPill href={AUTO_GOOGLE} label={app.google} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <StepNum n={2} />
              <span style={{ fontWeight: 600, fontSize: "14px", color: "#2d3a3a" }}>{t.fussSchritt}</span>
            </div>
            <div className="flex flex-wrap gap-2" style={{ paddingLeft: "30px" }}>
              <MapPill href={FUSS_APPLE} label={app.apple} />
              <MapPill href={FUSS_GOOGLE} label={app.google} />
            </div>
          </div>
        </div>

        <p style={{ color: "#6a7a7a", fontSize: "13px", fontWeight: 300, margin: "14px 0 0" }}>
          {t.hilfssatz}{" "}
          <a href={TELEFON_TEL} style={{ color: "#7A3000", fontWeight: 600, textDecoration: "underline" }}>
            {TELEFON_TEXT}
          </a>
        </p>
      </div>
    </div>
  );
}
