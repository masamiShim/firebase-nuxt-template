// TODO: import Vue忘れるとすごいめんどい
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from "vue"
import "@vue/composition-api"
import { accessorType } from "@/store"

export type Gateways = {
  auth: any
}
declare module "vue/types/vue" {
  interface Vue {
    readonly $gateway: Gateways
    readonly $accessor: typeof accessorType
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    readonly $gateway: Gateways
    readonly $accessor: typeof accessorType
  }
  interface Context {
    readonly $gateway: Gateways
    readonly $accessor: typeof accessorType
  }
}

declare module "@vue/composition-api" {
  interface SetupContext {
    readonly $accessor: typeof accessorType
  }
}
