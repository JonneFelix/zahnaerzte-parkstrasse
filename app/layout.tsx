import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import MobileCTA from "./components/MobileCTA";
import Breadcrumbs from "./components/Breadcrumbs";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Zahnärzte Parkstrasse Othmarschen | Dr. Schwegmann & Dr. Janz",
    template: "%s | Zahnärzte Parkstrasse Othmarschen",
  },
  description:
    "Ihre Zahnarztpraxis in Hamburg-Othmarschen. Oralchirurgie, Implantate, Zahnersatz & Prophylaxe. Fachzahnärztin für Oralchirurgie. Termin: 040 880 21 50.",
  metadataBase: new URL("https://zahnaerzte-parkstrasse.de"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <Script
          src="https://praxis-analytics.jonne-schwegmann.com/script.js"
          data-website-id="555d0c21-8ed9-4b57-9cfa-b5b858b8764d"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              "name": "Zahnärzte Parkstrasse Othmarschen",
              "description": "Zahnarztpraxis in Hamburg-Othmarschen unter der Leitung von Dr. Claudia Schwegmann, Fachzahnärztin für Oralchirurgie. Seit über 25 Jahren in Othmarschen. Sprachen: Deutsch, Englisch, Französisch, Spanisch.",
              "url": "https://zahnaerzte-parkstrasse.de",
              "telephone": "+494088021050",
              "email": "info@zahnarzt-othmarschen.de",
              "image": "https://zahnaerzte-parkstrasse.de/images/team/team-gruppenfoto-stehend.webp",
              "priceRange": "$$",
              "currenciesAccepted": "EUR",
              "paymentAccepted": "Cash, EC-Karte, Kreditkarte",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Parkstraße 10",
                "addressLocality": "Hamburg",
                "addressRegion": "HH",
                "postalCode": "22605",
                "addressCountry": "DE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 53.5511,
                "longitude": 9.8689
              },
              "openingHoursSpecification": [
                { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday"], "opens": "09:00", "closes": "18:00" },
                { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "09:00", "closes": "16:00" },
                { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "09:00", "closes": "20:00" },
                { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "09:00", "closes": "13:00" }
              ],
              "availableLanguage": [
                { "@type": "Language", "name": "German", "alternateName": "de" },
                { "@type": "Language", "name": "English", "alternateName": "en" },
                { "@type": "Language", "name": "French", "alternateName": "fr" },
                { "@type": "Language", "name": "Spanish", "alternateName": "es" }
              ],
              "medicalSpecialty": "Dentistry",
              "founder": {
                "@type": "Person",
                "name": "Dr. Claudia Schwegmann",
                "jobTitle": "Fachzahnärztin für Oralchirurgie",
                "description": "Inhaberin, über 30 Jahre Berufserfahrung"
              },
              "employee": [
                {
                  "@type": "Person",
                  "name": "Dr. Nina Janz",
                  "jobTitle": "Zahnärztin",
                  "description": "Schwerpunkt Endodontie (Wurzelbehandlung)"
                },
                {
                  "@type": "Person",
                  "name": "Dr. Julia Prüter",
                  "jobTitle": "Zahnärztin"
                }
              ],
              "sameAs": []
            })
          }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${workSans.variable} antialiased papier-textur`}
      >
        <Header />
        <Breadcrumbs />
        <main>{children}</main>
        <Footer />
        <MobileCTA />
        <CookieBanner />
      </body>
    </html>
  );
}
