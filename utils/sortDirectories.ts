import { FolderChildrenModel } from "./../models/userCollectionModel.interface"
export const sortDirectories = (files: FolderChildrenModel[]) => {
  const sortedFiles = [...files]
  return sortedFiles.sort((a, b) => {
    if (a.type === "folder" && b.type === "file") return -1
    if (a.type === "file" && b.type === "folder") return 1
    return a.name.localeCompare(b.name)
  })
}
