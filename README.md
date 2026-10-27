# Barton's Grooming

Marketing site and booking flow for an independent dog-grooming salon, built from `docs/plans/BARTONS_DESIGN_BRIEF.md`.

Stack: Vite, React 19, TypeScript (strict), Tailwind v4, shadcn/ui (Radix), react-router-dom v6, lucide-react, sonner.

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # typecheck + production build
pnpm lint
pnpm format
```

## Routes

| Path          | What it is                                                                     |
| ------------- | ------------------------------------------------------------------------------ |
| `/`           | Homepage: hero, ticker, services, before/after slider, price estimator, footer |
| `/book`       | Mobile-first 3-step booking flow (`?service=full&size=large` pre-fills it)     |
| `/styleguide` | Hidden gallery of the four colour schemes                                      |

## Theming

- Four schemes (Electric Lagoon, Bubblegum Pop, Citrus Splash, Berry Sherbet), each with its own dark palette. Every colour is a CSS variable in `src/index.css`; components only reference roles (`--brand-primary`, `--brand-sun`, `--brand-pop`, `--brand-contrast`, …).
- Four lettering presets (Bricolage, Bubbly, Chunky, Funky) set `--font-display` and `--font-sans` via `data-font` on `<html>`.
- The floating cog (`SettingsMenu`) sits top-right on desktop and under the burger on mobile. Settings persist in localStorage and are applied by an inline script in `index.html` before first paint.
- Option lists live in `src/lib/theme.ts`; the provider is `src/components/theme-provider.tsx`.

## Content and images

Copy is in `src/data/content.ts` (⚑ marks placeholders to confirm with the client). Photos in `public/images/` are free placeholder dog photos from placedog.net; swap them for the client's. Any missing or broken photo falls back to the brief's striped placeholder with a mono caption (`src/components/Photo.tsx`).
