export type ServiceId = "bath" | "full" | "strip" | "puppy";
export type Service = { id: ServiceId; name: string; from: number; description: string };
export type DogSize = "small" | "medium" | "large" | "xl";

export const SERVICES: Service[] = [
  {
    id: "bath",
    name: "Bath & Blow-dry",
    from: 28,
    description: "Warm bath, deep condition, fluff dry and a brush-out.",
  },
  {
    id: "full",
    name: "Full Groom",
    from: 42,
    description: "Everything in the bath plus a breed-standard or custom cut.",
  },
  {
    id: "strip",
    name: "Hand Strip",
    from: 55,
    description: "Traditional coat care for terriers and wire-haired breeds.",
  },
  {
    id: "puppy",
    name: "Puppy Intro",
    from: 30,
    description: "A short, gentle first visit to get used to the tub and dryer.",
  },
];

export const SIZES: { id: DogSize; label: string; icon: number }[] = [
  { id: "small", label: "Small", icon: 22 },
  { id: "medium", label: "Medium", icon: 30 },
  { id: "large", label: "Large", icon: 38 },
  { id: "xl", label: "XL", icon: 46 },
];

export const SIZE_MULTIPLIER: Record<DogSize, number> = { small: 0.8, medium: 1, large: 1.3, xl: 1.6 };

export const calcPrice = (s: Service, z: DogSize) => Math.round(s.from * SIZE_MULTIPLIER[z]);

export const isServiceId = (v: unknown): v is ServiceId => SERVICES.some((s) => s.id === v);
export const isDogSize = (v: unknown): v is DogSize => SIZES.some((s) => s.id === v);
export const findService = (id: ServiceId): Service => SERVICES.find((s) => s.id === id) ?? SERVICES[0]!;
