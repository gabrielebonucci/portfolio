import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 sm:px-8">
      <p className="font-display text-[clamp(5rem,20vw,10rem)] leading-none text-ink">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-ink">Questa pagina non esiste.</h1>
      <p className="mt-2 text-ink-soft" lang="en">This page doesn&apos;t exist.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-paper">
          Torna alla home
        </Link>
        <Link href="/projects" className="rounded-md border border-ink px-5 py-3 text-sm font-semibold text-ink">
          Vedi i progetti
        </Link>
      </div>
    </main>
  )
}
