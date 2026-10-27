# Barton's Grooming — Website Design & Build Brief

> Hand this file to an implementing agent. It describes the stack, design tokens, theming system, every page section, every animation (with reference code), and the acceptance criteria needed to reproduce the approved mockup (`Bartons Grooming.dc.html`) exactly.

---

## 0. Summary

Barton's Grooming is an independent dog-grooming salon. The site must feel **bright, vibrant, playful and trustworthy**: big chunky display type, saturated colour blocks, pill-shaped buttons, rounded 24–32px containers, and constant gentle motion (bath bubbles, spinning badge, scrolling ticker, springy cards).

**Default theme: Electric Lagoon (light).** Three alternate colour schemes and a **dark mode for every scheme** must be available via a theme switcher. All colour comes from CSS variables, so no component hard-codes a hex value.

Deliverables:
1. Marketing homepage (desktop + responsive down to 360px).
2. Mobile-first 3-step booking flow (`/book`).
3. Theme system: 4 schemes × light/dark, persisted.
4. All animations listed in §6, respecting `prefers-reduced-motion`.

---

## 1. Tech stack (mandatory)

| Concern | Choice |
|---|---|
| Framework | **React 18+ with TypeScript (strict)** |
| Build | **Vite** (`npm create vite@latest bartons -- --template react-ts`) — or Next.js App Router if SSR is needed; the brief assumes Vite |
| Routing | `react-router-dom` v6 |
| Styling | **Tailwind CSS v4** (or v3.4 — follow whichever the current shadcn CLI installs) |
| Component library | **shadcn/ui** (Radix primitives). Install with `npx shadcn@latest init` |
| Icons | `lucide-react` (shadcn default) |
| Class utils | `clsx` + `tailwind-merge` via shadcn's `cn()` |
| Animation | Plain CSS keyframes + small React hooks. **No Framer Motion needed**; optional only for the booking step transitions |
| Fonts | Google Fonts: **Bricolage Grotesque** (display), **Figtree** (body/UI), **JetBrains Mono** (labels/eyebrows) |
| Lint/format | ESLint + Prettier |

### shadcn/ui components to install

```bash
npx shadcn@latest add button card badge toggle-group radio-group slider tabs dialog sheet dropdown-menu separator progress calendar popover sonner
```

How they map to the design:

| Design element | shadcn component | Notes |
|---|---|---|
| Pill CTAs ("Book a groom", "See prices") | `Button` | Add custom variants `pill`, `pillOutline`, `pillAccent` (see §5.1) |
| "Now booking" chip, Before/After labels | `Badge` | Custom variant `chip` |
| Service cards | `Card` | Override radius/colour; hover spring (§6.7) |
| Size picker / groom picker in estimator | `ToggleGroup` (type="single") | Styled as chips; selected = ink bg / white text |
| Dog picker on before/after | `ToggleGroup` | Same chip style |
| Booking step 1 service list | `RadioGroup` | Rendered as large tappable rows |
| Booking day/time | `ToggleGroup` grid (or `Calendar` + `Popover` for full date range) | |
| Booking progress | `Progress` | Override indicator transition to the springy easing |
| Mobile nav | `Sheet` (side="right") | |
| Theme switcher | `DropdownMenu` | Scheme radio items + light/dark/system |
| Booking confirmation toast | `sonner` | |

Do not restyle shadcn's internals beyond what's needed; theme via CSS variables and Tailwind classes passed through `className`.

---

## 2. Brand

- **Name:** Barton's Grooming. Wordmark (nav/top line): `Barton's Grooming` followed by a full stop in the primary colour → `Barton's Grooming.`
- **Logo mark:** 40px circle, primary fill, white "B" in Bricolage Grotesque 800 22px; it wiggles continuously (§6.8).
- **Voice:** warm, cheeky, concise. Short headlines, plain-English body. British English, £ prices.
- Sample copy (use verbatim unless the client supplies their own):
  - Hero: "Leave looking **fluffy. / fresh. / fancy. / adorable.**" (last word rotates)
  - Hero sub: "Bath, cut and cuddle for every breed. Gentle hands, warm water, zero rush."
  - Chip: "Now booking — 3 slots left this week"
  - Services title: "Pick a pamper." / sub: "Every groom includes a nose-to-tail health check and a treat of their choosing."
  - Before/after: eyebrow "THE BARTON'S EFFECT", title "Drag to see the glow-up.", sub "Real dogs from this week. Slide the handle to compare before and after."
  - Estimator: "How much for my pup?" / "Pick a size and a groom. You'll see a price before you book, with no surprises at pickup."
  - Footer: giant "Barton's" wordmark, "12 Mill Lane · Open Tue–Sat, 8am–5pm", "hello@bartonsgrooming.co.uk" (placeholders — confirm with client).

---

## 3. Design tokens

### 3.1 Brand colour roles

Every scheme defines the same five roles. Components only ever reference roles.

| Role | CSS var | Used for |
|---|---|---|
| Primary | `--brand-primary` | Hero block, logo, links, primary accents, price CTA, slider handle |
| Accent A ("sun") | `--brand-sun` | Hero CTA, chip, ticker text, rotating word, "After" badge |
| Accent B ("pop") | `--brand-pop` | Estimator block, spinning badge, ticker separators |
| Ink | `--brand-ink` | Text, dark buttons, ticker band, selected chips |
| Paper | `--brand-paper` | Page background |

Plus derived: `--brand-surface` (cards on paper, usually white), `--brand-on-primary` (text on primary, usually white), `--brand-on-sun`, `--brand-on-pop` (usually ink).

### 3.2 Schemes — LIGHT

| Scheme | primary | sun | pop | ink | paper | surface |
|---|---|---|---|---|---|---|
| **Electric Lagoon (default)** | `#3D5AFE` | `#2EF2D0` | `#FF6F5E` | `#0D1333` | `#F5F7FF` | `#FFFFFF` |
| Bubblegum Pop | `#FF3D8B` | `#FFD23F` | `#00C2A8` | `#1B1035` | `#FFF7FB` | `#FFFFFF` |
| Citrus Splash | `#FF6B1A` | `#C6F432` | `#2EB8FF` | `#14213D` | `#FFFBF3` | `#FFFFFF` |
| Berry Sherbet | `#8B3DFF` | `#FFB627` | `#3EE8A6` | `#1E0B3A` | `#FBF7FF` | `#FFFFFF` |

`on-primary` = `#FFFFFF` for all. `on-sun` and `on-pop` = that scheme's ink.

### 3.3 Schemes — DARK

Dark mode keeps the vibrancy: backgrounds become deep tinted navies/plums derived from the ink, primaries are lifted slightly for contrast, accents stay saturated. Text becomes a near-white tinted toward the scheme.

| Scheme | primary | sun | pop | ink (= foreground text) | paper (bg) | surface (cards) |
|---|---|---|---|---|---|---|
| **Electric Lagoon** | `#5C76FF` | `#2EF2D0` | `#FF7A6B` | `#EEF1FF` | `#080C24` | `#121A3F` |
| Bubblegum Pop | `#FF5A9E` | `#FFD84F` | `#14D4B9` | `#FFF0F6` | `#120A26` | `#1F1440` |
| Citrus Splash | `#FF7F38` | `#CCF54A` | `#4CC3FF` | `#F3F6FF` | `#0B1326` | `#16213D` |
| Berry Sherbet | `#9D5CFF` | `#FFBE3D` | `#4FF0B2` | `#F6F0FF` | `#120723` | `#22113F` |

**Important dark-mode rules:**
- In light mode, "ink" is used both as text colour *and* as a dark fill (nav "Book a groom" button, ticker band, selected chips). In dark mode those fills must NOT become near-white. Therefore use two separate variables:
  - `--brand-fg` → text colour (light: ink, dark: near-white).
  - `--brand-contrast` → "heavy" fill for dark buttons/ticker/selected chips (light: ink; dark: **the sun accent**, with `--brand-on-contrast` = dark paper colour). This keeps the ticker and selected chips punchy in dark mode.
- Text on `sun` / `pop` fills is always the scheme's *light-mode ink* (`--brand-on-sun`, `--brand-on-pop`) in both modes, because those fills stay bright.
- Hero block stays primary-filled in dark mode; add `box-shadow: 0 0 0 1px rgb(255 255 255 / .06)` so it doesn't bleed into the bg.
- Photo placeholder stripes/shadows: shadows use `rgb(0 0 0 / .4)` in dark.

### 3.4 Typography

| Token | Family | Weight | Size / line-height | Tracking | Use |
|---|---|---|---|---|---|
| `display-xl` | Bricolage Grotesque | 800 | 96px / 0.92 | -0.045em | Hero headline (desktop) |
| `display-footer` | Bricolage Grotesque | 800 | 140px / 0.85 | -0.06em | Footer wordmark, primary colour |
| `display-l` | Bricolage Grotesque | 800 | 60px / 1 | -0.04em | Section titles |
| `display-m` | Bricolage Grotesque | 800 | 40px / 1 | -0.04em | Mobile step titles |
| `display-s` | Bricolage Grotesque | 800 | 32px / 1 | -0.03em | Service card names |
| `price` | Bricolage Grotesque | 800 | 26px (card) / 52px (estimator) | -0.03em | Prices |
| `body-l` | Figtree | 400 | 20px / 1.5 | 0 | Hero sub |
| `body` | Figtree | 400 | 17px / 1.5–1.55 | 0 | Section subs |
| `ui` | Figtree | 600–800 | 14–17px | 0 | Nav, buttons, chips |
| `eyebrow` | JetBrains Mono | 500 | 12–13px | 0, uppercase | "THE BARTON'S EFFECT", "SIZE", "GROOM", card numbers "01" |

Responsive scaling: use `clamp()` — e.g. hero `clamp(52px, 8vw, 96px)`, section titles `clamp(38px, 5vw, 60px)`, footer `clamp(72px, 14vw, 140px)`.

Google Fonts URL:
```
https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap
```

### 3.5 Radius, spacing, elevation

- Radius: `--radius-pill: 999px`, `--radius-xl: 32px` (hero, estimator block), `--radius-lg: 26–28px` (service cards, before/after), `--radius-md: 24px` (estimator inner card), `--radius-sm: 14–16px` (chips in grids, floating status chip). shadcn base `--radius: 1rem`.
- Page gutters: 48px desktop content padding; colour blocks (hero, estimator) inset 24px from page edges. Mobile: 20–22px.
- Section vertical rhythm: 96px above "Pick a pamper", 60px around before/after, 40px around estimator/footer.
- Grid gaps: 18px (service cards), 8px (chips), 40–48px (two-column sections).
- Elevation: almost flat. Only the floating status chip (`0 10px 30px rgb(0 0 0/.15)`) and the "hard" shadow under the hero CTA: `box-shadow: 0 6px 0 var(--brand-ink)` (a solid offset, not a blur — key to the look). The mobile CTA uses `0 6px 0 var(--brand-primary)`.

---

## 4. Theming implementation

### 4.1 CSS variables (`src/index.css`)

Map brand roles onto shadcn's variable names so every shadcn component inherits the theme automatically.

```css
@import "tailwindcss";

:root,
[data-scheme="lagoon"] {
  --brand-primary:#3D5AFE; --brand-sun:#2EF2D0; --brand-pop:#FF6F5E;
  --brand-ink:#0D1333; --brand-paper:#F5F7FF; --brand-surface:#FFFFFF;
}
[data-scheme="bubblegum"] { --brand-primary:#FF3D8B; --brand-sun:#FFD23F; --brand-pop:#00C2A8; --brand-ink:#1B1035; --brand-paper:#FFF7FB; --brand-surface:#FFFFFF; }
[data-scheme="citrus"]    { --brand-primary:#FF6B1A; --brand-sun:#C6F432; --brand-pop:#2EB8FF; --brand-ink:#14213D; --brand-paper:#FFFBF3; --brand-surface:#FFFFFF; }
[data-scheme="berry"]     { --brand-primary:#8B3DFF; --brand-sun:#FFB627; --brand-pop:#3EE8A6; --brand-ink:#1E0B3A; --brand-paper:#FBF7FF; --brand-surface:#FFFFFF; }

/* Shared derived roles (light) */
:root {
  --brand-fg: var(--brand-ink);
  --brand-contrast: var(--brand-ink);
  --brand-on-contrast: #FFFFFF;
  --brand-on-primary: #FFFFFF;
  --brand-on-sun: var(--brand-ink);
  --brand-on-pop: var(--brand-ink);
}

/* DARK — per scheme. --brand-ink stays the light-mode ink so on-sun/on-pop keep working. */
.dark, .dark[data-scheme="lagoon"] {
  --brand-primary:#5C76FF; --brand-sun:#2EF2D0; --brand-pop:#FF7A6B;
  --brand-paper:#080C24; --brand-surface:#121A3F; --brand-fg:#EEF1FF; --brand-ink:#0D1333;
}
.dark[data-scheme="bubblegum"] { --brand-primary:#FF5A9E; --brand-sun:#FFD84F; --brand-pop:#14D4B9; --brand-paper:#120A26; --brand-surface:#1F1440; --brand-fg:#FFF0F6; --brand-ink:#1B1035; }
.dark[data-scheme="citrus"]    { --brand-primary:#FF7F38; --brand-sun:#CCF54A; --brand-pop:#4CC3FF; --brand-paper:#0B1326; --brand-surface:#16213D; --brand-fg:#F3F6FF; --brand-ink:#14213D; }
.dark[data-scheme="berry"]     { --brand-primary:#9D5CFF; --brand-sun:#FFBE3D; --brand-pop:#4FF0B2; --brand-paper:#120723; --brand-surface:#22113F; --brand-fg:#F6F0FF; --brand-ink:#1E0B3A; }
.dark {
  --brand-contrast: var(--brand-sun);
  --brand-on-contrast: var(--brand-paper);
}

/* shadcn mapping */
:root, .dark {
  --background: var(--brand-paper);
  --foreground: var(--brand-fg);
  --card: var(--brand-surface);
  --card-foreground: var(--brand-fg);
  --popover: var(--brand-surface);
  --popover-foreground: var(--brand-fg);
  --primary: var(--brand-primary);
  --primary-foreground: var(--brand-on-primary);
  --secondary: var(--brand-sun);
  --secondary-foreground: var(--brand-on-sun);
  --accent: var(--brand-pop);
  --accent-foreground: var(--brand-on-pop);
  --muted: color-mix(in oklab, var(--brand-fg) 6%, transparent);
  --muted-foreground: color-mix(in oklab, var(--brand-fg) 70%, transparent);
  --border: color-mix(in oklab, var(--brand-fg) 12%, transparent);
  --input: var(--border);
  --ring: var(--brand-primary);
  --radius: 1rem;
}

/* Tailwind v4: expose as utilities (bg-brand-primary, text-brand-sun, …) */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --color-brand-primary: var(--brand-primary);
  --color-brand-sun: var(--brand-sun);
  --color-brand-pop: var(--brand-pop);
  --color-brand-ink: var(--brand-ink);
  --color-brand-fg: var(--brand-fg);
  --color-brand-paper: var(--brand-paper);
  --color-brand-surface: var(--brand-surface);
  --color-brand-contrast: var(--brand-contrast);
  --color-brand-on-contrast: var(--brand-on-contrast);
  --font-display: "Bricolage Grotesque", system-ui, sans-serif;
  --font-sans: "Figtree", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

body { @apply bg-background text-foreground font-sans antialiased; transition: background-color .3s, color .3s; }
a { color: inherit; text-decoration: none; }
a:hover { color: var(--brand-primary); }
```

(If on Tailwind v3, put the same mappings in `tailwind.config.ts > theme.extend.colors` as `'brand-primary': 'var(--brand-primary)'` etc.)

### 4.2 ThemeProvider (`src/components/theme-provider.tsx`)

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Scheme = "lagoon" | "bubblegum" | "citrus" | "berry";
export type Mode = "light" | "dark" | "system";

export const SCHEMES: { id: Scheme; name: string; swatch: [string, string, string, string] }[] = [
  { id: "lagoon",    name: "Electric Lagoon", swatch: ["#3D5AFE", "#2EF2D0", "#FF6F5E", "#0D1333"] },
  { id: "bubblegum", name: "Bubblegum Pop",   swatch: ["#FF3D8B", "#FFD23F", "#00C2A8", "#1B1035"] },
  { id: "citrus",    name: "Citrus Splash",   swatch: ["#FF6B1A", "#C6F432", "#2EB8FF", "#14213D"] },
  { id: "berry",     name: "Berry Sherbet",   swatch: ["#8B3DFF", "#FFB627", "#3EE8A6", "#1E0B3A"] },
];

type Ctx = { scheme: Scheme; mode: Mode; setScheme: (s: Scheme) => void; setMode: (m: Mode) => void };
const ThemeCtx = createContext<Ctx | null>(null);

export function ThemeProvider({ children, defaultScheme = "lagoon" as Scheme, defaultMode = "system" as Mode }: { children: ReactNode; defaultScheme?: Scheme; defaultMode?: Mode }) {
  const [scheme, setScheme] = useState<Scheme>(() => (localStorage.getItem("bartons-scheme") as Scheme) ?? defaultScheme);
  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem("bartons-mode") as Mode) ?? defaultMode);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.scheme = scheme;
    localStorage.setItem("bartons-scheme", scheme);
  }, [scheme]);

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => root.classList.toggle("dark", mode === "dark" || (mode === "system" && mq.matches));
    apply();
    localStorage.setItem("bartons-mode", mode);
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [mode]);

  return <ThemeCtx.Provider value={{ scheme, mode, setScheme, setMode }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => {
  const c = useContext(ThemeCtx);
  if (!c) throw new Error("useTheme must be used inside ThemeProvider");
  return c;
};
```

Add an inline script in `index.html` `<head>` that reads localStorage and sets `data-scheme` + `.dark` before React mounts, to avoid a flash.

### 4.3 Theme switcher (`ThemeSwitcher.tsx`)

shadcn `DropdownMenu` triggered by a round icon `Button` (lucide `Palette`). Contents:
- `DropdownMenuRadioGroup` of the 4 schemes; each item shows a 4-dot swatch row (12px circles) + name.
- `DropdownMenuSeparator`.
- `DropdownMenuRadioGroup` for Light / Dark / System (lucide `Sun`, `Moon`, `Monitor`).

Place it in the nav to the left of the phone number. Also render a **Scheme gallery** on a hidden `/styleguide` route (four cards as in mockup option 1a: 2fr/1fr/1fr swatch grid with the hex printed on the primary tile, name, description, "● APPLIED / CLICK TO APPLY").

Theme change should cross-fade: `body` and coloured blocks get `transition: background-color .3s, color .3s`.

---

## 5. Components & page layout

### 5.1 Button variants (extend `components/ui/button.tsx` cva)

```ts
pill:        "rounded-full bg-brand-contrast text-brand-on-contrast font-bold px-[22px] py-3 text-[15px] transition-transform duration-200 hover:-rotate-3 hover:scale-[1.06]",
pillSun:     "rounded-full bg-brand-sun text-[var(--brand-on-sun)] font-extrabold px-[30px] py-[18px] text-[17px] shadow-[0_6px_0_var(--brand-ink)] transition-transform duration-200 hover:-translate-y-[3px] active:translate-y-[3px] active:shadow-[0_2px_0_var(--brand-ink)]",
pillOutline: "rounded-full border-2 border-white text-white font-bold px-7 py-4 text-[17px] bg-transparent hover:bg-white/10",
pillPrimary: "rounded-full bg-brand-primary text-white font-extrabold px-[26px] py-4 text-base",
```
Minimum touch target 44px on all buttons.

### 5.2 Chip (selectable) — used by ToggleGroup items

Unselected: `bg-muted text-foreground`. Selected (`data-[state=on]`): `bg-brand-contrast text-brand-on-contrast`. Pill radius for text chips, `rounded-[14px]` for grid chips. `active:scale-[.94]` transition 200ms.

### 5.3 Homepage section order (desktop 1280px reference)

1. **Nav** — `px-12 py-[22px]`, flex space-between.
   Left: logo mark + wordmark "Barton's Grooming." (Bricolage 800 24px, tracking -0.03em, primary full stop). Centre: Services, Prices, Gallery, About (Figtree 600 15px, gap 32px). Right: ThemeSwitcher, phone "01632 960 412" (600 14px), `Button variant="pill"` "Book a groom". Below 900px: links collapse into a shadcn `Sheet`.

2. **Hero** — `mx-6 rounded-[32px] bg-brand-primary text-white px-14 pt-[72px] pb-20 min-h-[520px] relative overflow-hidden grid grid-cols-[1.15fr_1fr] gap-10`. Stacks to one column under 900px.
   - `<Bubbles />` absolutely fills the hero behind content (§6.1).
   - Left column (flex col, gap 28px, vertically centred):
     - Chip: `bg-brand-sun text-[--brand-on-sun] rounded-full px-3.5 py-2 font-bold text-sm` with 8px ink dot + "Now booking — 3 slots left this week".
     - H1 `display-xl`: "Leave<br/>looking<br/><RotatingWord/>" — rotating word in `--brand-sun` (§6.2).
     - Sub `body-l`, max-width 460px, opacity .95.
     - Buttons: `pillSun` "Book a groom →", `pillOutline` "See prices". Gap 12px.
   - Right column (centred):
     - **Blob photo frame** 440×440 with morphing border-radius (§6.3), 3px `rgb(255 255 255/.6)` border, `<img object-cover>` inside (placeholder until real photo).
     - **Spinning badge** 150px circle, `bg-brand-pop`, absolutely bottom-right (`right:-6px; bottom:10px`), circular text "FRESH PUP GUARANTEE ✦ " ×2 rotating, centre "5★" (§6.4).
     - **Floating status chip** top-left (`left:0; top:30px`), white bg, ink text, `rounded-2xl px-4 py-3 font-bold text-sm`, shadow, text "Bath done · Bella, 2:40pm" with a lucide `Bath` icon (§6.5). In dark mode use `bg-brand-surface text-foreground`.

3. **Ticker band** — overlaps the hero bottom by 18px (`-mt-[18px]`), rotated `-1.5deg`, `bg-brand-contrast text-brand-sun` (dark mode: `bg-brand-sun text-[--brand-on-sun]`), `py-[18px]`. Items: "Bath & Blow-dry, Breed Cuts, Nail Trims, Teeth Brushing, Puppy Intros, De-shedding" separated by `✦` in `--brand-pop`. Bricolage 800 30px. Infinite marquee (§6.6). The band is slightly wider than the viewport (`-mx-4`) so the rotated edges never show a gap.

4. **Services — "Pick a pamper."** — `px-12 pt-24 pb-10`. Header row: title left (`display-l`, max 640px), sub right (`body`, max 340px, opacity .75), aligned to bottom.
   4-column grid (2 cols < 1024px, 1 col < 640px), gap 18px. Each card (`Card`, `rounded-[26px] p-6 min-h-[300px] flex flex-col gap-3.5`):
   - mono number "01"–"04" (opacity .8), name (`display-s`), description (15px/1.5, flex-1), footer row: "from £28" (`price`) + 44px circle arrow button (inverse colours).
   - Card colours rotate: **1 = sun bg / on-sun text**, **2 = contrast bg / on-contrast text**, **3 = pop bg / on-pop text**, **4 = surface bg / foreground text**.
   - Data:

     | # | Name | From | Description |
     |---|---|---|---|
     | 01 | Bath & Blow-dry | £28 | Warm bath, deep condition, fluff dry and a brush-out. |
     | 02 | Full Groom | £42 | Everything in the bath plus a breed-standard or custom cut. |
     | 03 | Hand Strip | £55 | Traditional coat care for terriers and wire-haired breeds. |
     | 04 | Puppy Intro | £30 | A short, gentle first visit to get used to the tub and dryer. |
   - Hover spring (§6.7).

5. **Before/After** — `px-12 py-[60px] grid grid-cols-[1fr_1.25fr] gap-12 items-center`.
   Left: eyebrow (mono 13px, primary colour), title, sub, `ToggleGroup` of dogs Bella / Murphy / Pip. Right: `<BeforeAfter />` 420px tall, `rounded-[28px]` (§6.9). Corner badges: "Before" (contrast bg) top-left, "After" (sun bg) top-right.

6. **Price estimator — "How much for my pup?"** — `mx-6 mt-10 rounded-[32px] bg-brand-pop text-[--brand-on-pop] p-14 grid grid-cols-2 gap-12`.
   Left: title + sub. Right: inner `Card` (`rounded-3xl p-7 bg-brand-surface text-foreground`, flex col gap 20px):
   - "SIZE" eyebrow + 4-col ToggleGroup: Small / Medium / Large / XL, each with a dog icon that grows in size (22/30/38/46px) — use a lucide `Dog` icon at those sizes.
   - "GROOM" eyebrow + wrapping ToggleGroup of the 4 services.
   - Footer (top border `2px dashed var(--border)`, pt 18px): animated price `£NN` (`price` 52px, §6.10) + `pillPrimary` "Book this →" linking to `/book?service=…&size=…`.
   - Pricing: `round(base × multiplier)`, base = service "from" price, multiplier Small .8, Medium 1, Large 1.3, XL 1.6.

7. **Footer** — `px-12 pt-10 pb-9 flex justify-between items-end`. Left: "Barton's" `display-footer` in primary. Right: address + email, right-aligned, 14px, opacity .75.

### 5.4 Booking flow (`/book`, mobile-first, max-width 440px centred on desktop)

Layout (from mockup 1c): status-bar-safe padding; header row with 44px round back button (surface bg, subtle shadow), centred wordmark, "N/3" mono counter. Under it a 10px-tall `Progress` (track `bg-muted`, indicator primary) animated with the spring easing (§6.11). Body: `display-m` step title, step content, gap 18px. Sticky bottom CTA: full-width pill, `bg-brand-contrast text-brand-on-contrast`, 20px padding, `shadow-[0_6px_0_var(--brand-primary)]`, `active:translate-y-1`.

| Step | Title | Content | CTA |
|---|---|---|---|
| 1 | Pick a pamper | `RadioGroup` of 4 services as 20px-radius rows, name left / "£price" right, 17px bold. Selected row = primary bg, white text; others surface bg. | Choose a time → |
| 2 | When suits you? | 4-col day chips (dow 12px + date Bricolage 800 24px) then 2-col time chips (8:30am, 10:00am, 11:30am, 1:00pm, 2:30pm, 4:00pm). Selected = contrast. | Confirm booking |
| 3 | You're booked! | Primary-filled confirmation card (`rounded-[28px] p-6`) with 96px round pet photo, service name (Bricolage 800 28px), "Tue 28 Oct · 11:30am", "£42" (34px). Card enters with `popIn` (§6.2 keyframes). Below: "We'll text you when your dog is ready to collect." + sonner toast. | Start again |

Step transitions: content slides in from the right (`translateX(24px)→0`, opacity 0→1, 300ms) going forward, from the left going back.

---

## 6. Animations — exact specs & reference code

All keyframes live in `src/styles/animations.css` (imported once). **Every animation must be disabled or reduced under `prefers-reduced-motion: reduce`** (§6.12).

```css
@keyframes rise   { 0%{transform:translateY(0) scale(.6);opacity:0} 10%{opacity:.9} 100%{transform:translateY(-640px) scale(1.15);opacity:0} }
@keyframes spin   { to{transform:rotate(360deg)} }
@keyframes marquee{ to{transform:translateX(-50%)} }
@keyframes popIn  { 0%{transform:translateY(60%) rotate(-6deg);opacity:0} 60%{transform:translateY(-8%) rotate(2deg);opacity:1} 100%{transform:none} }
@keyframes wiggle { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-4deg)} 75%{transform:rotate(4deg)} }
@keyframes floaty { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-14px) rotate(3deg)} }
@keyframes blob   { 0%,100%{border-radius:58% 42% 55% 45%/50% 58% 42% 50%} 50%{border-radius:42% 58% 45% 55%/58% 44% 56% 42%} }
```

Shared easing tokens:
- `--ease-spring: cubic-bezier(.3,1.6,.5,1)` (card hover — overshoots)
- `--ease-pop: cubic-bezier(.3,1.4,.5,1)` (rotating word, progress bar)
- `--ease-out-cubic`: JS `1 - (1-k)^3` (price count-up)

### 6.1 Rising bath bubbles (hero) — KEEP EXACTLY

22 bubbles, generated **once** (memoised, so re-renders and theme changes never reshuffle them). Each bubble:
- size: random 14–60px (`14 + rand*46`)
- `left`: random 0–100%, `bottom: -60px`
- `border: 2px solid rgb(255 255 255 / .55)`
- `background: radial-gradient(circle at 30% 30%, rgb(255 255 255/.55), rgb(255 255 255/.05) 60%)` — the off-centre highlight is what makes them read as soap bubbles
- `animation: rise {7–15s} linear {negative 0–12s delay} infinite` — the **negative delay** means bubbles are already mid-flight on first paint (no empty hero on load)
- container: `absolute inset-0 pointer-events-none`, `aria-hidden`, z-index below hero content

```tsx
// src/components/hero/Bubbles.tsx
import { useMemo } from "react";

export function Bubbles({ count = 22 }: { count?: number }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = 14 + Math.random() * 46;
        return {
          id: i,
          size,
          left: Math.random() * 100,
          duration: 7 + Math.random() * 8,
          delay: -Math.random() * 12,
        };
      }),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 motion-reduce:hidden">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="absolute rounded-full"
          style={{
            bottom: -60,
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            border: "2px solid rgb(255 255 255 / .55)",
            background: "radial-gradient(circle at 30% 30%, rgb(255 255 255 / .55), rgb(255 255 255 / .05) 60%)",
            animation: `rise ${b.duration}s linear ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
```
For SSR (Next.js) generate the random values in a `useEffect` or with a seeded PRNG to avoid hydration mismatch. On mobile (<640px) use `count={12}`. The rise distance (640px) should exceed the hero height; if the hero is taller, increase it.

### 6.2 Rotating headline word

Cycles "fluffy." → "fresh." → "fancy." → "adorable." every **2200ms**. Re-keying the span restarts `popIn .55s var(--ease-pop)` — the word springs up from below with a slight tilt.

```tsx
const WORDS = ["fluffy.", "fresh.", "fancy.", "adorable."];
export function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2200); return () => clearInterval(t); }, []);
  return (
    <span className="relative inline-block">
      <span className="sr-only">fluffy, fresh, fancy and adorable.</span>
      <span key={i} aria-hidden className="inline-block text-brand-sun" style={{ animation: "popIn .55s cubic-bezier(.3,1.4,.5,1)" }}>
        {WORDS[i]}
      </span>
    </span>
  );
}
```
Reserve width so the line doesn't jump: wrap in an inline-grid where all words are stacked invisibly (`[grid-area:1/1] invisible`) and the active one visible, or set `min-width` to the widest word.

### 6.3 Morphing blob photo frame

440×440 element, `animation: blob 9s ease-in-out infinite`, `overflow-hidden`, image `object-cover`. Placeholder (until photos arrive): `repeating-linear-gradient(135deg, rgb(255 255 255/.28) 0 10px, rgb(255 255 255/.14) 10px 20px)`. Scale to `min(440px, 80vw)` on small screens.

### 6.4 Spinning "Fresh Pup Guarantee" badge

150px circle, `bg-brand-pop`. Inside, an absolutely-positioned 150px SVG with circular text spins `spin 14s linear infinite`; the centre "5★" (Bricolage 800 30px, white) stays still.

```tsx
<div className="absolute -right-1.5 bottom-2.5 grid size-[150px] place-items-center rounded-full bg-brand-pop">
  <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-[spin_14s_linear_infinite]" aria-hidden>
    <defs><path id="badge-circle" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" /></defs>
    <text fill="#fff" className="font-display" style={{ fontWeight: 700, fontSize: 17, letterSpacing: 3 }}>
      <textPath href="#badge-circle">FRESH PUP GUARANTEE ✦ FRESH PUP GUARANTEE ✦ </textPath>
    </text>
  </svg>
  <span className="font-display text-[30px] font-extrabold text-white">5★</span>
</div>
```
Use `useId()` for the path id if the badge renders more than once.

### 6.5 Floating status chip

`animation: floaty 5s ease-in-out infinite` (bobs 14px and tilts ±3°). Optional enhancement: cycle through 3 recent messages every 6s ("Bath done · Bella, 2:40pm", "Fresh cut · Murphy, 3:15pm", "Nails trimmed · Pip, 3:50pm") with a crossfade.

### 6.6 Marquee ticker — how it works (KEEP EXACTLY)

The trick to a seamless loop: render the item list **twice** in a single `width: max-content` flex row and animate `translateX(0 → -50%)`. When the first copy has scrolled fully out, the second copy is in exactly the position the first started, so the loop restarts invisibly.

```tsx
// src/components/Ticker.tsx
const ITEMS = ["Bath & Blow-dry", "Breed Cuts", "Nail Trims", "Teeth Brushing", "Puppy Intros", "De-shedding"];

export function Ticker() {
  const row = [...ITEMS, ...ITEMS]; // duplicate = seamless loop
  return (
    <div className="relative -mx-4 -mt-[18px] -rotate-[1.5deg] overflow-hidden bg-brand-contrast py-[18px] text-brand-sun dark:bg-brand-sun dark:text-[var(--brand-on-sun)]">
      <ul className="flex w-max animate-[marquee_22s_linear_infinite] whitespace-nowrap font-display text-[30px] font-extrabold tracking-[-0.02em] hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row.map((t, i) => (
          <li key={i} className="flex items-center" aria-hidden={i >= ITEMS.length}>
            <span className="px-[22px]">{t}</span>
            <span className="text-brand-pop">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```
Rules: speed 22s per half-loop; each item has 22px horizontal padding followed by a ✦ separator; the band sits **on top of** the hero's bottom edge (negative margin + `relative z-10`) and is rotated -1.5°; pause on hover; second copy is `aria-hidden`. If one copy of the items is narrower than the viewport, repeat the base list until it isn't (e.g. `[...ITEMS, ...ITEMS]` as the base, then duplicate).

### 6.7 Springy service cards

`transition: transform .3s cubic-bezier(.3,1.6,.5,1)`; hover → `translateY(-10px) rotate(-2deg)`. Also apply on `:focus-visible` (cards are links). The overshoot easing is essential — without it the effect feels flat.

### 6.8 Logo wiggle & nav CTA

Logo mark: `animation: wiggle 2.4s ease-in-out infinite`. Nav "Book a groom" hover: `rotate(-3deg) scale(1.06)`, 200ms.

### 6.9 Before/after drag slider

- Container `relative h-[420px] rounded-[28px] overflow-hidden cursor-ew-resize select-none touch-none`.
- "After" image fills the container. "Before" image is layered on top with `clip-path: inset(0 {100-pos}% 0 0)`.
- Handle: 4px white vertical line at `left: pos%` + 56px circle (primary fill, 4px white border, lucide `MoveHorizontal` icon).
- Start at 50%. Pointer events with `setPointerCapture` so dragging continues outside the box. Keyboard: the handle is a `role="slider"` with `aria-valuenow`, ←/→ moves 5%, Home/End to 0/100.
- Changing dog in the ToggleGroup swaps the image pair and animates `pos` back to 50% (300ms).

```tsx
export function BeforeAfter({ before, after, alt }: { before: string; after: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const update = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div
      ref={ref}
      className="relative h-[420px] cursor-ew-resize select-none overflow-hidden rounded-[28px] touch-none"
      onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); update(e.clientX); }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
    >
      <img src={after} alt={`${alt} after grooming`} className="absolute inset-0 size-full object-cover" />
      <img src={before} alt={`${alt} before grooming`} className="absolute inset-0 size-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
      {/* badges */}
      <div
        role="slider" tabIndex={0} aria-label="Before and after comparison" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5)); if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5)); }}
        className="absolute inset-y-0 w-0 outline-none" style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-white" />
        <div className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-brand-primary text-white">↔</div>
      </div>
    </div>
  );
}
```

### 6.10 Price count-up

When size or service changes, animate from the current displayed number to the new price over **450ms** with ease-out-cubic via `requestAnimationFrame`. Use `font-variant-numeric: tabular-nums` so digits don't jitter. Announce the final value via an `aria-live="polite"` visually-hidden span.

```ts
export function useCountUp(target: number, duration = 450) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now(), a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      const v = Math.round(a + (target - a) * (1 - Math.pow(1 - k, 3)));
      setValue(v); from.current = v;
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}
```

### 6.11 Booking progress + confirmation

Progress indicator width = `(step/3)*100%`, `transition: width .5s cubic-bezier(.3,1.4,.5,1)` (slight overshoot). Override shadcn `Progress`'s default `transform` transition with this. Confirmation card enters with `popIn .6s`.

### 6.12 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
}
```
Additionally: hide `<Bubbles/>`, stop the marquee (show the list statically, allow horizontal scroll), stop `RotatingWord` interval (show "fluffy."), and make the count-up instant.

### 6.13 Optional enhancements (only if time allows; same visual language)

- Sections fade/slide up 24px on first scroll into view (IntersectionObserver, 500ms, once).
- Bubbles drift slightly toward the cursor (parallax, max 12px).
- Clicking the hero CTA bursts 8 bubbles from the button.

---

## 7. Imagery

All photos are client-supplied. Until then, use striped placeholders with a mono caption, e.g. `hero photo: freshly groomed dog`, `before photo: Bella the cockapoo`. Placeholder recipe:
- On colour: `repeating-linear-gradient(135deg, rgb(255 255 255/.28) 0 10px, rgb(255 255 255/.14) 10px 20px)`
- On paper (before/after): after `repeating-linear-gradient(45deg,#d9d3cc 0 12px,#cfc8c0 12px 24px)`, before `repeating-linear-gradient(45deg,#8a7a6a 0 12px,#7d6e5f 12px 24px)`
- Caption: JetBrains Mono 12px, white on `rgb(0 0 0/.6)`, 6px radius, `px-2.5 py-1.5`.

Required shots: hero dog (square, transparent-ish background ideal), 3 before/after pairs (same framing), 1 pet thumbnail for booking confirmation. Use `loading="lazy"` except hero; serve AVIF/WebP.

Do **not** use emoji in the final UI except the ★ and ✦ glyphs. Replace the mockup's 🛁 / 🐕 with lucide `Bath` / `Dog` icons.

---

## 8. File structure

```
src/
  main.tsx                 # ThemeProvider + Router
  index.css                # tokens (§4.1) + font import
  styles/animations.css    # keyframes (§6) + reduced motion
  lib/utils.ts             # shadcn cn()
  lib/pricing.ts           # services, size multipliers, calcPrice()
  data/content.ts          # copy, services, dogs, ticker items, times
  components/
    ui/…                   # shadcn generated
    theme-provider.tsx
    ThemeSwitcher.tsx
    SiteNav.tsx
    Logo.tsx
    hero/Hero.tsx
    hero/Bubbles.tsx
    hero/RotatingWord.tsx
    hero/BlobFrame.tsx
    hero/SpinningBadge.tsx
    hero/StatusChip.tsx
    Ticker.tsx
    ServiceCard.tsx
    ServicesSection.tsx
    BeforeAfter.tsx
    BeforeAfterSection.tsx
    PriceEstimator.tsx
    SiteFooter.tsx
    booking/BookingFlow.tsx
    booking/StepService.tsx
    booking/StepWhen.tsx
    booking/StepConfirm.tsx
  hooks/useCountUp.ts
  pages/Home.tsx
  pages/Book.tsx
  pages/Styleguide.tsx     # scheme gallery (mockup 1a)
```

Types:
```ts
export type Service = { id: "bath" | "full" | "strip" | "puppy"; name: string; from: number; description: string };
export type DogSize = "small" | "medium" | "large" | "xl";
export const SIZE_MULTIPLIER: Record<DogSize, number> = { small: 0.8, medium: 1, large: 1.3, xl: 1.6 };
export const calcPrice = (s: Service, z: DogSize) => Math.round(s.from * SIZE_MULTIPLIER[z]);
```

---

## 9. Responsive behaviour

| Breakpoint | Changes |
|---|---|
| ≥1280 | Reference layout exactly as specified |
| 1024–1279 | Same layout, fluid widths, gutters 40px |
| 768–1023 | Hero stacks (image under text, 360px blob); services 2-col; before/after stacks; estimator stacks; nav links → Sheet |
| <768 | Gutters 20px; colour blocks inset 12px with 24px radius; hero h1 `clamp(52px, 13vw, 72px)`; ticker 22px text; services 1-col; footer wordmark 72px, stacks |

---

## 10. Accessibility

- WCAG AA contrast for body text in all 8 theme combinations. Known pairs to check: white on Citrus primary `#FF6B1A` (passes only at large/bold sizes — hero copy is ≥20px so acceptable; keep small text off it) and ink on sun/pop accents (passes).
- All interactive chips are real buttons/radios via shadcn (Radix) with visible focus rings (`ring-2 ring-ring ring-offset-2`).
- Decorative animations `aria-hidden`. Marquee duplicate hidden from screen readers.
- Before/after slider keyboard-operable (§6.9).
- Theme preference persisted; respects `prefers-color-scheme` when mode = system.

---

## 11. Acceptance criteria

1. Default load shows **Electric Lagoon, light** (or dark if OS is dark and mode = system).
2. Switching scheme/mode updates every surface instantly with a 300ms colour fade; no hard-coded hex values in components (grep for `#` in `components/` returns only placeholder stripes).
3. Hero: bubbles visibly rising from first paint; headline word rotates every 2.2s with a pop; blob frame morphs; badge spins; status chip floats.
4. Ticker scrolls seamlessly with no visible jump at the loop point, tilted -1.5°, overlapping the hero edge, pauses on hover.
5. Service cards spring up and tilt on hover/focus with overshoot.
6. Before/after slider works with mouse, touch and keyboard.
7. Estimator price counts up/down on every change; prices match §5.3 formula.
8. Booking flow completes 3 steps with animated progress and confirmation pop.
9. `prefers-reduced-motion` disables all of the above motion.
10. Lighthouse: Performance ≥ 90, Accessibility ≥ 95 on the homepage.
11. Visually matches mockup `Bartons Grooming.dc.html` (options 1a/1b/1c) at 1280px and 390px.
