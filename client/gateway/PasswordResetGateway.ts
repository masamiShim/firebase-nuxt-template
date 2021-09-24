import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { MyResponse } from "~/types/application"

export default class PasswordResetGateway {
  private readonly axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  public async resetPasswordRequest(email: string): Promise<MyResponse<void>> {
    const endpoint = "/auth/forgot/request"
    return await this.axios.$post(endpoint, { email })
  }

  public async tokenVerify(token: string): Promise<MyResponse<void>> {
    const endpoint = "/auth/forgot/verify"
    return await this.axios.$post(endpoint, { token })
  }

  public async resetPassword(
    token: string,
    password: string,
    confirmation: string
  ): Promise<MyResponse<void>> {
    const endpoint = "/auth/forgot/reset"
    const data = {
      token,
      password: {
        val: password,
        confirmation,
      },
    }
    return await this.axios.$post(endpoint, data)
  }
}
