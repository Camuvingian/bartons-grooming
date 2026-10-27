import { ToggleGroup } from "@/components/ui/toggle-group";
import { Chip } from "@/components/Chip";
import { BOOKING } from "@/data/content";
import type { Day } from "@/lib/days";

/** Step 2: day chips then time chips. */
export function StepWhen({
  days,
  day,
  time,
  onDay,
  onTime,
}: {
  days: Day[];
  day: string;
  time: string;
  onDay: (v: string) => void;
  onTime: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <ToggleGroup
        type="single"
        value={day}
        onValueChange={(v) => v && onDay(v)}
        aria-label="Day"
        className="grid w-full grid-cols-4 gap-2"
      >
        {days.map((d) => (
          <Chip
            key={d.key}
            value={d.key}
            shape="grid"
            className="h-full min-h-[76px] flex-col gap-0.5 px-2 py-3"
            aria-label={d.label}
          >
            <span className="text-xs font-semibold opacity-80">{d.dow}</span>
            <span className="font-display text-2xl font-extrabold">{d.date}</span>
          </Chip>
        ))}
      </ToggleGroup>
      <ToggleGroup
        type="single"
        value={time}
        onValueChange={(v) => v && onTime(v)}
        aria-label="Time"
        className="grid w-full grid-cols-2 gap-2"
      >
        {BOOKING.times.map((t) => (
          <Chip key={t} value={t} shape="grid" className="min-h-12 justify-center">
            {t}
          </Chip>
        ))}
      </ToggleGroup>
    </div>
  );
}
