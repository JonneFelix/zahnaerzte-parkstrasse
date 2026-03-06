import Link from "next/link";
import BaumDekor from "./BaumDekor";

/* Wiederverwendbarer CTA-Banner am Ende jeder Seite */
export default function CTABanner({
  titel = "Wir freuen uns",
  titelAkzent = "auf Sie",
  text = "Vereinbaren Sie Ihren Termin — online, telefonisch oder per E-Mail.",
  ctaText = "TERMIN VEREINBAREN",
  ctaHref = "/termin",
}: {
  titel?: string;
  titelAkzent?: string;
  text?: string;
  ctaText?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #f4f1ec 0%, #eaf0ea 50%, #dde6dd 100%)",
        }}
      />
      <BaumDekor className="absolute -right-16 bottom-6 w-52 opacity-[0.03] rotate-[20deg] hidden lg:block" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <h2
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontWeight: 400,
            color: "#2d3a3a",
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            lineHeight: 1.2,
          }}
        >
          {titel}{" "}
          <span style={{ fontWeight: 600, color: "#697B7B" }}>
            {titelAkzent}
          </span>
        </h2>
        <p
          className="mt-4 text-base"
          style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}
        >
          {text}
        </p>
        <Link
          href={ctaHref}
          className="cta-schimmer group inline-flex items-center gap-3 mt-8 px-10 py-4 text-sm tracking-wider transition-all duration-500"
          style={{
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg, #F26522, #e3541a)",
            borderRadius: "9999px",
            letterSpacing: "0.12em",
            boxShadow: "0 8px 28px rgba(242, 101, 34, 0.3)",
          }}
        >
          {ctaText}
          <svg
            viewBox="0 0 20 20"
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          >
            <path d="M4 10h12M11 5l5 5-5 5" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
