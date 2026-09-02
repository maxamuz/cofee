import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconBean = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <ellipse cx="12" cy="12" rx="5.6" ry="8.2" transform="rotate(32 12 12)" />
    <path d="M9.4 6.3c3.2 2.7 1.6 5.3 3 7.7 1.1 1.9.5 3.6-1 5.5" />
  </svg>
);

export const IconCup = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="M5 10h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5v-5Z" />
    <path d="M16 11.2h1.8a2.4 2.4 0 0 1 0 4.8H16" />
    <path d="M8.2 3.2c-.7 1 .7 1.8 0 2.9M12 3.2c-.7 1 .7 1.8 0 2.9" />
  </svg>
);

export const IconFlame = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="M12 21c3.9 0 6.5-2.4 6.5-6 0-2.7-1.7-4.6-3.1-6.2C14 7.2 13 5.5 13 3c-3.2 1.8-5 4.6-4.6 7.2-.5-.2-1.2-.8-1.4-1.7-1 1.3-1.5 2.9-1.5 4.5 0 4 2.6 8 6.5 8Z" />
    <path d="M12 21c-1.8 0-3-1.5-3-3.2 0-1.6 1.1-2.6 3-4 1.9 1.4 3 2.4 3 4 0 1.7-1.2 3.2-3 3.2Z" />
  </svg>
);

export const IconBasket = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="M4.2 9.5h15.6l-1.5 8.6a2.2 2.2 0 0 1-2.2 1.9H7.9a2.2 2.2 0 0 1-2.2-1.9L4.2 9.5Z" />
    <path d="M8.5 9.5 12 3.5l3.5 6M9.5 13v3.5M14.5 13v3.5" />
  </svg>
);

export const IconSearch = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.6 15.6 4.4 4.4" />
  </svg>
);

export const IconPlus = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </svg>
);

export const IconMinus = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="M5.5 12h13" />
  </svg>
);

export const IconX = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const IconStar = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}>
    <path d="m12 2.8 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.1l6.1-.7L12 2.8Z" />
  </svg>
);

export const IconArrowRight = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="M4 12h15.5M13.5 6l6 6-6 6" />
  </svg>
);

export const IconArrowDown = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="M12 4v15.5M6 13.5l6 6 6-6" />
  </svg>
);

export const IconTruck = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="M2.5 6.5h11.5v10H2.5zM14 10h4l3 3.2v3.3h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);

export const IconLeaf = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="M5 15C5 8 11 4.5 19 4c.5 8-3 14-10 14-1.5 0-3-.8-4-3Z" />
    <path d="M5 20c2.5-5 6.5-8.5 10.5-10.5" />
  </svg>
);

export const IconMountain = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="m3 19 6.5-11 3 4.5L15 9l6 10H3Z" />
    <path d="M8 4.5c0-1 1.2-1 1.2-2" />
  </svg>
);

export const IconDrop = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="M12 3.5s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z" />
    <path d="M9.5 14.5a2.8 2.8 0 0 0 2 2.7" />
  </svg>
);

export const IconPin = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.3" r="2.3" />
  </svg>
);

export const IconPhone = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="M5.5 4h3l1.5 4-2 1.5a12.5 12.5 0 0 0 6.5 6.5L16 14l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 6.2 2 2 0 0 1 5.5 4Z" />
  </svg>
);

export const IconClock = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5.2l3.4 2" />
  </svg>
);

export const IconCard = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3 10h18M6.5 14.5h4" />
  </svg>
);

export const IconCash = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <rect x="2.5" y="7" width="19" height="10" rx="1.6" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M5.5 10v.01M18.5 14v.01" />
  </svg>
);

export const IconStore = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="M4 9.5 5.5 4h13L20 9.5M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0M5 12v8h14v-8" />
    <path d="M9.5 20v-5h5v5" />
  </svg>
);

export const IconPlane = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="m20.5 3.5-9.8 17-1.6-7.6-7.6-1.6 19-7.8Z" />
    <path d="M20.5 3.5 9.1 12.9" />
  </svg>
);

export const IconCamera = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2.2" />
    <path d="M8.5 7 10 4h4l1.5 3" />
    <circle cx="12" cy="13.3" r="3.4" />
  </svg>
);

export const IconMail = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m4 7.5 8 6 8-6" />
  </svg>
);

export const IconTrash = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="M4.5 6.5h15M9 6.5V4.5h6v2M6.5 6.5 7.5 20h9l1-13.5M10 10.5v6M14 10.5v6" />
  </svg>
);

export const IconChevronDown = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const IconGrinder = (p: P) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...stroke} {...p}>
    <path d="M6 4h12l-1.2 6H7.2L6 4ZM8.5 10 9 20h6l.5-10" />
    <path d="M9.2 14.5h5.6" />
  </svg>
);
