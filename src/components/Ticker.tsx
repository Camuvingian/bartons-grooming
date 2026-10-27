import { Daisy } from "@/components/groovy/Daisy";
import { Stripes } from "@/components/groovy/Stripes";
import { TICKER_ITEMS } from "@/data/content";

/**
 * Seamless marquee (§6.6): the list is rendered twice in one max-content row and slides
 * from 0 to -50%, so the loop point is invisible. Pauses on hover. Rainbow stripes top and bottom.
 */
export function Ticker() {
  const base = [...TICKER_ITEMS, ...TICKER_ITEMS]; // wide enough for any viewport
  const row = [...base, ...base]; // duplicate = seamless loop
  return (
    <div className="relative z-10 -mx-4 -mt-[18px] -rotate-[1.5deg]">
      <Stripes thickness={5} />
      <div className="theme-fade overflow-hidden bg-brand-contrast py-[16px] text-brand-sun dark:text-brand-on-sun motion-reduce:overflow-x-auto">
        <ul className="animate-marquee flex w-max items-center whitespace-nowrap font-display text-[22px] font-extrabold tracking-(--track-display) hover:[animation-play-state:paused] motion-reduce:animate-none min-[768px]:text-[30px]">
          {row.map((t, i) => (
            <li key={i} className="flex items-center" aria-hidden={i >= base.length}>
              <span className="px-[22px]">{t}</span>
              <Daisy className="size-7 shrink-0" petal="var(--brand-pop)" center="var(--brand-ink)" />
            </li>
          ))}
        </ul>
      </div>
      <Stripes thickness={5} />
    </div>
  );
}
