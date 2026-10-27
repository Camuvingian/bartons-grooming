import { useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { Photo } from "@/components/Photo";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Drag-to-compare slider (§6.9). The "after" photo fills the box; "before" sits on top,
 * clipped to the handle. Works with pointer (captured, so dragging continues outside),
 * touch and keyboard (arrows 5%, Home/End). Changing the pair eases back to 50%.
 */
export function BeforeAfter({
  before,
  after,
  alt,
  pairKey,
}: {
  before: string;
  after: string;
  alt: string;
  pairKey: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [settling, setSettling] = useState(false);
  const [seenKey, setSeenKey] = useState(pairKey);
  const dragging = useRef(false);
  const reduced = useReducedMotion();

  // new dog: ease the handle back to the middle (state adjusted during render, then the flag clears)
  if (pairKey !== seenKey) {
    setSeenKey(pairKey);
    setPos(50);
    setSettling(true);
  }
  useEffect(() => {
    if (!settling) return;
    const t = setTimeout(() => setSettling(false), 320);
    return () => clearTimeout(t);
  }, [settling]);

  const update = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  const transition = settling && !reduced ? "left .3s ease-out, clip-path .3s ease-out" : undefined;

  return (
    <div
      ref={ref}
      className="sticker relative h-[320px] cursor-ew-resize select-none overflow-hidden rounded-[28px] touch-none [--sticker-offset:8px] min-[768px]:h-[420px]"
      onPointerDown={(e) => {
        dragging.current = true;
        setSettling(false);
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Photo
        src={after}
        alt={`${alt} after grooming`}
        caption={`after photo: ${alt}`}
        tone="after"
        className="absolute inset-0"
      />
      <Photo
        src={before}
        alt={`${alt} before grooming`}
        caption={`before photo: ${alt}`}
        tone="before"
        className="absolute inset-0"
        // the same photo, scruffed up: the mock has no true "before" shots yet
        imgStyle={{ filter: "sepia(.45) saturate(.55) contrast(.82) brightness(.85) blur(1.2px)" }}
        imgClassName="scale-[1.03]"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)`, transition }}
        aria-hidden
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)`, transition }} aria-hidden>
        <Photo src={after} alt="" caption={`after photo: ${alt}`} tone="after" className="absolute inset-0" />
      </div>

      <span className="theme-fade eyebrow absolute left-4 top-4 rounded-full border-2 border-brand-ink bg-brand-pop px-3 py-1.5 text-brand-on-pop">
        Before
      </span>
      <span className="theme-fade eyebrow absolute right-4 top-4 rounded-full border-2 border-brand-ink bg-brand-sun px-3 py-1.5 text-brand-on-sun">
        After
      </span>

      <div
        role="slider"
        tabIndex={0}
        aria-label="Before and after comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
          if (e.key === "Home") setPos(0);
          if (e.key === "End") setPos(100);
        }}
        className="group absolute inset-y-0 w-0 outline-none"
        style={{ left: `${pos}%`, transition }}
      >
        <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-brand-sun" />
        <div className="theme-fade absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-brand-ink bg-brand-sun text-brand-ink shadow-[3px_3px_0_var(--brand-ink)] group-focus-visible:ring-4 group-focus-visible:ring-brand-primary">
          <MoveHorizontal className="size-6" aria-hidden />
        </div>
      </div>
    </div>
  );
}
