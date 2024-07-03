import React from "react";
import "./background.css";
import { cn } from "@/lib/utils";

interface BackgroundProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  className?: string;
  bgColor?: "default" | "blue" | "green" | "red" | "custom";
}

const Background: React.FC<BackgroundProps> = ({ className, children, bgColor = "default", ...props }) => {
  const backgroundClass = `banner-${bgColor}`;
  return (
    <div className={cn("banner h-full", backgroundClass, className)} {...props}>
      {children}
    </div>
  );
};

export default Background;
