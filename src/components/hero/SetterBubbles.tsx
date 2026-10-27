import { useTheme } from "@/components/theme-provider";
import { setterAsset } from "@/lib/theme";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Bubble = { x: number; y: number; r: number; speed: number; phase: number; pop: number; impact: number };

/** Collision uses the alpha silhouette of the very same asset rendered by StudioDog. */
export function SetterBubbles() {
  const { dogCoat, scheme, resolvedMode } = useTheme();
  const src = setterAsset(dogCoat, scheme, resolvedMode);
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.height = 440 * ratio;
    ctx.scale(ratio, ratio);
    const silhouette = new Float32Array(440).fill(430);
    const source = new Image();
    let disposed = false;
    source.onload = () => {
      if (disposed) return;
      const mask = document.createElement("canvas");
      mask.width = mask.height = 440;
      const m = mask.getContext("2d", { willReadFrequently: true });
      if (!m) return;
      m.drawImage(source, 0, 0, 440, 440);
      const pixels = m.getImageData(0, 0, 440, 440).data;
      for (let x = 0; x < 440; x++) {
        for (let y = 0; y < 440; y++) {
          if ((pixels[(y * 440 + x) * 4 + 3] ?? 0) > 150) {
            silhouette[x] = y;
            break;
          }
        }
      }
      // Start at staggered points in the shower rather than leaving an empty first frame.
      bubbles.forEach((bubble, i) => {
        const floor = silhouette[Math.round(bubble.x)] ?? 430;
        bubble.y = -25 + Math.max(0, floor - bubble.r + 25) * ((i * 0.37) % 1);
      });
    };
    source.src = src;
    const bubbles: Bubble[] = Array.from({ length: 13 }, (_, i) => ({
      x: 34 + ((i * 83) % 365),
      y: -20 - i * 31,
      r: 7 + ((i * 7) % 16),
      speed: 22 + (i % 4) * 7,
      phase: i * 1.7,
      pop: -1,
      impact: 0,
    }));
    let frame = 0,
      previous = 0,
      clock = 0;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
    });
    observer.observe(canvas);
    const tick = (now: number) => {
      const dt = previous ? Math.min((now - previous) / 1000, 0.04) : 0;
      previous = now;
      if (!visible || document.hidden) {
        frame = requestAnimationFrame(tick);
        return;
      }
      clock += dt;
      ctx.clearRect(0, 0, 440, 440);
      for (const b of bubbles) {
        const x = b.x + Math.sin(clock * 0.9 + b.phase) * 9;
        if (b.pop >= 0) {
          b.pop += dt;
          const p = b.pop / 0.45;
          ctx.globalAlpha = Math.max(0, 1 - p) * 0.75;
          ctx.strokeStyle = "#b8868f";
          ctx.lineWidth = 1.2;
          for (let j = 0; j < 7; j++) {
            const a = (j * Math.PI * 2) / 7;
            const d = b.r * (1 + p * 1.1);
            ctx.beginPath();
            ctx.moveTo(x + Math.cos(a) * d, b.impact + Math.sin(a) * d);
            ctx.lineTo(x + Math.cos(a) * (d + 3), b.impact + Math.sin(a) * (d + 3));
            ctx.stroke();
          }
          if (p >= 1) {
            b.pop = -1;
            b.y = -30 - (b.phase % 3) * 30;
          }
          continue;
        }
        b.y += b.speed * dt;
        // Sample the underside of the bubble against the opaque fur boundary.
        let landing = 430;
        for (let dx = -b.r * 0.65; dx <= b.r * 0.65; dx += 3) {
          const column = Math.max(0, Math.min(439, Math.round(x + dx)));
          landing = Math.min(landing, (silhouette[column] ?? 430) - Math.sqrt(b.r * b.r - dx * dx));
        }
        if (b.y >= landing) {
          b.y = landing;
          b.impact = landing;
          b.pop = 0;
        }
        ctx.globalAlpha = 0.88;
        const fill = ctx.createRadialGradient(x - b.r * 0.35, b.y - b.r * 0.4, 0, x, b.y, b.r);
        fill.addColorStop(0, "#ffffffa0");
        fill.addColorStop(0.36, "#ffffff18");
        fill.addColorStop(0.8, "#bce5e51b");
        fill.addColorStop(1, "#d9a2cf75");
        ctx.fillStyle = fill;
        ctx.strokeStyle = "#9abdcba0";
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = "#ffffffec";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.arc(x, b.y, b.r * 0.72, Math.PI * 1.12, Math.PI * 1.53);
        ctx.stroke();
        ctx.fillStyle = "#ffffffb0";
        ctx.beginPath();
        ctx.arc(x + b.r * 0.38, b.y + b.r * 0.45, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      source.onload = null;
    };
  }, [reduced, src]);
  return reduced ? null : <canvas ref={ref} className="setter-bubbles" aria-hidden="true" />;
}
