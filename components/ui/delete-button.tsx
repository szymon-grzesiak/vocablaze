"use client";

import React, { useState } from "react";

import { deleteFolder } from "@/lib/actions/action";
import { cn } from "@/lib/utils";

import { Tooltip } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Trash, X } from "lucide-react";
import { toast } from "sonner";

const DeleteButton = ({ folderId }: { folderId: string }) => {
  const [isActive, setIsActive] = useState(true);

  const handleDeleteClick = async () => {
    setIsActive(false);
    await deleteFolder(folderId)
      .then(() => {
        toast.success("Folder deleted successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleCancelClick = () => {
    setIsActive(true);
  };

  const handleTrashButtonClick = () => {
    setIsActive(false);
  }

  return (
    <div className="size-full text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="absolute"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div
        className="relative flex items-center justify-center gap-3"
        style={{
          filter: "url(#goo)",
        }}
      >
        <Tooltip content="Delete folder" delay={0} showArrow>
          <motion.button
            whileHover={{ scale: 0.9 }}
            className={cn(
              "h-10 rounded-md p-3 transition-all z-10 flex center items-center absolute bg-red-400 duration-500",
              !isActive && "bg-black"
            )}
            onClick={handleTrashButtonClick}
          >
            <Trash />
          </motion.button>
        </Tooltip>

        <AnimatePresence>
          {!isActive && (
            <Tooltip content="Cancel" delay={0} showArrow>
              <motion.button
                whileHover={{ scale: 0.9 }}
                initial={{
                  x: 0,
                  scale: 0.7,
                  borderRadius: "50%",
                }}
                animate={{
                  x: 65,
                  scale: 1,
                }}
                exit={{
                  x: 0,
                  scale: 0.7,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className={cn(
                  "h-10 w-10 rounded-full flex justify-center items-center bg-red-400 center absolute" // Added 'absolute'
                )}
                onClick={handleCancelClick}
              >
                <X className="size-4" />
              </motion.button>
            </Tooltip>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isActive && (
            <Tooltip content="Yes, delete folder" delay={0} showArrow>
              <motion.button
                whileHover={{ scale: 0.9 }}
                initial={{
                  x: 0,
                  scale: 0.7,
                  borderRadius: "50%",
                }}
                animate={{
                  x: -65,
                  scale: 1,
                }}
                exit={{
                  x: 0,
                  scale: 0.7,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className={cn(
                  "h-10 w-10 rounded-full flex justify-center items-center bg-green-500 center absolute" // Added 'absolute'
                )}
                onClick={handleDeleteClick}
              >
                <Check className="size-4" />
              </motion.button>
            </Tooltip>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DeleteButton;
