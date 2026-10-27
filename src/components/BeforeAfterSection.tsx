import { useState } from "react";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Chip } from "@/components/Chip";
import { BEFORE_AFTER, DOGS } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";
import { BeforeAfter } from "./BeforeAfter";

export function BeforeAfterSection() {
  const [dogId, setDogId] = useState(DOGS[0]!.id);
  const dog = DOGS.find((d) => d.id === dogId) ?? DOGS[0]!;
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id="gallery"
      ref={ref}
      className="reveal page-x grid grid-cols-1 items-center gap-10 py-[60px] min-[900px]:grid-cols-[1fr_1.25fr] min-[900px]:gap-12"
      aria-labelledby="ba-title"
    >
      <div className="flex flex-col gap-5">
        <p className="eyebrow text-[13px] text-brand-primary">{BEFORE_AFTER.eyebrow}</p>
        <h2 id="ba-title" className="display text-[clamp(38px,5vw,60px)] tracking-[-0.04em]">
          {BEFORE_AFTER.title}
        </h2>
        <p className="max-w-[420px] text-[17px] leading-[1.55] opacity-75">{BEFORE_AFTER.sub}</p>
        <ToggleGroup
          type="single"
          value={dogId}
          onValueChange={(v) => v && setDogId(v)}
          aria-label="Choose a dog"
          className="flex-wrap gap-2"
        >
          {DOGS.map((d) => (
            <Chip key={d.id} value={d.id}>
              {d.name}
            </Chip>
          ))}
        </ToggleGroup>
      </div>
      <BeforeAfter pairKey={dog.id} before={dog.before} after={dog.after} alt={`${dog.name} the ${dog.breed}`} />
    </section>
  );
}
