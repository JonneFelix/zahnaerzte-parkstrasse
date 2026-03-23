"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pfadNamen: Record<string, string> = {
  leistungen: "Leistungen",
  oralchirurgie: "Oralchirurgie",
  implantate: "Implantate",
  wurzelbehandlung: "Wurzelbehandlung",
  prophylaxe: "Prophylaxe",
  parodontologie: "Parodontologie",
  zahnersatz: "Zahnersatz",
  kinderzahnheilkunde: "Kinderzahnheilkunde",
  aesthetik: "Ästhetik",
  team: "Team",
  kontakt: "Kontakt",
  termin: "Termin",
  innovationen: "Innovationen",
  fortbildungen: "Fortbildungen",
  faq: "FAQ",
  impressum: "Impressum",
  datenschutz: "Datenschutz",
  praxis: "Praxis",
  wissenswertes: "Wissenswertes",
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segmente = pathname.split("/").filter(Boolean);

  const breadcrumbs = segmente.map((segment, index) => {
    const href = "/" + segmente.slice(0, index + 1).join("/");
    const name = pfadNamen[segment] || segment;
    const istLetztes = index === segmente.length - 1;

    return { href, name, istLetztes };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-0"
    >
      <ol
        className="flex items-center gap-2 text-xs"
        style={{ color: "#8a9a9a", fontWeight: 300 }}
      >
        <li>
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-[#F26522]"
          >
            Startseite
          </Link>
        </li>
        {breadcrumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-2">
            <span style={{ color: "#c0c8c8" }}>/</span>
            {crumb.istLetztes ? (
              <span style={{ color: "#697B7B", fontWeight: 400 }}>
                {crumb.name}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="transition-colors duration-200 hover:text-[#F26522]"
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>

      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Startseite",
                item: "https://zahnaerzte-parkstrasse.de/",
              },
              ...breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 2,
                name: crumb.name,
                item: `https://zahnaerzte-parkstrasse.de${crumb.href}`,
              })),
            ],
          }),
        }}
      />
    </nav>
  );
}
