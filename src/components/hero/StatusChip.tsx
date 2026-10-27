import { useEffect, useState } from "react";
import { Bath } from "lucide-react";
import { HERO } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Floating "just finished" chip (§6.5): bobs and tilts, and cycles three recent updates every 6s. */
export function StatusChip({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setI((n) => (n + 1) % HERO.status.length);
        setFade(false);
      }, 250);
    }, 6000);
    return () => clearInterval(t);
  }, [reduced]);
  return (
    <div
      className={`animate-floaty theme-fade inline-flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-brand-ink shadow-[0_10px_30px_rgb(0_0_0/.15)] dark:bg-brand-surface dark:text-foreground ${className}`}
      aria-live="polite"
    >
      <span className="grid size-7 place-items-center rounded-full bg-brand-primary text-brand-on-primary">
        <Bath className="size-4" aria-hidden />
      </span>
      <span className="transition-opacity duration-200" style={{ opacity: fade ? 0 : 1 }}>
        {HERO.status[i]}
      </span>
    </div>
  );
}
