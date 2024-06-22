import MobileNavbar from "@/components/shared/navbar/navbar";

import { Navbar } from "./_components/navbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="relative inset-0 pb-5 px-10 max-h-screen w-full bg-white
    bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]
    bg-[size:6rem_4rem]"
    >
      <div
        className="absolute pointer-events-none bottom-0 left-0 flex right-0 top-0
      bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"
      ></div>
      <Navbar />
      <main className="pt-5 z-10 h-full"> {children}</main>
      <div className="block lg:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default ProtectedLayout;
