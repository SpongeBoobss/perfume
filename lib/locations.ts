/**
 * Confirmed partner sales locations.
 *
 * `map` values are positions on the schematic Mongolia map (SVG viewBox 0 0 1010 510).
 * They are approximate illustration positions only — not addresses or GPS coordinates.
 */
export type PartnerLocation = {
  id: string;
  name: string;
  latin: string;
  map: { x: number; y: number };
};

export type Province = {
  id: "dornogovi" | "umnugovi";
  name: string;
  latin: string;
  locations: PartnerLocation[];
};

export const provinces: Province[] = [
  {
    id: "dornogovi",
    name: "Дорноговь аймаг",
    latin: "Dornogovi",
    locations: [
      { id: "sainshand", name: "Сайншанд", latin: "Sainshand", map: { x: 694, y: 342 } },
      { id: "khatanbulag", name: "Хатанбулаг", latin: "Khatanbulag", map: { x: 664, y: 420 } },
      { id: "zamyn-uud", name: "Замын-Үүд", latin: "Zamyn-Üüd", map: { x: 738, y: 392 } },
    ],
  },
  {
    id: "umnugovi",
    name: "Өмнөговь аймаг",
    latin: "Ömnögovi",
    locations: [
      { id: "tsogttsetsii", name: "Цогтцэций", latin: "Tsogttsetsii", map: { x: 557, y: 394 } },
      { id: "khanbogd", name: "Ханбогд", latin: "Khanbogd", map: { x: 606, y: 420 } },
    ],
  },
];

export const allLocations = provinces.flatMap((p) =>
  p.locations.map((l) => ({ ...l, province: p })),
);

export type LocationWithProvince = (typeof allLocations)[number];
