import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="mx-auto flex w-full flex-wrap gap-6 p-6 lg:w-1/2">
      {/* Settings Section Skeleton */}
      <div className="w-full rounded-md bg-black/5 p-6 shadow-md backdrop-blur-xl dark:bg-slate-900/90">
        <Skeleton className="mb-4 h-6 w-32 rounded" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-3/4 rounded" />
          ))}
        </div>
        <Skeleton className="mt-4 h-10 w-32 rounded" />
      </div>
      {/* Mobile-only: Learning History Calendar */}
      <section className="relative block h-[400px] w-full rounded-lg bg-black/5 p-5 shadow-md backdrop-blur-xl dark:bg-slate-900/90 lg:hidden">
        <Skeleton className="mb-4 h-6 w-48 rounded" />
        <Skeleton className="mx-auto h-40 w-full rounded" />
      </section>

      {/* Mobile-only: Monthly Trends */}
      <section className="w-full lg:hidden" id="monthlyTrends">
        <div className="flex h-full flex-col gap-4 rounded-lg bg-black/5 p-5 shadow-md backdrop-blur-xl dark:bg-slate-900/90">
          <Skeleton className="h-6 w-48 rounded" />
          <Skeleton className="h-40 w-full rounded" />
        </div>
      </section>
    </div>
  );
}
