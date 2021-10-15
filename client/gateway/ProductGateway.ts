import { NuxtAxiosInstance } from "@nuxtjs/axios"
import {
  MyResponse,
  PaginateOptions,
  Product,
  UploadFile,
} from "~/types/application"

type ProductShowResponse = {
  product: Product
  images: UploadFile[]
}

export default class ProductGateway {
  private readonly axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  public async paginate(params: PaginateOptions): Promise<MyResponse<any[]>> {
    const endpoint = "/admin/product"
    return await this.axios.$get(endpoint, {
      params,
    })
  }

  public async show(
    productId: string
  ): Promise<MyResponse<ProductShowResponse>> {
    const endpoint = "/admin/product/" + productId
    return await this.axios.$get(endpoint)
  }

  public async post(product: any): Promise<MyResponse<void>> {
    const endpoint = "/admin/product"
    return await this.axios.$post(endpoint, product)
  }

  public async delete(productId: number): Promise<MyResponse<void>> {
    const endpoint = "/admin/product/" + productId
    return await this.axios.$delete(endpoint)
  }
}
