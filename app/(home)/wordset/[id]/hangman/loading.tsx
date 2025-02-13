import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="content relative mx-auto min-h-[656px] w-full max-w-[850px] overflow-hidden rounded-[2rem] bg-white/80 px-2 py-6 shadow-xl backdrop-blur-2xl dark:bg-slate-900/90 md:px-6">
      {/* Top-right progress skeleton (WordProgress) */}
      <Skeleton className="absolute right-0 top-0 m-2 h-10 w-10 rounded-full" />

      {/* Top-left back button skeleton */}
      <Skeleton className="absolute left-[10px] top-[10px] h-10 w-10 rounded-full" />

      {/* Main card content */}
      <div className="mt-10 flex h-full flex-col items-center justify-between">
        {/* Text placeholders (for instructions, guessed wrong, etc.) */}
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-5 w-48 rounded" />
          <Skeleton className="h-5 w-64 rounded" />
          <Skeleton className="h-5 w-36 rounded" />
        </div>

        {/* Placeholder for guessed word */}
        <Skeleton className="mt-5 h-8 w-[70%] rounded" />

      </div>
    </div>
  );
}
