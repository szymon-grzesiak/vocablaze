import { getWordSetsByFolder } from "@/lib/data/rest";
import SheetOpen from "./sheet-open";

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
  const wordSetsResponse = await getWordSetsByFolder(folderId);

  const filteredFolders = folders?.filter((folder) =>
    folder.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="relative h-full w-full overflow-auto">
      <ul className="flex flex-wrap justify-start items-center gap-3 max-h-80 overflow-y-auto">
        {filteredFolders?.map((folder) => {
         
          return (
            <SheetOpen folder={folder} key={folder.id} wordSets={wordSetsResponse}/>
          );
        })}
      </ul>
    </div>
  );
};

export default FoldersList;
