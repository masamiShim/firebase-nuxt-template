import { NuxtAxiosInstance } from "@nuxtjs/axios"

export default class PurchaseGateway {
  private readonly axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  public async purchase(_: string): Promise<void> {
    // const endpoint = "/download"
    // await this.axios.$post(endpoint, { path }, { responseType: "blob" })
    return await Promise.resolve()
  }
}
