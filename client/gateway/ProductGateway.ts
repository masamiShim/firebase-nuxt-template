import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { MyResponse, Product } from "~/types/application"
import { products } from "@/mock/mock"

export default class ProductGateway {
  private readonly axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  public async list(_: string): Promise<MyResponse<Product[]>> {
    // const endpoint = "/download"
    // await this.axios.$post(endpoint, { path }, { responseType: "blob" })
    return await Promise.resolve({ code: "200", body: products })
  }
}
