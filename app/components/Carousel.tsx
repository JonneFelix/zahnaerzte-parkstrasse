"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Slide = { src: string; alt: string };

/**
 * Automatisch weiterlaufendes Bild-Carousel (Crossfade).
 * Pausiert bei Hover; Punkte zum manuellen Wechseln.
 * Static-Export-kompatibel (rein client-side).
 */
export default function Carousel({ slides, interval = 4500 }: { slides: Slide[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [paused, slides.length, interval]);

  return (
    <div
      className="relative overflow-hidden anim-einblenden"
      style={{ borderRadius: "22px", boxShadow: "0 16px 36px -8px rgba(105,123,123,0.14)", aspectRatio: "3/2" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover transition-opacity duration-1000"
          style={{ opacity: i === index ? 1 : 0, objectPosition: "center 30%", filter: "saturate(0.92) brightness(1.02)" }}
          priority={i === 0}
        />
      ))}

      {/* Punkte */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((s, i) => (
          <button
            key={s.src}
            onClick={() => setIndex(i)}
            aria-label={`Bild ${i + 1} von ${slides.length} anzeigen`}
            className="rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: i === index ? "22px" : "8px",
              height: "8px",
              background: i === index ? "#F26522" : "rgba(255,255,255,0.75)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              border: "none",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
