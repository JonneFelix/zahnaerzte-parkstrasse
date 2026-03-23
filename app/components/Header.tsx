"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Locale, locales } from "../../lib/i18n";

const navLinks = [
  {
    text: "Leistungen",
    href: "/leistungen",
    unterseiten: [
      { text: "Oralchirurgie", href: "/leistungen/oralchirurgie" },
      { text: "Implantate", href: "/leistungen/implantate" },
      { text: "Wurzelbehandlung", href: "/leistungen/wurzelbehandlung" },
      { text: "Prophylaxe", href: "/leistungen/prophylaxe" },
      { text: "Parodontologie", href: "/leistungen/parodontologie" },
      { text: "Zahnersatz", href: "/leistungen/zahnersatz" },
      { text: "Kinderzahnheilkunde", href: "/leistungen/kinderzahnheilkunde" },
      { text: "Ästhetik", href: "/leistungen/aesthetik" },
    ],
  },
  { text: "Team", href: "/team" },
  { text: "Innovationen", href: "/innovationen" },
  { text: "Fortbildungen", href: "/fortbildungen" },
  { text: "Kontakt", href: "/kontakt" },
];

/* Hilfsfunktion: Locale-Prefix an Pfade hängen */
function l(href: string, locale: Locale) {
  return `/${locale}${href}`;
}

export default function Header({ locale = "de" as Locale }: { locale?: Locale }) {
  const [mobileOffen, setMobileOffen] = useState(false);
  const [leistungenOffen, setLeistungenOffen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Body-Scroll sperren wenn mobiles Menü offen */
  useEffect(() => {
    document.body.style.overflow = mobileOffen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOffen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(244, 241, 236, 0.97)"
            : "rgba(244, 241, 236, 0.88)",
          backdropFilter: "blur(14px)",
          borderBottom: scrolled
            ? "1px solid rgba(105, 123, 123, 0.1)"
            : "1px solid rgba(105, 123, 123, 0.04)",
          boxShadow: scrolled
            ? "0 4px 20px rgba(105, 123, 123, 0.06)"
            : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={l("/", locale).replace(/\/$/, "") || "/"} className="flex items-center gap-3 group">
              <Image
                src="/logo-icon.svg"
                alt="Zahnärzte Parkstrasse — Baum-Logo"
                width={42}
                height={46}
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="hidden sm:block">
                <div
                  className="text-lg tracking-widest"
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                    fontWeight: 600,
                    color: "#697B7B",
                    letterSpacing: "0.15em",
                  }}
                >
                  ZAHNÄRZTE PARKSTRASSE
                </div>
                <div
                  className="text-xs tracking-wider"
                  style={{
                    fontFamily: "var(--font-work-sans), 'Work Sans', sans-serif",
                    color: "#F26522",
                    letterSpacing: "0.2em",
                    fontWeight: 500,
                  }}
                >
                  OTHMARSCHEN
                </div>
              </div>
            </Link>

            {/* Desktop-Navigation */}
            <nav className="hidden xl:flex items-center gap-5">
              {navLinks.map((link) => (
                <div key={link.href} className="relative group">
                  <Link
                    href={l(link.href, locale)}
                    className="relative text-sm tracking-wider transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-work-sans), 'Work Sans', sans-serif",
                      fontWeight: 400,
                      color: "#4a5959",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {link.text.toUpperCase()}
                    <span
                      className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                      style={{ background: "linear-gradient(to right, #F26522, #f58a4a)" }}
                    />
                  </Link>

                  {/* Mega-Dropdown für Leistungen */}
                  {link.unterseiten && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                    >
                      <div
                        className="grid grid-cols-2 gap-1 p-4 min-w-[340px]"
                        style={{
                          background: "rgba(255, 255, 255, 0.97)",
                          backdropFilter: "blur(14px)",
                          borderRadius: "16px",
                          border: "1px solid rgba(105, 123, 123, 0.08)",
                          boxShadow: "0 20px 48px -12px rgba(105, 123, 123, 0.15)",
                        }}
                      >
                        {link.unterseiten.map((sub) => (
                          <Link
                            key={sub.href}
                            href={l(sub.href, locale)}
                            className="px-4 py-2.5 text-sm transition-all duration-200 hover:bg-[rgba(242,101,34,0.05)]"
                            style={{
                              color: "#4a5959",
                              fontWeight: 400,
                              borderRadius: "10px",
                            }}
                          >
                            {sub.text}
                          </Link>
                        ))}
                        <Link
                          href={l("/leistungen", locale)}
                          className="col-span-2 px-4 py-2.5 mt-1 text-sm font-medium transition-all duration-200"
                          style={{
                            color: "#F26522",
                            borderTop: "1px solid rgba(105, 123, 123, 0.06)",
                            borderRadius: "10px",
                          }}
                        >
                          Alle Leistungen →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Sprach-Widget */}
              <LanguageSwitcher locale={locale} />

              <Link
                href={l("/termin", locale)}
                className="cta-schimmer ml-3 px-6 py-2.5 text-sm tracking-wider transition-all duration-500"
                style={{
                  fontFamily: "var(--font-work-sans), 'Work Sans', sans-serif",
                  fontWeight: 600,
                  color: "#fff",
                  background: "linear-gradient(135deg, #F26522, #e3541a)",
                  borderRadius: "9999px",
                  letterSpacing: "0.08em",
                  boxShadow: "0 4px 18px rgba(242, 101, 34, 0.35)",
                }}
              >
                TERMIN BUCHEN
              </Link>
            </nav>

            {/* Mobiler Hamburger */}
            <button
              className="xl:hidden flex flex-col gap-1.5 p-2 z-50"
              onClick={() => setMobileOffen(!mobileOffen)}
              aria-label={mobileOffen ? "Menü schließen" : "Menü öffnen"}
            >
              <span
                className="block w-6 h-0.5 transition-all duration-300 origin-center"
                style={{
                  background: mobileOffen ? "#F26522" : "#697B7B",
                  transform: mobileOffen ? "rotate(45deg) translate(2px, 5px)" : "none",
                }}
              />
              <span
                className="block h-0.5 ml-auto transition-all duration-300"
                style={{
                  background: "#F26522",
                  width: mobileOffen ? "1.5rem" : "1rem",
                  opacity: mobileOffen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-0.5 transition-all duration-300 origin-center"
                style={{
                  background: mobileOffen ? "#F26522" : "#697B7B",
                  transform: mobileOffen ? "rotate(-45deg) translate(2px, -5px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobiles Fullscreen-Menü */}
      <div
        className="fixed inset-0 z-40 xl:hidden transition-all duration-500"
        style={{
          background: "rgba(244, 241, 236, 0.98)",
          backdropFilter: "blur(20px)",
          opacity: mobileOffen ? 1 : 0,
          pointerEvents: mobileOffen ? "auto" : "none",
        }}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-2 px-8">
          {navLinks.map((link) => (
            <div key={link.href} className="w-full max-w-sm">
              {link.unterseiten ? (
                <>
                  <button
                    onClick={() => setLeistungenOffen(!leistungenOffen)}
                    className="w-full flex items-center justify-between py-4 text-2xl transition-colors"
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                      fontWeight: 500,
                      color: "#2d3a3a",
                      borderBottom: "1px solid rgba(105, 123, 123, 0.08)",
                    }}
                  >
                    {link.text}
                    <span
                      className="text-sm transition-transform duration-300"
                      style={{
                        color: "#F26522",
                        transform: leistungenOffen ? "rotate(180deg)" : "none",
                      }}
                    >
                      ▾
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-400"
                    style={{
                      maxHeight: leistungenOffen ? "400px" : "0",
                      opacity: leistungenOffen ? 1 : 0,
                    }}
                  >
                    <div className="pl-4 py-2 space-y-1">
                      {link.unterseiten.map((sub) => (
                        <Link
                          key={sub.href}
                          href={l(sub.href, locale)}
                          onClick={() => setMobileOffen(false)}
                          className="block py-2 text-base"
                          style={{ color: "#5a6a6a", fontWeight: 300 }}
                        >
                          {sub.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={l(link.href, locale)}
                  onClick={() => setMobileOffen(false)}
                  className="block py-4 text-2xl transition-colors"
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                    fontWeight: 500,
                    color: "#2d3a3a",
                    borderBottom: "1px solid rgba(105, 123, 123, 0.08)",
                  }}
                >
                  {link.text}
                </Link>
              )}
            </div>
          ))}

          {/* Termin CTA */}
          <Link
            href={l("/termin", locale)}
            onClick={() => setMobileOffen(false)}
            className="cta-schimmer mt-6 px-10 py-4 text-sm tracking-wider"
            style={{
              fontWeight: 600,
              color: "#fff",
              background: "linear-gradient(135deg, #F26522, #e3541a)",
              borderRadius: "9999px",
              letterSpacing: "0.1em",
              boxShadow: "0 8px 28px rgba(242, 101, 34, 0.3)",
            }}
          >
            TERMIN BUCHEN
          </Link>

          {/* Telefonnummer */}
          <a
            href="tel:+494088021050"
            className="mt-4 text-sm tracking-wider"
            style={{ color: "#697B7B", fontWeight: 400, letterSpacing: "0.08em" }}
          >
            040 — 880 21 50
          </a>
        </nav>
      </div>
    </>
  );
}

/* Sprach-Switcher Komponente */
function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [offen, setOffen] = useState(false);

  const handleSwitch = (newLocale: Locale) => {
    localStorage.setItem("preferred-locale", newLocale);
    /* Aktuellen Pfad umschreiben: /de/team → /en/team */
    const currentPath = window.location.pathname.replace(`/${locale}`, "");
    /* Trailing Slash entfernen und zu neuer Locale navigieren */
    const cleanPath = currentPath.replace(/\/$/, "") || "";
    window.location.href = `/${newLocale}${cleanPath}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOffen(!offen)}
        className="flex items-center gap-1 px-3 py-1.5 text-xs tracking-wider rounded-full transition-all duration-200"
        style={{
          color: "#697B7B",
          fontWeight: 500,
          letterSpacing: "0.1em",
          border: "1px solid rgba(105, 123, 123, 0.15)",
        }}
      >
        {locale.toUpperCase()}
        <svg
          viewBox="0 0 16 16"
          className="w-3 h-3 transition-transform duration-200"
          style={{ transform: offen ? "rotate(180deg)" : "none" }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {offen && (
        <div
          className="absolute top-full right-0 mt-2 py-1 min-w-[60px]"
          style={{
            background: "rgba(255, 255, 255, 0.97)",
            backdropFilter: "blur(14px)",
            borderRadius: "10px",
            border: "1px solid rgba(105, 123, 123, 0.08)",
            boxShadow: "0 8px 24px -6px rgba(105, 123, 123, 0.15)",
          }}
        >
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleSwitch(loc)}
              className="block w-full px-4 py-2 text-xs tracking-wider text-left transition-colors duration-200 hover:bg-[rgba(242,101,34,0.05)]"
              style={{
                color: loc === locale ? "#F26522" : "#4a5959",
                fontWeight: loc === locale ? 600 : 400,
                letterSpacing: "0.1em",
              }}
            >
              {loc.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
