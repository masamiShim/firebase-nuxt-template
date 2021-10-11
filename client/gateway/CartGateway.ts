import { NuxtAxiosInstance } from "@nuxtjs/axios"

export default class CartGateway {
  private readonly axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  public async add(_: string): Promise<void> {
    // const endpoint = "/download"
    // await this.axios.$post(endpoint, { path }, { responseType: "blob" })
    return await Promise.resolve()
  }

  public async remove(_: string): Promise<void> {
    // const endpoint = "/download"
    // await this.axios.$post(endpoint, { path }, { responseType: "blob" })
    return await Promise.resolve()
  }
}
