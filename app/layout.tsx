import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PERSONALITY SCAN",
  description: "Diagnostic de personnalité viral en 2 minutes"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
