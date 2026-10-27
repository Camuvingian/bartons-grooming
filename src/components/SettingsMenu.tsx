import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Monitor, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { DOG_COATS, LETTERINGS, MODES, SCHEMES, THEME_DEFAULTS, type Mode } from "@/lib/theme";
import { cn } from "@/lib/utils";

const MODE_ICON: Record<Mode, typeof Sun> = { light: Sun, dark: Moon, system: Monitor };

/**
 * The floating cog: colour scheme, light / dark / system and lettering.
 * Top-right on desktop; under the burger on mobile (positioning in settings.css).
 * Expands on hover, keyboard focus, or a tap.
 */
export function SettingsMenu() {
  const t = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // pages without a burger (booking) keep the cog in the top corner on mobile too
  const plain = useLocation().pathname.startsWith("/book");
  const changed =
    t.dogCoat !== "auto" ||
    t.scheme !== THEME_DEFAULTS.scheme ||
    t.mode !== THEME_DEFAULTS.mode ||
    t.lettering !== THEME_DEFAULTS.lettering;

  // tap outside or press Escape to close
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("bg-settings", open && "is-open", plain && "is-plain")}>
      <button
        type="button"
        className="bg-settings-btn relative"
        aria-expanded={open}
        aria-controls="bg-settings-panel"
        aria-label="Site look: colour groove, setter coat, dark mode and lettering"
        onClick={() => setOpen((o) => !o)}
      >
        <Settings className="size-5" strokeWidth={2.2} aria-hidden />
      </button>

      <div id="bg-settings-panel" className="bg-settings-panel" role="group" aria-label="Site look">
        <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
          <legend className="eyebrow mb-2 text-muted-foreground">Setter coat</legend>
          <div className="grid gap-1.5" role="group" aria-label="Setter coat">
            {DOG_COATS.map((coat) => (
              <button
                key={coat.id}
                type="button"
                aria-pressed={t.dogCoat === coat.id}
                onClick={() => t.setDogCoat(coat.id)}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-left text-sm font-bold",
                  t.dogCoat === coat.id
                    ? "bg-brand-contrast text-brand-on-contrast"
                    : "bg-muted hover:bg-foreground/10",
                )}
              >
                {coat.name}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Match theme: black & tan by day, chestnut after dark.</p>
        </fieldset>

        <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
          <legend className="eyebrow mb-2.5 text-muted-foreground">Colour groove</legend>
          <div role="radiogroup" aria-label="Colour groove" className="grid gap-1.5">
            {SCHEMES.map((s) => {
              const on = t.scheme === s.id;
              const dots = t.resolvedMode === "dark" ? s.dark : s.swatch;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => t.setScheme(s.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-[15px] font-bold transition-[background-color,transform] duration-200 active:scale-[.97] focus-visible:outline-2 focus-visible:outline-brand-primary",
                    on ? "bg-brand-contrast text-brand-on-contrast" : "bg-muted hover:bg-foreground/10",
                  )}
                >
                  <span className="flex shrink-0 gap-1" aria-hidden>
                    {dots.map((c, i) => (
                      <span key={i} className="size-3 rounded-full ring-1 ring-black/10" style={{ background: c }} />
                    ))}
                  </span>
                  {s.name}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="m-0 flex flex-col border-0 p-0">
          <legend className="eyebrow mb-2.5 text-muted-foreground">Appearance</legend>
          <div role="radiogroup" aria-label="Appearance" className="grid grid-cols-3 gap-1 rounded-2xl bg-muted p-1">
            {MODES.map((m) => {
              const Icon = MODE_ICON[m.id];
              const on = t.mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => t.setMode(m.id)}
                  className={cn(
                    "inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-brand-primary",
                    on ? "bg-brand-contrast text-brand-on-contrast" : "hover:bg-foreground/10",
                  )}
                >
                  <Icon className="size-4" aria-hidden /> {m.name}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="m-0 flex flex-col border-0 p-0">
          <legend className="eyebrow mb-2.5 text-muted-foreground">Lettering</legend>
          <div role="radiogroup" aria-label="Lettering" className="grid grid-cols-2 gap-1.5">
            {LETTERINGS.map((l) => {
              const on = t.lettering === l.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => t.setLettering(l.id)}
                  title={`${l.display} + ${l.body}`}
                  className={cn(
                    "flex min-h-12 flex-col items-start justify-center rounded-2xl px-3 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-brand-primary",
                    on ? "bg-brand-contrast text-brand-on-contrast" : "bg-muted hover:bg-foreground/10",
                  )}
                >
                  <span
                    className="text-[19px] font-extrabold leading-none"
                    style={{ fontFamily: `"${l.display}", sans-serif` }}
                  >
                    {l.name}
                  </span>
                  <span
                    className="mt-1 text-[11px] leading-none opacity-70"
                    style={{ fontFamily: `"${l.body}", sans-serif` }}
                  >
                    {l.display} + {l.body}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <p className="text-xs text-muted-foreground">Saved on this device.</p>
          <button
            type="button"
            disabled={!changed}
            onClick={t.reset}
            className="rounded-full px-3 py-1.5 text-sm font-bold text-brand-primary hover:bg-muted disabled:opacity-40"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
