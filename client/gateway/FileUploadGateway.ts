import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { MyResponse, UploadFile } from "~/types/application"

export default class FileUploadGateway {
  private readonly axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  public async upload(
    files: File[],
    isPublic: boolean = false
  ): Promise<MyResponse<UploadFile[]>> {
    const endpoint = "/upload/temporary"
    const data = new FormData()
    for (const file of files) {
      data.append("files[]", file)
    }
    data.append("isPublic", String(isPublic))
    return await this.axios.$post(endpoint, data)
  }
}
