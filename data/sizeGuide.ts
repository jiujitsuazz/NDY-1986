import type { Size } from "@/types/product";

export interface SizeMeasurement {
  size: Size;
  chestCm: number;
  lengthCm: number;
  sleeveCm: number;
}

/**
 * Measurements for The Core, garment laid flat. Centralised here so both
 * the PDP size guide UI and the agent-facing sizing service read the same
 * numbers.
 */
export const coreSizeGuide: SizeMeasurement[] = [
  { size: "S", chestCm: 108, lengthCm: 68, sleeveCm: 61 },
  { size: "M", chestCm: 114, lengthCm: 70, sleeveCm: 63 },
  { size: "L", chestCm: 120, lengthCm: 72, sleeveCm: 65 },
  { size: "XL", chestCm: 126, lengthCm: 74, sleeveCm: 67 },
  { size: "XXL", chestCm: 132, lengthCm: 76, sleeveCm: 69 },
];

export const sizeGuideNote =
  "The Core is cut for an athletic fit — close through the body, room through the shoulders. True to size. Size up for a relaxed layering fit.";
