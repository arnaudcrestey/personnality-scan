"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b0618]">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#160b2f] via-[#1a0c38] to-[#0a0418]" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(92,242,255,0.25)_0%,rgba(0,0,0,0)_70%)] blur-3xl" />

      {/* Container */}
      <div className="relative w-full max-w-3xl px-6">

        {/* Card */}
        <div className="bg-[#16112d]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center shadow-[0_40px_120px_rgba(0,0,0,0.7)]">

          {/* Badge */}
          <div className="inline-block px-4 py-1 text-xs tracking-widest text-cyan-400 border border-cyan-400/30 rounded-full mb-6">
            DIAGNOSTIC PSYCHOLOGIQUE GRATUIT
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Quel est votre profil
            <br />
            psychologique dominant ?
          </h1>

          {/* Subtitle */}
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            En 2 minutes, découvrez votre manière d’analyser, décider
            et réagir face aux situations importantes.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm text-white/70">

            <span className="px-4 py-1 border border-white/20 rounded-full">
              Décision
            </span>

            <span className="px-4 py-1 border border-white/20 rounded-full">
              Intuition
            </span>

            <span className="px-4 py-1 border border-white/20 rounded-full">
              Analyse
            </span>

            <span className="px-4 py-1 border border-white/20 rounded-full">
              Personnalité
            </span>

            <span className="px-4 py-1 border border-white/20 rounded-full">
              Dynamique mentale
            </span>

          </div>

          {/* CTA */}
          <Link
            href="/start"
            className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-black font-semibold px-10 py-4 rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(92,242,255,0.6)] transition-all duration-300"
          >
            Faire le test
          </Link>

          {/* Info */}
          <div className="flex justify-center gap-8 text-white/50 text-sm mt-8">
            <span>⏱ 2 minutes</span>
            <span>🧠 10 questions</span>
            <span>🔎 profil détaillé</span>
          </div>

          {/* Archetypes */}
          <div className="mt-10 text-white/40 text-sm">
            Profils révélés
            <div className="mt-2 text-white/70 font-medium">
              Stratège • Visionnaire • Explorateur • Médiateur • Analyste
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
