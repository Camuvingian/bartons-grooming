/** The theme options offered in the settings menu: four 1960s colour grooves, light and dark, plus lettering presets. */
export type Scheme = "shagadelic" | "mod" | "flower" | "lava";
export type Mode = "light" | "dark" | "system";
export type Lettering = "shrikhand" | "righteous" | "bagel" | "bricolage";

/** swatch / dark: primary, sun, pop, zing */
export const SCHEMES: {
  id: Scheme;
  name: string;
  blurb: string;
  swatch: [string, string, string, string];
  dark: [string, string, string, string];
}[] = [
  {
    id: "shagadelic",
    name: "Shagadelic",
    blurb: "Hot pink, lime, tangerine and purple on cream. Swinging London, baby.",
    swatch: ["#F0168A", "#C8F53A", "#FF7A1A", "#7B2CE0"],
    dark: ["#FF4FA8", "#D6FF4F", "#FF8D3B", "#A56BFF"],
  },
  {
    id: "mod",
    name: "Mod Squad",
    blurb: "Tangerine, mustard and turquoise with chocolate ink. Scooters and targets.",
    swatch: ["#EE5A05", "#FFD23F", "#19C2B8", "#D81E5B"],
    dark: ["#FF7A2E", "#FFD95A", "#2FD8CE", "#FF4F7E"],
  },
  {
    id: "flower",
    name: "Flower Power",
    blurb: "Purple, daisy yellow and candy pink. Peace, love and a good blow-dry.",
    swatch: ["#6F2DD9", "#FFE14D", "#FF5CA8", "#39C97A"],
    dark: ["#9B6BFF", "#FFE866", "#FF7DBA", "#5BE89A"],
  },
  {
    id: "lava",
    name: "Lava Lamp",
    blurb: "Deep teal, gold and molten orange with a lime zing. Slow, warm and glowing.",
    swatch: ["#0C8686", "#FFC93C", "#FF5A36", "#C6F542"],
    dark: ["#2FC9C4", "#FFD24A", "#FF6B47", "#D4FF57"],
  },
];

export const MODES: { id: Mode; name: string }[] = [
  { id: "light", name: "Light" },
  { id: "dark", name: "Dark" },
  { id: "system", name: "System" },
];

export const LETTERINGS: { id: Lettering; name: string; display: string; body: string }[] = [
  { id: "shrikhand", name: "Groovy", display: "Shrikhand", body: "Outfit" },
  { id: "righteous", name: "Mod", display: "Righteous", body: "Poppins" },
  { id: "bagel", name: "Bubbly", display: "Bagel Fat One", body: "Nunito" },
  { id: "bricolage", name: "Classic", display: "Bricolage Grotesque", body: "Figtree" },
];

export const THEME_DEFAULTS = {
  scheme: "shagadelic" as Scheme,
  mode: "light" as Mode,
  lettering: "shrikhand" as Lettering,
};

export type DogCoat = "auto" | "black-tan" | "chestnut";
export const DOG_COATS: { id: DogCoat; name: string }[] = [
  { id: "auto", name: "Match theme" },
  { id: "black-tan", name: "Black & tan" },
  { id: "chestnut", name: "Chestnut & white" },
];
/** "Match theme" picks the chestnut setter after dark and the black and tan one by day. */
export function setterAsset(coat: DogCoat, _scheme: Scheme, mode: "light" | "dark") {
  const chestnut = coat === "chestnut" || (coat === "auto" && mode === "dark");
  return chestnut ? "/images/setter-chestnut-upright.png" : "/images/setter-black-tan-upright.png";
}
