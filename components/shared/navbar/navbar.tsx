import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/images/logo.png";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import { Folder, Plus } from "lucide-react";

import { addFolder } from "@/lib/actions/action";
import { currentUser } from "@/lib/sessionData";
import { UserButton } from "@/components/auth/user-button";
import Theme from "@/components/shared/navbar/Theme";

import CustomModal from "../folder-modal";

export const Navbar = async () => {
  const user = await currentUser();
  return (
    <nav className="w-full p-4 z-50 backdrop-blur-lg">
      <div className="flex justify-between gap-6 items-center mx-auto w-full">
        <Link href={"/home"} className="flex justify-center items-center">
          <Image src={logo} alt="logo" className="w-14 h-14 md:w-16 md:h-16" />
          <h1 className="text-2xl md:text-3xl font-bold [text-shadow:_1px_1px_1px_rgb(255_0_255_/_40%)]">
            Vocablaze
          </h1>
        </Link>

        <div className="flex justify-end gap-6 items-center">
          <div className="hidden sm:flex gap-6">
            {user && (
              <CustomModal
                triggerIcon={<Folder className="dark:text-gray-400" />}
                title="Create New Folder"
                description="Please enter the folder name and choose a color for it."
                handleClick={addFolder}
              />
            )}

            <Tooltip content="Add a words set">
              <Button isIconOnly color="secondary" aria-label="word-set">
                <Link
                  href="/add"
                  className="w-full h-full flex justify-center items-center"
                >
                  <Plus className="dark:text-gray-400" />
                </Link>
              </Button>
            </Tooltip>
          </div>
          <Theme />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
