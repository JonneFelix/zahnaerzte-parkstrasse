export const locales = ["de", "en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  de: () => import("../messages/de.json").then((m) => m.default),
  en: () => import("../messages/en.json").then((m) => m.default),
  fr: () => import("../messages/fr.json").then((m) => m.default),
  es: () => import("../messages/es.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

/* Lokalisierte URL-Pfade pro Sprache */
export const localePaths: Record<Locale, Record<string, string>> = {
  de: {
    leistungen: "leistungen",
    team: "team",
    innovationen: "innovationen",
    fortbildungen: "fortbildungen",
    kontakt: "kontakt",
    termin: "termin",
    faq: "faq",
    impressum: "impressum",
    datenschutz: "datenschutz",
    praxis: "praxis",
    wissenswertes: "wissenswertes",
  },
  en: {
    leistungen: "services",
    team: "team",
    innovationen: "innovations",
    fortbildungen: "training",
    kontakt: "contact",
    termin: "appointment",
    faq: "faq",
    impressum: "imprint",
    datenschutz: "privacy",
    praxis: "practice",
    wissenswertes: "knowledge",
  },
  fr: {
    leistungen: "soins",
    team: "equipe",
    innovationen: "innovations",
    fortbildungen: "formations",
    kontakt: "contact",
    termin: "rendez-vous",
    faq: "faq",
    impressum: "mentions-legales",
    datenschutz: "confidentialite",
    praxis: "cabinet",
    wissenswertes: "informations",
  },
  es: {
    leistungen: "servicios",
    team: "equipo",
    innovationen: "innovaciones",
    fortbildungen: "formacion",
    kontakt: "contacto",
    termin: "cita",
    faq: "faq",
    impressum: "aviso-legal",
    datenschutz: "privacidad",
    praxis: "clinica",
    wissenswertes: "informacion",
  },
};
