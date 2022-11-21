export interface ICodeDiff {
  code: string
  timeStamp: string
}

export interface IVideoFile {
  filePath: string
  history: ICodeDiff[]
}

export interface IUserVideo {
  videoName: string
  files: IVideoFile[]
}

export interface UserInterface {
  uid: string
  displayName: string
  companyName: string | null
  videos: IUserVideo[]
}
