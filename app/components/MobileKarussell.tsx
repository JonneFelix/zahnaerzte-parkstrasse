"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

/**
 * Horizontales Karussell mit Peek-Effekt und Dot-Indikatoren (nur Mobile).
 * Auf Desktop (md+) werden die Kinder als normales Grid gerendert.
 */
export default function MobileKarussell({
  children,
  itemBreite = "w-[75vw]",
  desktopCols = 3,
}: {
  children: ReactNode[];
  itemBreite?: string;
  desktopCols?: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [aktiv, setAktiv] = useState(0);
  const anzahl = children.length;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const childWidth = el.scrollWidth / anzahl;
      const index = Math.round(scrollLeft / childWidth);
      setAktiv(Math.min(index, anzahl - 1));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [anzahl]);

  const scrollZu = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const childWidth = el.scrollWidth / anzahl;
    el.scrollTo({ left: childWidth * index, behavior: "smooth" });
  };

  const gridClass =
    desktopCols === 3
      ? "md:grid md:grid-cols-3"
      : `md:grid md:grid-cols-${desktopCols}`;

  return (
    <div>
      {/* Scroll-Container */}
      <div
        ref={scrollRef}
        className={`flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 ${gridClass} md:gap-6 md:overflow-visible md:pb-0 md:snap-none`}
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {children.map((child, i) => (
          <div key={i} className={`shrink-0 ${itemBreite} snap-start md:w-auto md:shrink`}>
            {child}
          </div>
        ))}
      </div>

      {/* Dot-Indikatoren (nur Mobile) */}
      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {Array.from({ length: anzahl }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollZu(i)}
            className="transition-all duration-300"
            style={{
              width: aktiv === i ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: aktiv === i ? "#F26522" : "rgba(105, 123, 123, 0.2)",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
