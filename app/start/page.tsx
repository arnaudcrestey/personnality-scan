import type { Metadata } from "next";
import { Quiz } from "../../components/Quiz";

export const metadata: Metadata = {
  title: "Quel est votre profil psychologique ? | Personality Scan",
  description:
    "Découvrez votre profil psychologique en 2 minutes grâce à un diagnostic rapide, clair et visuel.",
  openGraph: {
    title: "Quel est votre profil psychologique ?",
    description:
      "Découvrez votre profil psychologique en 2 minutes grâce à un diagnostic rapide, clair et visuel.",
    url: "https://personnality-scan.vercel.app/start",
    siteName: "Personality Scan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quel est votre profil psychologique ?",
    description:
      "Découvrez votre profil psychologique en 2 minutes grâce à un diagnostic rapide, clair et visuel.",
  },
};

export default function StartPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <Quiz />
    </main>
  );
}
