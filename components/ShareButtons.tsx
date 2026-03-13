"use client";

import { useMemo } from "react";

type ShareButtonsProps = {
  profile: string;
};

export function ShareButtons({ profile }: ShareButtonsProps) {
  const shareData = useMemo(() => {
    const url = typeof window !== "undefined" ? window.location.origin : "";
    const text = `Je viens de découvrir mon profil de personnalité (${profile}). Faites le test ici.`;
    return { url, text };
  }, [profile]);

  const links = [
    {
      name: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${shareData.text} ${shareData.url}`)}`
    }
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold">Partager votre résultat</h3>
      <div className="mt-4 flex flex-wrap gap-3">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-neon/50 px-4 py-2 text-sm font-semibold text-neon hover:bg-neon/20"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
