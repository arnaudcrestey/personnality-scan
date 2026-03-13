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
  const [analysis, setAnalysis] = useState(
    "Analyse de votre profil en cours..."
  );
  const [leadState, setLeadState] = useState<LeadState>("idle");

  useEffect(() => {
    const raw = localStorage.getItem("personality_result");
    if (!raw) return;

    const parsed = JSON.parse(raw) as QuizResult;
    setResult(parsed);

    fetch("/api/analyse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answers: parsed.answers,
        profile: parsed.dominantProfile,
        score: parsed.score,
      }),
    })
      .then((res) => res.json())
      .then((data: { analysis?: string }) => {
        setAnalysis(
          data.analysis ||
            "Votre profil révèle une personnalité nuancée et adaptable."
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
      birthDate: String(formData.get("birthDate") || ""),
      birthTime: String(formData.get("birthTime") || ""),
      birthCity: String(formData.get("birthCity") || ""),
      score: result.score,
      profile: result.dominantProfile,
    };

    const response = await fetch("/api/lead-personality", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setLeadState(response.ok ? "success" : "error");
  };

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="glass-card max-w-xl p-8 text-center">
          <p className="text-white/80">Aucun résultat trouvé.</p>

          <Link
            href="/start"
            className="mt-4 inline-block text-neon underline"
          >
            Faire le test
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-10">

      <ResultCard profile={result.dominantProfile} score={result.score} />

      <ProfileRadar scores={result.profileScores || emptyScores} />

      <section className="glass-card p-6">
        <h3 className="text-lg font-semibold">
          Analyse de votre profil
        </h3>

        <p className="mt-4 leading-relaxed text-white/85">
          {analysis}
        </p>
      </section>

      <section className="glass-card p-6">
        <h3 className="text-lg font-semibold">
          Recevoir votre analyse personnalisée
        </h3>

        <form
          className="mt-4 grid gap-4 md:grid-cols-2"
          onSubmit={submitLead}
        >
          <input
            required
            name="firstName"
            placeholder="Prénom"
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3"
          />

          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3"
          />

          <input
            required
            type="date"
            name="birthDate"
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3"
          />

          <input
            required
            type="time"
            name="birthTime"
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3"
          />

          <input
            required
            name="birthCity"
            placeholder="Ville de naissance"
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 md:col-span-2"
          />

          <button
            type="submit"
            disabled={leadState === "loading"}
            className="md:col-span-2 rounded-xl border border-neon/50 bg-neon/15 px-5 py-3 font-semibold text-neon hover:bg-neon/25 disabled:opacity-70"
          >
            Recevoir mon analyse personnalisée
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

      <ShareButtons profile={result.dominantProfile} />

    </main>
  );
}
