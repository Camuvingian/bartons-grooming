import { useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO } from "@/data/content";
import { Bubbles } from "./Bubbles";
import { BlobFrame } from "./BlobFrame";
import { RotatingWord } from "./RotatingWord";
import { SpinningBadge } from "./SpinningBadge";
import { StatusChip } from "./StatusChip";

/** The hero block: primary colour, bubbles behind, headline left and the blob photo right (§5.3.2). */
export function Hero() {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number; dx: number; dy: number; size: number }[]>(
    [],
  );
  const seq = useRef(0);

  // clicking the CTA bursts 8 bubbles from the button (§6.13); the link still navigates
  const burst = (e: MouseEvent<HTMLElement>) => {
    const hero = e.currentTarget.closest("section");
    if (!hero) return;
    const r = e.currentTarget.getBoundingClientRect();
    const h = hero.getBoundingClientRect();
    const x = r.left - h.left + r.width / 2;
    const y = r.top - h.top + r.height / 2;
    const next = Array.from({ length: 8 }, (_, i) => {
      const a = (Math.PI * 2 * i) / 8 + Math.random() * 0.6;
      const d = 60 + Math.random() * 60;
      return { id: seq.current++, x, y, dx: Math.cos(a) * d, dy: Math.sin(a) * d - 40, size: 10 + Math.random() * 16 };
    });
    setBursts((b) => [...b, ...next]);
    setTimeout(() => setBursts((b) => b.filter((p) => !next.includes(p))), 800);
  };

  return (
    <section
      className="theme-fade relative mx-3 grid min-h-[520px] grid-cols-1 gap-10 overflow-hidden rounded-[24px] bg-brand-primary px-6 pb-14 pt-14 text-brand-on-primary shadow-[0_0_0_1px_var(--brand-hero-ring)] min-[900px]:mx-6 min-[900px]:grid-cols-[1.15fr_1fr] min-[900px]:rounded-[32px] min-[900px]:px-14 min-[900px]:pb-20 min-[900px]:pt-[72px]"
      aria-labelledby="hero-title"
    >
      <Bubbles count={typeof window !== "undefined" && window.innerWidth < 640 ? 12 : 22} />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 motion-reduce:hidden">
        {bursts.map((b) => (
          <span
            key={b.id}
            className="animate-burst absolute rounded-full"
            style={{
              left: b.x,
              top: b.y,
              width: b.size,
              height: b.size,
              marginLeft: -b.size / 2,
              marginTop: -b.size / 2,
              border: "2px solid rgb(255 255 255 / .7)",
              background: "radial-gradient(circle at 30% 30%, rgb(255 255 255 / .6), rgb(255 255 255 / .08) 60%)",
              ["--dx" as string]: `${b.dx}px`,
              ["--dy" as string]: `${b.dy}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col justify-center gap-7">
        <span className="theme-fade inline-flex w-fit items-center gap-2 rounded-full bg-brand-sun px-3.5 py-2 text-sm font-bold text-brand-on-sun">
          <span className="size-2 rounded-full bg-brand-ink" aria-hidden />
          {HERO.chip}
        </span>
        <h1
          id="hero-title"
          className="display text-[clamp(52px,13vw,72px)] leading-[0.92] tracking-[-0.045em] min-[900px]:text-[clamp(52px,8vw,96px)]"
        >
          Leave
          <br />
          looking
          <br />
          <RotatingWord />
        </h1>
        <p className="max-w-[460px] text-xl leading-normal opacity-95">{HERO.sub}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="pillSun" size="pill" onClick={burst}>
            <Link to="/book">
              Book a groom <ArrowRight className="size-5" aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="pillOutline" size="pill">
            <a href="#prices">See prices</a>
          </Button>
        </div>
      </div>

      <div className="relative z-10 grid place-items-center">
        <div className="relative">
          <BlobFrame />
          <SpinningBadge className="absolute -right-1.5 bottom-2.5" />
          <StatusChip className="absolute left-0 top-[30px]" />
        </div>
      </div>
    </section>
  );
}
