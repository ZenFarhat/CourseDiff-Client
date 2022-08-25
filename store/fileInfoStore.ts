import { FolderModel } from "./../models/userCollectionModel.interface"
import create from "zustand"

interface folderDataState {
  folderData: FolderModel
  setFolderData: (folder: FolderModel) => void
}

export const useFileInfoStore = create<folderDataState>()((set) => ({
  folderData: { parentFolder: "", children: [] },
  setFolderData: (folder: FolderModel) => set(() => ({ folderData: folder })),
}))
