import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Daisy } from "@/components/groovy/Daisy";
import type { Service } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const TONES = [
  "bg-brand-sun text-brand-on-sun",
  "bg-brand-contrast text-brand-on-contrast dark:bg-brand-primary dark:text-brand-on-primary",
  "bg-brand-pop text-brand-on-pop",
  "bg-brand-zing text-brand-on-zing",
];

/** One service as a sticker card: daisy number, name, blurb and the "from" price. Springs on hover (§6.7). */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      to={`/book?service=${service.id}`}
      className={cn(
        "spring-card sticker flex min-h-[300px] flex-col gap-3.5 rounded-[26px] p-6 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        TONES[index % 4],
      )}
      aria-label={`${service.name}, from £${service.from}. Book now.`}
    >
      <span className="relative grid size-11 place-items-center">
        <Daisy className="absolute inset-0 size-full opacity-30" petal="currentColor" center="transparent" />
        <span className="eyebrow relative">{String(index + 1).padStart(2, "0")}</span>
      </span>
      <h3 className="display text-[32px]">{service.name}</h3>
      <p className="flex-1 text-[15px] leading-normal">{service.description}</p>
      <div className="flex items-center justify-between">
        <span className="display text-[26px]">
          <span className="font-sans text-sm font-bold opacity-80">from</span> £{service.from}
        </span>
        <span className="grid size-11 place-items-center rounded-full border-[3px] border-current" aria-hidden>
          <ArrowUpRight className="size-5" />
        </span>
      </div>
    </Link>
  );
}
