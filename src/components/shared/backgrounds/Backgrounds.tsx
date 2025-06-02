import { ReactNode } from "react";

export function DotBackgroundDemo({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-[50rem] w-full  items-center justify-center bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
        {children}
    </div>
  );
}

export function GridBackgroundDemo({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative flex h-[50rem] w-full  items-center justify-center bg-white bg-grid-black/[0.2] dark:bg-black dark:bg-grid-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black">
        {children}
      </div>
    </div>
  );
}

export function GridSmallBackgroundDemo({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative flex h-[50rem] w-full  items-center justify-center bg-white bg-grid-small-black/[0.2] dark:bg-black dark:bg-grid-small-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black">
        {children}
      </div>
    </div>
  );
}
