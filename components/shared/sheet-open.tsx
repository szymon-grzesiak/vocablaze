"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getTextColor, hexToRgb } from "@/helpers/file";
import { FolderType, IWordSetType } from "@/types";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import WordSetsList from "./wordset-list";

const SheetOpen = ({
  folder,
  wordSets,
}: {
  folder: FolderType;
  wordSets: IWordSetType[];
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const searchParams = useSearchParams();

  const handleFolderClick = (folder: FolderType) => {
    setOpen(true);
    const params = new URLSearchParams(searchParams as any);
    params.set("folder", folder.id);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleCloseSheet = () => {
    setOpen(false);
    const params = new URLSearchParams(searchParams as any);
    params.delete("folder");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleOpenDrawer = (isOpen: boolean) => {
    if (isOpen) {
      const params = new URLSearchParams(searchParams as any);
      params.set("folder", folder.id);
      router.replace(`${pathname}?${params.toString()}`);
    } else {
      handleCloseSheet();
    }
  };

  const textColor = getTextColor(folder?.color as string);

  return (
    <>
      <li
        key={folder.id}
        className={cn(
          "p-3 h-24 w-28 flex justify-start flex-col hover:opacity-80 rounded-md cursor-pointer shadow-xl"
        )}
        style={{
          color: textColor,
          backgroundColor: `${hexToRgb(folder?.color as string, 0.5)}`,
        }}
        onClick={() => handleFolderClick(folder)}
      >
        <div
          className="text-xl font-bold truncate"
          style={{ color: textColor }}
        >
          {folder.name}
        </div>
      </li>
      {isDesktop ? (
        <Sheet open={open} onOpenChange={handleCloseSheet}>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>{folder?.name}</SheetTitle>
              
                {wordSets.length > 0 ? (
                  <WordSetsList wordSets={wordSets} />
                ) : (
                  <span>No word sets found in this folder</span>
                )}
   
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ) : (
        <Drawer open={open} onOpenChange={handleOpenDrawer}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{folder?.name}</DrawerTitle>
              <DrawerDescription>
                <>
                  <span>Folder ID: {folder?.id}</span>
                  {wordSets.length > 0 ? (
                    <WordSetsList wordSets={wordSets} />
                  ) : (
                    <span>No word sets found in this folder</span>
                  )}
                </>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default SheetOpen;
