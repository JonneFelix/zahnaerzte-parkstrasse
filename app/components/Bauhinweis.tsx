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
 * Sprach-Zeilen in `texte` unten anpassen. Ändert sich die Straße,
 * auch STRASSE + die Karten-Links (MAPS_*) anpassen.
 *
 * Danach wie immer committen + auf main pushen → geht live.
 */
const HINWEIS_AKTIV = true;

// Die Straße, über die die Anfahrt läuft — exakt so, wie sie in den Texten vorkommt
const STRASSE = "Klein Flottbeker Weg";

// Karten-Links (öffnen auf dem Handy direkt die Karten-App)
const MAPS_ROUTE = "https://www.google.com/maps/dir/?api=1&destination=Parkstra%C3%9Fe+10,+22605+Hamburg";
const MAPS_STRASSE = "https://www.google.com/maps/search/?api=1&query=Klein+Flottbeker+Weg,+Hamburg";

const texte: Record<string, string> = {
  de: "Hinweis: Wegen Bauarbeiten ist die Anfahrt zur Praxis derzeit nur über den Klein Flottbeker Weg möglich.",
  en: "Please note: due to construction work, the practice can currently only be reached via Klein Flottbeker Weg.",
  fr: "Information : en raison de travaux, le cabinet n'est actuellement accessible que par le Klein Flottbeker Weg.",
  es: "Aviso: debido a obras, actualmente solo se puede llegar a la clínica por el Klein Flottbeker Weg.",
};

const ctaLabel: Record<string, string> = {
  de: "Route zur Praxis öffnen",
  en: "Open directions to the practice",
  fr: "Itinéraire vers le cabinet",
  es: "Cómo llegar a la clínica",
};

export default function Bauhinweis({ locale = "de" }: { locale?: string }) {
  if (!HINWEIS_AKTIV) return null;
  const text = texte[locale] || texte.de;
  const cta = ctaLabel[locale] || ctaLabel.de;

  // Straßenname im Satz als anklickbaren Link hervorheben
  const [vor, nach] = text.split(STRASSE);

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

      <div>
        <p className="text-sm" style={{ color: "#2d3a3a", fontWeight: 500, lineHeight: 1.6 }}>
          {vor}
          <a
            href={MAPS_STRASSE}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#9a3b18", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: "2px" }}
          >
            {STRASSE}
          </a>
          {nach || ""}
        </p>

        {/* Direkter Routen-Button — öffnet auf dem Handy die Karten-App */}
        <a
          href={MAPS_ROUTE}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-[1.03]"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "12px",
            background: "#F26522",
            color: "#fff",
            fontWeight: 600,
            fontSize: "13px",
            letterSpacing: "0.02em",
            padding: "9px 16px",
            borderRadius: "9999px",
            textDecoration: "none",
          }}
        >
          {/* Navigations-Pfeil */}
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 11l19-9-9 19-2-8-8-2z" />
          </svg>
          {cta}
        </a>
      </div>
    </div>
  );
}
