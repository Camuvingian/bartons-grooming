import { Link } from "react-router-dom";
import { SITE } from "@/data/content";
import { cn } from "@/lib/utils";

/** The B mark (it wiggles, §6.8) and the wordmark with its primary-coloured full stop. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "animate-wiggle grid size-10 shrink-0 place-items-center rounded-full bg-brand-primary font-display text-[22px] font-extrabold text-brand-on-primary",
        className,
      )}
    >
      B
    </span>
  );
}

export function Logo({ className, to = "/", size = "md" }: { className?: string; to?: string; size?: "md" | "sm" }) {
  return (
    <Link
      to={to}
      className={cn("inline-flex items-center gap-3 hover:text-foreground", className)}
      aria-label={`${SITE.name}, home`}
    >
      <LogoMark />
      <span
        className={cn(
          "whitespace-nowrap font-display font-extrabold tracking-[-0.03em]",
          size === "sm" ? "text-xl" : "text-2xl",
        )}
      >
        {SITE.name}
        <span className="text-brand-primary">.</span>
      </span>
    </Link>
  );
}
