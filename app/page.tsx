import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="glass-card mx-auto max-w-2xl p-8 text-center md:p-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-neon">
          Diagnostic psychologique rapide
        </p>
        <h1 className="text-4xl font-bold md:text-6xl">PERSONALITY SCAN</h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-white/80 md:text-lg">
          Découvrez en 2 minutes votre fonctionnement psychologique dominant.
        </p>

        <Link
          href="/start"
          className="mt-10 inline-flex items-center justify-center rounded-xl border border-neon/50 bg-neon/15 px-8 py-4 text-lg font-semibold text-neon transition hover:bg-neon/25"
        >
          Faire le test
        </Link>
      </section>
    </main>
  );
}
