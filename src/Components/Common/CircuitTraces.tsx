import { Cn } from "@/Lib/Cn";

const HERO_PATHS = [
  { D: "M0 90H210l40 40h170", Node: [420, 130] },
  { D: "M0 150H150l30 30h120l30-30h90", Node: [420, 150] },
  { D: "M0 260H90l50 50h60", Node: [200, 310] },
  { D: "M0 420H130l40-40h220l30 30h80", Node: [500, 410] },
  { D: "M0 500H260l40 40h120", Node: [420, 540] },
  { D: "M0 580H80l30-30h60", Node: [170, 550] },
];

const HERO_DOTS = [
  { D: "M60 0v40l30 30v60", Node: [90, 130] },
  { D: "M330 0v60l-30 30", Node: [300, 90] },
];

const PANEL_PATHS = [
  "M0 60H300l40 40h200",
  "M0 240H180l30-30h260l40 40h120",
  "M1200 80H980l-40 40H760",
  "M1200 220H1040l-30 30H880",
];

export function HeroTraces({ ClassName }: { ClassName?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 700 640"
      preserveAspectRatio="xMinYMin slice"
      fill="none"
      className={Cn(
        "pointer-events-none absolute inset-y-0 end-0 h-full w-full [mask-image:linear-gradient(to_bottom,black_55%,transparent_80%)] max-md:opacity-40 md:w-[62%] ltr:-scale-x-100",
        ClassName,
      )}
    >
      {HERO_PATHS.map((Path) => (
        <g key={Path.D}>
          <path d={Path.D} stroke="var(--trace)" strokeWidth="1.2" />
          <circle cx={Path.Node[0]} cy={Path.Node[1]} r="4" fill="var(--bg)" stroke="var(--trace)" strokeWidth="1.2" />
        </g>
      ))}
      {HERO_DOTS.map((Path) => (
        <g key={Path.D}>
          <path d={Path.D} stroke="var(--trace)" strokeWidth="1.2" />
          <circle cx={Path.Node[0]} cy={Path.Node[1]} r="3" fill="var(--node)" />
        </g>
      ))}
    </svg>
  );
}

export function PanelTraces() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 300"
      preserveAspectRatio="none"
      fill="none"
      stroke="var(--trace)"
      strokeWidth="1"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {PANEL_PATHS.map((D) => (
        <path key={D} d={D} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
