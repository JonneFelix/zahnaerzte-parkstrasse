/* Wiederverwendbarer Sektions-Header mit Label, H2 und optionalem Subtext */
export default function SektionsHeader({
  label,
  titel,
  titelAkzent,
  subtext,
  className = "",
}: {
  label: string;
  titel: string;
  titelAkzent: string;
  subtext?: string;
  className?: string;
}) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <span
        className="text-xs tracking-widest uppercase"
        style={{ color: "#F26522", fontWeight: 600, letterSpacing: "0.25em" }}
      >
        {label}
      </span>
      <h2
        className="mt-4"
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          fontWeight: 400,
          color: "#2d3a3a",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          lineHeight: 1.2,
        }}
      >
        {titel}{" "}
        <span style={{ fontWeight: 600, color: "#697B7B" }}>{titelAkzent}</span>
      </h2>
      {subtext && (
        <p
          className="mt-4 text-base max-w-xl mx-auto"
          style={{ color: "#6a7a7a", fontWeight: 300, lineHeight: 1.7 }}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
