import { useMemo } from "react";

/** Small seeded PRNG (mulberry32), so bubble layouts are pure and stable across renders. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Rising bath bubbles (§6.1). Generated once so re-renders and theme changes never reshuffle them. */
export function Bubbles({ count = 22, seed = 7 }: { count?: number; seed?: number }) {
  const bubbles = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 14 + rand() * 46,
      left: rand() * 100,
      duration: 7 + rand() * 8,
      delay: -rand() * 12,
    }));
  }, [count, seed]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden motion-reduce:hidden">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="animate-rise absolute rounded-full"
          style={{
            bottom: -60,
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            border: "2px solid rgb(255 255 255 / .55)",
            background: "radial-gradient(circle at 30% 30%, rgb(255 255 255 / .55), rgb(255 255 255 / .05) 60%)",
            ["--dur" as string]: `${b.duration}s`,
            ["--delay" as string]: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
