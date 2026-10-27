import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroup as RadioPrimitive } from "radix-ui";
import { SERVICES, type ServiceId } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/** Step 1: the four services as big tappable rows. */
export function StepService({ value, onChange }: { value: ServiceId; onChange: (v: ServiceId) => void }) {
  return (
    <RadioGroup value={value} onValueChange={(v) => onChange(v as ServiceId)} aria-label="Service" className="gap-2.5">
      {SERVICES.map((s) => (
        <RadioPrimitive.Item
          key={s.id}
          value={s.id}
          className={cn(
            "theme-fade flex min-h-14 items-center justify-between rounded-[20px] px-5 py-4 text-left text-[17px] font-bold outline-none transition-[transform,background-color,color] duration-200 active:scale-[.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            value === s.id
              ? "bg-brand-primary text-brand-on-primary"
              : "bg-brand-surface text-foreground ring-1 ring-border",
          )}
        >
          <span>{s.name}</span>
          <span className="tabular-nums">£{s.from}</span>
        </RadioPrimitive.Item>
      ))}
    </RadioGroup>
  );
}
