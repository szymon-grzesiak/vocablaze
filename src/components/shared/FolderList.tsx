import { IWordSetType } from "@/types";

import SheetOpen from "./SheetOpen";

interface FolderType {
  id: string;
  name: string;
  color: string | null;
  userId: string;
}

const FoldersList = async ({
  folders,
  searchParams,
  wordSets,
}: {
  folders: FolderType[];
  searchParams: { [key: string]: string };
  wordSets: IWordSetType[];
}) => {
  const query = searchParams.folders || "";

  const filteredFolders = folders?.filter((folder) =>
    folder.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ul className="flex flex-wrap items-center justify-start gap-3">
      {filteredFolders?.map((folder) => {
        return (
          <SheetOpen
            folder={folder}
            key={folder.id}
            wordSets={wordSets as IWordSetType[]}
          />
        );
      })}
    </ul>
  );
};

export default FoldersList;
