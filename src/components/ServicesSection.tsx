import { SERVICES_SECTION } from "@/data/content";
import { SERVICES } from "@/lib/pricing";
import { useReveal } from "@/hooks/useReveal";
import { ServiceCard } from "./ServiceCard";

export function ServicesSection() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="services" ref={ref} className="reveal page-x pb-10 pt-24" aria-labelledby="services-title">
      <div className="mb-8 flex flex-col gap-4 min-[768px]:flex-row min-[768px]:items-end min-[768px]:justify-between">
        <h2 id="services-title" className="display max-w-[640px] text-[clamp(38px,5vw,60px)] tracking-[-0.04em]">
          {SERVICES_SECTION.title}
        </h2>
        <p className="max-w-[340px] text-[17px] leading-[1.55] opacity-75">{SERVICES_SECTION.sub}</p>
      </div>
      <div className="grid grid-cols-1 gap-[18px] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.id} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
