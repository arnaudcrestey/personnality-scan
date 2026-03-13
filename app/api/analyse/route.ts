import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();
  const { answers, profile } = body as { answers: string[]; profile: string; score: number };

  const prompt = `You are a personality analyst. Based on the quiz answers and the detected personality profile, write a short analysis (80 words) explaining the person's psychological functioning and decision-making style.\n\nProfile: ${profile}\nAnswers:\n${(answers || []).join("\n")}`;

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      analysis:
        "Votre profil indique une dynamique psychologique claire : vous combinez réflexion, perception des opportunités et adaptation au contexte. Vous prenez vos décisions en équilibrant logique, ressenti et impact relationnel. Cette flexibilité vous permet d'évoluer dans des situations complexes tout en gardant un cap cohérent. Votre potentiel se révèle particulièrement lorsque vous structurez vos priorités et agissez avec constance."
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
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 180
      })
    });

    if (!response.ok) {
      throw new Error("Failed to call OpenAI");
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({ analysis });
  } catch {
    return NextResponse.json(
      {
        analysis:
          "Votre mode de fonctionnement suggère une personnalité orientée vers la compréhension fine des enjeux avant action. Vous cherchez un équilibre entre projection, efficacité et cohérence émotionnelle. Dans vos décisions, vous gagnez à associer votre intuition à des repères concrets. Cette combinaison vous rend pertinent dans les contextes exigeants. Pour amplifier vos résultats, clarifiez vos priorités clés et transformez vos intentions en routines simples et régulières."
      },
      { status: 200 }
    );
  }
}
