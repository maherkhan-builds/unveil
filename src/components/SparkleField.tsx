interface SparkleFieldProps {
  count?: number;
  className?: string;
}

// Deterministic pseudo-random so particles don't jump around on re-render.
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/** Gold/silver twinkling particles layered behind a section so scroll gaps never feel blank. */
export default function SparkleField({ count = 14, className = "" }: SparkleFieldProps) {
  const sparkles = Array.from({ length: count }).map((_, i) => {
    const top = seededRandom(i * 12.9898) * 100;
    const left = seededRandom(i * 78.233 + 1) * 100;
    const size = 2 + seededRandom(i * 37.719 + 2) * 4;
    const duration = 2.5 + seededRandom(i * 19.19 + 3) * 3;
    const delay = seededRandom(i * 4.14 + 4) * 4;
    const gold = i % 2 === 0;
    return { top, left, size, duration, delay, gold };
  });

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {sparkles.map((s, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.gold ? "var(--color-secondary)" : "var(--color-silver)",
            boxShadow: `0 0 ${s.size * 2}px ${s.gold ? "var(--color-secondary)" : "var(--color-silver)"}`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
