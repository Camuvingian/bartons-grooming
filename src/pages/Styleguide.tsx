import { Link } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { SCHEMES } from "@/lib/theme";
import { cn } from "@/lib/utils";

/** Hidden scheme gallery (/styleguide): the four schemes as cards, click to apply. */
export default function Styleguide() {
  const t = useTheme();
  return (
    <main className="page-x mx-auto max-w-[1100px] py-12">
      <Link to="/" className="text-sm font-semibold text-brand-primary">
        ← Back to the site
      </Link>
      <h1 className="display groovy-title mt-4 text-[clamp(38px,5vw,60px)]">Four grooves</h1>
      <p className="mt-3 max-w-[520px] text-[17px] opacity-75">
        Four 1960s colour grooves, each with its own after-dark version. Click a card to apply it. The cog in the corner
        switches light and dark.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-5 min-[640px]:grid-cols-2">
        {SCHEMES.map((s) => {
          const applied = t.scheme === s.id;
          const sw = t.resolvedMode === "dark" ? s.dark : s.swatch;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => t.setScheme(s.id)}
              aria-pressed={applied}
              className={cn(
                "theme-fade sticker flex flex-col gap-4 rounded-[26px] bg-brand-surface p-5 text-left transition-transform duration-300 ease-(--ease-spring) hover:-translate-y-1.5 hover:-rotate-1 focus-visible:outline-2 focus-visible:outline-brand-primary",
                applied && "[--brand-line:var(--brand-primary)]",
              )}
            >
              <div className="grid h-36 grid-cols-[2fr_1fr_1fr_1fr] gap-2" aria-hidden>
                <span
                  className="grid place-items-end rounded-2xl p-3 font-mono text-xs text-white"
                  style={{ background: sw[0] }}
                >
                  {sw[0]}
                </span>
                <span className="rounded-2xl" style={{ background: sw[1] }} />
                <span className="rounded-2xl" style={{ background: sw[2] }} />
                <span className="rounded-2xl" style={{ background: sw[3] }} />
              </div>
              <div>
                <p className="display text-[26px]">{s.name}</p>
                <p className="mt-1 text-sm opacity-75">{s.blurb}</p>
              </div>
              <p className={cn("eyebrow", applied ? "text-brand-primary" : "text-muted-foreground")}>
                {applied ? "● Applied" : "Click to apply"}
              </p>
            </button>
          );
        })}
      </div>
    </main>
  );
}
