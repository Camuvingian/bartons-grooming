import { useTheme } from "./theme-provider";
import { setterAsset } from "@/lib/theme";
import { cn } from "@/lib/utils";

/** Generated transparent artwork, shared between the hero and cropped brand portrait. */
export function StudioDog({ className, portrait = false }: { className?: string; portrait?: boolean }) {
  const { dogCoat, scheme, resolvedMode } = useTheme();
  const src = setterAsset(dogCoat, scheme, resolvedMode);
  return (
    <svg
      viewBox={portrait ? "100 0 190 185" : "0 0 440 440"}
      className={cn("studio-dog illustrated-setter", className)}
      aria-hidden="true"
    >
      <image href={src} width="440" height="440" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}
