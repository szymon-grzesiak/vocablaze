import { ReactNode } from "react";

import { AuroraBackground } from "@/components/ui/aurora-background";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <AuroraBackground>
        <div className="z-40">{children}</div>
      </AuroraBackground>
    </div>
  );
};

export default AuthLayout;
