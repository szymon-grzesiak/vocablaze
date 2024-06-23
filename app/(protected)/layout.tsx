import MobileNavbar from "@/components/shared/navbar/navbar";

import { Navbar } from "./_components/navbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative layoutBg inset-0 pb-5 px-10 h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] z-10">
      <Navbar />
      <main className="pt-5"> {children}</main>
      <div className="block lg:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default ProtectedLayout;
