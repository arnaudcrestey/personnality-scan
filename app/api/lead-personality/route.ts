import nodemailer from "nodemailer";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      firstName,
      email,
      birthDay,
      birthMonth,
      birthYear,
      birthHour,
      birthMinute,
      birthCity,
      score,
      profile
    } = body;

    // 🔥 PROMPT IA (amélioré)
    const prompt = `
Vous êtes un expert en psychologie de la personnalité.

Profil détecté : ${profile}
Score : ${score}%

Rédigez une analyse claire, professionnelle et utile (80 mots maximum).

- Adressez-vous directement à la personne ("vous")
- Mettez en avant ses forces
- Ajoutez une piste d'évolution
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    const analysis = completion.choices[0].message.content || "Analyse indisponible.";

    // 🔥 MAILER
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // 🔥 HTML PRO
    const htmlContent = `
      <h2>🧠 Nouveau lead Personality Scan</h2>
      <p>Un utilisateur vient de compléter le diagnostic.</p>

      <hr/>

      <h3>👤 Informations</h3>
      <p><strong>Prénom :</strong> ${firstName}</p>
      <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>

      <hr/>

      <h3>📊 Résultat</h3>
      <p><strong>Score :</strong> ${score}%</p>
      <p><strong>Profil :</strong> ${profile}</p>
      <p><strong>Niveau :</strong> ${
        score > 70 ? "Élevé" : score > 40 ? "Moyen" : "À renforcer"
      }</p>

      <hr/>

      <h3>🪐 Données personnelles</h3>
      <ul>
        <li><strong>Date :</strong> ${birthDay}/${birthMonth}/${birthYear}</li>
        <li><strong>Heure :</strong> ${birthHour || "--"}:${birthMinute || "--"}</li>
        <li><strong>Ville :</strong> ${birthCity}</li>
      </ul>

      <hr/>

      <h3>🧠 Analyse IA</h3>
      <p style="white-space:pre-line;">${analysis}</p>

      <hr/>

      <p>
        <a href="mailto:${email}" 
           style="background:#06b6d4;color:white;padding:10px 15px;border-radius:8px;text-decoration:none;">
          Contacter ce lead
        </a>
      </p>

      <p style="margin-top:20px;font-size:12px;color:#888;">
        Lead généré via Personality Scan — Cabinet Astrae
      </p>
    `;

    await transporter.sendMail({
      from: `"Personality Scan - Cabinet Astrae" <${process.env.EMAIL_USER}>`,
      to: "contact@cabinet-astrae.fr",
      subject: "🧠 Nouveau lead Personality Scan",
      html: htmlContent
    });

    return NextResponse.json({ success: true });

  } catch (error) {

    console.error("Erreur API :", error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );

  }
}
