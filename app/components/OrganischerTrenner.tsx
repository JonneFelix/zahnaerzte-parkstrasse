/* Wellentrenner — organische Wellenform zwischen Sektionen */
export default function OrganischerTrenner({
  className,
  umdrehen,
  style,
}: {
  className?: string;
  umdrehen?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 1440 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={className}
      style={{
        ...style,
        ...(umdrehen ? { transform: "scaleY(-1)" } : {}),
      }}
      aria-hidden="true"
    >
      <path
        d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100Z"
        fill="currentColor"
      />
    </svg>
  );
}
