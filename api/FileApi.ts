import { FilesArrayModel, codeDiffModel } from "./../models/userCollectionModel.interface"
import { UserInterface } from "./../models/userCollectionModel.interface"
import { AxiosClient } from "./AxiosClient"

export class FileApi extends AxiosClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_BASE_URL!)
  }

  public async addFile(post: FilesArrayModel, videoName: string): Promise<FilesArrayModel[]> {
    return (await this.AxiosInstance.post(`files/${encodeURIComponent(videoName)}`, post)).data
  }

  public async addTimeStampToFile(post: codeDiffModel, videoName: string, fileName: string): Promise<FilesArrayModel> {
    return (await this.AxiosInstance.post(`files/${encodeURIComponent(videoName)}/${fileName}`, post)).data
  }

  public async updateCodeAtTimeStamp(put: codeDiffModel, videoName: string, fileName: string): Promise<FilesArrayModel[]> {
    return (await this.AxiosInstance.put(`files/${encodeURIComponent(videoName)}/${fileName}`, put)).data
  }
}
