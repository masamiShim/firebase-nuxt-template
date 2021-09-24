import { NuxtAxiosInstance } from "@nuxtjs/axios"

type MyResponse<T> = {
  code: string
  body: T
}
type TokenPair = {
  accessToken: string
  refreshToken: string
}
export default class AuthGateway {
  private readonly axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  public async loginByEmail(
    email: string,
    password: string
  ): Promise<MyResponse<TokenPair>> {
    const endpoint = "/auth/login/email"
    return await this.axios.$post(endpoint, { email, password })
  }

  public async refresh(refreshToken: string): Promise<MyResponse<TokenPair>> {
    const endpoint = "/auth/login/token/refresh"
    return await this.axios.$post(endpoint, { token: refreshToken })
  }

  public async signupByEmail(data: {
    email: string
    password: { value: string; confirmation: string }
  }): Promise<MyResponse<TokenPair>> {
    const endpoint = "/auth/signup/email"
    return await this.axios.$post(endpoint, data)
  }
}
