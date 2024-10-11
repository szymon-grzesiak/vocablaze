"use client";

import { useState } from "react";
import { getTextColor, hexToRgb } from "@/helpers/file";
import { FolderType, IWordSetType } from "@/types";
import { Button } from "@nextui-org/button";
import { Trash } from "lucide-react";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button as ShadcnButton } from "@/components/ui/button";
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
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import DeleteButton from "../ui/delete-button";
import WordSetsList from "./wordset-list";

const SheetOpen = ({
  folder,
  wordSets,
}: {
  folder: FolderType;
  wordSets: IWordSetType[];
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const wordSetsFilter = wordSets.filter((wordSet) =>
    wordSet?.folders?.some((folderItem) => folderItem.id === folder.id)
  );

  const handleFolderClick = () => {
    setOpen(true);
  };

  const handleCloseSheet = () => {
    setOpen(false);
  };

  const handleOpenDrawer = (isOpen: boolean) => {
    if (!isOpen) {
      handleCloseSheet();
    }
  };

  return (
    <>
      <li
        key={folder.id}
        className={cn(
          "h-28 w-32 flex justify-end items-center flex-col hover:opacity-80 rounded-md cursor-pointer shadow-xl"
        )}
        style={{
          backgroundColor: `${hexToRgb(folder?.color as string)}`,
        }}
        onClick={() => handleFolderClick()}
      >
        {wordSetsFilter.length > 0 ? (
          <FcOpenedFolder className="w-10 h-10 mb-3" />
        ) : (
          <FcFolder className="w-10 h-10 mb-3" />
        )}
        <div className="px-2 text-xl font-bold truncate text-center text-white bg-black/60 rounded-b-md w-full">
          {folder.name}
        </div>
      </li>
      {isDesktop ? (
        <Sheet open={open} onOpenChange={handleCloseSheet}>
          <SheetContent side="left">
            <SheetHeader className="h-[90%]">
              <SheetTitle className="text-2xl font-bold">
                {folder?.name}
              </SheetTitle>
              {wordSetsFilter.length > 0 ? (
                <WordSetsList
                  wordSets={wordSetsFilter}
                  className="h-full"
                  liStyle="mx-0 bg-black/10 mr-6"
                />
              ) : (
                <span>No word sets found in this folder</span>
              )}
            </SheetHeader>
            <SheetFooter className="absolute bottom-0 left-[50%] mb-4 pb-4">
              <DeleteButton folderId={folder.id} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <Drawer open={open} onOpenChange={handleOpenDrawer}>
          <DrawerContent className="min-h-[50%]">
            <DrawerHeader>
              <DrawerTitle>{folder?.name}</DrawerTitle>
              <DrawerDescription>
                <>
                  {wordSetsFilter.length > 0 ? (
                    <WordSetsList
                      wordSets={wordSetsFilter}
                      liStyle="mx-0 bg-black/10 mr-6"
                    />
                  ) : (
                    <span>No word sets found in this folder</span>
                  )}
                </>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="absolute bottom-0 left-[50%] my-4">
                <DeleteButton folderId={folder.id} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default SheetOpen;
