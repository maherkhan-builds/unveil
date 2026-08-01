import type { ThemeDefinition } from "../config/themes";

interface OrnamentProps {
  motif: ThemeDefinition["motif"];
  className?: string;
}

/** A small themed SVG flourish reused across sections as a divider / accent. */
export default function Ornament({ motif, className = "" }: OrnamentProps) {
  const stroke = "var(--color-secondary)";

  if (motif === "mandala") {
    return (
      <svg viewBox="0 0 120 40" className={className} aria-hidden="true">
        <circle cx="60" cy="20" r="14" fill="none" stroke={stroke} strokeWidth="1" />
        <circle cx="60" cy="20" r="7" fill="none" stroke={stroke} strokeWidth="1" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4;
          const x = 60 + Math.cos(angle) * 14;
          const y = 20 + Math.sin(angle) * 14;
          return <circle key={i} cx={x} cy={y} r="2" fill={stroke} />;
        })}
        <line x1="0" y1="20" x2="40" y2="20" stroke={stroke} strokeWidth="1" />
        <line x1="80" y1="20" x2="120" y2="20" stroke={stroke} strokeWidth="1" />
      </svg>
    );
  }

  if (motif === "geometric") {
    return (
      <svg viewBox="0 0 120 40" className={className} aria-hidden="true">
        <g stroke={stroke} strokeWidth="1" fill="none">
          <polygon points="60,8 66,17 76,17 68,23 71,33 60,27 49,33 52,23 44,17 54,17" />
        </g>
        <line x1="0" y1="20" x2="38" y2="20" stroke={stroke} strokeWidth="1" />
        <line x1="82" y1="20" x2="120" y2="20" stroke={stroke} strokeWidth="1" />
      </svg>
    );
  }

  if (motif === "floral") {
    return (
      <svg viewBox="0 0 120 40" className={className} aria-hidden="true">
        <path
          d="M10 20 C 30 4, 45 4, 60 20 C 75 4, 90 4, 110 20"
          fill="none"
          stroke={stroke}
          strokeWidth="1"
        />
        <circle cx="60" cy="20" r="3" fill={stroke} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 40" className={className} aria-hidden="true">
      {[20, 60, 100].map((x, i) => (
        <g key={x}>
          <path
            d={`M${x} ${20 - (i % 2 === 0 ? 8 : 5)} L${x} ${20 + (i % 2 === 0 ? 8 : 5)} M${x - (i % 2 === 0 ? 8 : 5)} 20 L${x + (i % 2 === 0 ? 8 : 5)} 20`}
            stroke={stroke}
            strokeWidth="1"
          />
        </g>
      ))}
      <line x1="0" y1="20" x2="10" y2="20" stroke={stroke} strokeWidth="1" />
      <line x1="110" y1="20" x2="120" y2="20" stroke={stroke} strokeWidth="1" />
    </svg>
  );
}
