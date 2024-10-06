// app/your-page/loading.tsx

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="h-[calc(100vh-120px)] flex flex-col lg:flex-row w-full gap-4 p-4">
      {/* Left Column */}
      <div className="flex flex-col lg:w-1/3 gap-4">
        {/* Latest Learning Section */}
        <section className="h-full rounded-lg bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md p-5">
          <div className="flex justify-between mb-4">
            <Skeleton className="w-48 h-8 rounded" />
            <Skeleton className="w-24 h-8 rounded" />
          </div>
          {/* Word Sets List Skeleton */}
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-6 rounded" />
            ))}
          </div>
        </section>

        {/* Premium Access Section (visible only on large screens) */}
        <section className="hidden lg:block relative p-5 bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md rounded-lg">
          <Skeleton className="w-40 h-8 mb-2 rounded" />
          <Skeleton className="w-full h-4 mb-4 rounded" />
          <Skeleton className="w-48 h-10 rounded" />
        </section>
      </div>

      {/* Right Column */}
      <div className="flex flex-col lg:w-2/3 gap-4">
        {/* Learning History Section (visible only on large screens) */}
        <section className="hidden lg:block relative h-full max-h-[350px] w-full bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md p-5 rounded-lg">
          <Skeleton className="w-64 h-8 mb-4 rounded" />
          <Skeleton className="w-full h-40 rounded" />
        </section>

        {/* Middle Section: Monthly Trends and Folders */}
        <section className="flex flex-col lg:flex-row gap-4 h-full">
          {/* Monthly Trends */}
          <div className="relative h-full w-full lg:w-1/3 gap-4">
            <div className="hidden lg:flex flex-col p-5 h-full bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md rounded-lg">
              <Skeleton className="w-48 h-8 mb-4 rounded" />
              <Skeleton className="w-full h-40 rounded" />
            </div>
          </div>

          {/* Folders Section */}
          <div className="relative w-full lg:w-2/3">
            <div className="h-full p-5 bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md rounded-lg">
              <div className="flex justify-between mb-4">
                <Skeleton className="w-32 h-8 rounded" />
                <Skeleton className="w-24 h-8 rounded" />
              </div>
              {/* Folders List Skeleton */}
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="w-full h-6 rounded" />
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
