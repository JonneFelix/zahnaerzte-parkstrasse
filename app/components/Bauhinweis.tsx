import { Fragment } from "react";

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
 * Situation: Parken geht wie gewohnt DIREKT an der Praxis (Parkstraße 10).
 * Nur die ANFAHRT ist eingeschränkt — derzeit nur über Klein Flottbeker Weg
 * ODER Grottenstraße (eine der zwei üblichen Zufahrten ist gesperrt).
 * Darum: Buttons = Route direkt zur Praxis (Apple + Google), Telefon-Link.
 * Die Karten-App wählt die Route selbst — die zwei offenen Straßen stehen
 * im Text (eine Route über eine bestimmte Straße lässt sich nicht erzwingen).
 *
 * BEIM BAUENDE ZWEI STELLEN ZURÜCKSETZEN:
 *   1) Hier HINWEIS_AKTIV = false.
 *   2) messages/{de,en,fr,es}.json → Kontakt.anfahrt.auto.text wieder auf den
 *      Original-Text (de: "Parkplätze direkt in der Straße vorhanden. Anfahrt
 *      über Waitzstraße oder Reventlowstraße." — analog en/fr/es).
 *
 * Straßen/Text ändern: STRASSEN + `texte` unten. Deutsche Texte mit echten Umlauten.
 */
const HINWEIS_AKTIV = true;

// Straßen, über die die Anfahrt derzeit möglich ist — werden im Text hervorgehoben
const STRASSEN = ["Klein Flottbeker Weg", "Grottenstraße"];

// Routen-Ziel = Praxis-Adresse als URL-kodierter String (KEINE Koordinaten)
const ADRESSE_ENC = "Parkstra%C3%9Fe%2010%2C%2022605%20Hamburg"; // "Parkstraße 10, 22605 Hamburg"
const ROUTE_GOOGLE = `https://www.google.com/maps/dir/?api=1&destination=${ADRESSE_ENC}&travelmode=driving`;
const ROUTE_APPLE = `https://maps.apple.com/?daddr=${ADRESSE_ENC}&dirflg=d`;
// Telefon — E.164 ohne Leerzeichen (aus "040 880 21 50"); am echten Handy gegenprüfen
const TELEFON_TEL = "tel:+49408802150";
const TELEFON_TEXT = "040 880 21 50";

type Texte = { titel: string; satz: string; routenLabel: string; hilfssatz: string };
const texte: Record<string, Texte> = {
  de: {
    titel: "Hinweis zur Anfahrt",
    satz: "Wegen Bauarbeiten ist die Anfahrt zur Praxis derzeit nur über den Klein Flottbeker Weg oder die Grottenstraße möglich — die andere übliche Zufahrt ist gesperrt. Parken können Sie wie gewohnt direkt an der Praxis (Parkstraße 10).",
    routenLabel: "Route zur Praxis:",
    hilfssatz: "Unsicher beim Weg? Rufen Sie uns gern an:",
  },
  en: {
    titel: "How to reach us",
    satz: "Due to construction work, the practice can currently only be reached via Klein Flottbeker Weg or Grottenstraße — the other usual approach is closed. You can park as usual directly at the practice (Parkstraße 10).",
    routenLabel: "Directions to the practice:",
    hilfssatz: "Unsure of the way? Just give us a call:",
  },
  fr: {
    titel: "Comment nous rejoindre",
    satz: "En raison de travaux, le cabinet n'est actuellement accessible que par le Klein Flottbeker Weg ou la Grottenstraße — l'autre accès habituel est fermé. Vous pouvez vous garer comme d'habitude directement au cabinet (Parkstraße 10).",
    routenLabel: "Itinéraire vers le cabinet :",
    hilfssatz: "Un doute sur le chemin ? Appelez-nous :",
  },
  es: {
    titel: "Cómo llegar",
    satz: "Debido a obras, actualmente solo se puede llegar a la clínica por el Klein Flottbeker Weg o la Grottenstraße — el otro acceso habitual está cerrado. Puede aparcar como de costumbre directamente en la clínica (Parkstraße 10).",
    routenLabel: "Cómo llegar a la clínica:",
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

// Gefüllte Route-Pille (#BC4015 = AA-tauglicher Kontrast für weißen Text)
const fuellStil = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  minHeight: "48px",
  padding: "0 20px",
  background: "#BC4015",
  color: "#fff",
  fontWeight: 600,
  fontSize: "15px",
  borderRadius: "9999px",
  textDecoration: "none",
} as const;

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// Hebt die Anfahrtsstraßen im Fließtext fett hervor
function highlight(text: string, phrases: string[]) {
  if (!phrases.length) return text;
  const re = new RegExp(`(${phrases.join("|")})`, "g");
  return text.split(re).map((part, i) =>
    phrases.includes(part) ? (
      <strong key={i} style={{ fontWeight: 700, color: "#7A3000" }}>{part}</strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export default function Bauhinweis({ locale = "de" }: { locale?: string }) {
  if (!HINWEIS_AKTIV) return null;
  const t = texte[locale] || texte.de;
  const app = appLabel[locale] || appLabel.de;

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
          {highlight(t.satz, STRASSEN)}
        </p>

        {/* Route direkt zur Praxis */}
        <p style={{ color: "#6a7a7a", fontSize: "13px", fontWeight: 500, margin: "16px 0 8px" }}>{t.routenLabel}</p>
        <div className="flex flex-wrap gap-3">
          <a href={ROUTE_APPLE} target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-[1.02]" style={fuellStil}>
            <PinIcon />
            {app.apple}
          </a>
          <a href={ROUTE_GOOGLE} target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-[1.02]" style={fuellStil}>
            <PinIcon />
            {app.google}
          </a>
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
