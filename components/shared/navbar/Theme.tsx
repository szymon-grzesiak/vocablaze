"use client";

import React from "react";
import Image from "next/image";
import { themes } from "@/constants";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Theme = () => {
  const { mode, setMode } = useTheme();

  // Function to determine the className based on the current mode
  const getClassNameForTheme = (themeValue: string) => {
    if (mode === "light" && themeValue === "light") {
      return "active-theme-sun";
    } else if (mode === "dark" && themeValue === "dark") {
      return "active-theme-moon";
    }
    return "";
  };

  return (
    <Dropdown>
      <DropdownTrigger className="cursor-pointer w-fit">
        {mode === "light" ? (
          <Image
            src="/assets/icons/sun.svg"
            alt="sun"
            width={20}
            height={20}
            className="active-theme-sun"
          />
        ) : (
          <Image
            src="/assets/icons/moon.svg"
            alt="moon"
            width={20}
            height={20}
            className="active-theme-moon"
          />
        )}
      </DropdownTrigger>
      <DropdownMenu className="custom-dropdown-menu">
        {themes.map((theme) => (
          <DropdownItem
            key={theme.value}
            onClick={() => {
              setMode(theme.value);
              if (theme.value !== "system") {
                localStorage.setItem("theme", theme.value);
              } else {
                localStorage.removeItem("theme");
              }
            }}
          >
            <div className="flex gap-4">
              <Image
                src={theme.icon}
                alt={theme.label}
                width={16}
                height={16}
                className={getClassNameForTheme(theme.value)}
              />
              <p
                className={`body-semibold ${
                  mode === theme.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}
              >
                {theme.label}
              </p>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Theme;
