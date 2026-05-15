import nodemailer from "nodemailer";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const firstName = String(body.firstName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const birthDay = String(body.birthDay ?? "").trim();
    const birthMonth = String(body.birthMonth ?? "").trim();
    const birthYear = String(body.birthYear ?? "").trim();
    const birthHour = String(body.birthHour ?? "").trim();
    const birthMinute = String(body.birthMinute ?? "").trim();
    const birthCity = String(body.birthCity ?? "").trim();
    const profile = String(body.profile ?? "").trim();
    const rawScore = body.score;

    const score =
      typeof rawScore === "number"
        ? rawScore
        : Number(String(rawScore ?? "").trim());

    if (
      firstName.length < 2 ||
      !/\S+@\S+\.\S+/.test(email) ||
      birthDay.length < 1 ||
      birthMonth.length < 1 ||
      birthYear.length !== 4 ||
      birthCity.length < 2 ||
      Number.isNaN(score) ||
      !profile
    ) {
      return NextResponse.json(
        { success: false, error: "Données incomplètes." },
        { status: 400 }
      );
    }

    if (
      !process.env.OPENAI_API_KEY ||
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.LEAD_EMAIL
    ) {
      console.error("Missing environment variables", {
        hasOpenAI: Boolean(process.env.OPENAI_API_KEY),
        hasSmtpHost: Boolean(process.env.SMTP_HOST),
        hasSmtpPort: Boolean(process.env.SMTP_PORT),
        hasSmtpUser: Boolean(process.env.SMTP_USER),
        hasSmtpPass: Boolean(process.env.SMTP_PASS),
        hasLeadEmail: Boolean(process.env.LEAD_EMAIL),
      });

      return NextResponse.json(
        { success: false, error: "Configuration serveur incomplète." },
        { status: 500 }
      );
    }

    const prompt = `
Vous êtes un expert en psychologie de la personnalité.

Profil détecté : ${profile}
Score : ${score}%

Rédigez une analyse claire, professionnelle et utile (80 mots maximum).

- Adressez-vous directement à la personne ("vous")
- Mettez en avant ses forces
- Ajoutez une piste d'évolution
`.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const analysis =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Analyse indisponible.";

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();

    const level =
      score > 70 ? "Élevé" : score > 40 ? "Moyen" : "À renforcer";

    const safeBirthTime =
      [birthHour || "--", birthMinute || "--"].join(":");

    const htmlContent = `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111;max-width:640px;margin:0 auto;padding:24px;">
        <h2 style="margin:0 0 16px 0;">🧠 Nouveau lead Personality Scan</h2>
        <p style="margin:0 0 20px 0;">Un utilisateur vient de compléter le diagnostic.</p>

        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />

        <h3 style="margin:0 0 12px 0;">👤 Informations</h3>
        <p style="margin:0 0 8px 0;"><strong>Prénom :</strong> ${firstName}</p>
        <p style="margin:0 0 8px 0;"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>

        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />

        <h3 style="margin:0 0 12px 0;">📊 Résultat</h3>
        <p style="margin:0 0 8px 0;"><strong>Score :</strong> ${score}%</p>
        <p style="margin:0 0 8px 0;"><strong>Profil :</strong> ${profile}</p>
        <p style="margin:0 0 8px 0;"><strong>Niveau :</strong> ${level}</p>

        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />

        <h3 style="margin:0 0 12px 0;">🪐 Données personnelles</h3>
        <ul style="padding-left:18px;margin:0;">
          <li><strong>Date :</strong> ${birthDay}/${birthMonth}/${birthYear}</li>
          <li><strong>Heure :</strong> ${safeBirthTime}</li>
          <li><strong>Ville :</strong> ${birthCity}</li>
        </ul>

        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />

        <h3 style="margin:0 0 12px 0;">🧠 Analyse IA</h3>
        <p style="white-space:pre-line;margin:0;">${analysis}</p>

        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />

        <p style="margin:0;">
          <a
            href="mailto:${email}"
            style="display:inline-block;background:#06b6d4;color:#fff;padding:10px 15px;border-radius:8px;text-decoration:none;"
          >
            Contacter ce lead
          </a>
        </p>

        <p style="margin-top:20px;font-size:12px;color:#888;">
          Lead généré via Personality Scan — Cabinet Astrae
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Personality Scan - Cabinet Astrae" <${process.env.SMTP_USER}>`,
      to: process.env.LEAD_EMAIL,
      replyTo: email,
      subject: "Nouveau lead Personality Scan",
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Erreur API Personality :", {
      message: error?.message,
      code: error?.code,
      status: error?.status,
      response: error?.response,
      stack: error?.stack,
    });

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}
