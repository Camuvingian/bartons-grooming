import { useId } from "react";
import { HERO } from "@/data/content";

/** The "Fresh Pup Guarantee" badge: circular text spins, the 5★ stays still (§6.4). */
export function SpinningBadge({ className = "" }: { className?: string }) {
  const id = useId();
  const pathId = `badge-circle-${id}`;
  return (
    <div
      className={`theme-fade grid size-[150px] place-items-center rounded-full bg-brand-pop ${className}`}
      aria-label="Five star fresh pup guarantee"
    >
      <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-0 size-full" aria-hidden>
        <defs>
          <path id={pathId} d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <text fill="#fff" className="font-display" style={{ fontWeight: 700, fontSize: 17, letterSpacing: 3 }}>
          <textPath href={`#${pathId}`}>
            {HERO.badge}
            {HERO.badge}
          </textPath>
        </text>
      </svg>
      <span className="font-display text-[30px] font-extrabold text-white">5★</span>
    </div>
  );
}
