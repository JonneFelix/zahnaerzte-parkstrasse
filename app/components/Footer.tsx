import Link from "next/link";
import Image from "next/image";
import OrganischerTrenner from "./OrganischerTrenner";
import BaumDekor from "./BaumDekor";

export default function Footer() {
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
              width={270}
              height={46}
              className="mb-5 opacity-90"
            />
            <p
              className="text-sm max-w-sm leading-relaxed"
              style={{ color: "rgba(255, 255, 255, 0.42)", fontWeight: 300, lineHeight: 1.8 }}
            >
              Ihre Zahnarztpraxis im grünen Herzen von Hamburg-Othmarschen.
              Einfühlsame Zahnmedizin mit Kompetenz und Herz — wir freuen
              uns, Sie persönlich kennenzulernen.
            </p>
          </div>

          {/* Praxis */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-5"
              style={{ color: "rgba(255, 255, 255, 0.55)", fontWeight: 600, letterSpacing: "0.2em" }}
            >
              Praxis
            </h4>
            <nav className="space-y-2.5">
              {[
                { text: "Unser Team", href: "/team" },
                { text: "Innovationen", href: "/innovationen" },
                { text: "Fortbildungen", href: "/fortbildungen" },
                { text: "Kontakt & Anfahrt", href: "/kontakt" },
                { text: "Termin buchen", href: "/termin" },
                { text: "FAQ", href: "/faq" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
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
              Behandlungen
            </h4>
            <nav className="space-y-2.5">
              {[
                { text: "Oralchirurgie", href: "/leistungen/oralchirurgie" },
                { text: "Implantate", href: "/leistungen/implantate" },
                { text: "Zahnersatz", href: "/leistungen/zahnersatz" },
                { text: "Wurzelbehandlung", href: "/leistungen/wurzelbehandlung" },
                { text: "Prophylaxe", href: "/leistungen/prophylaxe" },
                { text: "Parodontologie", href: "/leistungen/parodontologie" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
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
              Kontakt
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
            &copy; {new Date().getFullYear()} Zahnärzte Parkstrasse Othmarschen. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/impressum"
              className="text-xs transition-colors duration-300 hover:text-white"
              style={{ color: "rgba(255, 255, 255, 0.22)", fontWeight: 300 }}
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
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
