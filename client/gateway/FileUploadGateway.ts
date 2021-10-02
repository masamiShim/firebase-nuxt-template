import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { MyResponse } from "~/types/application"

export default class FileUploadGateway {
  private readonly axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  public async upload(
    files: File[],
    isPublic: boolean = false
  ): Promise<MyResponse<{ key: string; url: string; name: string }[]>> {
    const endpoint = "/upload/temporary"
    const data = new FormData()
    for (const file of files) {
      data.append("files[]", file)
    }
    data.append("isPublic", String(isPublic))
    return await this.axios.$post(endpoint, data)
  }
}
