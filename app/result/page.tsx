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
    "Analyse personnalisée en cours..."
  );
  const [leadState, setLeadState] = useState<LeadState>("idle");
  const [leadError, setLeadError] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("personality_result");

      if (!raw) return;

      const parsed = JSON.parse(raw) as QuizResult;
      setResult(parsed);

      void fetch("/api/analyse", {
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
        .then(async (res) => {
          const data = (await res.json()) as { analysis?: string };
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
    } catch (error) {
      console.error("Erreur lecture résultat :", error);
    }
  }, []);

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!result) {
      setLeadState("error");
      setLeadError("Résultat introuvable. Merci de refaire le test.");
      return;
    }

    try {
      setLeadState("loading");
      setLeadError("");

      const form = event.currentTarget;
      const formData = new FormData(form);

      const payload = {
        firstName: String(formData.get("firstName") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        birthDay: String(formData.get("birthDay") || "").trim(),
        birthMonth: String(formData.get("birthMonth") || "").trim(),
        birthYear: String(formData.get("birthYear") || "").trim(),
        birthHour: String(formData.get("birthHour") || "").trim(),
        birthMinute: String(formData.get("birthMinute") || "").trim(),
        birthCity: String(formData.get("birthCity") || "").trim(),
        score: result.score,
        profile: result.dominantProfile,
      };

      if (
        !payload.firstName ||
        !payload.email ||
        !payload.birthDay ||
        !payload.birthMonth ||
        !payload.birthYear ||
        !payload.birthHour ||
        !payload.birthMinute ||
        !payload.birthCity
      ) {
        setLeadState("error");
        setLeadError("Merci de remplir tous les champs obligatoires.");
        return;
      }

      const response = await fetch("/api/lead-personality", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setLeadState("error");
        setLeadError(
          data?.error ||
            "Une difficulté temporaire empêche l’envoi. Merci de réessayer."
        );
        return;
      }

      setLeadState("success");
      form.reset();
    } catch (error) {
      console.error("Erreur envoi formulaire Personality :", error);
      setLeadState("error");
      setLeadError(
        "Une difficulté temporaire empêche l’envoi. Merci de réessayer."
      );
    }
  };

  if (leadState === "success") {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <div className="glass-card max-w-xl p-10">
          <h2 className="mb-4 text-3xl font-semibold text-white">
            ✓ Demande envoyée
          </h2>

          <p className="leading-relaxed text-white/80">
            Votre première lecture personnalisée vous sera envoyée
            par email dans quelques instants.
          </p>

          <p className="mt-4 text-sm text-white/60">
            Pensez à vérifier vos spams si vous ne voyez rien apparaître.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-3 font-semibold text-black"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
    );
  }

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
      <div className="grid gap-6 md:grid-cols-2">
        <section className="glass-card p-6">
          <ResultCard
            profile={result.dominantProfile}
            score={result.score}
          />

          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Ce score reflète certaines tendances dans votre manière
            d’analyser les situations, de prendre des décisions
            et d’interagir avec votre environnement.
          </p>
        </section>

        <section className="glass-card flex flex-col items-center p-6">
          <h3 className="mb-4 text-lg font-semibold">
            Profil psychologique
          </h3>

          <ProfileRadar scores={result.profileScores || emptyScores} />
        </section>
      </div>

      <section className="glass-card p-6">
        <h3 className="text-lg font-semibold">
          Analyse personnalisée
        </h3>

        <p className="mt-4 leading-relaxed text-white/85">
          {analysis}
        </p>
      </section>

      <section className="glass-card p-8 text-center">
        <h3 className="text-2xl font-semibold">
          Comprendre réellement votre fonctionnement personnel
        </h3>

        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Certaines dynamiques personnelles peuvent être liées à des facteurs
          plus profonds que les seules situations du quotidien.
        </p>

        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Au Cabinet Astrae, l’étude du thème astral est utilisée comme outil
          d’introspection pour mieux comprendre les dynamiques personnelles
          qui influencent vos choix et vos orientations de vie.
        </p>

        <p className="mt-6 font-medium">
          🎁 Recevez{" "}
          <span className="font-bold text-cyan-400">gratuitement</span>{" "}
          votre première lecture personnalisée
        </p>

        <form
          onSubmit={submitLead}
          className="mx-auto mt-6 grid max-w-xl gap-4 md:grid-cols-2"
        >
          <input
            required
            name="firstName"
            placeholder="Votre prénom"
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none"
          />

          <input
            required
            type="email"
            name="email"
            placeholder="Votre email"
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none"
          />

          <div className="md:col-span-2 grid grid-cols-3 gap-2">
            <input
              required
              name="birthDay"
              placeholder="Jour"
              inputMode="numeric"
              className="rounded-lg border border-white/20 bg-white/10 px-3 py-3 text-center text-white placeholder:text-white/50 outline-none"
            />
            <input
              required
              name="birthMonth"
              placeholder="Mois"
              inputMode="numeric"
              className="rounded-lg border border-white/20 bg-white/10 px-3 py-3 text-center text-white placeholder:text-white/50 outline-none"
            />
            <input
              required
              name="birthYear"
              placeholder="Année"
              inputMode="numeric"
              className="rounded-lg border border-white/20 bg-white/10 px-3 py-3 text-center text-white placeholder:text-white/50 outline-none"
            />
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-2">
            <input
              required
              name="birthHour"
              placeholder="Heure"
              inputMode="numeric"
              className="rounded-lg border border-white/20 bg-white/10 px-3 py-3 text-center text-white placeholder:text-white/50 outline-none"
            />
            <input
              required
              name="birthMinute"
              placeholder="Minute"
              inputMode="numeric"
              className="rounded-lg border border-white/20 bg-white/10 px-3 py-3 text-center text-white placeholder:text-white/50 outline-none"
            />
          </div>

          <input
            required
            name="birthCity"
            placeholder="Ville de naissance"
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none md:col-span-2"
          />

          <button
            type="submit"
            disabled={leadState === "loading"}
            className="md:col-span-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-3 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {leadState === "loading"
              ? "Envoi en cours..."
              : "Recevoir ma première analyse"}
          </button>

          {leadState === "error" && (
            <p className="md:col-span-2 text-sm text-red-300">
              {leadError}
            </p>
          )}
        </form>
      </section>

      <ShareButtons profile={result.dominantProfile} />
    </main>
  );
}
