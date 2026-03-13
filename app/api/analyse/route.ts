import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {

  const body = await request.json();

  const { answers, profile, score } = body as {
    answers: string[];
    profile: string;
    score: number;
  };

  const prompt = `
Vous êtes un expert en psychologie de la personnalité.

Votre mission est de fournir une analyse claire et crédible
à partir d’un test de personnalité basé sur 10 questions.

INFORMATIONS

Profil dominant : ${profile}
Score psychologique : ${score} %

Réponses au questionnaire :
${(answers || []).join("\n")}

RÈGLES

- Adressez-vous directement à la personne ("vous").
- Ne parlez jamais de "la personne".
- Mentionnez clairement le score : ${score}%.
- Restez naturel et facile à lire.
- Maximum : 70 mots.

OBJECTIF

Expliquez brièvement :

- ce que révèle ce score
- les forces principales du profil ${profile}
- une dynamique psychologique possible

Terminez par une phrase ouvrant vers une réflexion personnelle.
`;

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      analysis:
        "Votre profil indique une dynamique psychologique claire : vous combinez réflexion, perception des opportunités et adaptation au contexte. Avec un score de " +
        score +
        "%, vous montrez une capacité à analyser les situations tout en restant attentif à leur dimension humaine. Votre potentiel s’exprime particulièrement lorsque vous structurez vos priorités et avancez avec constance."
    });
  }

  try {

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 180
        })
      }
    );

    if (!response.ok) {
      throw new Error("OpenAI call failed");
    }

    const data = await response.json();

    const analysis =
      data.choices?.[0]?.message?.content?.trim() ||
      "Analyse indisponible.";

    return NextResponse.json({ analysis });

  } catch {

    return NextResponse.json({
      analysis:
        "Avec un score de " +
        score +
        "%, votre profil suggère une personnalité capable de combiner analyse, intuition et adaptation. Votre manière de réfléchir vous permet d’identifier rapidement les enjeux essentiels d’une situation. Vous gagnez à transformer cette capacité d’analyse en décisions concrètes en clarifiant régulièrement vos priorités."
    });

  }

}
