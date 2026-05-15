import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {

  const body = await request.json();

  const { answers, profile, score } = body;

  const prompt = `
Vous êtes un analyste spécialisé en psychologie de la personnalité.

Une personne vient de compléter un test de personnalité.

Score global de personnalité : ${score}%
Profil dominant : ${profile}

Réponses au test :
${(answers || []).join("\n")}

MISSION

Rédiger une analyse courte et utile expliquant ce que révèle ce score et ce profil.

RÈGLES IMPORTANTES

- Adressez-vous directement à la personne ("vous").
- Le score ${score}% doit apparaître clairement dans votre analyse.
- Expliquez ce que signifie un score de ${score}% pour son fonctionnement psychologique.
- Mentionnez les principales forces associées au profil ${profile}.
- Ajoutez une piste d’évolution ou de réflexion.
- Ton professionnel, clair et bienveillant.
- Texte naturel et crédible.
- Maximum : 70 à 90 mots.

STRUCTURE

Analyse

Expliquez ce que signifie un score de ${score}% dans la manière de penser,
d’analyser les situations et de prendre des décisions.

Terminez par une ouverture expliquant que certaines dynamiques personnelles
peuvent être liées à des facteurs plus profonds comme :

- la personnalité
- l’histoire de vie
- les cycles personnels
- les motivations profondes

Mentionnez que le Cabinet Astrae propose une analyse plus approfondie
pour explorer ces mécanismes, notamment grâce à l’étude du thème astral.
`;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      analysis:
        "Votre profil révèle une personnalité structurée, capable d'analyser les situations et de prendre des décisions réfléchies. Votre potentiel s'exprime particulièrement lorsque vous associez votre vision à une organisation claire de vos priorités."
    });
  }

  try {

    const response = await fetch("https://api.openai.com/v1/chat/completions", {

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

    });

    const data = await response.json();

    const analysis =
      data.choices?.[0]?.message?.content ??
      "Votre analyse personnalisée est en cours de génération.";

    return NextResponse.json({ analysis });

  } catch {

    return NextResponse.json({
      analysis:
        "Votre profil montre une personnalité capable de combiner réflexion, intuition et adaptation. Vous gagnez à clarifier vos priorités et transformer vos idées en actions concrètes."
    });

  }

}
