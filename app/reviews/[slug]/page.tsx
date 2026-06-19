import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const dir = join(process.cwd(), 'content/reviews')
  const files = readdirSync(dir).filter(f => f.endsWith('.mdx'))
  return files.map(f => ({ slug: f.replace('.mdx', '') }))
}

export default async function ReviewPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const path = join(process.cwd(), 'content/reviews', `${slug}.mdx`)
  
  let content: string
  try { content = readFileSync(path, 'utf-8') } catch { notFound() }

  // Parse simple frontmatter
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) notFound()
  
  const frontmatter: Record<string, string> = {}
  match[1].split('\n').forEach(line => {
    const [k, ...v] = line.split(':')
    if (k && v.length) frontmatter[k.trim()] = v.join(':').trim().replace(/"/g, '')
  })
  
  const body = match[2]
    .replace(/## (.*)/g, '<h2 class="text-2xl font-heading font-bold mt-10 mb-4">$1</h2>')
    .replace(/### (.*)/g, '<h3 class="text-xl font-heading font-bold mt-8 mb-3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n- (.*)/g, '\n<li class="ml-4 list-disc">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
    .replace(/\|.*\|/g, '') // skip tables for now

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/" className="text-sm text-accent hover:underline mb-6 inline-block">← Terug naar reviews</Link>
      <span className="text-xs text-accent font-semibold uppercase bg-bg-soft px-2 py-1 rounded">{frontmatter.category}</span>
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-2 mb-2">{frontmatter.title}</h1>
      <p className="text-text-muted text-sm mb-8">{frontmatter.date} · {frontmatter.author || 'AmareReview Redactie'}</p>
      <article className="prose max-w-none">
        <p className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: '<p class="mb-4 leading-relaxed">' + body + '</p>' }} />
      </article>
      <div className="mt-12 p-6 bg-accent/10 border border-accent/30 rounded-lg text-center">
        <p className="font-bold text-lg mb-2">Dit product kopen?</p>
        <p className="text-sm text-text-muted mb-4">Via onze partner Amare — met vertrouwde service</p>
        <a href="https://www.amare.com/2075008/nl-nl/" target="_blank" rel="nofollow noopener noreferrer"
           className="inline-block bg-accent text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition">
          Bekijk op Amare.com →
        </a>
      </div>
    </div>
  )
}
