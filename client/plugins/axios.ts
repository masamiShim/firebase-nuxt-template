import { Context } from "@nuxt/types"
import { Inject, Plugin } from "@nuxt/types/app"
import qs from "qs"
import { Gateways } from "~/types/vue-app"
import AuthGateway from "@/gateway/AuthGateway"
import PasswordResetGateway from "@/gateway/PasswordResetGateway"
import FileUploadGateway from "@/gateway/FileUploadGateway"
import FileDownloadGateway from "@/gateway/FileDownloadGateway"
import PurchaseGateway from "@/gateway/PurchaseGateway"
import CartGateway from "@/gateway/CartGateway"
import ProductGateway from "@/gateway/ProductGateway"

const BadRequestStatus = 400
const UnAuthorizedStatus = 401

const axiosPlugin: Plugin = (ctx: Context, inject: Inject) => {
  // const isDev: boolean = process.env.PROCESS_ENV !== 'production'
  // context.$axios.setBaseURL(isDev ? 'http://localhost:3000' : process.env.BASE_URL || '')
  ctx.$axios.setHeader("Accept", "application/json", "common")
  ctx.$axios.setHeader("X-Requested-With", "XMLHttpRequest")
  ctx.$axios.setHeader("Content-Type", "application/json")

  ctx.$axios.onRequest((config) => {
    // 認証系の設定
    const token = ctx.$accessor.auth.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    config.paramsSerializer = (params) => {
      return qs.stringify(params)
    }
  })

  ctx.$axios.onResponseError(async (error) => {
    // 400
    if (error.response?.status === BadRequestStatus) {
      if ("body" in error.response.data) {
        /*
        const message = ctx.app.i18n.tc(
          error.response.data.body.reason,
          0,
          "ja"
        )
        // @ts-ignore
        context.$toast.error(message)
        */
        // [{k1:{k2: }}]
        const message = error.response.data.body.map((v1: any) => {
          // {k1:{k2: }}
          const messages: any[] = []
          for (const v12 of Object.values<any[]>(v1)) {
            // {k2: v2, k3: v3}
            messages.push(...Object.values(v12))
          }
          return messages
        })
        ctx.$accessor.toast.show({
          message: message.join("\n"),
          color: "error",
          timeout: 4000,
        })
        // alert(message.join("\n"))
        throw new Error(message.join("::"))
      }
      return
    }

    // 401
    if (error.response?.status === UnAuthorizedStatus) {
      // リフレッシュトークンでの再認証
      // 再認証失敗時は認証情報を破棄/リクエストされたページを記録してログインへリダイレクト
      // 再認証成功時は再度リクエストを実行
      const refreshToken = ctx.$accessor.auth.refreshToken
      if (!refreshToken) {
        await ctx.$accessor.auth.logout()
        // await AuthStore.redirectRoute(context.route.path)
        await ctx.$accessor.auth.redirectRoute()
        // ログインページへリダイレクト
        ctx.redirect("/login")
        return
      }
      const originalRequest = error.config

      try {
        const refreshedTokenPair = await ctx.$gateway.auth.refresh(refreshToken)

        await ctx.$accessor.auth.setToken({
          accessToken: refreshedTokenPair.body.accessToken,
          refreshToken: refreshedTokenPair.body.refreshToken,
        })
        // トークンを更新して実施
        originalRequest.headers.Authorization = `Bearer ${refreshedTokenPair.body.accessToken}`
        return await ctx.$axios.request(originalRequest)
      } catch (err) {
        // 認証情報の破棄
        await ctx.$accessor.auth.logout()
        // await AuthStore.redirectRoute(context.route.path)
        await ctx.$accessor.auth.redirectRoute()

        // ログインページへリダイレクト
        ctx.redirect("/login")
      }
    }
  })

  // TODO: APIの定義とかはここにまとめる
  const gateways: Gateways = {
    auth: new AuthGateway(ctx.$axios),
    file: {
      upload: new FileUploadGateway(ctx.$axios),
      download: new FileDownloadGateway(ctx.$axios),
    },
    reset: {
      password: new PasswordResetGateway(ctx.$axios),
    },
    purchase: new PurchaseGateway(ctx.$axios),
    cart: new CartGateway(ctx.$axios),
    product: new ProductGateway(ctx.$axios),
  }
  inject("gateway", gateways)
}

export default axiosPlugin
