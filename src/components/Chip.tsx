import type { ComponentProps } from "react";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

/** A selectable chip for ToggleGroups (§5.2): muted when off, heavy contrast fill when on. */
export function Chip({
  className,
  shape = "pill",
  ...props
}: ComponentProps<typeof ToggleGroupItem> & { shape?: "pill" | "grid" }) {
  return (
    <ToggleGroupItem
      {...props}
      className={cn(
        "h-auto min-h-11 bg-muted px-4 py-2.5 text-[15px] font-bold text-foreground transition-[transform,background-color,color] duration-200 hover:bg-muted active:scale-[.94] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=on]:bg-brand-contrast data-[state=on]:text-brand-on-contrast data-[state=on]:hover:bg-brand-contrast",
        shape === "pill" ? "rounded-full" : "rounded-[14px]",
        className,
      )}
    />
  );
}
