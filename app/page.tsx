import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/images/logo.png";

export default function Home() {
  return (
    <div className="flex flex-col justify-between min-h-[100dvh]">
      <main className="">
        <Link
          href={"/home"}
          className="absolute top-2 left-10 z-[100] flex justify-center items-center"
        >
          <Image src={logo} alt="logo" width={60} height={60} />
          <h1 className="text-3xl font-bold [text-shadow:_1px_1px_1px_rgb(255_0_255_/_40%)]">
            Vocablaze
          </h1>
        </Link>
      </main>
      <footer className="flex bg-slate-800 text-white flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs">
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
