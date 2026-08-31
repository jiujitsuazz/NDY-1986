/**
 * Copy for each experience archetype's hero/lead section. Shared lower
 * sections (statement, product, fit, story, mission) live in data/brand.ts
 * and data/product.ts. Keeping this separate lets copy be tuned per
 * experience without editing component code.
 */

export const homepageContent = {
  brandDiscovery: {
    eyebrow: "NDY 1986",
    heading: "NOT DEAD YET.",
    subheading: "Built for the days you had to keep going.",
    primaryCta: { label: "DISCOVER NDY", href: "/our-story" },
    secondaryCta: { label: "SHOP THE CORE", href: "/the-core" },
  },
  returning: {
    eyebrow: "NDY 1986",
    heading: "NOT DEAD YET.",
    subheading: "You've seen what we stand for. Now wear it.",
    primaryCta: { label: "SHOP THE CORE", href: "/the-core" },
    secondaryCta: { label: "OUR STORY", href: "/our-story" },
  },
  highIntent: {
    eyebrow: "THE CORE",
    heading: "THE CORE.",
    subheading: "350 GSM. 80% cotton. Athletic fit. Black.",
    primaryCta: { label: "SHOP THE CORE", href: "/the-core" },
    secondaryCta: { label: "WHY NDY", href: "/our-story" },
  },
  customer: {
    eyebrow: "NDY 1986",
    heading: "YOU'RE PART OF IT NOW.",
    subheading: "NOT DEAD YET.",
    primaryCta: { label: "TRACK ORDER", href: "#your-orders" },
    secondaryCta: { label: "THE NEXT CHAPTER", href: "#next-chapter" },
  },
} as const;
