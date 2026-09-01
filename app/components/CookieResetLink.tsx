"use client";

/**
 * Footer-Link zum Widerruf ALLER Einwilligungen (Cookie/Maps UND HeyDent-
 * Terminbuchung). Löscht die gespeicherten Schlüssel und lädt neu — Consent-
 * Banner und Termin-Platzhalter erscheinen wieder, Maps fällt auf den
 * Platzhalter zurück.
 */
const labels: Record<string, string> = {
  de: "Cookie-Einstellungen",
  en: "Cookie settings",
  fr: "Paramètres des cookies",
  es: "Configuración de cookies",
};

export default function CookieResetLink({ locale = "de" }: { locale?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          localStorage.removeItem("cookie-consent");
          localStorage.removeItem("heydent-consent");
          window.dispatchEvent(new CustomEvent("consent-changed", { detail: "necessary" }));
        } catch {}
        window.location.reload();
      }}
      className="text-xs transition-colors duration-300 hover:text-white cursor-pointer"
      style={{ color: "rgba(255, 255, 255, 0.22)", fontWeight: 300, background: "none", border: "none", padding: 0, fontFamily: "inherit" }}
    >
      {labels[locale] || labels.de}
    </button>
  );
}
