import { Leaf } from "lucide-react";

/* Consistent single-stroke line icon set for the four nature badges.
   Rounded joins, 24px, strokeWidth 1.75 — feels premium and friendly. */

const ICON_PROPS = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function LeafIcon() {
  return <Leaf {...ICON_PROPS} aria-hidden="true" />;
}

function SugarCubeSlashIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M8 8h.01M16 16h.01M8 16h.01M16 8h.01" strokeWidth="2" />
      <path d="M3 21 21 3" />
    </svg>
  );
}

function FlaskSlashIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden="true">
      <path d="M9 3h6" />
      <path d="M10 3v5.3L4.6 18.1A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.7-2.9L14 8.3V3" />
      <path d="M7.5 14.5h9" />
      <path d="M3 21 21 3" />
    </svg>
  );
}

function WheatSlashIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden="true">
      <path d="M12 22V9" />
      <path d="M12 11c-2 0-4-1.5-4-4 2 0 4 1.5 4 4Z" />
      <path d="M12 11c2 0 4-1.5 4-4-2 0-4 1.5-4 4Z" />
      <path d="M12 16c-2 0-4-1.5-4-4 2 0 4 1.5 4 4Z" />
      <path d="M12 16c2 0 4-1.5 4-4-2 0-4 1.5-4 4Z" />
      <path d="M3 21 21 3" />
    </svg>
  );
}

const BADGES = [
  { label: "Növény alapú vegán", Icon: LeafIcon },
  { label: "Cukormentes", Icon: SugarCubeSlashIcon },
  { label: "GMO-mentes", Icon: FlaskSlashIcon },
  { label: "Gluténmentes", Icon: WheatSlashIcon },
];

export function NatureStrip() {
  return (
    <section
      id="termeszetes"
      aria-label="Termékjellemzők"
      className="bg-white py-10 md:py-14"
    >
      <div className="container-wide">
        <ul
          role="list"
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {BADGES.map(({ label, Icon }) => (
            <li
              key={label}
              className="flex items-center justify-center gap-3 rounded-pill border-2 border-brand-green bg-brand-green-tint px-4 py-3 text-brand-green-deep shadow-card/50 transition-transform duration-200 ease-brand hover:-translate-y-0.5"
            >
              <span className="shrink-0 text-brand-green">
                <Icon />
              </span>
              <span className="text-sm font-semibold md:text-[15px]">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
