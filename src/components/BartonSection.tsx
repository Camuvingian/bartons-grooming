import { Daisy } from "@/components/groovy/Daisy";
import { Starburst } from "@/components/groovy/Starburst";
import { Photo } from "@/components/Photo";
import { NATALIE } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";

function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9Z" />
    </svg>
  );
}

/** Meet the Barton in Barton's: portrait in a sticker frame, a short bio, a few facts and her LinkedIn. */
export function BartonSection() {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id="barton"
      ref={ref}
      className="reveal theme-fade sticker mx-3 my-10 grid grid-cols-1 items-center gap-10 rounded-[24px] bg-brand-zing p-6 text-brand-on-zing [--sticker-offset:8px] [--title-shadow:var(--brand-sun)] min-[900px]:mx-6 min-[900px]:grid-cols-[0.9fr_1.1fr] min-[900px]:gap-14 min-[900px]:rounded-[32px] min-[900px]:p-14 min-[900px]:[--sticker-offset:10px]"
      aria-labelledby="barton-title"
    >
      <div className="relative mx-auto w-[min(360px,80vw)]">
        <Daisy
          className="absolute -left-8 -top-8 size-24 animate-spin-slow"
          petal="var(--brand-sun)"
          center="var(--brand-pop)"
        />
        <Photo
          src={NATALIE.portrait.src}
          alt={NATALIE.portrait.alt}
          caption={NATALIE.portrait.caption}
          tone="after"
          className="animate-blob aspect-square w-full border-[3px] border-brand-ink shadow-[8px_8px_0_var(--brand-ink)]"
        />
        <div className="absolute -bottom-6 -right-4 grid size-[120px] place-items-center">
          <Starburst className="absolute inset-0 size-full" fill="var(--brand-sun)" stroke="var(--brand-ink)" />
          <span className="display relative rotate-[-8deg] text-center text-[16px] leading-[0.95] text-brand-ink">
            the
            <br />
            Barton
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <p className="eyebrow text-[13px] opacity-90">{NATALIE.eyebrow}</p>
        <h2 id="barton-title" className="display groovy-title text-[clamp(38px,5vw,60px)]">
          {NATALIE.title}
        </h2>
        <p className="display text-[22px] text-brand-sun">{NATALIE.tagline}</p>
        {NATALIE.bio.map((para) => (
          <p key={para} className="max-w-[520px] text-[17px] leading-[1.55] opacity-95">
            {para}
          </p>
        ))}
        <ul className="flex flex-wrap gap-2" aria-label="About Natalie">
          {NATALIE.facts.map((f) => (
            <li key={f} className="rounded-full border-2 border-current px-3.5 py-2 text-sm font-bold">
              {f}
            </li>
          ))}
        </ul>
        <a
          href={NATALIE.linkedin}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border-[3px] border-brand-ink bg-brand-sun px-6 py-3.5 text-[16px] font-extrabold text-brand-on-sun shadow-[0_5px_0_var(--brand-ink)] transition-transform duration-200 hover:-translate-y-[2px] active:translate-y-[2px] active:shadow-[0_2px_0_var(--brand-ink)]"
        >
          <LinkedInGlyph /> {NATALIE.linkedinLabel}
        </a>
      </div>
    </section>
  );
}
