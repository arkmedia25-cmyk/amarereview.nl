import Link from 'next/link'

const reviews = [
  { slug: 'happy-juice-pack-review-ervaringen', title: 'Happy Juice Pack Review — Mijn Eerlijke Ervaring na 30 Dagen', date: '2026-06-19', category: 'Mentale Wellness' },
  { slug: 'mentabiotics-review-werkt-het', title: 'MentaBiotics Review — Werkt Het Echt voor Stress en Stemming?', date: '2026-06-19', category: 'Darmen' },
]

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
          Eerlijke Amare Supplementen Reviews
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Wij testen Amare producten grondig en delen onze eerlijke ervaringen.
          Geen gesponsorde praatjes — alleen wat echt werkt en waarom.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-heading font-bold mb-6">Nieuwste Reviews</h2>
        <div className="grid gap-6">
          {reviews.map((r) => (
            <Link key={r.slug} href={`/reviews/${r.slug}`}
              className="block border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <span className="text-xs text-accent font-semibold uppercase">{r.category}</span>
              <h3 className="text-xl font-heading font-bold mt-1 mb-2">{r.title}</h3>
              <p className="text-text-muted text-sm">{r.date}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
