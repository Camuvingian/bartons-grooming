import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/Logo";
import { calcPrice, findService, isDogSize, isServiceId, type DogSize, type ServiceId } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { StepConfirm } from "./StepConfirm";
import { StepService } from "./StepService";
import { StepWhen } from "./StepWhen";
import { nextOpenDays } from "@/lib/days";

const TITLES = ["Pick a pamper", "When suits you?", "You're booked!"];
const CTAS = ["Choose a time", "Confirm booking", "Start again"];

/** The 3-step mobile-first booking flow (§5.4). Pre-fills from ?service= and ?size=. */
export function BookingFlow() {
  const [params] = useSearchParams();
  const initialService = params.get("service");
  const initialSize = params.get("size");
  const size: DogSize = isDogSize(initialSize) ? initialSize : "medium";

  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<"forward" | "back">("forward");
  const [serviceId, setServiceId] = useState<ServiceId>(isServiceId(initialService) ? initialService : "full");
  const days = useMemo(() => nextOpenDays(), []);
  const [day, setDay] = useState(days[0]!.key);
  const [time, setTime] = useState("11:30am");

  const service = findService(serviceId);
  const price = calcPrice(service, size);
  const dayLabel = days.find((d) => d.key === day)?.label ?? "";
  const when = `${dayLabel} · ${time}`;

  const go = (to: number) => {
    setDir(to > step ? "forward" : "back");
    setStep(to);
  };
  const next = () => {
    if (step === 1) go(2);
    else if (step === 2) {
      go(3);
      toast.success("Booking confirmed", { description: `${service.name}, ${when}. We've saved you a spot.` });
    } else {
      go(1);
    }
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col px-5 pb-28 pt-[calc(14px+env(safe-area-inset-top,0px))]">
      <header className="flex items-center justify-between pr-14 min-[900px]:pr-0">
        {step > 1 && step < 3 ? (
          <button
            type="button"
            onClick={() => go(step - 1)}
            className="theme-fade grid size-11 place-items-center rounded-full bg-brand-surface text-foreground shadow-[0_4px_14px_var(--brand-shadow)]"
            aria-label="Back"
          >
            <ArrowLeft className="size-5" />
          </button>
        ) : (
          <Link
            to="/"
            className="theme-fade grid size-11 place-items-center rounded-full bg-brand-surface text-foreground shadow-[0_4px_14px_var(--brand-shadow)]"
            aria-label="Back to home"
          >
            <ArrowLeft className="size-5" />
          </Link>
        )}
        <Logo size="sm" className="[&>span:first-child]:hidden" />
        <span className="eyebrow w-11 text-right text-muted-foreground" aria-label={`Step ${step} of 3`}>
          {step}/3
        </span>
      </header>

      <Progress value={(step / 3) * 100} className="mt-5 h-2.5" aria-label="Booking progress" />

      <main
        key={step}
        className={cn(
          "mt-7 flex flex-col gap-[18px]",
          dir === "forward" ? "animate-slide-in-right" : "animate-slide-in-left",
        )}
      >
        <h1 className="display text-[40px] tracking-[-0.04em]">{TITLES[step - 1]}</h1>
        {step === 1 && <StepService value={serviceId} onChange={setServiceId} />}
        {step === 2 && <StepWhen days={days} day={day} time={time} onDay={setDay} onTime={setTime} />}
        {step === 3 && <StepConfirm serviceName={service.name} when={when} price={price} />}
        {step < 3 && (
          <p className="text-sm opacity-70">
            {service.name} for a {size} dog · <span className="font-bold">£{price}</span>
          </p>
        )}
      </main>

      <div className="fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-background via-background/90 to-transparent px-5 pb-[calc(16px+env(safe-area-inset-bottom,0px))] pt-6">
        <button
          type="button"
          onClick={next}
          className="theme-fade mx-auto flex w-full max-w-[400px] items-center justify-center gap-2 rounded-full bg-brand-contrast p-5 text-[17px] font-extrabold text-brand-on-contrast shadow-[0_6px_0_var(--brand-primary)] transition-transform duration-150 active:translate-y-1 active:shadow-[0_2px_0_var(--brand-primary)]"
        >
          {CTAS[step - 1]}
          {step < 3 && <ArrowRight className="size-5" aria-hidden />}
        </button>
      </div>
    </div>
  );
}
