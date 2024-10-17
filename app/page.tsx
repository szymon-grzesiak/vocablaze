import logo from "@/public/assets/images/logo.png";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col justify-between">
      <main className="">
        <Link
          href={"/home"}
          className="absolute left-10 top-2 z-[100] flex items-center justify-center"
        >
          <Image src={logo} alt="logo" width={60} height={60} />
          <h1 className="text-3xl font-bold [text-shadow:_1px_1px_1px_rgb(255_0_255_/_40%)]">
            Vocablaze
          </h1>
        </Link>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t bg-slate-800 px-4 py-6 text-white sm:flex-row md:px-6">
        <p className="text-xs">
          &copy; 2024 Language Learning. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            href="#"
            className="text-xs underline-offset-4 hover:underline"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs underline-offset-4 hover:underline"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
