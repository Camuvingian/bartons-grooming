import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo, LogoMark } from "@/components/Logo";
import { NAV_LINKS, SITE } from "@/data/content";

/** Top bar: logo, centre links, phone and the "Book a groom" pill. Below 900px the links live in a Sheet. */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav relative z-30 flex items-center justify-between py-3.5 min-[900px]:py-[22px]">
      <Logo />

      <nav aria-label="Main" className="hidden items-center gap-8 min-[900px]:flex">
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-[15px] font-semibold transition-colors hover:text-brand-primary"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-4 min-[900px]:flex">
        <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-sm font-semibold hover:text-brand-primary">
          {SITE.phone}
        </a>
        <Button asChild variant="pill" size="pill">
          <Link to="/book">Book a groom</Link>
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="site-burger grid size-11 place-items-center rounded-full border-2 border-foreground/15 text-foreground min-[900px]:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[min(360px,88vw)] gap-0 border-0 bg-background p-6 sm:max-w-none [&>button]:hidden"
        >
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
          <div className="flex items-center justify-between">
            <LogoMark />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-11 place-items-center rounded-full bg-muted"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-10 flex flex-col gap-2">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-[40px] font-extrabold leading-none tracking-(--track-display) hover:text-brand-primary"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 font-semibold">
              <Phone className="size-4" /> {SITE.phone}
            </a>
            <Button asChild variant="pill" size="pill" className="w-full py-4 text-base">
              <Link to="/book" onClick={() => setOpen(false)}>
                Book a groom
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
