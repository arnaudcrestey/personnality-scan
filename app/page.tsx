"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f0820]">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900"></div>

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(120,80,255,0.55)_0%,rgba(40,0,80,0)_65%)] blur-3xl"></div>

      {/* Card */}
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl px-12 py-14 text-center max-w-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

        <p className="text-cyan-400 tracking-widest text-xs mb-4">
          DIAGNOSTIC PSYCHOLOGIQUE RAPIDE
        </p>

        <h1 className="text-5xl font-bold text-white leading-tight mb-6">
          Quel est votre profil
          <br />
          psychologique dominant ?
        </h1>

        <p className="text-white/70 text-lg leading-relaxed mb-10">
          Découvrez en <strong>2 minutes</strong> comment vous analysez,
          décidez et réagissez face aux situations importantes.
        </p>

        <Link
          href="/start"
          className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold px-10 py-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-cyan-500/40 transition-all duration-300"
        >
          Découvrir mon profil
        </Link>

        {/* Micro proofs */}
        <div className="flex justify-center gap-8 text-white/60 text-sm mt-8">
          <span>⏱ 2 minutes</span>
          <span>🧠 10 questions</span>
          <span>🤖 analyse IA</span>
        </div>

        {/* Archetypes */}
        <div className="mt-10 text-white/50 text-sm leading-relaxed">
          Profils révélés
          <div className="mt-2 font-medium text-white/70">
            Stratège • Visionnaire • Explorateur • Médiateur • Analyste
          </div>
        </div>

      </div>
    </main>
  );
}
