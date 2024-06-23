import Link from "next/link";
import { getFolders } from "@/lib/data/rest";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getTextColor } from "@/helpers/file";

const FoldersList = async () => {
  const { folders, error } = await getFolders();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul className="flex gap-4 mb-5 flex-wrap">
      {folders?.map((folder) => {
        const textColor = getTextColor(folder?.color as string);
        return (
          <Link href={`/folder/${folder.id}`} key={folder.id}>
            <li
              key={folder.id}
              className={cn(
                "p-3 flex justify-start flex-col hover:opacity-80 mx-6 rounded-md cursor-pointer",
                `bg-[${String(folder.color)}]`
              )}
              style={{ color: textColor }}
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
