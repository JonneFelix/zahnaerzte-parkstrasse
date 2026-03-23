"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const texts: Record<string, { title: string; text: string; button: string }> = {
  de: {
    title: "Seite nicht gefunden",
    text: "Die Seite, die Sie suchen, existiert leider nicht oder wurde verschoben.",
    button: "Zur Startseite",
  },
  en: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has been moved.",
    button: "Go to homepage",
  },
  fr: {
    title: "Page introuvable",
    text: "La page que vous recherchez n'existe pas ou a été déplacée.",
    button: "Retour à l'accueil",
  },
  es: {
    title: "Página no encontrada",
    text: "La página que busca no existe o ha sido trasladada.",
    button: "Ir a la página principal",
  },
};

export default function NotFound() {
  const pathname = usePathname();
  const localeFromPath = pathname?.split("/")[1] || "de";
  const locale = ["de", "en", "fr", "es"].includes(localeFromPath) ? localeFromPath : "de";
  const t = texts[locale];

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
          {t.title}
        </h1>
        <p
          className="text-base mb-8"
          style={{ color: "#5a6a6a", fontWeight: 300, lineHeight: 1.7 }}
        >
          {t.text}
        </p>
        <Link
          href={`/${locale}`}
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
          {t.button}
        </Link>
      </div>
    </div>
  );
}
