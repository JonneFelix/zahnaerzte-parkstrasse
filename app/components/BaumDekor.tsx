/**
 * Dekorativer Baum aus dem Original-Logo (Zahnärzte Parkstrasse)
 * Referenziert die statische SVG-Datei statt Inline-Rendering.
 */

interface BaumDekorProps {
  className?: string;
  /** Weiße Version für dunkle Hintergründe */
  weiss?: boolean;
}

export default function BaumDekor({
  className = "",
  weiss = false,
}: BaumDekorProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={weiss ? "/logo-icon-white.svg" : "/logo-icon.svg"}
      alt=""
      aria-hidden="true"
      className={className}
      loading="lazy"
    />
  );
}
