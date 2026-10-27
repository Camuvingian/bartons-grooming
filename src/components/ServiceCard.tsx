import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const TONES = [
  "bg-brand-sun text-brand-on-sun",
  "bg-brand-contrast text-brand-on-contrast",
  "bg-brand-pop text-brand-on-pop",
  "bg-brand-surface text-foreground ring-1 ring-border",
];
const ARROWS = [
  "bg-brand-ink text-white",
  "bg-brand-on-contrast text-brand-contrast",
  "bg-brand-ink text-white",
  "bg-foreground text-background",
];

/** One service: number, name, blurb and the "from" price. The whole card links to booking and springs on hover (§6.7). */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      to={`/book?service=${service.id}`}
      className={cn(
        "spring-card flex min-h-[300px] flex-col gap-3.5 rounded-[26px] p-6 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        TONES[index % 4],
      )}
      aria-label={`${service.name}, from £${service.from}. Book now.`}
    >
      <span className="eyebrow opacity-80">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="display text-[32px] tracking-[-0.03em]">{service.name}</h3>
      <p className="flex-1 text-[15px] leading-normal">{service.description}</p>
      <div className="flex items-center justify-between">
        <span className="font-display text-[26px] font-extrabold tracking-[-0.03em]">
          <span className="text-sm font-bold opacity-80">from</span> £{service.from}
        </span>
        <span className={cn("grid size-11 place-items-center rounded-full", ARROWS[index % 4])} aria-hidden>
          <ArrowUpRight className="size-5" />
        </span>
      </div>
    </Link>
  );
}
