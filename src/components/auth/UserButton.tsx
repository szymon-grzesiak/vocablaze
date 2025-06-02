"use client";

import { useState } from "react";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addFolder } from "@/lib/actions/action";
import { logout } from "@/lib/actions/auth/logout";

import CustomModal from "../shared/FolderModal";
import { Button as ShadcnButton } from "../ui/button";
import { LoginButton } from "./LoginButton";
import { Button } from "@nextui-org/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { Plus } from "lucide-react";
import Link from "next/link";
import { FaUser, FaUserFriends } from "react-icons/fa";

export const UserButton = () => {
  const user = useCurrentUser();
  const [closeDropdown, setCloseDropdown] = useState(false);

  if (!user) {
    return (
      <LoginButton className="w-1/2">
        <ShadcnButton variant="secondary" className="w-full">
          Sign in
        </ShadcnButton>
      </LoginButton>
    );
  }

  const onClick = () => {
    logout();
  };

  return (
    <DropdownMenu
      open={closeDropdown}
      onOpenChange={() => setCloseDropdown(!closeDropdown)}
    >
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <Avatar>
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback className="bg-gradient-to-b from-gray-700 via-gray-900 to-black text-white">
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="center">
        <DropdownMenuLabel>
          <div className="rounded-md px-4 py-2">
            <div>
              <h4 className="text-lg font-semibold tracking-tight">
                {user.name}
              </h4>
              <h4 className="mt-0 text-xs font-light">{user.email}</h4>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="block sm:hidden">
          <div className="mr-2 px-2 py-1.5">
            <DropdownMenuItem
              onClick={() => setCloseDropdown(!closeDropdown)}
              className="cursor-pointer"
              asChild
            >
              <CustomModal
                responsive
                title="Create New Folder"
                description="Please enter the folder name and choose a color for it."
                handleClick={addFolder}
                onCloseDropdown={() => setCloseDropdown(false)} // przekazanie funkcji zamknięcia
              />
            </DropdownMenuItem>
          </div>

          <DropdownMenuItem
            onClick={() => setCloseDropdown(!close)}
            className="cursor-pointer"
          >
            <ShadcnButton
              className="ml-2 flex w-full gap-3"
              variant={"secondary"}
            >
              <Plus className="size-4 dark:text-gray-400" />
              <Link
                className="w-full text-left font-semibold"
                href={"/profile"}
              >
                Add a words set
              </Link>
            </ShadcnButton>
          </DropdownMenuItem>
        </div>

        <DropdownMenuItem
          onClick={() => setCloseDropdown(!close)}
          className="cursor-pointer"
        >
          <ShadcnButton
            className="ml-2 flex w-full gap-3"
            variant={"secondary"}
          >
            <FaUserFriends className="size-4" />
            <Link className="w-full text-left font-semibold" href={"/profile"}>
              Profile
            </Link>
          </ShadcnButton>
        </DropdownMenuItem>
        <DropdownMenuItem className="my-3 cursor-pointer">
          <Button
            onClick={onClick}
            variant="shadow"
            color="danger"
            className="ml-2 w-full"
          >
            <ExitIcon className="size-4" />
            <span className="w-full text-left font-semibold">Sign Out</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
