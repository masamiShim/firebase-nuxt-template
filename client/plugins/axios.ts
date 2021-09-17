import { Context } from '@nuxt/types'
import { Inject, Plugin } from '@nuxt/types/app'
import qs from 'qs'
import { AuthStore } from '@/store'
import { Gateways } from '~/types/vue-app'

const BadRequestStatus = 400
const UnAuthorizedStatus = 401

const axiosPlugin: Plugin = (ctx: Context, inject: Inject) => {
  // const isDev: boolean = process.env.PROCESS_ENV !== 'production'
  // context.$axios.setBaseURL(isDev ? 'http://localhost:3000' : process.env.BASE_URL || '')
  ctx.$axios.setHeader('Accept', 'application/json', 'common')
  ctx.$axios.setHeader('X-Requested-With', 'XMLHttpRequest')
  ctx.$axios.setHeader('Content-Type', 'application/json')

  ctx.$axios.onRequest((config) => {
    // 認証系の設定
    const token = AuthStore.accessToken
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
      console.log('bad request', error.response)
      // eslint-disable-next-line no-prototype-builtins
      if (error.response.data.hasOwnProperty('body')) {
        const message = ctx.app.i18n.tc(error.response.data.body.reason, 0, 'ja')
        // @ts-ignore
        context.$toast.error(message)
      }
      // eslint-disable-next-line no-prototype-builtins
      if (error.response.data.hasOwnProperty('errorMessage')) {
        const messages = error.response.data.errorMessage.map((mes: string) => {
          return ctx.app.i18n.tc(mes, 0, 'ja')
        })
        // @ts-ignore
        context.$toast.error(messages.join('<br>'))
      }
      return error.response
    }

    // 401
    if (error.response?.status === UnAuthorizedStatus) {
      // リフレッシュトークンでの再認証
      // 再認証失敗時は認証情報を破棄/リクエストされたページを記録してログインへリダイレクト
      // 再認証成功時は再度リクエストを実行
      const refreshToken = AuthStore.refreshToken
      const originalRequest = error.config

      try {
        const refreshedTokenPair = await ctx.$gateway.auth.refresh(refreshToken)

        if (refreshedTokenPair.isServerError() || refreshedTokenPair.isBadRequest()) {
          // 認証情報の破棄
          await AuthStore.logout()
          // await AuthStore.redirectRoute(context.route.path)
          await AuthStore.redirectRoute()
          // ログインページへリダイレクト
          ctx.redirect('/login')
        } else {
          await AuthStore.setAuth({
            accessToken: refreshedTokenPair.result.accessToken,
            refreshToken: refreshedTokenPair.result.refreshToken,
          })
          // トークンを更新して実施
          originalRequest.headers.Authorization = `Bearer ${refreshedTokenPair.result.accessToken}`
          return await ctx.$axios.request(originalRequest)
        }
      } catch (err) {
        console.log(err)
        // 認証情報の破棄
        await AuthStore.logout()
        // await AuthStore.redirectRoute(context.route.path)
        await AuthStore.redirectRoute()

        // ログインページへリダイレクト
        ctx.redirect('/login')
      }
    }

  })

  // TODO: APIの定義とかはここにまとめる
  const gateways: Gateways = {
    auth: [],
  }
  inject('gateways', gateways)
}

export default axiosPlugin
