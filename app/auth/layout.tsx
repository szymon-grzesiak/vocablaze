import { AuroraBackground } from "@/components/ui/aurora-background";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <AuroraBackground>
        <div className="z-40">{children}</div>
      </AuroraBackground>
    </div>
  );
};

export default AuthLayout;
