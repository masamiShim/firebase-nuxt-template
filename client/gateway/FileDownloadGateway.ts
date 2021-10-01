import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { MyResponse } from "~/types/application"

export default class FileDownloadGateway {
  private readonly axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  public async download(
    path: string
  ): Promise<MyResponse<{ key: string; url: string; name: string }[]>> {
    const endpoint = "/download"
    return await this.axios.$post(endpoint, { path }, { responseType: "blob" })
  }
}
