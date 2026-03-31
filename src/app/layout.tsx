import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Bark.ai - KI-Sprachübersetzung für Hunde",
  description:
    "Der weltweit erste KI-gestützte Mensch-zu-Hund Sprachübersetzer. Sprich Hund. Mit KI. Powered by BarkEngine v2.1.",
  openGraph: {
    title: "Bark.ai - Sprich Hund. Mit KI.",
    description:
      "Der weltweit erste KI-gestützte Mensch-zu-Hund Sprachübersetzer. Powered by BarkEngine v2.1.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${outfit.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="noise-bg min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <div className="relative z-10 flex flex-col min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
