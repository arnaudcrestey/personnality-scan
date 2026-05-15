import { Profile } from "../lib/quiz";

type ResultCardProps = {
  profile: Profile;
  score: number;
};

export function ResultCard({ profile, score }: ResultCardProps) {
  return (
    <article className="glass-card p-6">
      <p className="text-sm uppercase tracking-[0.18em] text-neon">Votre résultat</p>
      <h2 className="mt-3 text-2xl font-bold md:text-3xl">{profile}</h2>
      <p className="mt-4 text-white/80">Score global de personnalité</p>
      <p className="mt-1 text-5xl font-bold text-neon">{score}/100</p>
    </article>
  );
}
