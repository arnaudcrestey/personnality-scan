"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ProfileRadar } from "../../components/ProfileRadar";
import { ResultCard } from "../../components/ResultCard";
import { ShareButtons } from "../../components/ShareButtons";
import { PROFILES, QuizResult } from "../../lib/quiz";

type LeadState = "idle" | "loading" | "success" | "error";

const emptyScores = Object.fromEntries(
  PROFILES.map((profile) => [profile, 0])
) as QuizResult["profileScores"];

export default function ResultPage() {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [analysis, setAnalysis] = useState("Analyse personnalisée en cours...");
  const [leadState, setLeadState] = useState<LeadState>("idle");

  useEffect(() => {
    const raw = localStorage.getItem("personality_result");
    if (!raw) return;

    const parsed = JSON.parse(raw) as QuizResult;
    setResult(parsed);

    fetch("/api/analyse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        answers: parsed.answers,
        profile: parsed.dominantProfile,
        score: parsed.score
      })
    })
      .then((res) => res.json())
      .then((data: { analysis?: string }) => {
        setAnalysis(
          data.analysis ||
            "Votre profil révèle une personnalité nuancée avec des forces qui peuvent s'exprimer dans différents contextes."
        );
      })
      .catch(() => {
        setAnalysis(
          "Votre analyse personnalisée sera disponible dans quelques instants."
        );
      });
  }, []);

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!result) return;

    setLeadState("loading");

    const formData = new FormData(event.currentTarget);

    const payload = {
      firstName: String(formData.get("firstName") || ""),
      email: String(formData.get("email") || ""),
      birthDay: String(formData.get("birthDay") || ""),
      birthMonth: String(formData.get("birthMonth") || ""),
      birthYear: String(formData.get("birthYear") || ""),
      birthHour: String(formData.get("birthHour") || ""),
      birthMinute: String(formData.get("birthMinute") || ""),
      birthCity: String(formData.get("birthCity") || ""),
      score: result.score,
      profile: result.dominantProfile
    };

    const response = await fetch("/api/lead-personality", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    setLeadState(response.ok ? "success" : "error");
  };

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="glass-card max-w-xl p-8 text-center">
          <p className="text-white/80">Aucun résultat trouvé.</p>
          <Link href="/start" className="mt-4 inline-block text-neon underline">
            Faire le test
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-10">

      {/* RESULTAT + RADAR */}

      <div className="grid gap-6 md:grid-cols-2">

        {/* Analyse + Score */}
        <section className="glass-card p-6">

          <ResultCard
            profile={result.dominantProfile}
            score={result.score}
          />

          <h3 className="text-lg font-semibold mt-6">
            Analyse personnalisée
          </h3>

          <p className="mt-4 leading-relaxed text-white/85">
            {analysis}
          </p>

        </section>

        {/* Radar */}
        <section className="glass-card p-6 flex flex-col items-center">

          <h3 className="text-lg font-semibold mb-4">
            Profil psychologique
          </h3>

          <div className="w-full max-w-[260px]">
            <ProfileRadar scores={result.profileScores || emptyScores} />
          </div>

        </section>

      </div>

      {/* BLOC ASTRAE */}

      <section className="glass-card p-8 text-center">

        <h3 className="text-2xl font-semibold">
          Comprendre réellement votre fonctionnement personnel
        </h3>

        <p className="mt-4 text-white/80 max-w-xl mx-auto">
          Certaines dynamiques personnelles peuvent être liées à des facteurs
          plus profonds que les seules situations du quotidien.
        </p>

        <p className="mt-3 text-white/80 max-w-xl mx-auto">
          Au Cabinet Astrae, l’étude du thème astral est utilisée comme outil
          d’introspection pour mieux comprendre les dynamiques personnelles
          qui influencent vos choix et vos orientations de vie.
        </p>

        <p className="mt-6 font-medium">
          🎁 Recevez gratuitement votre première lecture personnalisée
        </p>

        <form
          onSubmit={submitLead}
          className="mt-6 grid gap-4 md:grid-cols-2 max-w-xl mx-auto"
        >

          <input
            required
            name="firstName"
            placeholder="Votre prénom"
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3"
          />

          <input
            required
            type="email"
            name="email"
            placeholder="Votre email"
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3"
          />

          <div className="md:col-span-2">
            <label className="text-sm text-white/70">Date de naissance</label>

            <div className="grid grid-cols-3 gap-2 mt-2">

              <input
                required
                name="birthDay"
                placeholder="Jour"
                inputMode="numeric"
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-3 text-center"
              />

              <input
                required
                name="birthMonth"
                placeholder="Mois"
                inputMode="numeric"
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-3 text-center"
              />

              <input
                required
                name="birthYear"
                placeholder="Année"
                inputMode="numeric"
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-3 text-center"
              />

            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-white/70">Heure de naissance</label>

            <div className="grid grid-cols-2 gap-2 mt-2">

              <input
                name="birthHour"
                placeholder="Heure"
                inputMode="numeric"
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-3 text-center"
              />

              <input
                name="birthMinute"
                placeholder="Minute"
                inputMode="numeric"
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-3 text-center"
              />

            </div>
          </div>

          <input
            required
            name="birthCity"
            placeholder="Ville de naissance"
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 md:col-span-2"
          />

          <button
            type="submit"
            disabled={leadState === "loading"}
            className="md:col-span-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-3 font-semibold text-black hover:opacity-90"
          >
            Recevoir ma première analyse
          </button>

        </form>

        {leadState === "success" && (
          <p className="mt-4 text-green-300">
            Merci, votre analyse a bien été envoyée.
          </p>
        )}

        {leadState === "error" && (
          <p className="mt-4 text-red-300">
            Une erreur est survenue lors de l'envoi.
          </p>
        )}

      </section>

      {/* PARTAGE */}

      <ShareButtons profile={result.dominantProfile} />

    </main>
  );
}
