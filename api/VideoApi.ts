import { FilesArrayModel, VideosModel } from "../models/userCollectionModel.interface"

import { AxiosClient } from "./AxiosClient"

export class VideoApi extends AxiosClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_BASE_URL!)
  }

  public async addVideo(post: VideosModel): Promise<void> {
    return (await this.AxiosInstance.post("videos", post)).data
  }

  public async deleteVideo(videoName: string): Promise<void> {
    return (await this.AxiosInstance.delete(`videos/${videoName}`)).data
  }

  public async getVideo(displayName: string, videoName: string): Promise<FilesArrayModel[]> {
    return (await this.AxiosInstance.get(`videos/${displayName}/${videoName}`)).data
  }
}
