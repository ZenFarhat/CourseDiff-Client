import { FilesArrayModel, VideosModel } from "./../models/userCollectionModel.interface"
import { UserInterface } from "./../models/userCollectionModel.interface"
import { AxiosClient } from "./AxiosClient"

export class FileApi extends AxiosClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_BASE_URL!)
  }

  public async addFile(post: FilesArrayModel, videoName: string): Promise<VideosModel> {
    return (await this.AxiosInstance.post(`files/${encodeURIComponent(videoName)}`, post)).data
  }
}
