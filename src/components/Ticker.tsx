import { TICKER_ITEMS } from "@/data/content";

/**
 * Seamless marquee (§6.6): the list is rendered twice in one max-content row and
 * slides from 0 to -50%, so the loop point is invisible. Pauses on hover.
 */
export function Ticker() {
  const base = [...TICKER_ITEMS, ...TICKER_ITEMS]; // wide enough for any viewport
  const row = [...base, ...base]; // duplicate = seamless loop
  return (
    <div className="theme-fade relative z-10 -mx-4 -mt-[18px] -rotate-[1.5deg] overflow-hidden bg-brand-contrast py-[18px] text-brand-sun dark:text-brand-on-sun motion-reduce:overflow-x-auto">
      <ul className="animate-marquee flex w-max whitespace-nowrap font-display text-[22px] font-extrabold tracking-[-0.02em] hover:[animation-play-state:paused] motion-reduce:animate-none min-[768px]:text-[30px]">
        {row.map((t, i) => (
          <li key={i} className="flex items-center" aria-hidden={i >= base.length}>
            <span className="px-[22px]">{t}</span>
            <span className="text-brand-pop" aria-hidden>
              ✦
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
