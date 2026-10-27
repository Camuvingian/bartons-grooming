import { icons, type LucideIcon } from "lucide-react";
import { Daisy } from "@/components/groovy/Daisy";
import { Starburst } from "@/components/groovy/Starburst";
import { ANIMALS } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const Cmp = (icons as Record<string, LucideIcon>)[name];
  return Cmp ? <Cmp className={className} strokeWidth={2.2} aria-hidden /> : null;
};

/** Her love for all animals: a parade of creatures marching past, and a wall of tilted stamps. */
export function AnimalsSection() {
  const ref = useReveal<HTMLElement>();
  const parade = [...ANIMALS.parade, ...ANIMALS.parade];
  return (
    <section id="animals" ref={ref} className="reveal page-x pb-8 pt-10" aria-labelledby="animals-title">
      <div className="relative mb-8 flex flex-col gap-4 min-[768px]:flex-row min-[768px]:items-end min-[768px]:justify-between">
        <div>
          <p className="eyebrow text-[13px] text-brand-primary">{ANIMALS.eyebrow}</p>
          <h2 id="animals-title" className="display groovy-title mt-3 text-[clamp(38px,5vw,60px)]">
            {ANIMALS.title}
          </h2>
        </div>
        <p className="max-w-[460px] text-[17px] leading-[1.55] opacity-75">{ANIMALS.sub}</p>
      </div>

      {/* the parade: marches right to left, pauses on hover */}
      <div
        className="parade sticker theme-fade -rotate-1 overflow-hidden rounded-full bg-brand-pop py-3 text-brand-on-pop [--sticker-offset:5px]"
        aria-hidden
      >
        <ul className="animate-marquee flex w-max items-center gap-10 px-5 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {parade.map((n, i) => (
            <li
              key={i}
              className="parade-step grid size-12 place-items-center"
              style={{ animationDelay: `${(i % 7) * 0.15}s` }}
            >
              <Icon name={n} className="size-9" />
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-12">
        <div className="absolute -top-8 right-2 z-10 grid size-[110px] place-items-center min-[768px]:-top-12 min-[768px]:right-6">
          <Starburst
            className="absolute inset-0 size-full animate-spin-slow"
            fill="var(--brand-sun)"
            stroke="var(--brand-ink)"
          />
          <span className="display relative rotate-[-10deg] text-center text-[17px] leading-[0.95] text-brand-ink">
            {ANIMALS.sticker}
          </span>
        </div>
        <ul className="grid grid-cols-2 gap-4 min-[640px]:grid-cols-3 min-[1024px]:grid-cols-5" role="list">
          {ANIMALS.stamps.map((s, i) => (
            <li
              key={s.line}
              className="stamp sticker flex flex-col gap-2 rounded-[22px] bg-brand-surface p-5 [--sticker-offset:5px]"
              style={{ ["--tilt" as string]: `${[-3, 2, -1, 3, -2, 1, -3, 2, -2, 3][i % 10]}deg` }}
            >
              <span className="relative grid size-14 place-items-center text-brand-primary">
                <Daisy className="absolute inset-0 size-full opacity-20" petal="currentColor" center="transparent" />
                <Icon name={s.icon} className="relative size-8" />
              </span>
              <p className="display text-[22px] leading-none">{s.line}</p>
              <p className="text-sm opacity-75">{s.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
