/* eslint-disable tailwindcss/no-contradicting-classname */
import { ReactNode } from "react";

import { Navbar } from "@/components/shared/navbar/Navbar";
import { auth } from "@/lib/auth";

import { SessionProvider } from "next-auth/react";

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="layoutBg relative z-10 flex h-screen max-h-screen w-full flex-col bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-none">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
