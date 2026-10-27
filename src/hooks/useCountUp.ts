import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/** Eases the displayed number from its current value to `target` over `duration` ms (ease-out-cubic). */
export function useCountUp(target: number, duration = 450) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) {
      from.current = target;
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      const v = Math.round(a + (target - a) * (1 - Math.pow(1 - k, 3)));
      setValue(v);
      from.current = v;
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduced]);
  return reduced ? target : value;
}
