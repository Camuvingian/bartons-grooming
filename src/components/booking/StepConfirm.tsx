import { Photo } from "@/components/Photo";
import { BOOKING } from "@/data/content";

/** Step 3: the confirmation card pops in (§6.11). */
export function StepConfirm({ serviceName, when, price }: { serviceName: string; when: string; price: number }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="animate-pop-in-slow theme-fade sticker flex flex-col items-center gap-3 rounded-[28px] bg-brand-primary p-6 text-center text-brand-on-primary [--sticker-offset:8px]">
        <Photo
          src={BOOKING.pet.src}
          alt={BOOKING.pet.alt}
          caption={BOOKING.pet.caption}
          className="size-24 rounded-full border-[3px] border-white/60"
        />
        <p className="display mt-2 text-[28px]">{serviceName}</p>
        <p className="text-base font-semibold opacity-90">{when}</p>
        <p className="display text-[34px] text-brand-sun">£{price}</p>
      </div>
      <p className="text-center text-base opacity-80">{BOOKING.afterNote}</p>
    </div>
  );
}
