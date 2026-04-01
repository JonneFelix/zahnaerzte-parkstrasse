import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BaumDekor from "../components/BaumDekor";
import OrganischerTrenner from "../components/OrganischerTrenner";
import SektionsHeader from "../components/SektionsHeader";
import MobileKarussell from "../components/MobileKarussell";
import { getDictionary, type Locale } from "../../lib/i18n";
import { createMetadata } from "../../lib/metadata";

/* ============================================================
   Metadata
   ============================================================ */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const hp = dict.HomePage as Record<string, unknown>;
  const meta = hp.meta as Record<string, string>;
  return createMetadata(locale, "", meta);
}

/* ============================================================
   Leistungs-Icons (nicht übersetzbar)
   ============================================================ */
const leistungsIcons = [
  // Oralchirurgie — Skalpell
  (
    <svg key="oral" viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <path d="M14 15 C14 11 18 9 20 9 C22 9 26 11 26 15 C26 21 22 23 22 28 L18 28 C18 23 14 21 14 15Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="18" y1="31" x2="22" y2="31" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 15 L20 22" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    </svg>
  ),
  // Zahnheilkunde — Zahn mit Kreuz (medizinisch)
  (
    <svg key="zahn" viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <path d="M15 14 C15 10 17 8 20 8 C23 8 25 10 25 14 C25 18 23 20 23 25 C23 28 22 30 20 30 C18 30 17 28 17 25 C17 20 15 18 15 14Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M20 13 L20 19 M17 16 L23 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  // Wurzelbehandlung — Zahn mit Wurzelkanälen
  (
    <svg key="wurzel" viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <path d="M20 8 L20 18 M20 18 C16 22 14 28 16 34 M20 18 C24 22 26 28 24 34" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  // Prophylaxe — Zahnbürste + Glanz
  (
    <svg key="prophylaxe" viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <rect x="18" y="8" width="4" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 24 L24 24 L24 30 C24 32 22 34 20 34 C18 34 16 32 16 30Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M27 10 L29 8 M27 14 L30 14 M27 12 L29 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  // Implantologie — Implantat-Schraube
  (
    <svg key="implant" viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <rect x="17" y="8" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="16" y1="17" x2="24" y2="17" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 17 L17 32 M22 17 L23 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  // Ästhetik — Lächeln/Smile
  (
    <svg key="aesthetik" viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 22 C16 26 24 26 26 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="15" cy="17" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="25" cy="17" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  ),
];

const leistungsBilder = [
  "/images/behandlung.jpg",
  "/images/zahnmodell.jpg",
  "/images/wurzelbehandlung.jpg",
  "/images/prophylaxe.jpg",
  "/images/mikroskop-ausstattung.jpg",
  "/images/aligner-schiene.png",
];

const leistungsHrefs = [
  "/leistungen/oralchirurgie",
  "/leistungen/zahnersatz",
  "/leistungen/wurzelbehandlung",
  "/leistungen/prophylaxe",
  "/leistungen/implantate",
  "/leistungen/aesthetik",
];

const aerztinnenBilder = [
  "/images/team/dr-schwegmann-portrait-neu.jpg",
  "/images/dr-janz.jpg",
];

const aerztinnenNamen = [
  "Dr. Claudia Schwegmann",
  "Dr. Nina Janz",
];

/* ============================================================
   Homepage
   ============================================================ */
export default async function Homepage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const hp = dict.HomePage as Record<string, unknown>;
  const hero = hp.hero as Record<string, string>;
  const philosophie = hp.philosophie as Record<string, unknown>;
  const werte = philosophie.werte as Record<string, Record<string, string>>;
  const leistungenSection = hp.leistungen as Record<string, unknown>;
  const leistungsItems = leistungenSection.items as Record<string, Record<string, string>>;
  const patientJourney = hp.patientJourney as Record<string, unknown>;
  const schritte = patientJourney.schritte as Record<string, Record<string, string>>;
  const testimonialsSection = hp.testimonials as Record<string, unknown>;
  const testimonialItems = testimonialsSection.items as Record<string, Record<string, string>>;
  const teamSection = hp.team as Record<string, unknown>;
  const aerztinnenRollen = teamSection.aerztinnen as Record<string, Record<string, string>>;
  const kontaktSection = hp.kontakt as Record<string, string>;

  // Leistungs-Daten mit übersetzten Texten zusammenbauen
  const leistungsKeys = ["oralchirurgie", "zahnheilkunde", "wurzelbehandlung", "prophylaxe", "implantologie", "aesthetik"];
  const leistungen = leistungsKeys.map((key, i) => ({
    titel: leistungsItems[key].titel,
    beschreibung: leistungsItems[key].beschreibung,
    bild: leistungsBilder[i],
    href: leistungsHrefs[i],
    icon: leistungsIcons[i],
  }));

  // Patient-Journey
  const schritteArr = (["s1", "s2", "s3", "s4"] as const).map((key, i) => ({
    nr: String(i + 1).padStart(2, "0"),
    titel: schritte[key].titel,
    text: schritte[key].text,
  }));

  // Testimonials
  const testimonials = (["t1", "t2", "t3"] as const).map((key) => ({
    text: testimonialItems[key].text,
    autor: testimonialItems[key].autor,
  }));

  // Ärztinnen
  const rollenKeys = ["schwegmann", "janz"];
  const aerztinnen = rollenKeys.map((key, i) => ({
    name: aerztinnenNamen[i],
    rolle: aerztinnenRollen[key].rolle,
    bild: aerztinnenBilder[i],
  }));

  return (
    <>
      {/* ============================================================
          HERO
          ============================================================ */}
      <section
        className="relative min-h-0 lg:min-h-screen flex items-center overflow-hidden"
        style={{
          background: "linear-gradient(155deg, #f4f1ec 0%, #eaf0ea 30%, #dde6dd 55%, #c8d6c8 85%, #b8c8b8 100%)",
        }}
      >
        <BaumDekor className="absolute -top-20 -right-24 w-80 opacity-[0.04] text-primary-300 rotate-12 hidden lg:block" />
        <BaumDekor className="absolute bottom-20 left-6 w-48 opacity-[0.05] text-primary-200 -rotate-12 hidden lg:block" />

        {/* Vertikale Linien */}
        <div className="absolute left-8 top-0 bottom-0 w-px hidden lg:block" style={{ background: "linear-gradient(to bottom, transparent, rgba(105,123,123,0.08), transparent)" }} />
        <div className="absolute right-8 top-0 bottom-0 w-px hidden lg:block" style={{ background: "linear-gradient(to bottom, transparent, rgba(105,123,123,0.08), transparent)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-14 lg:pt-28 lg:pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            {/* Text — auf Mobile zuerst sichtbar */}
            <div className="order-1 lg:order-1">
              <div
                className="anim-einblenden inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8"
                style={{ background: "rgba(105, 123, 123, 0.07)", border: "1px solid rgba(105, 123, 123, 0.12)" }}
              >
                <span className="w-2 h-2 rounded-full anim-puls" style={{ background: "#F26522" }} />
                <span className="text-xs tracking-widest uppercase" style={{ color: "#697B7B", fontWeight: 500, letterSpacing: "0.15em" }}>
                  {hero.badge}
                </span>
              </div>

              <h1
                className="anim-einblenden d2"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontWeight: 300,
                  color: "#2d3a3a",
                  fontSize: "clamp(2.4rem, 5vw, 4rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                }}
              >
                {hero.titel}
                <br />
                <span style={{ fontWeight: 600, color: "#697B7B" }}>{hero.titelAkzent}</span>
              </h1>

              {/* Blatt-Dekoration */}
              <div className="anim-einblenden d3 my-7 flex items-center gap-3">
                <div className="h-px flex-grow max-w-20" style={{ background: "linear-gradient(to right, #F26522, transparent)" }} />
                <svg viewBox="0 0 20 20" className="w-4 h-4" style={{ color: "#F26522" }} aria-hidden="true">
                  <path d="M10 2 C7 5 4 10 10 18 C16 10 13 5 10 2Z" fill="currentColor" opacity="0.6" />
                </svg>
                <div className="h-px flex-grow max-w-20" style={{ background: "linear-gradient(to left, #F26522, transparent)" }} />
              </div>

              <p className="anim-einblenden d4 text-lg leading-relaxed max-w-lg" style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.8 }}>
                {hero.text}
              </p>

              <div className="anim-einblenden d5 flex flex-wrap gap-4 mt-10">
                <Link
                  href={`/${locale}/termin`}
                  className="cta-schimmer group inline-flex items-center gap-3 px-8 py-4 text-sm tracking-wider transition-all duration-500"
                  style={{
                    fontWeight: 600, color: "#fff",
                    background: "linear-gradient(135deg, #F26522, #e3541a)",
                    borderRadius: "9999px", letterSpacing: "0.1em",
                    boxShadow: "0 8px 28px rgba(242, 101, 34, 0.3)",
                  }}
                >
                  {hero.ctaPrimaer}
                  <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/team`}
                  className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-wider transition-all duration-500 hover:border-[#697B7B]"
                  style={{
                    fontWeight: 500, color: "#697B7B",
                    border: "1.5px solid rgba(105, 123, 123, 0.25)",
                    borderRadius: "9999px", letterSpacing: "0.1em",
                  }}
                >
                  {hero.ctaSekundaer}
                </Link>
              </div>
            </div>

            {/* Bild — auf Mobile unter dem Text, kleiner */}
            <div className="order-2 lg:order-2 relative anim-einblenden-rechts d3 max-h-[35vh] lg:max-h-none">
              <div className="absolute -inset-5 anim-blob hidden lg:block" style={{ border: "1.5px solid rgba(242, 101, 34, 0.1)", borderRadius: "55% 45% 52% 48% / 48% 58% 42% 52%" }} />
              <div className="absolute -inset-12 anim-blob hidden lg:block" style={{ border: "1px solid rgba(105, 123, 123, 0.06)", borderRadius: "42% 58% 48% 52% / 55% 42% 58% 45%", animationDelay: "3.5s" }} />
              <div className="relative overflow-hidden" style={{ borderRadius: "58% 42% 52% 48% / 44% 56% 44% 56%", boxShadow: "0 28px 56px -14px rgba(105, 123, 123, 0.22)" }}>
                <Image src="/images/hero-team.webp" alt={hero.bildAlt} width={600} height={700} className="w-full h-auto object-cover" style={{ aspectRatio: "5/6", filter: "saturate(0.92) brightness(1.02)" }} priority quality={90} sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(105, 123, 123, 0.04), rgba(105, 123, 123, 0.1))" }} />
              </div>
              <div className="hidden lg:block absolute -bottom-4 -left-6 px-6 py-4 anim-einblenden d7" style={{ background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)", borderRadius: "18px", boxShadow: "0 12px 28px rgba(105, 123, 123, 0.12)", border: "1px solid rgba(242, 101, 34, 0.1)" }}>
                <div className="text-2xl" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, color: "#F26522" }}>{hero.erfahrung}</div>
                <div className="text-xs tracking-wider mt-0.5" style={{ color: "#5a6a6a", fontWeight: 400, letterSpacing: "0.08em" }}>{hero.erfahrungDetail}</div>
              </div>
              <BaumDekor className="absolute -top-8 -right-6 w-20 opacity-[0.07] rotate-12" />
            </div>
          </div>
        </div>

        <OrganischerTrenner className="absolute bottom-0 left-0 w-full h-16" style={{ color: "#f4f1ec" }} />
      </section>

      {/* ============================================================
          PHILOSOPHIE / VERTRAUEN
          ============================================================ */}
      <section className="relative py-14 lg:py-32 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <BaumDekor className="absolute -top-10 -right-16 w-72 opacity-[0.03] rotate-45 hidden lg:block" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={philosophie.label as string} titel={philosophie.titel as string} titelAkzent={philosophie.titelAkzent as string} />

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Bild links */}
            <div className="relative anim-einblenden-links d2">
              <div className="overflow-hidden" style={{ borderRadius: "40% 60% 45% 55% / 55% 38% 62% 45%", boxShadow: "0 20px 44px -10px rgba(105, 123, 123, 0.16)" }}>
                <Image src="/images/patientenberatung.jpg" alt={philosophie.bildAlt as string} width={600} height={500} className="w-full h-auto object-cover" style={{ aspectRatio: "6/5", filter: "saturate(0.88) brightness(1.03)", objectPosition: "30% center" }} />
              </div>
              <div className="absolute -bottom-5 -right-3 lg:-right-6 px-7 py-4 anim-einblenden d6" style={{ background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(8px)", borderRadius: "18px", boxShadow: "0 10px 28px rgba(105, 123, 123, 0.1)", border: "1px solid rgba(105, 123, 123, 0.06)" }}>
                <div className="text-2xl" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, color: "#697B7B" }}>{philosophie.badge as string}</div>
                <div className="text-xs tracking-wider mt-0.5" style={{ color: "#5a6a6a", letterSpacing: "0.08em" }}>{philosophie.badgeDetail as string}</div>
              </div>
            </div>

            {/* Zitat + Werte rechts */}
            <div className="anim-einblenden-rechts d3">
              {/* Zitat mit Orange-Akzentlinie */}
              <blockquote className="relative pl-6 mb-6" style={{ borderLeft: "3px solid #F26522" }}>
                <p className="text-lg lg:text-xl leading-relaxed italic" style={{ color: "#2d3a3a", fontFamily: "var(--font-cormorant), serif", fontWeight: 500, lineHeight: 1.7 }}>
                  &bdquo;{philosophie.zitat as string}&ldquo;
                </p>
                <footer className="mt-4">
                  <div className="text-sm font-semibold" style={{ color: "#2d3a3a" }}>{philosophie.zitatAutor as string}</div>
                  <div className="text-xs" style={{ color: "#7a8a8a" }}>{philosophie.zitatRolle as string}</div>
                </footer>
              </blockquote>

              <p className="text-base leading-relaxed mb-8" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.85 }}>
                {philosophie.text as string}
              </p>

              {/* 3 Werte-Tags mit individuellen Icons */}
              <div className="grid grid-cols-3 gap-5">
                <div className="text-center anim-einblenden d5">
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full" style={{ background: "rgba(242, 101, 34, 0.08)" }}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#F26522" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "#2d3a3a" }}>{werte.einfuehlsam.einfuehlsam}</div>
                  <div className="text-xs" style={{ color: "#7a8a8a", lineHeight: 1.5 }}>{werte.einfuehlsam.einfuehlsamDetail}</div>
                </div>
                <div className="text-center anim-einblenden d6">
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full" style={{ background: "rgba(242, 101, 34, 0.08)" }}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#F26522" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "#2d3a3a" }}>{werte.erfahren.erfahren}</div>
                  <div className="text-xs" style={{ color: "#7a8a8a", lineHeight: 1.5 }}>{werte.erfahren.erfahrenDetail}</div>
                </div>
                <div className="text-center anim-einblenden d7">
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full" style={{ background: "rgba(242, 101, 34, 0.08)" }}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#F26522" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "#2d3a3a" }}>{werte.ganzheitlich.ganzheitlich}</div>
                  <div className="text-xs" style={{ color: "#7a8a8a", lineHeight: 1.5 }}>{werte.ganzheitlich.ganzheitlichDetail}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          LEISTUNGEN
          ============================================================ */}
      <section className="relative py-14 lg:py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #f4f1ec 0%, #eaf0ea 25%, #e0eae0 60%, #f4f1ec 100%)" }} />
        <BaumDekor className="absolute -left-20 top-1/4 w-64 opacity-[0.04] -rotate-12 hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <SektionsHeader
            label={leistungenSection.label as string}
            titel={leistungenSection.titel as string}
            titelAkzent={leistungenSection.titelAkzent as string}
            subtext={leistungenSection.subtext as string}
          />

          <MobileKarussell itemBreite="w-[75vw]" desktopCols={3}>
            {leistungen.map((l, i) => (
              <Link key={l.titel} href={l.href} className={`karte-hover relative group block h-full anim-einblenden d${i + 2}`} style={{ background: "rgba(255, 255, 255, 0.72)", backdropFilter: "blur(8px)", borderRadius: "22px", border: "1px solid rgba(105, 123, 123, 0.07)", overflow: "hidden" }}>
                <div className="relative h-44 overflow-hidden">
                  <Image src={l.bild} alt={l.titel} fill className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: "saturate(0.88) brightness(1.02)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.92))" }} />
                  <div className="absolute bottom-3 left-5 p-2.5 rounded-full" style={{ background: "rgba(255, 255, 255, 0.92)", color: "#697B7B", boxShadow: "0 4px 12px rgba(105, 123, 123, 0.12)" }}>{l.icon}</div>
                </div>
                <div className="p-5 pt-3">
                  <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{l.titel}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{l.beschreibung}</p>
                  <div className="mt-4 h-0.5 w-10 transition-all duration-500 group-hover:w-full" style={{ background: "linear-gradient(to right, #F26522, transparent)" }} />
                </div>
              </Link>
            ))}
          </MobileKarussell>

          <div className="text-center mt-12 anim-einblenden d8">
            <Link href={`/${locale}/leistungen`} className="inline-flex items-center gap-2 text-sm tracking-wider transition-colors duration-300 hover:text-[#F26522]" style={{ color: "#697B7B", fontWeight: 500, letterSpacing: "0.1em" }}>
              {leistungenSection.alleAnsehen as string}
              <svg viewBox="0 0 20 20" className="w-4 h-4" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          PATIENT JOURNEY
          ============================================================ */}
      <section className="relative py-14 lg:py-32 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={patientJourney.label as string} titel={patientJourney.titel as string} titelAkzent={patientJourney.titelAkzent as string} />

          {/* Mobile: Vertikale Timeline, Desktop: 4-Spalten-Grid */}
          {/* Desktop */}
          <div className="hidden md:grid md:grid-cols-4 gap-8">
            {schritteArr.map((s, i) => (
              <div key={s.nr} className={`relative text-center anim-einblenden d${i + 2}`}>
                {i < 3 && (
                  <div className="absolute top-8 left-[60%] w-[80%] h-px" style={{ background: "linear-gradient(to right, rgba(242, 101, 34, 0.2), rgba(242, 101, 34, 0.05))" }} />
                )}
                <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full" style={{ background: "rgba(242, 101, 34, 0.08)", border: "1.5px solid rgba(242, 101, 34, 0.15)" }}>
                  <span style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, color: "#F26522", fontSize: "1.25rem" }}>{s.nr}</span>
                </div>
                <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{s.titel}</h3>
                <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}>{s.text}</p>
              </div>
            ))}
          </div>
          {/* Mobile: Vertikale Timeline */}
          <div className="md:hidden relative pl-10">
            {/* Vertikale Linie */}
            <div className="absolute left-[17px] top-2 bottom-2 w-px" style={{ background: "linear-gradient(to bottom, rgba(242, 101, 34, 0.3), rgba(242, 101, 34, 0.05))" }} />
            <div className="space-y-6">
              {schritteArr.map((s) => (
                <div key={s.nr} className="relative flex gap-5 items-start">
                  {/* Nummernkreis auf der Linie */}
                  <div className="absolute -left-10 w-9 h-9 flex items-center justify-center rounded-full shrink-0" style={{ background: "#f4f1ec", border: "1.5px solid rgba(242, 101, 34, 0.25)" }}>
                    <span style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, color: "#F26522", fontSize: "0.95rem" }}>{s.nr}</span>
                  </div>
                  <div>
                    <h3 className="text-base mb-1" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{s.titel}</h3>
                    <p className="text-sm" style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.6 }}>{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-14 anim-einblenden d7">
            <Link
              href={`/${locale}/termin`}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm tracking-wider transition-all duration-500 hover:border-[#697B7B]"
              style={{ fontWeight: 500, color: "#697B7B", border: "1.5px solid rgba(105, 123, 123, 0.25)", borderRadius: "9999px", letterSpacing: "0.1em" }}
            >
              {patientJourney.mehrZumErstenBesuch as string}
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          SOCIAL PROOF / TESTIMONIALS
          ============================================================ */}
      <section className="relative py-14 lg:py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #f4f1ec 0%, #faf8f4 50%, #f4f1ec 100%)" }} />
        <BaumDekor className="absolute -right-16 bottom-10 w-48 opacity-[0.04] rotate-[20deg] hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={testimonialsSection.label as string} titel={testimonialsSection.titel as string} titelAkzent={testimonialsSection.titelAkzent as string} />

          <MobileKarussell itemBreite="w-[80vw]" desktopCols={3}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`karte-hover p-7 h-full anim-einblenden d${i + 2}`}
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "22px",
                  border: "1px solid rgba(105, 123, 123, 0.07)",
                }}
              >
                {/* Anführungszeichen */}
                <div className="mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "3rem", lineHeight: 1, color: "rgba(242, 101, 34, 0.2)" }}>&ldquo;</div>
                <p className="text-base leading-relaxed mb-6" style={{ color: "#4a5959", fontWeight: 300, lineHeight: 1.8, fontStyle: "italic" }}>
                  {t.text}
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-px flex-grow" style={{ background: "linear-gradient(to right, rgba(242, 101, 34, 0.2), transparent)" }} />
                  <span className="text-xs tracking-wider" style={{ color: "#8a9a9a", fontWeight: 400, letterSpacing: "0.08em" }}>{t.autor}</span>
                </div>
              </div>
            ))}
          </MobileKarussell>
        </div>
      </section>

      {/* ============================================================
          TEAM-TEASER — 3 Ärztinnen
          ============================================================ */}
      <section className="relative py-14 lg:py-32 overflow-hidden" style={{ background: "#f4f1ec" }}>
        <BaumDekor className="absolute -right-16 top-8 w-96 opacity-[0.03] rotate-[30deg] hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={teamSection.label as string} titel={teamSection.titel as string} titelAkzent={teamSection.titelAkzent as string} />

          {/* Mobile: Alle 3 kompakt nebeneinander, Desktop: Grid mit großen Bildern */}
          <div className="grid grid-cols-3 gap-3 md:gap-10 lg:gap-14">
            {aerztinnen.map((a, i) => (
              <Link key={a.name} href={`/${locale}/team`} className={`text-center anim-einblenden d${i + 2} block`}>
                <div className="relative mb-3 md:mb-6 inline-block">
                  <div className="absolute -inset-3 anim-blob opacity-40 hidden md:block" style={{ border: "1.5px solid rgba(242, 101, 34, 0.12)", borderRadius: "54% 46% 51% 49% / 49% 54% 46% 51%", animationDelay: `${i * 2}s` }} />
                  <div className="team-bild-hover relative overflow-hidden w-24 h-24 md:w-56 md:h-56 mx-auto" style={{ borderRadius: "50% 50% 44% 56% / 54% 44% 56% 46%", boxShadow: "0 22px 44px -10px rgba(105, 123, 123, 0.16)" }}>
                    <Image src={a.bild} alt={a.name} fill className="object-cover" style={{ filter: "saturate(0.92) brightness(1.02)", objectPosition: i === 0 ? "65% center" : "center center" }} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(105, 123, 123, 0.08), transparent 40%)" }} />
                  </div>
                </div>
                <h3 className="text-sm md:text-xl mb-0.5 md:mb-1" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{a.name}</h3>
                <p className="text-[10px] md:text-sm tracking-wider leading-tight" style={{ color: "#F26522", fontWeight: 500, letterSpacing: "0.06em" }}>{a.rolle}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-14 anim-einblenden d6">
            <Link href={`/${locale}/team`} className="inline-flex items-center gap-2 text-sm tracking-wider transition-colors duration-300 hover:text-[#F26522]" style={{ color: "#697B7B", fontWeight: 500, letterSpacing: "0.1em" }}>
              {teamSection.alleKennenlernen as string}
              <svg viewBox="0 0 20 20" className="w-4 h-4" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          KONTAKT / CTA
          ============================================================ */}
      <section className="relative py-14 lg:py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #f4f1ec 0%, #eaf0ea 50%, #dde6dd 100%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <SektionsHeader label={kontaktSection.label} titel={kontaktSection.titel} titelAkzent={kontaktSection.titelAkzent} />

          <div className="grid md:grid-cols-3 gap-7 lg:gap-10">
            {/* Adresse */}
            <div className="text-center p-7 anim-einblenden d2" style={{ background: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(8px)", borderRadius: "22px", border: "1px solid rgba(105, 123, 123, 0.07)" }}>
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full" style={{ background: "rgba(242, 101, 34, 0.08)" }}>
                <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="#F26522" strokeWidth="1.5"><path d="M14 3 C9 3 5 8 5 12 C5 19 14 25 14 25 C14 25 23 19 23 12 C23 8 19 3 14 3Z" /><circle cx="14" cy="12" r="3.5" /></svg>
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{kontaktSection.adresse}</h3>
              <a href="https://maps.google.com/?q=Parkstraße+10,+22605+Hamburg" target="_blank" rel="noopener noreferrer" className="block text-sm leading-relaxed transition-colors duration-300 hover:text-[#F26522]" style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.8 }}>Parkstraße 10<br />22605 Hamburg<br />Othmarschen</a>
            </div>

            {/* Telefon */}
            <div className="text-center p-7 anim-einblenden d4" style={{ background: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(8px)", borderRadius: "22px", border: "1px solid rgba(105, 123, 123, 0.07)" }}>
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full" style={{ background: "rgba(242, 101, 34, 0.08)" }}>
                <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="#F26522" strokeWidth="1.5"><path d="M7 3 L10 3 L12 8 L9 11 C11 15 13 17 17 19 L20 16 L25 18 L25 22 C25 23.5 23.5 25 22 25 C15 25 3 17 3 7 C3 5.5 4.5 3 7 3Z" /></svg>
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{kontaktSection.telefon}</h3>
              <a href="tel:+494088021050" className="block text-sm mb-1.5 transition-colors duration-300" style={{ color: "#F26522", fontWeight: 600 }}>040 — 880 21 50</a>
              <a href="mailto:info@zahnarzt-othmarschen.de" className="block text-sm transition-colors duration-300" style={{ color: "#5a6a6a", fontWeight: 300 }}>info@zahnarzt-othmarschen.de</a>
            </div>

            {/* Sprechzeiten */}
            <div className="text-center p-7 anim-einblenden d6" style={{ background: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(8px)", borderRadius: "22px", border: "1px solid rgba(105, 123, 123, 0.07)" }}>
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full" style={{ background: "rgba(242, 101, 34, 0.08)" }}>
                <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="#F26522" strokeWidth="1.5"><circle cx="14" cy="14" r="11" /><path d="M14 7 L14 14 L19 17.5" strokeLinecap="round" /></svg>
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#2d3a3a" }}>{kontaktSection.sprechzeiten}</h3>
              <div className="text-sm leading-relaxed space-y-0.5" style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.8 }}>
                <p><span style={{ fontWeight: 500, color: "#4a5959" }}>Mo + Di</span> 9:00 — 18:00</p>
                <p><span style={{ fontWeight: 500, color: "#4a5959" }}>Mi</span> 9:00 — 16:00</p>
                <p><span style={{ fontWeight: 500, color: "#4a5959" }}>Do</span> 9:00 — 20:00</p>
                <p><span style={{ fontWeight: 500, color: "#4a5959" }}>Fr</span> 9:00 — 13:00</p>
                <p className="pt-1.5 text-xs" style={{ color: "#8a9a9a" }}>{kontaktSection.nachVereinbarung}</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-14 anim-einblenden d8">
            <Link
              href={`/${locale}/termin`}
              className="cta-schimmer group inline-flex items-center gap-3 px-10 py-5 text-sm tracking-wider transition-all duration-500"
              style={{
                fontWeight: 600, color: "#fff",
                background: "linear-gradient(135deg, #F26522, #e3541a)",
                borderRadius: "9999px", letterSpacing: "0.12em",
                boxShadow: "0 8px 28px rgba(242, 101, 34, 0.3)",
              }}
            >
              {kontaktSection.jetztTermin}
              <svg viewBox="0 0 20 20" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
