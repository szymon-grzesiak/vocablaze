import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center justify-center gap-6 p-6">
      {/* Page Header */}
      <div className="flex flex-row items-center justify-center gap-4">
        <Skeleton className="h-12 w-12 rounded" />
        <Skeleton className="h-10 w-48 rounded" />
      </div>

      {/* Selection / Toggles Section */}
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-6">
        <Skeleton className="h-10 w-3/4 rounded-full" />
        <Skeleton className="h-5 w-52 rounded" />
        <Skeleton className="h-10 w-16 rounded-full" />
        <Skeleton className="h-10 w-3/4 rounded-full" />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap-reverse justify-center gap-6 pt-6">
        <Skeleton className="h-12 w-40 rounded-full" />
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>
    </div>
  );
}
