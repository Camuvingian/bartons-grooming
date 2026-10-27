import { cn } from "@/lib/utils";

/** The rainbow band: primary, pop, sun and zing stacked as thin stripes. */
export function Stripes({ className, thickness = 4 }: { className?: string; thickness?: number }) {
  return (
    <div className={cn("flex flex-col", className)} aria-hidden>
      {["bg-brand-primary", "bg-brand-pop", "bg-brand-sun", "bg-brand-zing"].map((c) => (
        <span key={c} className={cn("block w-full theme-fade", c)} style={{ height: thickness }} />
      ))}
    </div>
  );
}
