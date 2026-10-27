import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  DOG_COATS,
  type DogCoat,
  LETTERINGS,
  MODES,
  SCHEMES,
  THEME_DEFAULTS,
  type Lettering,
  type Mode,
  type Scheme,
} from "@/lib/theme";

export type { Lettering, Mode, Scheme };

type Ctx = {
  dogCoat: DogCoat;
  setDogCoat: (coat: DogCoat) => void;
  scheme: Scheme;
  mode: Mode;
  lettering: Lettering;
  /** the mode actually on screen once "system" is resolved */
  resolvedMode: "light" | "dark";
  setScheme: (s: Scheme) => void;
  setMode: (m: Mode) => void;
  setLettering: (l: Lettering) => void;
  reset: () => void;
};
const ThemeCtx = createContext<Ctx | null>(null);

function read<T extends string>(key: string, valid: readonly { id: T }[], fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return valid.some((o) => o.id === v) ? (v as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage blocked: the setting lasts this visit */
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dogCoat, setDogCoat] = useState<DogCoat>(() => read("bartons-dog-coat", DOG_COATS, "auto"));
  useEffect(() => write("bartons-dog-coat", dogCoat), [dogCoat]);
  const [scheme, setScheme] = useState<Scheme>(() => read("bartons-scheme", SCHEMES, THEME_DEFAULTS.scheme));
  const [mode, setMode] = useState<Mode>(() => read("bartons-mode", MODES, THEME_DEFAULTS.mode));
  const [lettering, setLettering] = useState<Lettering>(() =>
    read("bartons-font", LETTERINGS, THEME_DEFAULTS.lettering),
  );
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  useEffect(() => {
    document.documentElement.dataset.scheme = scheme;
    write("bartons-scheme", scheme);
  }, [scheme]);

  useEffect(() => {
    document.documentElement.dataset.font = lettering;
    write("bartons-font", lettering);
  }, [lettering]);

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = mode === "dark" || (mode === "system" && mq.matches);
      root.classList.toggle("dark", dark);
      setResolvedMode(dark ? "dark" : "light");
    };
    apply();
    write("bartons-mode", mode);
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [mode]);

  const reset = useCallback(() => {
    setDogCoat("auto");
    setScheme(THEME_DEFAULTS.scheme);
    setMode(THEME_DEFAULTS.mode);
    setLettering(THEME_DEFAULTS.lettering);
  }, []);

  const value = useMemo(
    () => ({ dogCoat, setDogCoat, scheme, mode, lettering, resolvedMode, setScheme, setMode, setLettering, reset }),
    [dogCoat, scheme, mode, lettering, resolvedMode, reset],
  );
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const c = useContext(ThemeCtx);
  if (!c) throw new Error("useTheme must be used inside ThemeProvider");
  return c;
};
