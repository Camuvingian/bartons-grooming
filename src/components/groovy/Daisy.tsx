import type { CSSProperties } from "react";

/** An eight-petal daisy. Petals take `petal`, the middle takes `center` (any CSS colour). */
export function Daisy({
  className,
  style,
  petal = "currentColor",
  center = "var(--brand-ink)",
  petals = 8,
  title,
  size,
}: {
  className?: string;
  style?: CSSProperties;
  petal?: string;
  center?: string;
  petals?: number;
  title?: string;
  /** explicit pixel size, needed when the daisy is nested inside another SVG */
  size?: number;
}) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}
      {Array.from({ length: petals }, (_, i) => (
        <ellipse key={i} cx="0" cy="-30" rx="13" ry="21" fill={petal} transform={`rotate(${(360 / petals) * i})`} />
      ))}
      <circle r="14" fill={center} />
    </svg>
  );
}
