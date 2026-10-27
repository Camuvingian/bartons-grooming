import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Dog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Chip } from "@/components/Chip";
import { ESTIMATOR } from "@/data/content";
import { useCountUp } from "@/hooks/useCountUp";
import { useReveal } from "@/hooks/useReveal";
import { calcPrice, findService, SERVICES, SIZES, type DogSize, type ServiceId } from "@/lib/pricing";

/** "How much for my pup?": size and groom chips, with the price counting up or down on every change (§6.10). */
export function PriceEstimator() {
  const [size, setSize] = useState<DogSize>("medium");
  const [serviceId, setServiceId] = useState<ServiceId>("full");
  const price = calcPrice(findService(serviceId), size);
  const shown = useCountUp(price);
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="prices"
      ref={ref}
      className="reveal theme-fade sticker polka mx-3 mt-10 grid grid-cols-1 gap-8 rounded-[24px] bg-brand-pop p-6 text-brand-on-pop [--sticker-offset:8px] [--title-shadow:var(--brand-sun)] min-[900px]:mx-6 min-[900px]:grid-cols-2 min-[900px]:gap-12 min-[900px]:rounded-[32px] min-[900px]:p-14 min-[900px]:[--sticker-offset:10px]"
      aria-labelledby="estimator-title"
    >
      <div className="flex flex-col gap-5 min-[900px]:pt-2">
        <h2 id="estimator-title" className="display groovy-title text-[clamp(38px,5vw,60px)]">
          {ESTIMATOR.title}
        </h2>
        <p className="max-w-[420px] text-[17px] leading-[1.55] opacity-85">{ESTIMATOR.sub}</p>
      </div>

      <div className="theme-fade sticker flex flex-col gap-5 rounded-3xl bg-brand-surface p-5 text-foreground min-[640px]:p-7">
        <div className="flex flex-col gap-2.5">
          <span className="eyebrow text-muted-foreground" id="size-label">
            Size
          </span>
          <ToggleGroup
            type="single"
            value={size}
            onValueChange={(v) => v && setSize(v as DogSize)}
            aria-labelledby="size-label"
            className="grid w-full grid-cols-4 gap-2"
          >
            {SIZES.map((s) => (
              <Chip
                key={s.id}
                value={s.id}
                shape="grid"
                className="h-full min-h-[92px] flex-col justify-end gap-1.5 px-2 py-3"
              >
                <Dog style={{ width: s.icon, height: s.icon }} className="size-auto" aria-hidden />
                <span className="text-[13px]">{s.label}</span>
              </Chip>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="eyebrow text-muted-foreground" id="groom-label">
            Groom
          </span>
          <ToggleGroup
            type="single"
            value={serviceId}
            onValueChange={(v) => v && setServiceId(v as ServiceId)}
            aria-labelledby="groom-label"
            className="flex-wrap gap-2"
          >
            {SERVICES.map((s) => (
              <Chip key={s.id} value={s.id}>
                {s.name}
              </Chip>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-dashed border-border pt-[18px]">
          <div>
            <span className="eyebrow block text-muted-foreground">Your price</span>
            <span className="display text-[52px] tabular-nums" aria-hidden>
              £{shown}
            </span>
            <span className="sr-only" aria-live="polite">
              {findService(serviceId).name} for a {size} dog: £{price}
            </span>
          </div>
          <Button asChild variant="pillPrimary" size="pill">
            <Link to={`/book?service=${serviceId}&size=${size}`}>
              Book this <ArrowRight className="size-5" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
