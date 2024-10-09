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
  folders: {
    id: string;
    color: string | null;
    name: string;
    userId: string;
  }[];
}

export interface FolderType {
  id: string;
  name: string;
  color: string | null;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
  isOAuth: boolean;
  wordSets: IWordSetType[];
  folders: FolderType[];
  name: string;
  isTwoFactorEnabled: boolean;
}
