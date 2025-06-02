"use client";

import { useMemo, useState } from "react";

import useMeasure from "react-use-measure";

import FamilyButton from "../ui/family-button";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Folder, List } from "lucide-react";

export function FamilyButtonDemo() {
  return (
    <div className="absolute bottom-4 right-4 ">
      <FamilyButton>
        <OgImageSection />
      </FamilyButton>
    </div>
  );
}

let tabs = [
  { id: 0, label: "Word Set" },
  { id: 1, label: "Folder" },
];

export function OgImageSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ref, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (activeTab) {
      case 0:
        return (
          <div className="flex items-center justify-center">
            <List />
          </div>
        );
      case 1:
        return (
          <div className="flex items-center justify-center">
            <Folder />
          </div>
        );
      default:
        return null;
    }
  }, [activeTab]);

  const handleTabClick = (newTabId: number) => {
    if (newTabId !== activeTab && !isAnimating) {
      const newDirection = newTabId > activeTab ? 1 : -1;
      setDirection(newDirection);
      setActiveTab(newTabId);
    }
  };

  const variants = {
    initial: (direction: number) => ({
      x: 300 * direction,
      opacity: 0,
      filter: "blur(4px)",
    }),
    active: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      x: -300 * direction,
      opacity: 0,
      filter: "blur(4px)",
    }),
  };

  return (
    <div className="flex flex-col items-center pt-4 ">
      <div className="flex cursor-pointer space-x-1 rounded-[8px] border border-none  bg-neutral-700 px-[3px] py-[3.2px]">
        {tabs.map((tab, i) => (
          <button
            key={`${tab.id}-i-${i}`}
            onClick={() => handleTabClick(tab.id)}
            className={`${
              activeTab === tab.id ? "text-white " : "hover:text-neutral-300/60"
            } relative rounded-[5px] px-3 py-1.5 text-xs font-medium text-neutral-600  transition focus-visible:outline-none focus-visible:outline-1 focus-visible:ring-1 sm:text-sm`}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="family-bubble"
                className="absolute inset-0 z-10  bg-neutral-800 mix-blend-difference"
                style={{ borderRadius: 5 }}
                transition={{ type: "spring", bounce: 0.19, duration: 0.4 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
      <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}>
        <motion.div
          className="relative mx-auto my-[10px] w-[60px] overflow-hidden md:w-[150px]"
          initial={false}
          animate={{ height: bounds.height }}
        >
          <div className="p-2 md:p-6" ref={ref}>
            <AnimatePresence
              custom={direction}
              mode="popLayout"
              onExitComplete={() => setIsAnimating(false)}
            >
              <motion.div
                key={activeTab}
                variants={variants}
                initial="initial"
                animate="active"
                exit="exit"
                custom={direction}
                onAnimationStart={() => setIsAnimating(true)}
                onAnimationComplete={() => setIsAnimating(false)}
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
}
