import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#f4f1ec" }}
    >
      <div className="text-center max-w-md">
        <div
          className="text-8xl mb-6"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontWeight: 300,
            color: "#697B7B",
          }}
        >
          404
        </div>
        <h1
          className="text-2xl mb-4"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontWeight: 500,
            color: "#2d3a3a",
          }}
        >
          Seite nicht gefunden
        </h1>
        <p
          className="text-base mb-8"
          style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.7 }}
        >
          Die Seite, die Sie suchen, existiert leider nicht oder wurde verschoben.
        </p>
        <Link
          href="/de"
          className="inline-flex items-center gap-2 px-8 py-3 text-sm tracking-wider transition-all duration-500"
          style={{
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg, #F26522, #e3541a)",
            borderRadius: "9999px",
            letterSpacing: "0.08em",
            boxShadow: "0 4px 18px rgba(242, 101, 34, 0.35)",
          }}
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
