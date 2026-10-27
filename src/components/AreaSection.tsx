import { MapPin } from "lucide-react";
import { AREA, SITE } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";
import { AreaMap } from "./AreaMap";

export function AreaSection() {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id="area"
      ref={ref}
      className="reveal page-x grid grid-cols-1 items-center gap-10 py-[60px] min-[900px]:grid-cols-[1fr_1.15fr] min-[900px]:gap-14"
      aria-labelledby="area-title"
    >
      <div className="flex flex-col gap-5">
        <p className="eyebrow text-[13px] text-brand-primary">{AREA.eyebrow}</p>
        <h2 id="area-title" className="display groovy-title text-[clamp(38px,5vw,60px)]">
          {AREA.title}
        </h2>
        <p className="max-w-[460px] text-[17px] leading-[1.55] opacity-75">{AREA.sub}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Places we cover">
          {AREA.highlights.map((h) => (
            <li key={h} className="rounded-full bg-muted px-3.5 py-2 text-sm font-bold">
              {h}
            </li>
          ))}
        </ul>
        <p className="flex items-start gap-2 text-[15px] opacity-80">
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand-primary" aria-hidden />
          <span>
            {AREA.note}{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-bold text-brand-primary underline-offset-4 hover:underline"
            >
              {SITE.email}
            </a>
          </span>
        </p>
      </div>
      <div className="area-frame sticker theme-fade rounded-[32px] bg-brand-sun p-4 [--sticker-offset:8px] min-[640px]:p-6">
        <AreaMap />
      </div>
    </section>
  );
}
