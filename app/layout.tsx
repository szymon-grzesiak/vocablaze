import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import ThemeProvider from "@/context/ThemeProvider";
import { NextUIProvider } from "@nextui-org/react";

import "./globals.css";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "---font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "---font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Blackfyre - Language Learning Made Fun",
  description:
    "Blackfyre is an innovative language learning app that uses flashcards and interactive games like hangman and word matching to make learning new languages engaging and enjoyable.",
  icons: {
    icon: "/assets/images/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
          <Toaster />
          <NextUIProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </NextUIProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
