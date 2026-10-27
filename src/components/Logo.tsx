import { Link } from "react-router-dom";
import { SITE } from "@/data/content";
import { cn } from "@/lib/utils";
import { StudioDog } from "./StudioDog";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("brand-mascot", className)}>
      <StudioDog portrait />
    </span>
  );
}
export function Logo({ className, to = "/", size = "md" }: { className?: string; to?: string; size?: "md" | "sm" }) {
  return (
    <Link
      to={to}
      className={cn("studio-logo", size === "sm" && "studio-logo-small", className)}
      aria-label={`${SITE.name}, home`}
    >
      <LogoMark />
      <span className="studio-wordmark">
        barton’s<span>GROOMING STUDIO</span>
      </span>
    </Link>
  );
}
