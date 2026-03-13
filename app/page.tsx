"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">

      <div className="relative">

        {/* Halo lumineux */}
        <div className="absolute -inset-20 bg-[radial-gradient(circle,rgba(120,80,255,0.35)_0%,transparent_60%)] blur-3xl"></div>

        {/* Card */}
        <div className="relative bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-10 text-center max-w-xl shadow-2xl">

          <p className="text-cyan-300 tracking-widest text-sm mb-3">
            DIAGNOSTIC PSYCHOLOGIQUE RAPIDE
          </p>

          <h1 className="text-5xl font-bold text-white mb-6">
            PERSONALITY SCAN
          </h1>

          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Découvrez en <strong>2 minutes</strong> le fonctionnement psychologique
            qui influence vos décisions, votre intuition et votre manière
            d'analyser les situations importantes.
          </p>

          <Link
            href="/start"
            className="inline-block bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-8 py-4 rounded-xl transition"
          >
            Découvrir mon profil psychologique
          </Link>

          <div className="flex justify-center gap-6 text-white/70 text-sm mt-6">
            <span>⏱ 2 minutes</span>
            <span>🧠 10 questions</span>
            <span>📊 analyse IA</span>
          </div>

          <div className="mt-8 text-white/60 text-sm">
            Profils révélés : Stratège • Visionnaire • Explorateur • Médiateur • Analyste
          </div>

        </div>
      </div>

    </main>
  );
}
