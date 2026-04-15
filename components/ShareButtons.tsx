"use client";

import { useState } from "react";

type ShareButtonsProps = {
  profile: string;
};

export function ShareButtons({ profile }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/start`
      : "https://personnality-scan.vercel.app/start";

  const shareText = `J’ai découvert mon profil de personnalité avec Personality Scan : ${profile}. Découvrez votre propre profil en quelques minutes.`;

  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const whatsappUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <section className="glass-card p-6">
        <h3 className="mb-2 text-center text-2xl font-semibold text-white">
          Faire découvrir Personality Scan
        </h3>

        <p className="mx-auto mb-3 max-w-2xl text-center text-sm text-white/75">
          Partagez ce diagnostic avec une personne de votre entourage ou sur vos réseaux.
        </p>

        <p className="mb-5 text-center text-sm text-white/55">
          Cliquez sur un bouton pour partager ce test avec un message déjà préparé.
        </p>

        <div className="mx-auto mb-5 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
          <p className="mb-2 text-xs uppercase tracking-wide text-fuchsia-300">
            Aperçu du message envoyé
          </p>
          <p className="text-sm leading-relaxed text-white/80">
            {shareText}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10"
          >
            WhatsApp
          </a>

          <button
            onClick={copyMessage}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10"
          >
            {copied ? "Message copié ✓" : "Copier le message"}
          </button>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10"
          >
            Facebook
          </a>

          <a
            href={linkedInUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10"
          >
            LinkedIn
          </a>

          <a
            href={twitterUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10"
          >
            Twitter
          </a>
        </div>
      </section>

      {/* ===== SIGNATURE AC ===== */}
      <div className="mt-10 flex justify-center">
        <a
          href="https://arnaudcrestey.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center"
        >
          <span className="font-serif text-[34px] leading-none text-white/90 sm:text-[40px]">
            <span className="inline-block -mr-[0.14em]">A</span>
            <span className="inline-block">C</span>
          </span>

          <span className="mt-1 text-[14px] text-white/70 transition group-hover:text-white/90 sm:text-[15px]">
            arnaudcrestey.com
          </span>

          <span className="mt-2 h-px w-16 bg-white/20 transition group-hover:bg-white/40" />
        </a>
      </div>
    </>
  );
}
