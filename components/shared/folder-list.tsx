import { getWordSetsByFolder } from "@/lib/actions/action";
import SheetOpen from "./sheet-open";
import { IWordSetType } from "@/types";

interface FolderType {
  id: string;
  name: string;
  color: string | null;
  userId: string;
}

const FoldersList = async ({
  folders,
  searchParams,
}: {
  folders: FolderType[];
  searchParams: { [key: string]: string };
}) => {
  const query = searchParams.folders || ""; 
  const folderId = searchParams.folder || "";
  const wordSetResponse = await getWordSetsByFolder(folderId);

  const filteredFolders = folders?.filter((folder) =>
    folder.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
      <ul className="flex flex-wrap justify-start items-center gap-3">
        {filteredFolders?.map((folder) => {
          return (
            <SheetOpen folder={folder} key={folder.id} wordSets={wordSetResponse as IWordSetType[]} />
          );
        })}
      </ul>
  );
};

export default FoldersList;
