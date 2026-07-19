/**
 * HeyDent-Online-Terminbuchung — clientseitige Steuerung (Static Export-tauglich).
 *
 * Das Orb-Widget (`embed-orb.js`) lädt beim Ausführen sofort ein iframe und
 * überträgt dabei Daten (u.a. IP) an HeyDent. Deshalb wird das Script NIEMALS
 * direkt eingebunden, sondern erst nach ausdrücklicher Einwilligung geladen —
 * gesteuert von der globalen Komponente `HeydentOrb`.
 *
 * `openOrb()` löst nur ein Event aus; die gesamte Logik (Consent-Dialog,
 * Script-Injektion, Auto-Öffnen, Fallback auf /termin) liegt in `HeydentOrb`,
 * damit es genau eine Wahrheit gibt.
 */

export const HEYDENT_SLUG = "parkstrasse-othmarschen";
export const HEYDENT_BASE = "https://termin.hey-dent.de";

/** Prüft, ob die Online-Terminbuchung geladen werden darf. */
export function hasHeydentConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return (
      localStorage.getItem("cookie-consent") === "all" ||
      localStorage.getItem("heydent-consent") === "granted"
    );
  } catch {
    return false;
  }
}

/** Erteilt die dedizierte Einwilligung für die Online-Terminbuchung. */
export function grantHeydentConsent(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("heydent-consent", "granted");
  } catch {
    /* localStorage nicht verfügbar — Einwilligung gilt nur für diese Sitzung */
  }
  window.dispatchEvent(new CustomEvent("heydent-consent-changed", { detail: "granted" }));
}

/**
 * Öffnet die Online-Terminbuchung. Reine Absichtserklärung per Event —
 * `HeydentOrb` entscheidet: direkt öffnen · Consent-Dialog · Fallback /termin.
 */
export function openOrb(locale = "de"): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("heydent:request-open", { detail: { locale } }));
}
