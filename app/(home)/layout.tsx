import { SessionProvider } from "next-auth/react";

import { auth } from "@/lib/auth";
import MobileNavbar from "@/components/shared/navbar/mobile-navbar";
import { Navbar } from "@/components/shared/navbar/navbar";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="relative layoutBg h-screen w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-none z-10">
        <Navbar />
        <div className="absolute top-[104px] w-full px-4">{children}</div>
        <div className="block lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
