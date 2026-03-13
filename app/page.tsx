"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b0618]">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#140b2d] via-[#1a0c38] to-[#090414]" />

      {/* Large glow */}
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(92,242,255,0.25)_0%,rgba(0,0,0,0)_70%)] blur-3xl" />

      {/* Secondary glow */}
      <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(140,80,255,0.25)_0%,rgba(0,0,0,0)_70%)] blur-3xl" />

      {/* Card */}
      <div className="relative w-full max-w-xl bg-[#151028]/90 border border-white/10 rounded-3xl p-12 text-center backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.7)]">

        {/* Label */}
        <p className="text-cyan-400 text-xs tracking-[0.25em] mb-6 uppercase">
          Diagnostic psychologique rapide
        </p>

        {/* Title */}
        <h1 className="text-6xl font-bold text-white leading-tight mb-6">
          Quel est votre profil
          <br />
          psychologique dominant ?
        </h1>

        {/* Description */}
        <p className="text-white/70 text-lg leading-relaxed mb-10">
          Découvrez en <span className="text-white font-semibold">2 minutes</span>
          comment vous analysez, décidez et réagissez face aux situations importantes.
        </p>

        {/* CTA */}
        <Link
          href="/start"
          className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-semibold text-black bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(92,242,255,0.7)] transition-all duration-300"
        >
          Découvrir mon profil
        </Link>

        {/* Features */}
        <div className="flex justify-center gap-8 text-white/60 text-sm mt-8">
          <span>⏱ 2 minutes</span>
          <span>🧠 10 questions</span>         
        </div>

        {/* Archetypes */}
        <div className="mt-10 text-white/40 text-sm">
          Profils révélés
          <div className="mt-2 text-white/70 font-medium">
            Stratège • Visionnaire • Explorateur • Médiateur • Analyste
          </div>
        </div>

      </div>
    </main>
  );
}
