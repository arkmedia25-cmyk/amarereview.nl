import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Amare Review — Eerlijke Supplementen Reviews',
  description: 'Onafhankelijke reviews van Amare supplementen. Eerlijke ervaringen, vergelijkingen en resultaten van echte gebruikers.',
  alternates: { canonical: 'https://amarereview.nl' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="font-body bg-white text-gray-900 antialiased">
        <header className="border-b border-border bg-white sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-2xl font-heading font-bold text-primary">
              Amare<span className="text-accent">Review</span>
            </a>
            <nav className="flex gap-6 text-sm font-medium">
              <a href="/" className="hover:text-primary">Home</a>
              <a href="/reviews" className="hover:text-primary">Reviews</a>
              <a href="https://amarenl.com" className="hover:text-primary" target="_blank">AmareNL</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-border mt-16 py-8 text-sm text-text-muted">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p>© 2026 AmareReview.nl — Onafhankelijke reviews van Amare supplementen.</p>
            <p className="mt-1">* Deze site bevat affiliate links. Als partner van Amare verdienen wij een commissie bij aankopen via onze links.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
