export interface codeDiffModel {
  timeStamp: string
  codeDiff: string
}

export interface FilesArrayModel {
  fileName: string
  codeDiffs: codeDiffModel[]
}

export interface VideosModel {
  videoName: string
  files: FilesArrayModel[]
}

export interface UserInterface {
  uid: string
  displayName: string
  videos: VideosModel[]
}
