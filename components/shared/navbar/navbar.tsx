import { UserButton } from "@/components/auth/UserButton";
import Theme from "@/components/shared/navbar/Theme";
import { addFolder } from "@/lib/actions/action";
import { getWordSetsAmountForUser } from "@/lib/data/rest";
import { currentUser } from "@/lib/sessionData";
import logo from "@/public/assets/images/logo.png";

import CustomModal from "../FolderModal";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import { Folder, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = async () => {
  const user = await currentUser();
  const wordSetsAmount = await getWordSetsAmountForUser(String(user?.id));

  const isDisabled = wordSetsAmount >= 3 && user?.role === 'USER';


  return (
    <nav className="z-50 w-full p-4 backdrop-blur-lg">
      <div className="mx-auto flex w-full items-center justify-between gap-6">
        <Link href={"/home"} className="flex items-center justify-center">
          <Image src={logo} alt="logo" className="size-14 md:size-16" />
          <h1 className="text-2xl font-bold [text-shadow:_1px_1px_1px_rgb(255_0_255_/_40%)] md:text-3xl">
            Vocablaze
          </h1>
        </Link>

        <div className="flex items-center justify-end gap-6">
          <div className="hidden gap-6 sm:flex">
            {user && (
              <CustomModal
                triggerIcon={<Folder className="dark:text-gray-400" />}
                title="Create New Folder"
                description="Please enter the folder name and choose a color for it."
                handleClick={addFolder}
              />
            )}

            {isDisabled ? (
                <Tooltip content="You can have maximum of 3 word sets, upgrade your plan to have it more">
                <Button isIconOnly color="secondary" aria-label="word-set">
                    <Plus className="dark:text-gray-400" />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip content="Add a words set">
              <Button isIconOnly color="secondary" aria-label="word-set">
                <Link
                  href="/add"
                  className="flex size-full items-center justify-center"
                >
                  <Plus className="dark:text-gray-400" />
                </Link>
              </Button>
            </Tooltip>
            )}
          </div>
          <Theme />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
