/**
 * Temporärer Anfahrts-/Bauarbeiten-Hinweis.
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │  EIN / AUS — nur diese eine Zeile ändern:                     │
 * │     HINWEIS_AKTIV = true   → Hinweis wird angezeigt           │
 * │     HINWEIS_AKTIV = false  → Hinweis ist komplett aus         │
 * └─────────────────────────────────────────────────────────────┘
 *
 * Der Hinweis erscheint dann automatisch an beiden Stellen:
 * Startseite (unter dem Hero) UND Kontaktseite (Anfahrts-Bereich).
 *
 * Text ändern (z. B. andere Straße / anderer Grund): die vier
 * Sprach-Zeilen in `texte` unten anpassen.
 *
 * Danach wie immer committen + auf main pushen → geht live.
 */
const HINWEIS_AKTIV = true;

const texte: Record<string, string> = {
  de: "Hinweis: Wegen Bauarbeiten ist die Anfahrt zur Praxis derzeit nur über den Klein Flottbeker Weg möglich.",
  en: "Please note: due to construction work, the practice can currently only be reached via Klein Flottbeker Weg.",
  fr: "Information : en raison de travaux, le cabinet n'est actuellement accessible que par le Klein Flottbeker Weg.",
  es: "Aviso: debido a obras, actualmente solo se puede llegar a la clínica por el Klein Flottbeker Weg.",
};

export default function Bauhinweis({ locale = "de" }: { locale?: string }) {
  if (!HINWEIS_AKTIV) return null;
  const text = texte[locale] || texte.de;

  return (
    <div
      className="flex items-start gap-3.5 p-5"
      style={{
        background: "rgba(242,101,34,0.07)",
        border: "1px solid rgba(242,101,34,0.3)",
        borderRadius: "16px",
      }}
      role="note"
    >
      {/* Warn-/Hinweis-Dreieck */}
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 shrink-0 mt-0.5"
        fill="none"
        stroke="#F26522"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <p className="text-sm" style={{ color: "#2d3a3a", fontWeight: 500, lineHeight: 1.6 }}>
        {text}
      </p>
    </div>
  );
}
