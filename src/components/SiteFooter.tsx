import { Stripes } from "@/components/groovy/Stripes";
import { SITE } from "@/data/content";

export function SiteFooter() {
  return (
    <footer id="about" className="pt-10">
      <div className="page-x flex flex-col gap-6 pb-9 min-[768px]:flex-row min-[768px]:items-end min-[768px]:justify-between">
        <p
          className="display footer-mark text-[clamp(72px,14vw,140px)] leading-[0.95] tracking-(--track-footer) text-brand-primary"
          aria-label={SITE.name}
        >
          Barton's
        </p>
        <address className="text-sm not-italic leading-relaxed opacity-75 min-[768px]:text-right">
          {SITE.address} · {SITE.hours}
          <br />
          <a href={`mailto:${SITE.email}`} className="hover:text-brand-primary">
            {SITE.email}
          </a>
        </address>
      </div>
      <Stripes thickness={6} />
    </footer>
  );
}
