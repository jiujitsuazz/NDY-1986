/**
 * Brand-level content. Kept separate from components so copy can evolve
 * without touching presentation code, and so the same strings can feed
 * both the human UI and machine-readable surfaces (JSON-LD, /agents).
 */

export const brand = {
  name: "NDY 1986",
  meaning: "NOT DEAD YET",
  founded: "1986",
  tagline: "Built for the days you had to keep going.",
  description:
    "NDY 1986 is a premium clothing brand built around resilience and continuing when life has tried to break you. NOT DEAD YET is not a motivational slogan — it is a statement of fact.",
  statement: {
    lines: [
      "Some things change you.",
      "Some things nearly finish you.",
      "You're still here.",
    ],
  },
  story: {
    heading: "WHAT NDY MEANS",
    paragraphs: [
      "NDY means NOT DEAD YET.",
      "Not a slogan. A statement of fact.",
      "You went through something. You're still here. Keep going.",
      "NDY 1986 is built for what comes after — the training, the routine, the quiet discipline of showing up again. No noise. No oversized branding. Just NDY.",
    ],
  },
  mission: {
    heading: "MISSION",
    paragraphs: [
      "NDY 1986 exists because most men don't talk about the things that nearly finished them. We're not here to fix that with slogans.",
      "A percentage of every sale goes toward men's mental health and resilience initiatives. Not because it sells hoodies. Because it's the point.",
      "This isn't a charity. It's a clothing brand with a reason for existing.",
    ],
  },
  social: {
    instagram: "https://instagram.com/ndy1986",
    tiktok: "https://tiktok.com/@ndy1986",
  },
  contactEmail: "hello@ndy1986.com",
  url: "https://ndy1986.com",
} as const;
