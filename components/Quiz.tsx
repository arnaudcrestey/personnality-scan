"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { computeQuizResult, QUIZ_QUESTIONS } from "../lib/quiz";
import { ProgressBar } from "./ProgressBar";

export function Quiz() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const question = QUIZ_QUESTIONS[currentIndex];
  const isLast = currentIndex === QUIZ_QUESTIONS.length - 1;
  const current = useMemo(() => currentIndex + 1, [currentIndex]);

  const onSelect = (optionIndex: number) => {
    const nextAnswers = [...answers, optionIndex];
    setAnswers(nextAnswers);

    if (isLast) {
      const result = computeQuizResult(nextAnswers);
      localStorage.setItem("personality_score", String(result.score));
      localStorage.setItem("personality_result", JSON.stringify(result));
      router.push("/result");
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <section className="glass-card w-full max-w-3xl p-6 md:p-10">
      <ProgressBar current={current} total={QUIZ_QUESTIONS.length} />

      <h2 className="mt-8 text-xl font-semibold md:text-2xl">{question.question}</h2>
      <div className="mt-6 grid gap-4">
        {question.options.map((option, idx) => (
          <button
            key={option.label}
            onClick={() => onSelect(idx)}
            className="rounded-xl border border-white/15 bg-white/5 p-4 text-left transition hover:border-neon/60 hover:bg-neon/10"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-neon">{option.label}</p>
            <p className="mt-1 text-base text-white/90">{option.text}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
