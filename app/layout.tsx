import { ReactNode } from "react";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/context/ThemeProvider";

import { Providers } from "./providers";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Vocablaze - Language Learning Made Fun",
  description:
    "Vocablaze is an innovative language learning app that uses flashcards and interactive games like hangman and word matching to make learning new languages engaging and enjoyable.",
  icons: {
    icon: "/assets/images/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
      <html lang="en">
        <body className={`${spaceGrotesk.className} h-full antialiased`}>
          <Toaster />
          <Providers>
            <ThemeProvider>{children}</ThemeProvider>
          </Providers>
        </body>
      </html>
  );
}
