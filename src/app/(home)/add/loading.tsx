import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="flex w-full justify-center border-none">
      <div className="w-full max-w-2xl rounded-md bg-white p-6 shadow-md dark:bg-slate-900">
        {/* Page Heading */}
        <Skeleton className="mb-6 h-8 w-56 rounded" />

        {/* Title Input */}
        <Skeleton className="mb-3 h-10 w-full rounded" />

        {/* Description Textarea */}
        <Skeleton className="mb-6 h-32 w-full rounded" />

        {/* Language & Folder Selects */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row">
          <Skeleton className="h-10 w-full rounded" />
          <Skeleton className="h-10 w-full rounded" />
          <Skeleton className="h-10 w-full rounded" />
        </div>

        {/* Word List Label */}
        <Skeleton className="mb-2 h-5 w-44 rounded" />

        {/* Word Rows (example of 3 rows) */}
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="mb-2 h-10 w-full rounded" />
        ))}

        {/* Buttons (Import, Add Word) */}
        <div className="mt-4 flex justify-end gap-3">
          <Skeleton className="h-10 w-24 rounded" />
          <Skeleton className="h-10 w-24 rounded" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
