"use client";

import { useEffect, useState } from "react";
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

const FoldersList = ({
  folders,
}: {
  folders: {
    id: string;
    name: string;
    color: string | null;
    userId: string;
  }[];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);

  const query = searchParams.get("folders") || "";

  const filteredFolders = folders?.filter((folder) =>
    folder.name.toLowerCase().includes(query.toLowerCase())
  );

  const convertNameToSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const handleFolderClick = (folder: FolderType) => {
    setSelectedFolder(folder);
    const params = new URLSearchParams(searchParams);
    const folderSlug = convertNameToSlug(folder.name);
    params.set("folder", folderSlug);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleCloseSheet = () => {
    setSelectedFolder(null);
    const params = new URLSearchParams(searchParams);
    params.delete("folder");
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const folderSlug = searchParams.get("folder");
    if (folderSlug) {
      const folder = folders.find(
        (f) => convertNameToSlug(f.name) === folderSlug
      );
      setSelectedFolder(folder as FolderType);
    }
  }, [searchParams, folders]);

  return (
    <div className="relative h-full w-full overflow-auto">
      <ul className="flex flex-wrap justify-start items-center gap-3 max-h-80 overflow-y-auto">
        {filteredFolders?.map((folder) => {
          const textColor = getTextColor(folder?.color as string);
          return (
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
          );
        })}
      </ul>

      <Sheet open={!!selectedFolder} onOpenChange={handleCloseSheet}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>{selectedFolder?.name}</SheetTitle>
            <SheetDescription>
              {/* Dodaj tutaj dodatkowe informacje o folderze */}
              Folder ID: {selectedFolder?.id}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FoldersList;
