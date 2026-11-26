import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI UX & Capability Teardown Lab | Independent Evaluation Benchmark",
  description:
    "Executive benchmark evaluating Notion AI, Perplexity Pro, and ElevenLabs across usability friction, AI capability boundaries, and cross-cultural trust.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAFAFA] text-zinc-950 antialiased selection:bg-zinc-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
