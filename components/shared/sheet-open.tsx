"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getTextColor, hexToRgb } from "@/helpers/file";

import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface FolderType {
  id: string;
  name: string;
  color: string | null;
  userId: string;
}

interface WordSet {
  id: string;
  title: string;
  description: string;
}

const SheetOpen = ({
  folder,
  wordSets,
}: {
  folder: FolderType;
  wordSets: WordSet[];
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);
  const searchParams = useSearchParams();

  const handleFolderClick = (folder: FolderType) => {
    setSelectedFolder(folder);
    const params = new URLSearchParams(searchParams);
    params.set("folder", folder.id);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleCloseSheet = () => {
    setSelectedFolder(null);
    const params = new URLSearchParams(searchParams);
    params.delete("folder");
    router.replace(`${pathname}?${params.toString()}`);
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
      <Sheet open={!!selectedFolder} onOpenChange={handleCloseSheet}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>{selectedFolder?.name}</SheetTitle>
            <SheetDescription>
              <>
                <span>Folder ID: {selectedFolder?.id}</span>
                {wordSets?.length > 0 ? (
                  wordSets?.map((word) => (
                    <span key={word.id}>
                      <span>{word.title}</span>
                      <span>{word.description}</span>
                    </span>
                  ))
                ) : (
                  <span>No word sets found in this folder</span>
                )}
              </>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SheetOpen;
