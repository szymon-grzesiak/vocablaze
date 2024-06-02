import { UserButton } from "@/components/auth/user-button";
import Theme from "@/components/shared/navbar/Theme";

export const Navbar = () => {

  return (
    <nav className="flex justify-end gap-6 items-center pt-10 rounded-xl w-full">
      <Theme />
      <UserButton />
    </nav>
  );
};
