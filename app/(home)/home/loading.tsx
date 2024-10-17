import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-120px)] w-full flex-col gap-4 p-4 lg:flex-row">
      {/* Left Column */}
      <div className="flex flex-col gap-4 lg:w-1/3">
        {/* Latest Learning Section */}
        <section className="h-full rounded-lg bg-black/5 p-5 shadow-md backdrop-blur-xl dark:bg-slate-900/90">
          <div className="mb-4 flex justify-between">
            <Skeleton className="h-8 w-48 rounded" />
            <Skeleton className="h-8 w-24 rounded" />
          </div>
          {/* Word Sets List Skeleton */}
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-full rounded" />
            ))}
          </div>
        </section>

        {/* Premium Access Section (visible only on large screens) */}
        <section className="relative hidden rounded-lg bg-black/5 p-5 shadow-md backdrop-blur-xl dark:bg-slate-900/90 lg:block">
          <Skeleton className="mb-2 h-8 w-40 rounded" />
          <Skeleton className="mb-4 h-4 w-full rounded" />
          <Skeleton className="h-10 w-48 rounded" />
        </section>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-4 lg:w-2/3">
        {/* Learning History Section (visible only on large screens) */}
        <section className="relative hidden size-full max-h-[350px] rounded-lg bg-black/5 p-5 shadow-md backdrop-blur-xl dark:bg-slate-900/90 lg:block">
          <Skeleton className="mb-4 h-8 w-64 rounded" />
          <Skeleton className="h-40 w-full rounded" />
        </section>

        {/* Middle Section: Monthly Trends and Folders */}
        <section className="flex h-full flex-col gap-4 lg:flex-row">
          {/* Monthly Trends */}
          <div className="relative size-full gap-4 lg:w-1/3">
            <div className="hidden h-full flex-col rounded-lg bg-black/5 p-5 shadow-md backdrop-blur-xl dark:bg-slate-900/90 lg:flex">
              <Skeleton className="mb-4 h-8 w-48 rounded" />
              <Skeleton className="h-40 w-full rounded" />
            </div>
          </div>

          {/* Folders Section */}
          <div className="relative w-full lg:w-2/3">
            <div className="h-full rounded-lg bg-black/5 p-5 shadow-md backdrop-blur-xl dark:bg-slate-900/90">
              <div className="mb-4 flex justify-between">
                <Skeleton className="h-8 w-32 rounded" />
                <Skeleton className="h-8 w-24 rounded" />
              </div>
              {/* Folders List Skeleton */}
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-6 w-full rounded" />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
