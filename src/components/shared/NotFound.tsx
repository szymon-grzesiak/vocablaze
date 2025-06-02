import emptyListImage from "@/assets/images/no-results.png";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NotFound = ({ message = 'Unfortunately, page was not found.' }: { message?: string }) => {
  return (
    <div className="flex h-screen flex-col items-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-bold [text-shadow:_1px_1px_1px_rgb(0_0_255_/_40%)]">
          {message}
        </h1>
      </div>
      <Image
        src={emptyListImage}
        alt="Page not found"
        width={400}
        height={400}
      />
      <Link
        href="/home"
        className="flex gap-3 rounded-xl bg-slate-300 px-6 py-3 hover:opacity-80"
      >
        <ArrowLeft className="animate-bounce-horizontal dark:text-black" />
        <div className="text-black">Go back</div>
      </Link>
    </div>
  );
};

export default NotFound;
