import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Virpus - Virtual Library for Viral Purpose",
  description: "Baca. Bayangkan. Viralkan. AI-powered platform untuk Gen Z",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
