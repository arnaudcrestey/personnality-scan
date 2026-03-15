import nodemailer from "nodemailer";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {

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

  const prompt = `
Vous êtes un expert en psychologie de la personnalité.

Profil : ${profile}
Score : ${score}%

Rédigez une analyse courte (80 mots) expliquant ce profil.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  const analysis = completion.choices[0].message.content;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const message = `
Analyse Personality Scan

Prénom : ${firstName}
Email : ${email}

Date de naissance :
${birthDay}/${birthMonth}/${birthYear}
${birthHour}:${birthMinute}
Ville : ${birthCity}

Profil : ${profile}
Score : ${score}%

Analyse :

${analysis}
`;

  await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: "arnaud.crestey14@gmail.com",
  subject: "Nouvelle analyse Personality Scan",
  text: message
});

  return NextResponse.json({ success: true });
}
