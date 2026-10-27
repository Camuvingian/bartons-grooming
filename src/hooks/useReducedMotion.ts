import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const get = () => window.matchMedia(QUERY).matches;

/** True when the visitor has asked for reduced motion; updates live. */
export const useReducedMotion = () => useSyncExternalStore(subscribe, get, () => false);
