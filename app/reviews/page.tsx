import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import Link from 'next/link'

interface ReviewMeta {
  slug: string
  title: string
  date: string
  category: string
  product: string
  rating: string
}

function getReviews(): ReviewMeta[] {
  const dir = join(process.cwd(), 'content/reviews')
  const files = readdirSync(dir).filter(f => f.endsWith('.mdx'))
  return files.map(f => {
    const content = readFileSync(join(dir, f), 'utf-8')
    const match = content.match(/^---\n([\s\S]*?)\n---/)
    const meta: Record<string, string> = {}
    if (match) {
      match[1].split('\n').forEach(line => {
        const [k, ...v] = line.split(':')
        if (k && v.length) meta[k.trim()] = v.join(':').trim().replace(/"/g, '')
      })
    }
    return {
      slug: f.replace('.mdx', ''),
      title: meta.title || f,
      date: meta.date || '',
      category: meta.category || '',
      product: meta.product || '',
      rating: meta.rating || '',
    }
  }).sort((a, b) => b.date.localeCompare(a.date))
}

export default function ReviewsPage() {
  const reviews = getReviews()
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold text-primary mb-8">Alle Reviews</h1>
      <div className="grid gap-6">
        {reviews.map(r => (
          <Link key={r.slug} href={`/reviews/${r.slug}`}
            className="block border border-border rounded-lg p-6 hover:border-primary transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-accent font-semibold uppercase">{r.category}</span>
                <h3 className="text-xl font-heading font-bold mt-1">{r.title}</h3>
                <p className="text-text-muted text-sm mt-1">{r.product} · {r.date}</p>
              </div>
              <span className="text-accent font-bold text-lg">{r.rating}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
