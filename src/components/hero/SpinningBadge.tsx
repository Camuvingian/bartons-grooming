import { useId } from "react";
import { Starburst } from "@/components/groovy/Starburst";
import { cn } from "@/lib/utils";

/** A starburst sticker: the ring of text spins (14s), the centre stays put. */
export function SpinningBadge({ className, ring, centre }: { className?: string; ring: string; centre: string }) {
  const pathId = `badge-circle-${useId()}`;
  return (
    <div
      className={cn("relative grid size-[150px] place-items-center", className)}
      role="img"
      aria-label={`${centre} ${ring}`}
    >
      <Starburst className="theme-fade absolute inset-0 size-full" fill="var(--brand-pop)" stroke="var(--brand-ink)" />
      <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-[14px] size-[calc(100%-28px)]" aria-hidden>
        <defs>
          <path id={pathId} d="M100,100 m-66,0 a66,66 0 1,1 132,0 a66,66 0 1,1 -132,0" />
        </defs>
        <text fill="var(--brand-ink)" style={{ fontFamily: "var(--font-eyebrow)", fontSize: 14, letterSpacing: 2.5 }}>
          <textPath href={`#${pathId}`}>{ring}</textPath>
        </text>
      </svg>
      <span
        className="display relative max-w-[96px] text-center text-[22px] leading-[0.95] text-brand-ink"
        style={{ textShadow: "0.06em 0.06em 0 var(--brand-sun)" }}
      >
        {centre}
      </span>
    </div>
  );
}
