"use client";

import React from "react";
import { Tab, Tabs } from "@nextui-org/react";
import { AreaChart, CircleUserRound, Home, NotebookText } from "lucide-react";

export default function MobileNavbar() {
  return (
    <div className="fixed bottom-0 left-0 flex w-full flex-col">
      <Tabs aria-label="Options" color="primary" variant="bordered">
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <Home />
              <span>Photos</span>
            </div>
          }
        />
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
              <AreaChart />
              <span>Music</span>
            </div>
          }
        />
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              <CircleUserRound />
              <span>Videos</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
}
