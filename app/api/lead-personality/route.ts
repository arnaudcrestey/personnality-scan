import { NextResponse } from "next/server";

export const runtime = "nodejs";

type MailTransporter = {
  sendMail: (options: {
    from: string;
    to: string;
    replyTo: string;
    subject: string;
    text: string;
  }) => Promise<unknown>;
};

function getNodemailer() {
  const req = globalThis.eval("require") as (id: string) => unknown;
  return req("nodemailer") as {
    createTransport: (config: unknown) => MailTransporter;
  };
}

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, email, birthDate, birthTime, birthCity, score, profile } = body;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.LEAD_TO_EMAIL || process.env.SMTP_USER;

  if (!host || !user || !pass || !to) {
    return NextResponse.json({ error: "SMTP not configured" }, { status: 500 });
  }

  let transporter: MailTransporter;
  try {
    const nodemailer = getNodemailer();
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });
  } catch {
    return NextResponse.json(
      { error: "nodemailer package is required at runtime" },
      { status: 500 }
    );
  }

  await transporter.sendMail({
    from: `PERSONALITY SCAN <${user}>`,
    to,
    replyTo: email,
    subject: `LEAD PERSONALITY SCAN — Score ${score} — Profil ${profile}`,
    text: [
      `Prénom: ${firstName}`,
      `Email: ${email}`,
      `Date de naissance: ${birthDate}`,
      `Heure de naissance: ${birthTime}`,
      `Ville de naissance: ${birthCity}`,
      `Score: ${score}`,
      `Profil: ${profile}`
    ].join("\n")
  });

  return NextResponse.json({ ok: true });
}
