import { useEffect, useState } from "react";
import { HERO } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const WORDS = HERO.words;

/** Cycles the last headline word every 2.2s with a springy pop (§6.2). Width is reserved by stacking every word. */
export function RotatingWord() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, [reduced]);
  return (
    <span className="relative inline-grid text-brand-sun">
      <span className="sr-only">fluffy, fresh, fancy and adorable.</span>
      {WORDS.map((w) => (
        <span key={w} aria-hidden className="invisible [grid-area:1/1]">
          {w}
        </span>
      ))}
      <span key={i} aria-hidden className="animate-pop-in inline-block [grid-area:1/1]">
        {WORDS[i]}
      </span>
    </span>
  );
}
