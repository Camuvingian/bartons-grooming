import { SITE } from "@/data/content";

export function SiteFooter() {
  return (
    <footer
      id="about"
      className="page-x flex flex-col gap-6 pb-9 pt-10 min-[768px]:flex-row min-[768px]:items-end min-[768px]:justify-between"
    >
      <p
        className="display text-[clamp(72px,14vw,140px)] leading-[0.85] tracking-[-0.06em] text-brand-primary"
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
    </footer>
  );
}
