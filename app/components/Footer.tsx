import Link from "next/link";
import Image from "next/image";
import OrganischerTrenner from "./OrganischerTrenner";
import BaumDekor from "./BaumDekor";
import { type Locale } from "../../lib/i18n";

function l(href: string, locale: Locale) {
  return `/${locale}${href}`;
}

const footerTexts: Record<string, { praxis: string; behandlungen: string; kontakt: string; team: string; innovationen: string; fortbildungen: string; kontaktAnfahrt: string; terminBuchen: string }> = {
  de: { praxis: "Praxis", behandlungen: "Behandlungen", kontakt: "Kontakt", team: "Unser Team", innovationen: "Innovationen", fortbildungen: "Fortbildungen", kontaktAnfahrt: "Kontakt & Anfahrt", terminBuchen: "Termin buchen" },
  en: { praxis: "Practice", behandlungen: "Treatments", kontakt: "Contact", team: "Our Team", innovationen: "Innovations", fortbildungen: "Training", kontaktAnfahrt: "Contact & Directions", terminBuchen: "Book appointment" },
  fr: { praxis: "Cabinet", behandlungen: "Traitements", kontakt: "Contact", team: "Notre équipe", innovationen: "Innovations", fortbildungen: "Formations", kontaktAnfahrt: "Contact & Accès", terminBuchen: "Prendre rendez-vous" },
  es: { praxis: "Clínica", behandlungen: "Tratamientos", kontakt: "Contacto", team: "Nuestro equipo", innovationen: "Innovaciones", fortbildungen: "Formación", kontaktAnfahrt: "Contacto y Acceso", terminBuchen: "Pedir cita" },
};

const behandlungenTexts: Record<string, string[]> = {
  de: ["Oralchirurgie", "Implantate", "Zahnersatz", "Wurzelbehandlung", "Prophylaxe", "Parodontologie"],
  en: ["Oral Surgery", "Implants", "Prosthetics", "Root Canal", "Preventive Care", "Periodontics"],
  fr: ["Chirurgie orale", "Implants", "Prothèses", "Traitement de canal", "Prophylaxie", "Parodontologie"],
  es: ["Cirugía oral", "Implantes", "Prótesis", "Endodoncia", "Profilaxis", "Periodoncia"],
};

const beschreibungTexts: Record<string, string> = {
  de: "Ihre Zahnarztpraxis im grünen Herzen von Hamburg-Othmarschen. Einfühlsame Zahnmedizin mit Kompetenz und Herz — wir freuen uns, Sie persönlich kennenzulernen.",
  en: "Your dental practice in the green heart of Hamburg-Othmarschen. Compassionate dentistry with expertise and heart — we look forward to meeting you.",
  fr: "Votre cabinet dentaire au cœur vert de Hamburg-Othmarschen. Des soins dentaires attentionnés avec compétence et cœur — nous avons hâte de vous rencontrer.",
  es: "Su clínica dental en el corazón verde de Hamburg-Othmarschen. Odontología compasiva con experiencia y corazón — esperamos conocerle.",
};

const rechteTexts: Record<string, string> = {
  de: "Alle Rechte vorbehalten.",
  en: "All rights reserved.",
  fr: "Tous droits réservés.",
  es: "Todos los derechos reservados.",
};

function getFooterBehandlungen(locale: Locale) {
  const hrefs = ["/leistungen/oralchirurgie", "/leistungen/implantate", "/leistungen/zahnersatz", "/leistungen/wurzelbehandlung", "/leistungen/prophylaxe", "/leistungen/parodontologie"];
  const texts = behandlungenTexts[locale] || behandlungenTexts.de;
  return hrefs.map((href, i) => ({ text: texts[i], href }));
}

export default function Footer({ locale = "de" as Locale }: { locale?: Locale }) {
  const ft = footerTexts[locale] || footerTexts.de;
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #2d3a3a 0%, #1e2828 100%)",
      }}
    >
      <OrganischerTrenner
        className="absolute top-0 left-0 w-full h-14"
        style={{ color: "#2d3a3a" }}
        umdrehen
      />

      <BaumDekor
        className="absolute bottom-4 right-8 w-32 opacity-[0.03] rotate-12 hidden lg:block"
        weiss
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-22 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Logo & Beschreibung */}
          <div className="lg:col-span-2">
            <Image
              src="/logo-white.svg"
              alt="Zahnärzte Parkstrasse — Logo"
              width={600}
              height={100}
              className="mb-5 opacity-90 w-full max-w-[320px] h-auto"
            />
            <p
              className="text-sm max-w-sm leading-relaxed"
              style={{ color: "rgba(255, 255, 255, 0.42)", fontWeight: 300, lineHeight: 1.8 }}
            >
              {beschreibungTexts[locale] || beschreibungTexts.de}
            </p>
          </div>

          {/* Praxis */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-5"
              style={{ color: "rgba(255, 255, 255, 0.55)", fontWeight: 600, letterSpacing: "0.2em" }}
            >
              {ft.praxis}
            </h4>
            <nav className="space-y-2.5">
              {[
                { text: ft.team, href: "/team" },
                { text: ft.innovationen, href: "/innovationen" },
                { text: ft.fortbildungen, href: "/fortbildungen" },
                { text: ft.kontaktAnfahrt, href: "/kontakt" },
                { text: ft.terminBuchen, href: "/termin" },
                { text: "FAQ", href: "/faq" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={l(link.href, locale)}
                  className="block text-sm transition-colors duration-300 hover:text-white"
                  style={{ color: "rgba(255, 255, 255, 0.38)", fontWeight: 300 }}
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Behandlungen */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-5"
              style={{ color: "rgba(255, 255, 255, 0.55)", fontWeight: 600, letterSpacing: "0.2em" }}
            >
              {ft.behandlungen}
            </h4>
            <nav className="space-y-2.5">
              {getFooterBehandlungen(locale).map((link) => (
                <Link
                  key={link.href}
                  href={l(link.href, locale)}
                  className="block text-sm transition-colors duration-300 hover:text-white"
                  style={{ color: "rgba(255, 255, 255, 0.38)", fontWeight: 300 }}
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Kontakt */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-5"
              style={{ color: "rgba(255, 255, 255, 0.55)", fontWeight: 600, letterSpacing: "0.2em" }}
            >
              {ft.kontakt}
            </h4>
            <div className="space-y-2.5">
              <a
                href="https://maps.google.com/?q=Parkstraße+10,+22605+Hamburg"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm transition-colors duration-300 hover:text-white"
                style={{ color: "rgba(255, 255, 255, 0.38)", fontWeight: 300, lineHeight: 1.7 }}
              >
                Parkstraße 10
                <br />
                22605 Hamburg
              </a>
              <a
                href="tel:+494088021050"
                className="block text-sm transition-colors duration-300 hover:text-white"
                style={{ color: "#F26522", fontWeight: 500 }}
              >
                040 — 880 21 50
              </a>
              <a
                href="mailto:info@zahnarzt-othmarschen.de"
                className="block text-sm transition-colors duration-300 hover:text-white"
                style={{ color: "rgba(255, 255, 255, 0.38)", fontWeight: 300 }}
              >
                info@zahnarzt-othmarschen.de
              </a>
              <div
                className="text-xs leading-relaxed pt-2"
                style={{ color: "rgba(255, 255, 255, 0.3)", lineHeight: 1.7 }}
              >
                <p>Mo + Di: 9:00 — 18:00</p>
                <p>Mi: 9:00 — 16:00</p>
                <p>Do: 9:00 — 20:00</p>
                <p>Fr: 9:00 — 13:00</p>
                <p className="mt-1" style={{ fontStyle: "italic" }}>und nach Vereinbarung</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trennlinie */}
        <div
          className="h-px mb-7"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.07), transparent)",
          }}
        />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(255, 255, 255, 0.22)", fontWeight: 300 }}>
            &copy; {new Date().getFullYear()} Zahnärzte Parkstrasse Othmarschen. {rechteTexts[locale] || rechteTexts.de}
          </p>
          <div className="flex items-center gap-5">
            <Link
              href={l("/impressum", locale)}
              className="text-xs transition-colors duration-300 hover:text-white"
              style={{ color: "rgba(255, 255, 255, 0.22)", fontWeight: 300 }}
            >
              Impressum
            </Link>
            <Link
              href={l("/datenschutz", locale)}
              className="text-xs transition-colors duration-300 hover:text-white"
              style={{ color: "rgba(255, 255, 255, 0.22)", fontWeight: 300 }}
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
