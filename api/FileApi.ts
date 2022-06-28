import { FilesArrayModel, VideosModel } from "./../models/userCollectionModel.interface"
import { UserInterface } from "./../models/userCollectionModel.interface"
import { AxiosClient } from "./AxiosClient"

export class FileApi extends AxiosClient {
  constructor() {
    super("http://localhost:3002/coursediff/")
  }

  public async addFile(post: FilesArrayModel, videoName: string): Promise<VideosModel> {
    return (await this.AxiosInstance.post(`files/${encodeURIComponent(videoName)}`, post)).data
  }
}
