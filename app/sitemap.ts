import { MetadataRoute } from "next";

const BASE_URL = "https://amarereview.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const reviews = [
    "happy-juice-pack-review-ervaringen",
    "mentabiotics-review-werkt-het",
    "sleep-plus-review-ervaringen",
    "edge-plus-focus-concentratie-review",
    "hl5-collageen-huid-haar-nagels-review",
    "sunrise-complete-ochtendformule-review",
    "restore-darmflora-spijsvertering-review",
    "energy-plus-natuurlijke-energie-review",
    "triangle-of-wellness-compleet-pakket-review",
    "origin-plantaardige-maaltijdshake-review",
  ];

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...reviews.map((slug) => ({
      url: `${BASE_URL}/reviews/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
