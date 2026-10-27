import { Daisy } from "@/components/groovy/Daisy";
import { AREA, PLACES, THAMES } from "@/data/content";

const SIZE = 640;
const C = SIZE / 2;
const PX_PER_MILE = 17;
const px = (dx: number, dy: number) => [C + dx * PX_PER_MILE, C - dy * PX_PER_MILE] as const;

/** A smooth path through points, using mid-point quadratic curves so it reads as hand-drawn. */
function smooth(points: [number, number][]) {
  const p = points.map(([x, y]) => px(x, y));
  if (p.length < 2) return "";
  let d = `M${p[0]![0]},${p[0]![1]}`;
  for (let i = 1; i < p.length - 1; i++) {
    const [x0, y0] = p[i]!;
    const [x1, y1] = p[i + 1]!;
    d += ` Q${x0},${y0} ${(x0 + x1) / 2},${(y0 + y1) / 2}`;
  }
  const last = p[p.length - 1]!;
  d += ` T${last[0]},${last[1]}`;
  return d;
}

/**
 * The sketched coverage map: cream paper, the Thames in primary, dashed 5 / 10 / 15 mile rings,
 * a slowly sweeping radar wedge, and towns as dots. Everything is positioned in miles from SW15.
 */
export function AreaMap() {
  const r15 = AREA.radiusMiles * PX_PER_MILE;
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="area-map"
      role="img"
      aria-label={`Map of the area covered: ${AREA.radiusMiles} miles around ${AREA.centre.name}, ${AREA.centre.label}`}
    >
      <defs>
        {/* a touch of wobble so the lines look drawn, not plotted */}
        <filter id="sketch" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <clipPath id="map-clip">
          <circle cx={C} cy={C} r={r15 + 28} />
        </clipPath>
      </defs>

      <circle cx={C} cy={C} r={r15 + 28} fill="var(--brand-surface)" stroke="var(--brand-line)" strokeWidth="3" />

      <g clipPath="url(#map-clip)" filter="url(#sketch)">
        {/* the Thames */}
        <path
          d={smooth(THAMES)}
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.22"
        />
        <path
          d={smooth(THAMES)}
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* rings */}
        {[5, 10, 15].map((m) => (
          <circle
            key={m}
            cx={C}
            cy={C}
            r={m * PX_PER_MILE}
            fill="none"
            stroke="var(--brand-line)"
            strokeWidth={m === 15 ? 3 : 2}
            strokeDasharray={m === 15 ? "0" : "6 8"}
            strokeLinecap="round"
            opacity={m === 15 ? 1 : 0.55}
          />
        ))}
      </g>

      {/* the radar sweep: a wedge that turns once every 14s */}
      <g className="area-sweep" style={{ transformOrigin: `${C}px ${C}px` }} aria-hidden>
        <path
          d={`M${C},${C} L${C + r15},${C} A${r15},${r15} 0 0,1 ${C + r15 * Math.cos(Math.PI / 5)},${C + r15 * Math.sin(Math.PI / 5)} Z`}
          fill="var(--brand-sun)"
          opacity="0.35"
        />
        <line x1={C} y1={C} x2={C + r15} y2={C} stroke="var(--brand-sun)" strokeWidth="3" />
      </g>
      <circle
        className="area-pulse"
        cx={C}
        cy={C}
        r={r15}
        fill="none"
        stroke="var(--brand-pop)"
        strokeWidth="3"
        style={{ transformOrigin: `${C}px ${C}px` }}
        aria-hidden
      />

      {/* ring labels */}
      {[5, 10, 15].map((m) => (
        <text key={m} x={C + 6} y={C - m * PX_PER_MILE - 6} className="area-label" fill="var(--brand-fg)" opacity="0.7">
          {m} mi
        </text>
      ))}

      {/* towns */}
      {PLACES.map((p) => {
        const [x, y] = px(p.dx, p.dy);
        return (
          <g key={p.name}>
            <circle
              cx={x}
              cy={y}
              r={p.big ? 6 : 4}
              fill={p.big ? "var(--brand-pop)" : "var(--brand-fg)"}
              stroke="var(--brand-line)"
              strokeWidth={p.big ? 2 : 0}
            />
            <text x={x + 9} y={y + 4} className="area-label" fill="var(--brand-fg)" fontWeight={p.big ? 700 : 400}>
              {p.name}
            </text>
          </g>
        );
      })}

      {/* home */}
      <g transform={`translate(${C - 22}, ${C - 22})`}>
        <Daisy className="area-home" size={44} petal="var(--brand-sun)" center="var(--brand-primary)" />
      </g>
      <g transform={`translate(${C - 46}, ${C - 76})`}>
        <rect width="92" height="30" rx="15" fill="var(--brand-ink)" stroke="var(--brand-sun)" strokeWidth="2" />
        <text x="46" y="20" textAnchor="middle" className="area-label" fill="var(--brand-sun)" fontWeight={700}>
          {AREA.centre.label} · {AREA.centre.name}
        </text>
      </g>
    </svg>
  );
}
