import { UserInterface } from "./../../server/src/interfaces/user.interface"
import { AxiosClient } from "./AxiosClient"

export class UserApi extends AxiosClient {
  constructor() {
    super("http://localhost:3002/coursediff/")
  }

  public async getProfile(post: { uid: string; displayName: string }): Promise<UserInterface> {
    return (await this.AxiosInstance.post("profile", post)).data
  }

  public async checkIfUserExists(displayName: string): Promise<void> {
    return (await this.AxiosInstance.get(`displayname/${displayName}`)).data
  }
}
