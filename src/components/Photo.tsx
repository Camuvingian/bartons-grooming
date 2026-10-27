import { useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Tone = "colour" | "after" | "before";

const STRIPES: Record<Tone, string> = {
  colour: "repeating-linear-gradient(135deg, rgb(255 255 255 / .28) 0 10px, rgb(255 255 255 / .14) 10px 20px)",
  after: "repeating-linear-gradient(45deg, #d9d3cc 0 12px, #cfc8c0 12px 24px)",
  before: "repeating-linear-gradient(45deg, #8a7a6a 0 12px, #7d6e5f 12px 24px)",
};

/**
 * A photo that falls back to the brief's striped placeholder (with a mono caption)
 * when there is no source yet or the file fails to load (§7).
 */
export function Photo({
  src,
  alt,
  caption,
  tone = "colour",
  className,
  imgClassName,
  imgStyle,
  loading = "lazy",
}: {
  src?: string;
  alt: string;
  caption: string;
  tone?: Tone;
  className?: string;
  imgClassName?: string;
  imgStyle?: CSSProperties;
  loading?: "lazy" | "eager";
}) {
  const [failed, setFailed] = useState(false);
  const placeholder = !src || failed;
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={placeholder ? { background: STRIPES[tone] } : undefined}
    >
      {!placeholder && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onError={() => setFailed(true)}
          className={cn("absolute inset-0 size-full object-cover", imgClassName)}
          style={imgStyle}
        />
      )}
      {placeholder && (
        <span
          role="img"
          aria-label={alt}
          className="absolute bottom-3 left-3 rounded-[6px] bg-black/60 px-2.5 py-1.5 font-mono text-[12px] text-white"
        >
          {caption}
        </span>
      )}
    </div>
  );
}
