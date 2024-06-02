import { AuroraBackground } from "@/components/ui/aurora-background";

import { Navbar } from "./_components/navbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full px-10 flex pb-5 flex-col bg-[rgb(247,245,244)]">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
