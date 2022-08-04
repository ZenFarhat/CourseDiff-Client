export interface codeDiffModel {
  timeStamp: string
  codeDiff: string
}

export interface VideosModel {
  videoName: string
  rootFolderDocumentId: string
}

export interface UserInterface {
  uid: string
  displayName: string
  companyName: string | null
  videos: VideosModel[]
}

export interface FolderChildrenModel {
  type: "file" | "folder"
  name: string
  id: string
  refId?: string
  codeDiffs?: codeDiffModel[]
}

export interface FolderModel {
  parentFolder: string | null
  children: FolderChildrenModel[]
}
