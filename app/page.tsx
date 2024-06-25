import { JSX, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

import heroImg from "../public/assets/images/hero-image.jpg";
import { Navbar } from "./(protected)/_components/navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <div className="w-full px-4 bg-transparent">
        <Navbar />
      </div>
      <main className="">
        <section className="w-full flex banner-custom bg-primary text-primary-foreground">
          <div className="flex justify-center items-center w-1/2">
            <div className="container flex px-4 md:px-10">
              <div className="">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex flex-col gap-4 w-4/5">
                    <div>
                      <h1 className="text-3xl font-bold text-balance tracking-tighter sm:text-5xl xl:text-6xl/none">
                        Learn Languages{" "}
                        <span className="[text-shadow:_3px_3px_3px_rgb(0_0_255_/_30%)]">
                          Interactively
                        </span>
                      </h1>
                      <div className="w-[340px] h-2 bg-indigo-500 translate-y-3 rounded-full rotate-[-2deg]" />
                      <div className="w-[350px] h-2 bg-black rounded-full translate-y-3 translate-x-2 rotate-[-2deg]" />
                    </div>

                    <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                      Unlock your language learning potential with our
                      interactive games and tools. Create custom word sets,
                      practice with flashcards, and challenge yourself with
                      hangman.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row w-4/5">
                    <LoginButton className="w-1/2">
                      <Button variant="secondary" className="w-full">
                        Sign in
                      </Button>
                    </LoginButton>
                    <Link
                      href="#"
                      className="inline-flex h-10 w-1/2 items-center justify-center rounded-md border border-input bg-primary text-primary-foreground px-8 text-sm font-medium shadow-sm transition-colors hover:bg-primary-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      Pricing
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <Image
              src={heroImg}
              alt="Hero"
              className="w-full h-full max-h-[850px]"
            />
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Interactive Learning
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Unlock Your Language Potential
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our language learning platform offers a variety of interactive
                  features to help you master new languages efficiently and
                  enjoyably.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Flashcards"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Flashcards</h3>
                  <p className="text-muted-foreground">
                    Practice vocabulary with customizable flashcards. Create
                    your own word sets or use our pre-made decks.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Matching Tiles</h3>
                  <p className="text-muted-foreground">
                    Test your memory with our interactive matching game. Match
                    words to their translations for a fun and engaging practice
                    session.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Hangman</h3>
                  <p className="text-muted-foreground">
                    Challenge yourself with the classic hangman game, now
                    tailored for language learning. Guess the word before the
                    hangman is complete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted banner-custom-180"
        >
          <div className="container flex flex-col gap-y-6 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Unlock More Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that best suits your language learning needs.
                  Upgrade to our premium access for additional features and
                  unlimited word sets.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-4 rounded-3xl md:grid-cols-2">
              <div className="grid gap-6 rounded-xl p-8 md:p-10 bg-white/30 backdrop-blur-xl">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="text-muted-foreground">
                    Get started with our basic features.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Create custom word sets
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Practice with flashcards
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Play matching tiles game
                  </li>
                  <li>
                    <XIcon className="mr-2 inline-block h-4 w-4 text-red-500" />
                    Unlimited word sets
                  </li>
                  <li>
                    <XIcon className="mr-2 inline-block h-4 w-4 text-red-500" />
                    Play hangman game
                  </li>
                </ul>
                <Button className="w-full">Start for Free</Button>
              </div>
              <div className="grid gap-6 rounded-3xl p-8 md:p-10 bg-white/30 backdrop-blur-xl">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <p className="text-muted-foreground">
                    Unlock all features for advanced learning.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Create custom word sets
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Practice with flashcards
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Play matching tiles game
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Unlimited word sets
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Play hangman game
                  </li>
                </ul>
                <Button className="w-full">Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-background">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Language Learning. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function LanguagesIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  );
}

function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
