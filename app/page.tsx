"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0c0820] px-4">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1b0f3a] via-[#2a1454] to-[#12092b]" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 w-[600px] md:w-[750px] h-[600px] md:h-[750px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(92,242,255,0.25)_0%,rgba(0,0,0,0)_70%)] blur-3xl" />

      {/* Secondary glow */}
      <div className="absolute top-[25%] left-[30%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-[radial-gradient(circle,rgba(140,80,255,0.25)_0%,rgba(0,0,0,0)_70%)] blur-3xl" />

      {/* Container */}
      <div className="relative w-full max-w-3xl">

        {/* Card */}
        <div className="bg-[#181236]/90 backdrop-blur-xl border border-white/15 rounded-[28px] px-6 md:px-12 py-10 md:py-12 text-center shadow-[0_40px_120px_rgba(0,0,0,0.6)]">

          {/* Badge */}
          <div className="inline-block px-4 py-1 text-[11px] md:text-xs tracking-widest text-cyan-400 border border-cyan-400/40 rounded-full mb-6">
            TEST DE PERSONNALITÉ GRATUIT
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Quel est votre profil
            <br />
            psychologique ?
          </h1>

          {/* Subtitle */}
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-8">
            En <span className="text-white font-semibold">2 minutes</span>, découvrez votre manière
            d’analyser, décider et réagir face aux situations importantes.
          </p>

          {/* Chips */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 text-xs md:text-sm">

            <span className="px-3 md:px-4 py-1 border border-white/30 rounded-full text-white/70 hover:bg-white/10 transition">
              Décision
            </span>

            <span className="px-3 md:px-4 py-1 border border-white/30 rounded-full text-white/70 hover:bg-white/10 transition">
              Intuition
            </span>

            <span className="px-3 md:px-4 py-1 border border-white/30 rounded-full text-white/70 hover:bg-white/10 transition">
              Analyse
            </span>

            <span className="px-3 md:px-4 py-1 border border-white/30 rounded-full text-white/70 hover:bg-white/10 transition">
              Personnalité
            </span>

            <span className="px-3 md:px-4 py-1 border border-white/30 rounded-full text-white/70 hover:bg-white/10 transition">
              Dynamique mentale
            </span>

          </div>

          {/* CTA */}
          <Link
            href="/start"
            className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-black font-semibold px-10 md:px-12 py-4 md:py-5 text-base md:text-lg rounded-xl hover:scale-105 hover:brightness-110 hover:shadow-[0_0_35px_rgba(92,242,255,0.7)] transition-all duration-300"
          >
            Faire le test
          </Link>

          {/* Micro proof */}
          <p className="text-white/30 text-xs mt-4">
            Diagnostic gratuit • Sans inscription
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-white/50 text-xs md:text-sm mt-8">
            <span>⏱ 2 minutes</span>
            <span>🧠 10 questions</span>
            <span>🔎 profil détaillé</span>
          </div>

          {/* Archetypes */}
          <div className="mt-10 text-white/40 text-xs md:text-sm">
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
