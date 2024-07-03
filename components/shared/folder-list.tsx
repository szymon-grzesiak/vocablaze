"use client";

import Link from "next/link";
import { getTextColor } from "@/helpers/file";

import { getFolders } from "@/lib/data/rest";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";

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
  const sets = useSearchParams();
  const query = sets.get("folders") || "";

  const filteredFolders = folders?.filter((folder) =>
    folder.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ul className="flex gap-4 mb-5 flex-wrap">
      {filteredFolders?.map((folder) => {
        const textColor = getTextColor(folder?.color as string);
        return (
          <Link href={`/collection/folders/${folder.id}`} key={folder.id}>
            <li
              key={folder.id}
              className={cn(
                "p-3 flex justify-start flex-col hover:opacity-80 mx-6 rounded-md cursor-pointer"
              )}
              style={{ color: textColor, backgroundColor: `${folder?.color}` }}
            >
              <div
                className="text-xl font-bold [text-shadow:_1px_1px_1px_rgb(0_0_255_/_20%)]"
                style={{ color: textColor }}
              >
                {folder.name}
              </div>
              <p className="text-black/80 text-md" style={{ color: textColor }}>
                {folder.name}
              </p>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default FoldersList;
