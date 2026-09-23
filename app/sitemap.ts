import { readdirSync } from 'fs'
import { join } from 'path'
import type { MetadataRoute } from 'next'

// Dynamische sitemap: elke review in content/reviews/*.mdx wordt automatisch
// opgenomen. Daarvoor stond hier een statische public/sitemap.xml met 12 URL's
// die nooit meegroeide — nieuwe reviews (inmiddels 40) waren voor Google
// onvindbaar (23-09-2026).
const BASE = 'https://amarereview.nl'

export default function sitemap(): MetadataRoute.Sitemap {
  let slugs: string[] = []
  try {
    slugs = readdirSync(join(process.cwd(), 'content/reviews'))
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace(/\.mdx$/, ''))
      .sort()
  } catch {
    slugs = []
  }

  const now = new Date()

  return [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE}/reviews`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...slugs.map((slug) => ({
      url: `${BASE}/reviews/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
