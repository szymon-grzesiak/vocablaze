export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface IWordSetType {
  id: string;
  title: string;
  description: string | null;
  firstLanguageId: string;
  secondLanguageId: string;
  isShared: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
  folderId: string | null;
}

export interface FolderType {
  id: string;
  name: string;
  color: string | null;
  userId: string;
}
