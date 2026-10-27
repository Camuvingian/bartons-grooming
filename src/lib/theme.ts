/** The theme options offered in the settings menu (§3.2, §3.3) and the lettering presets. */
export type Scheme = "lagoon" | "bubblegum" | "citrus" | "berry";
export type Mode = "light" | "dark" | "system";
export type Lettering = "bricolage" | "fredoka" | "unbounded" | "syne";

export const SCHEMES: {
  id: Scheme;
  name: string;
  blurb: string;
  swatch: [string, string, string, string];
  dark: [string, string, string, string];
}[] = [
  {
    id: "lagoon",
    name: "Electric Lagoon",
    blurb: "Cobalt, mint and coral. Bright as a bath on a sunny morning.",
    swatch: ["#3D5AFE", "#2EF2D0", "#FF6F5E", "#0D1333"],
    dark: ["#5C76FF", "#2EF2D0", "#FF7A6B", "#080C24"],
  },
  {
    id: "bubblegum",
    name: "Bubblegum Pop",
    blurb: "Hot pink, butter yellow and teal. Loud, sweet and a bit cheeky.",
    swatch: ["#FF3D8B", "#FFD23F", "#00C2A8", "#1B1035"],
    dark: ["#FF5A9E", "#FFD84F", "#14D4B9", "#120A26"],
  },
  {
    id: "citrus",
    name: "Citrus Splash",
    blurb: "Orange, lime and sky blue. Zesty and wide awake.",
    swatch: ["#FF6B1A", "#C6F432", "#2EB8FF", "#14213D"],
    dark: ["#FF7F38", "#CCF54A", "#4CC3FF", "#0B1326"],
  },
  {
    id: "berry",
    name: "Berry Sherbet",
    blurb: "Violet, mango and mint. Soft fizz with a dark plum night mode.",
    swatch: ["#8B3DFF", "#FFB627", "#3EE8A6", "#1E0B3A"],
    dark: ["#9D5CFF", "#FFBE3D", "#4FF0B2", "#120723"],
  },
];

export const MODES: { id: Mode; name: string }[] = [
  { id: "light", name: "Light" },
  { id: "dark", name: "Dark" },
  { id: "system", name: "System" },
];

export const LETTERINGS: { id: Lettering; name: string; display: string; body: string }[] = [
  { id: "bricolage", name: "Bricolage", display: "Bricolage Grotesque", body: "Figtree" },
  { id: "fredoka", name: "Bubbly", display: "Fredoka", body: "Nunito" },
  { id: "unbounded", name: "Chunky", display: "Unbounded", body: "DM Sans" },
  { id: "syne", name: "Funky", display: "Syne", body: "Outfit" },
];

export const THEME_DEFAULTS = {
  scheme: "lagoon" as Scheme,
  mode: "system" as Mode,
  lettering: "bricolage" as Lettering,
};
