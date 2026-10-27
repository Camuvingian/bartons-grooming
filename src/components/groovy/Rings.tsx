/** Concentric mod-target rings, cycling through `colors` from the outside in. */
export function Rings({ colors, count = 6, className }: { colors: string[]; count?: number; className?: string }) {
  const step = 50 / count;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} cx="50" cy="50" r={50 - i * step} fill={colors[i % colors.length]} />
      ))}
    </svg>
  );
}
