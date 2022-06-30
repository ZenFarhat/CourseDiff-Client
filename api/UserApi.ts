import { UserInterface } from "../models/userCollectionModel.interface"
import { AxiosClient } from "./AxiosClient"

export class UserApi extends AxiosClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_BASE_URL!)
  }

  public async getProfile(post: { displayName: string }): Promise<UserInterface> {
    return (await this.AxiosInstance.post("profile", post)).data
  }

  public async checkIfUserExists(displayName: string): Promise<void> {
    return (await this.AxiosInstance.get(`displayname/${displayName}`)).data
  }
}
