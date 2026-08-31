import type { MetadataRoute } from "next";
import { brand } from "@/data/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/the-core", "/our-story", "/mission", "/agents"];
  return routes.map((route) => ({
    url: `${brand.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "monthly",
    priority: route === "" ? 1 : route === "/the-core" ? 0.9 : 0.5,
  }));
}
