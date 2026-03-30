import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import MobileCTA from "../components/MobileCTA";
import SetLocale from "../components/SetLocale";
import { locales, type Locale } from "../../lib/i18n";

/* Statische Params für alle Sprachen generieren */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    de: "Zahnärzte Parkstrasse Othmarschen | Dr. Schwegmann & Dr. Janz",
    en: "Dentists Parkstrasse Othmarschen | Dr. Schwegmann & Dr. Janz",
    fr: "Dentistes Parkstrasse Othmarschen | Dr. Schwegmann & Dr. Janz",
    es: "Dentistas Parkstrasse Othmarschen | Dr. Schwegmann & Dr. Janz",
  };

  const descriptions: Record<string, string> = {
    de: "Ihre Zahnarztpraxis in Hamburg-Othmarschen. Oralchirurgie, Implantate, Zahnersatz & Prophylaxe. Fachzahnärztin für Oralchirurgie. Termin: 040 880 21 50.",
    en: "Your dental practice in Hamburg-Othmarschen. Oral surgery, implants, prosthetics & prophylaxis. Specialist in oral surgery. Appointment: 040 880 21 50.",
    fr: "Votre cabinet dentaire à Hamburg-Othmarschen. Chirurgie orale, implants, prothèses & prophylaxie. Spécialiste en chirurgie orale. Rendez-vous : 040 880 21 50.",
    es: "Su clínica dental en Hamburg-Othmarschen. Cirugía oral, implantes, prótesis y profilaxis. Especialista en cirugía oral. Cita: 040 880 21 50.",
  };

  return {
    title: {
      default: titles[locale] || titles.de,
      template: `%s | Zahnärzte Parkstrasse Othmarschen`,
    },
    description: descriptions[locale] || descriptions.de,
    /* Canonical und hreflang werden pro Seite via createMetadata() gesetzt */
    openGraph: {
      title: titles[locale] || titles.de,
      description: descriptions[locale] || descriptions.de,
      url: `https://www.zahnarzt-othmarschen.de/${locale}`,
      siteName: "Zahnärzte Parkstrasse Othmarschen",
      locale: locale === "de" ? "de_DE" : locale === "en" ? "en_US" : locale === "fr" ? "fr_FR" : "es_ES",
      type: "website",
      images: [
        {
          url: "/images/praxis-mit-logo.jpg",
          width: 1200,
          height: 630,
          alt: "Zahnärzte Parkstrasse Othmarschen — Zahnarztpraxis in Hamburg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.de,
      description: descriptions[locale] || descriptions.de,
      images: ["/images/praxis-mit-logo.jpg"],
    },
  };
}

/* Schema.org JSON-LD Daten */
const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Zahnärzte Parkstrasse Othmarschen",
  "description": "Zahnarztpraxis in Hamburg-Othmarschen unter der Leitung von Dr. Claudia Schwegmann, Fachzahnärztin für Oralchirurgie.",
  "url": "https://www.zahnarzt-othmarschen.de",
  "telephone": "+494088021050",
  "email": "info@zahnarzt-othmarschen.de",
  "address": { "@type": "PostalAddress", "streetAddress": "Parkstraße 10", "addressLocality": "Hamburg", "addressRegion": "HH", "postalCode": "22605", "addressCountry": "DE" },
  "geo": { "@type": "GeoCoordinates", "latitude": 53.5528, "longitude": 9.8832 },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday"], "opens": "09:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "09:00", "closes": "16:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "09:00", "closes": "20:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "09:00", "closes": "13:00" },
  ],
  "availableLanguage": [
    { "@type": "Language", "name": "German" },
    { "@type": "Language", "name": "English" },
    { "@type": "Language", "name": "French" },
    { "@type": "Language", "name": "Spanish" },
  ],
  "medicalSpecialty": "Dentistry",
  "image": "https://www.zahnarzt-othmarschen.de/images/praxis-mit-logo.jpg",
  "priceRange": "$$",
};

/* WebSite Schema — signalisiert Google die Seitenstruktur für Sitelinks */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Zahnärzte Parkstrasse Othmarschen",
  "url": "https://www.zahnarzt-othmarschen.de",
  "inLanguage": ["de", "en", "fr", "es"],
  "publisher": {
    "@type": "Dentist",
    "name": "Zahnärzte Parkstrasse Othmarschen",
  },
};

/* SiteNavigationElement Schema — listet Hauptnavigation für Google */
const navigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "SiteNavigationElement", "position": 1, "name": "Leistungen", "url": "https://www.zahnarzt-othmarschen.de/de/leistungen/" },
    { "@type": "SiteNavigationElement", "position": 2, "name": "Team", "url": "https://www.zahnarzt-othmarschen.de/de/team/" },
    { "@type": "SiteNavigationElement", "position": 3, "name": "Innovationen", "url": "https://www.zahnarzt-othmarschen.de/de/innovationen/" },
    { "@type": "SiteNavigationElement", "position": 4, "name": "Fortbildungen", "url": "https://www.zahnarzt-othmarschen.de/de/fortbildungen/" },
    { "@type": "SiteNavigationElement", "position": 5, "name": "Kontakt", "url": "https://www.zahnarzt-othmarschen.de/de/kontakt/" },
    { "@type": "SiteNavigationElement", "position": 6, "name": "Termin buchen", "url": "https://www.zahnarzt-othmarschen.de/de/termin/" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <>
      {/* Client-seitig html lang setzen */}
      <SetLocale locale={locale} />

      {/* Schema.org — Dentist + WebSite + Navigation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
      />

      <Header locale={locale as Locale} />
      <main>{children}</main>
      <Footer locale={locale as Locale} />
      <MobileCTA locale={locale as Locale} />
      <CookieBanner />
    </>
  );
}
