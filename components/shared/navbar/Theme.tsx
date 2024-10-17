"use client";

import React from "react";

import { themes } from "@/constants";
import { useTheme } from "@/context/ThemeProvider";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import Image from "next/image";

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
      <DropdownTrigger className="w-fit cursor-pointer">
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
              <p>{theme.label}</p>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Theme;
