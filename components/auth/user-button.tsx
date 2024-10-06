"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { user } from "@nextui-org/theme";
import { ExitIcon } from "@radix-ui/react-icons";
import { Folder, Plus } from "lucide-react";
import { FaUser, FaUserAlt, FaUserFriends } from "react-icons/fa";

import { addFolder } from "@/lib/actions/action";
import { logout } from "@/lib/actions/auth/logout";
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

import CustomModal from "../shared/folder-modal";
import { Button as ShadcnButton } from "../ui/button";
import { LoginButton } from "./login-button";

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
          <div className="py-2 px-4 rounded-md">
            <div>
              <h4 className="font-semibold text-lg tracking-tight">
                {user.name}
              </h4>
              <h4 className="mt-0 font-light text-xs">{user.email}</h4>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="block sm:hidden">
          <div className="px-2 py-1.5 mr-2">
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
              className="ml-2 w-full flex gap-3"
              variant={"secondary"}
            >
              <Plus className="dark:text-gray-400 w-4 h-4" />
              <Link
                className="w-full font-semibold text-left"
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
            className="ml-2 w-full flex gap-3"
            variant={"secondary"}
          >
            <FaUserFriends className="h-4 w-4" />
            <Link className="w-full font-semibold text-left" href={"/profile"}>
              Profile
            </Link>
          </ShadcnButton>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer my-3">
          <Button
            onClick={onClick}
            variant="shadow"
            color="danger"
            className="ml-2 w-full"
          >
            <ExitIcon className="h-4 w-4" />
            <span className="w-full font-semibold text-left">Sign Out</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
