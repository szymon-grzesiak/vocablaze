import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="content full-screen-card relative mx-auto w-full max-w-[650px] overflow-hidden rounded-[2rem] bg-white/80 p-8 shadow-xl backdrop-blur-2xl dark:bg-slate-900/90">
        {/* Popover Trigger (Ellipsis) */}
        <Skeleton className="absolute left-0 top-0 ml-2 mt-5 h-8 w-8 rounded-full" />

        {/* Top-Right Progress Indicator */}
        <Skeleton className="absolute right-4 top-4 h-8 w-8 rounded-full" />

        {/* Main card content placeholder */}
        <div className="flex h-[300px] items-center justify-center">
          <Skeleton className="h-10 w-36 rounded" />
        </div>

        {/* Footer Buttons: Back, and Left/Right icons */}
        <div className="mt-4 flex w-full items-center justify-between">
          <Skeleton className="h-10 w-20 rounded" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
