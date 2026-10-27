/** A sticker-edge starburst polygon filling its box. */
export function Starburst({
  points = 18,
  fill = "currentColor",
  stroke,
  className,
}: {
  points?: number;
  fill?: string;
  stroke?: string;
  className?: string;
}) {
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? 50 : 42;
    const a = (Math.PI * i) / points - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return (
    <svg viewBox="-3 -3 106 106" className={className} aria-hidden>
      <polygon points={pts.join(" ")} fill={fill} stroke={stroke} strokeWidth={stroke ? 3 : 0} strokeLinejoin="round" />
    </svg>
  );
}
