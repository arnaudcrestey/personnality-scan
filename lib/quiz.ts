export const PROFILES = [
  "Le Stratège",
  "Le Visionnaire",
  "L'Explorateur",
  "L'Analyste",
  "Le Médiateur"
] as const;

export type Profile = (typeof PROFILES)[number];

type ProfileWeights = Record<Profile, number>;

export type QuizOption = {
  label: string;
  text: string;
  value: number;
  profileBoost: ProfileWeights;
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: QuizOption[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Vous devez prendre une décision importante.",
    options: [
      { label: "A", text: "J'analyse toutes les données.", value: 9, profileBoost: { "Le Stratège": 3, "Le Visionnaire": 0, "L'Explorateur": 0, "L'Analyste": 2, "Le Médiateur": 0 } },
      { label: "B", text: "Je fais confiance à mon intuition.", value: 8, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 3, "L'Explorateur": 1, "L'Analyste": 0, "Le Médiateur": 1 } },
      { label: "C", text: "Je demande des avis extérieurs.", value: 7, profileBoost: { "Le Stratège": 1, "Le Visionnaire": 0, "L'Explorateur": 0, "L'Analyste": 1, "Le Médiateur": 3 } }
    ]
  },
  {
    id: 2,
    question: "Dans un projet de groupe, votre réflexe est...",
    options: [
      { label: "A", text: "Structurer le plan d'action.", value: 8, profileBoost: { "Le Stratège": 3, "Le Visionnaire": 1, "L'Explorateur": 0, "L'Analyste": 1, "Le Médiateur": 0 } },
      { label: "B", text: "Proposer une vision ambitieuse.", value: 8, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 3, "L'Explorateur": 1, "L'Analyste": 0, "Le Médiateur": 1 } },
      { label: "C", text: "Maintenir l'énergie de l'équipe.", value: 7, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 1, "L'Explorateur": 1, "L'Analyste": 0, "Le Médiateur": 3 } }
    ]
  },
  {
    id: 3,
    question: "Face à l'inconnu, vous...",
    options: [
      { label: "A", text: "Élaborez un scénario sécurisé.", value: 8, profileBoost: { "Le Stratège": 3, "Le Visionnaire": 0, "L'Explorateur": 0, "L'Analyste": 2, "Le Médiateur": 0 } },
      { label: "B", text: "Imaginez les opportunités cachées.", value: 9, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 3, "L'Explorateur": 2, "L'Analyste": 0, "Le Médiateur": 0 } },
      { label: "C", text: "Plongez directement pour apprendre.", value: 8, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 1, "L'Explorateur": 3, "L'Analyste": 0, "Le Médiateur": 1 } }
    ]
  },
  {
    id: 4,
    question: "Ce qui vous fatigue le plus ?",
    options: [
      { label: "A", text: "Le manque d'organisation.", value: 8, profileBoost: { "Le Stratège": 3, "Le Visionnaire": 0, "L'Explorateur": 0, "L'Analyste": 2, "Le Médiateur": 0 } },
      { label: "B", text: "La routine répétitive.", value: 8, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 3, "L'Explorateur": 2, "L'Analyste": 0, "Le Médiateur": 0 } },
      { label: "C", text: "Les tensions entre personnes.", value: 7, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 0, "L'Explorateur": 0, "L'Analyste": 1, "Le Médiateur": 3 } }
    ]
  },
  {
    id: 5,
    question: "Quand vous apprenez quelque chose de nouveau...",
    options: [
      { label: "A", text: "Vous cherchez la méthode optimale.", value: 8, profileBoost: { "Le Stratège": 2, "Le Visionnaire": 0, "L'Explorateur": 0, "L'Analyste": 3, "Le Médiateur": 0 } },
      { label: "B", text: "Vous testez librement plusieurs approches.", value: 8, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 2, "L'Explorateur": 3, "L'Analyste": 0, "Le Médiateur": 0 } },
      { label: "C", text: "Vous échangez avec d'autres pour progresser.", value: 7, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 1, "L'Explorateur": 1, "L'Analyste": 0, "Le Médiateur": 3 } }
    ]
  },
  {
    id: 6,
    question: "Votre plus grande force est...",
    options: [
      { label: "A", text: "La clarté stratégique.", value: 9, profileBoost: { "Le Stratège": 3, "Le Visionnaire": 0, "L'Explorateur": 0, "L'Analyste": 1, "Le Médiateur": 0 } },
      { label: "B", text: "La capacité à inspirer.", value: 8, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 3, "L'Explorateur": 1, "L'Analyste": 0, "Le Médiateur": 1 } },
      { label: "C", text: "L'écoute et l'harmonie.", value: 7, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 0, "L'Explorateur": 0, "L'Analyste": 1, "Le Médiateur": 3 } }
    ]
  },
  {
    id: 7,
    question: "Pour résoudre un conflit, vous...",
    options: [
      { label: "A", text: "Cherchez la logique et les faits.", value: 8, profileBoost: { "Le Stratège": 2, "Le Visionnaire": 0, "L'Explorateur": 0, "L'Analyste": 3, "Le Médiateur": 0 } },
      { label: "B", text: "Faites émerger une solution créative.", value: 8, profileBoost: { "Le Stratège": 1, "Le Visionnaire": 3, "L'Explorateur": 1, "L'Analyste": 0, "Le Médiateur": 0 } },
      { label: "C", text: "Recherchez un terrain d'entente.", value: 7, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 0, "L'Explorateur": 0, "L'Analyste": 1, "Le Médiateur": 3 } }
    ]
  },
  {
    id: 8,
    question: "Votre environnement idéal ressemble à...",
    options: [
      { label: "A", text: "Un cadre structuré et efficace.", value: 8, profileBoost: { "Le Stratège": 3, "Le Visionnaire": 0, "L'Explorateur": 0, "L'Analyste": 2, "Le Médiateur": 0 } },
      { label: "B", text: "Un espace libre et stimulant.", value: 8, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 2, "L'Explorateur": 3, "L'Analyste": 0, "Le Médiateur": 0 } },
      { label: "C", text: "Un lieu humain et collaboratif.", value: 7, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 1, "L'Explorateur": 0, "L'Analyste": 0, "Le Médiateur": 3 } }
    ]
  },
  {
    id: 9,
    question: "Votre style de décision est plutôt...",
    options: [
      { label: "A", text: "Rationnel et comparatif.", value: 8, profileBoost: { "Le Stratège": 2, "Le Visionnaire": 0, "L'Explorateur": 0, "L'Analyste": 3, "Le Médiateur": 0 } },
      { label: "B", text: "Rapide et intuitif.", value: 8, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 3, "L'Explorateur": 2, "L'Analyste": 0, "Le Médiateur": 0 } },
      { label: "C", text: "Équilibré et concerté.", value: 7, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 0, "L'Explorateur": 0, "L'Analyste": 1, "Le Médiateur": 3 } }
    ]
  },
  {
    id: 10,
    question: "Dans 5 ans, vous voulez surtout...",
    options: [
      { label: "A", text: "Avoir bâti un système performant.", value: 9, profileBoost: { "Le Stratège": 3, "Le Visionnaire": 0, "L'Explorateur": 0, "L'Analyste": 2, "Le Médiateur": 0 } },
      { label: "B", text: "Concrétiser une vision audacieuse.", value: 9, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 3, "L'Explorateur": 1, "L'Analyste": 0, "Le Médiateur": 1 } },
      { label: "C", text: "Évoluer dans des relations enrichissantes.", value: 8, profileBoost: { "Le Stratège": 0, "Le Visionnaire": 0, "L'Explorateur": 0, "L'Analyste": 0, "Le Médiateur": 3 } }
    ]
  }
];

export type QuizResult = {
  answers: string[];
  score: number;
  dominantProfile: Profile;
  profileScores: Record<Profile, number>;
};

export function computeQuizResult(answerIndexes: number[]): QuizResult {
  const profileScores = Object.fromEntries(
    PROFILES.map((profile) => [profile, 0])
  ) as Record<Profile, number>;

  const answers: string[] = [];
  let total = 0;

  answerIndexes.forEach((answerIndex, idx) => {
    const option = QUIZ_QUESTIONS[idx]?.options[answerIndex];
    if (!option) {
      return;
    }

    answers.push(`${QUIZ_QUESTIONS[idx].question} => ${option.text}`);
    total += option.value;

    PROFILES.forEach((profile) => {
      profileScores[profile] += option.profileBoost[profile] ?? 0;
    });
  });

  const maxScore = QUIZ_QUESTIONS.length * 10;
  const score = Math.min(100, Math.round((total / maxScore) * 100));

  const dominantProfile = PROFILES.reduce((best, current) =>
    profileScores[current] > profileScores[best] ? current : best
  );

  return { answers, score, dominantProfile, profileScores };
}
