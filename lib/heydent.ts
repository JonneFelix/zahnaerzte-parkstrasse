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

/**
 * Prüft, ob die Online-Terminbuchung geladen werden darf.
 *
 * Ausschliesslich der dedizierte, zweckgebundene Schlüssel `heydent-consent`
 * zählt — NICHT ein pauschales `cookie-consent === "all"`. So kann ein altes
 * „Alle akzeptieren", das ein Bestandsbesucher früher (nur für Google Maps)
 * erteilt hat, HeyDent nicht rückwirkend freischalten. Der Cookie-Banner
 * setzt `heydent-consent` beim „Alle akzeptieren" fortan explizit mit.
 */
/* Sitzungs-Fallback bei blockiertem localStorage: sonst fragt der Consent-Dialog
   bei jedem weiteren Klick erneut, obwohl das Widget längst läuft. */
let consentDieseSitzung = false;

export function hasHeydentConsent(): boolean {
  if (typeof window === "undefined") return false;
  if (consentDieseSitzung) return true;
  try {
    return localStorage.getItem("heydent-consent") === "granted";
  } catch {
    return false;
  }
}

/** Erteilt die dedizierte Einwilligung für die Online-Terminbuchung. */
export function grantHeydentConsent(): void {
  if (typeof window === "undefined") return;
  consentDieseSitzung = true;
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
