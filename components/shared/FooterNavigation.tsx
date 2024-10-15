"use client";

import { useState } from "react";
import { Button, Tab, Tabs } from "@nextui-org/react";
import {
  BarChart,
  GitGraph,
  HomeIcon,
  MusicIcon,
  StarIcon,
  VideoIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import Home from "@/app/page";

const FooterNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");
  return (
    <div className="fixed bottom-0 left-0 w-screen lg:hidden">
      <div className="flex w-full bg-black">
        <Button
          radius="none"
          className={cn(
            "w-1/2 py-8 bg-black font-bold",
            activeTab === "home" ? "text-white" : "text-gray-500"
          )}
          onClick={() => setActiveTab("home")}
        >
          <HomeIcon size={24} />
          <p>Home</p>
        </Button>
        <Button
          radius="none"
          className={cn(
            "w-1/2 py-8 bg-black font-bold",
            activeTab === "stats" ? "text-white" : "text-slate-500"
          )}
          onClick={() => setActiveTab("stats")}
        >
          <BarChart size={24} />
          <p>Stats</p>
        </Button>
      </div>
    </div>
  );
};

export default FooterNavigation;
