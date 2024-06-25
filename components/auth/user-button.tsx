"use client";

import { user } from "@nextui-org/theme";
import { ExitIcon } from "@radix-ui/react-icons";
import { FaUser, FaUserAlt, FaUserFriends } from "react-icons/fa";

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

import { Button } from "../ui/button";
import { LoginButton } from "./login-button";
import { LogoutButton } from "./logout-button";

export const UserButton = () => {
  const user = useCurrentUser();

  if (!user) {
    return (
      <LoginButton className="w-1/2">
        <Button variant="secondary" className="w-full">
          Sign in
        </Button>
      </LoginButton>
    );
  }

  return (
    <DropdownMenu>
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
          <div className="py-2 px-4 rounded-md bg-slate-100">
            <div>
              <h4 className="font-semibold text-lg tracking-tight">
                {user.name}
              </h4>
              <h4 className="mt-0 font-light text-xs">{user.email}</h4>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <FaUserFriends className="h-4 w-4" />
          <Button className="ml-2">Profile</Button>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <ExitIcon className="h-4 w-4" />
            <Button className="ml-2">Sign Out</Button>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
