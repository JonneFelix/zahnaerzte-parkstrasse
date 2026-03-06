import BaumDekor from "./BaumDekor";
import OrganischerTrenner from "./OrganischerTrenner";

/* Wiederverwendbarer Hero für Unterseiten */
export default function SeiteHero({
  label,
  titel,
  titelAkzent,
  subtext,
  badge,
}: {
  label?: string;
  titel: string;
  titelAkzent?: string;
  subtext?: string;
  badge?: string;
}) {
  return (
    <section
      className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(155deg, #f4f1ec 0%, #eaf0ea 30%, #dde6dd 60%, #c8d6c8 100%)",
      }}
    >
      <BaumDekor className="absolute -top-10 -right-20 w-72 opacity-[0.04] text-primary-300 rotate-12 hidden lg:block" />
      <div
        className="absolute left-8 top-0 bottom-0 w-px hidden lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(105,123,123,0.08), transparent)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        {label && (
          <span
            className="text-xs tracking-widest uppercase anim-einblenden"
            style={{
              color: "#F26522",
              fontWeight: 600,
              letterSpacing: "0.25em",
            }}
          >
            {label}
          </span>
        )}

        <h1
          className="anim-einblenden d2 mt-4"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontWeight: 300,
            color: "#2d3a3a",
            fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
          }}
        >
          {titel}
          {titelAkzent && (
            <>
              {" "}
              <span style={{ fontWeight: 600, color: "#697B7B" }}>
                {titelAkzent}
              </span>
            </>
          )}
        </h1>

        {subtext && (
          <p
            className="anim-einblenden d3 mt-6 text-lg max-w-2xl mx-auto"
            style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.8 }}
          >
            {subtext}
          </p>
        )}

        {badge && (
          <div
            className="anim-einblenden d4 inline-flex items-center gap-2 mt-6 px-5 py-2 rounded-full"
            style={{
              background: "rgba(105, 123, 123, 0.07)",
              border: "1px solid rgba(105, 123, 123, 0.12)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#F26522" }}
            />
            <span
              className="text-xs tracking-wider"
              style={{
                color: "#697B7B",
                fontWeight: 500,
                letterSpacing: "0.1em",
              }}
            >
              {badge}
            </span>
          </div>
        )}
      </div>

      <OrganischerTrenner
        className="absolute bottom-0 left-0 w-full h-16"
        style={{ color: "#f4f1ec" }}
      />
    </section>
  );
}
