import { SessionProvider } from "next-auth/react";

import { auth } from "@/lib/auth";
import { Navbar } from "@/components/shared/navbar/navbar";
import FooterNavigation from "@/components/shared/FooterNavigation";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="relative flex flex-col max-h-screen layoutBg h-screen w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-none z-10">
        <Navbar />
        {children}
        <FooterNavigation/>
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
