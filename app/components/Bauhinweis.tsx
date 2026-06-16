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
 * BEIM BAUENDE ZWEI STELLEN ZURÜCKSETZEN:
 *   1) Hier HINWEIS_AKTIV = false.
 *   2) messages/{de,en,fr,es}.json → Kontakt.anfahrt.auto.text wieder auf den
 *      Original-Text setzen (de: "Parkplätze direkt in der Straße vorhanden.
 *      Anfahrt über Waitzstraße oder Reventlowstraße." — analog en/fr/es).
 *      Dieser wurde für die Bauphase angepasst, weil er sonst dem Hinweis widerspricht.
 *
 * Text/Straße ändern: die vier Sprach-Blöcke in `texte` + STRASSE + die
 * Karten-Links (ADRESSE_ENC) unten anpassen. Deutsche Texte mit echten Umlauten.
 *
 * Warum keine "Route über Klein Flottbeker Weg erzwingen"? Die Praxis liegt
 * direkt an der Parkstraße, ~350 m nördlich der Einmündung — die letzte Etappe
 * ist technisch immer die Parkstraße. Ein Karten-Waypoint erzwingt das nicht
 * (Google darf ihn ignorieren, Apple Karten kann gar keine). Darum: der TEXT
 * beschreibt die Zufahrt klar, die Buttons öffnen schlicht die Route zum Ziel.
 *
 * Danach wie immer committen + auf main pushen → geht live.
 */
const HINWEIS_AKTIV = true;

// Straße, über die die Anfahrt läuft — muss exakt einmal in jedem `satz` vorkommen (wird hervorgehoben)
const STRASSE = "Klein Flottbeker Weg";

// Karten-Ziel = Postanschrift als URL-kodierter String (KEINE Koordinaten — iOS-Snapping-Regression)
const ADRESSE_ENC = "Parkstra%C3%9Fe%2010%2C%2022605%20Hamburg"; // "Parkstraße 10, 22605 Hamburg"
// Google Maps — öffnet auf Android die App, sonst Browser/Web-Maps (kein dir_action=navigate: keine Standort-Abfrage)
const MAPS_GOOGLE = `https://www.google.com/maps/dir/?api=1&destination=${ADRESSE_ENC}&travelmode=driving`;
// Apple Karten — öffnet auf dem iPhone automatisch die App im Routen-Vorschau-Screen
const MAPS_APPLE = `https://maps.apple.com/?daddr=${ADRESSE_ENC}&dirflg=d`;
// Telefon — E.164 ohne Leerzeichen (aus "040 880 21 50"); am echten Handy gegenprüfen
const TELEFON_TEL = "tel:+49408802150";
const TELEFON_TEXT = "040 880 21 50";

type Texte = { titel: string; satz: string; hilfssatz: string };
const texte: Record<string, Texte> = {
  de: {
    titel: "Hinweis zur Anfahrt",
    satz: "Wegen Bauarbeiten ist die übliche Auto-Zufahrt zur Praxis gesperrt — bitte fahren Sie uns derzeit nur über den Klein Flottbeker Weg an. Zu Fuß, mit Bus und S-Bahn erreichen Sie uns wie gewohnt.",
    hilfssatz: "Unsicher beim Weg? Rufen Sie uns gern an — wir lotsen Sie zu Ihnen.",
  },
  en: {
    titel: "How to reach us",
    satz: "Due to construction work, the usual access road for cars is closed — for now, please come via Klein Flottbeker Weg. On foot, by bus and by train you can reach us as usual.",
    hilfssatz: "Unsure of the way? Just give us a call — we'll guide you in.",
  },
  fr: {
    titel: "Comment nous rejoindre",
    satz: "En raison de travaux, l'accès habituel en voiture est fermé — merci de passer pour le moment par le Klein Flottbeker Weg. À pied, en bus et en train, vous nous rejoignez comme d'habitude.",
    hilfssatz: "Un doute sur le chemin ? Appelez-nous, nous vous guidons.",
  },
  es: {
    titel: "Cómo llegar",
    satz: "Debido a obras, el acceso habitual en coche está cerrado — por ahora, llegue por el Klein Flottbeker Weg. A pie, en autobús y en tren puede llegar como de costumbre.",
    hilfssatz: "¿Dudas sobre el camino? Llámenos, le guiamos con gusto.",
  },
};

type Cta = { apple: string; google: string; telefon: string };
const ctaLabel: Record<string, Cta> = {
  de: { apple: "Apple Karten", google: "Google Maps", telefon: `Anrufen: ${TELEFON_TEXT}` },
  en: { apple: "Apple Maps", google: "Google Maps", telefon: `Call: ${TELEFON_TEXT}` },
  fr: { apple: "Plans (Apple)", google: "Google Maps", telefon: `Appeler : ${TELEFON_TEXT}` },
  es: { apple: "Apple Maps", google: "Google Maps", telefon: `Llamar: ${TELEFON_TEXT}` },
};

// Gefüllte Karten-Pille (#BC4015 = AA-tauglicher Kontrast für weißen Text, statt #F26522)
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

// Outline-Pille für den Telefon-Fallback
const outlineStil = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  minHeight: "48px",
  padding: "0 20px",
  background: "transparent",
  color: "#7A3000",
  fontWeight: 600,
  fontSize: "15px",
  border: "1.5px solid rgba(188,64,21,0.45)",
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

export default function Bauhinweis({ locale = "de" }: { locale?: string }) {
  if (!HINWEIS_AKTIV) return null;
  const t = texte[locale] || texte.de;
  const cta = ctaLabel[locale] || ctaLabel.de;
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

        {/* Native Karten-Buttons + Telefon-Fallback */}
        <div className="flex flex-wrap gap-3" style={{ marginTop: "16px" }}>
          <a href={MAPS_APPLE} target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-[1.02]" style={fuellStil}>
            <PinIcon />
            {cta.apple}
          </a>
          <a href={MAPS_GOOGLE} target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-[1.02]" style={fuellStil}>
            <PinIcon />
            {cta.google}
          </a>
          <a href={TELEFON_TEL} className="transition-transform duration-300 hover:scale-[1.02]" style={outlineStil}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7A3000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {cta.telefon}
          </a>
        </div>

        <p style={{ color: "#6a7a7a", fontSize: "13px", fontWeight: 300, margin: "12px 0 0" }}>{t.hilfssatz}</p>
      </div>
    </div>
  );
}
