import axios, { AxiosError } from "axios"
import { auth } from "../firebase"

export abstract class AxiosClient {
  protected readonly AxiosInstance

  public constructor(baseURL: string) {
    this.AxiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 15000,
    })

    this.AxiosInstance.interceptors.request.use(async (config) => {
      config.headers = config.headers || {}
      config.headers["uid"] = (await auth.currentUser?.uid) || "No User"
      return Promise.resolve(config)
    })
  }
}
