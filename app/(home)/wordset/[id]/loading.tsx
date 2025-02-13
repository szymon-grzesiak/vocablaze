import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="h-full mx-auto mb-4 flex w-full flex-col justify-center rounded-none bg-black/5 px-6 py-7 backdrop-blur-2xl dark:bg-slate-900/90 lg:w-3/4 lg:rounded-lg">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
        {/* Title and Description */}
        <div>
          <Skeleton className="mb-2 h-8 w-72 rounded" />
          <Skeleton className="h-5 w-48 rounded" />
        </div>
        {/* Action Buttons */}
        <div className="mt-4 flex w-full justify-start gap-3 md:mt-0 md:w-auto">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      {/* WordSet (ClientWordSet) Section */}
      <div className="grid gap-3">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Skeleton key={idx} className="h-6 w-full rounded" />
        ))}
      </div>

      {/* Practice Games Section */}
      <div className="grid grid-cols-1 gap-6 pt-4">
        <div className="rounded-lg bg-gray-100 py-6 dark:bg-gray-800">
          {/* Heading */}
          <div className="mb-4 flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-center">
            <div className="flex items-center justify-between space-x-2">
              <Skeleton className="h-6 w-28 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24 rounded" />
              <Skeleton className="h-6 w-24 rounded" />
            </div>
            <div className="w-1/6" />
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-white p-4 shadow-sm transition-colors dark:bg-gray-700"
              >
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
