export interface Children {
  type: "folder" | "file"
  id: string
  name: string
  codeDiffs?: codeDiffModel[]
}

export interface codeDiffModel {
  timeStamp: string
  codeDiff: string
}

export interface FilesArrayModel {
  refId: string | null
  children: Children[]
}

export interface VideosModel {
  videoName: string
  files: FilesArrayModel[]
}

export interface UserInterface {
  uid: string
  displayName: string
  companyName: string | null
  videos: VideosModel[]
}
