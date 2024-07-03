import { SessionProvider } from "next-auth/react";

import { auth } from "@/lib/auth";
import MobileNavbar from "@/components/shared/navbar/navbar";

import { Navbar } from "../../components/shared/navbar";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="relative layoutBg inset-0 pb-5 px-3 md:px-10 h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] z-10">
        <Navbar />
        {children}
        <div className="block lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
