// TODO: import Vue忘れるとすごいめんどい
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue'

export type Gateways = {
  auth: any
}
declare module 'vue/types/vue' {

  interface Vue {
    readonly $gateway: Gateways
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    readonly $gateway: Gateways
  }
  interface Context {
    $gateway: Gateways
  }
}
