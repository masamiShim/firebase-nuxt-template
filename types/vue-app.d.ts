// TODO: import Vue忘れるとすごいめんどい
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import "@vue/composition-api"
import type { Framework } from "vuetify"
import { accessorType } from "@/store"
import AuthGateway from "@/gateway/AuthGateway"
import PasswordResetGateway from "@/gateway/PasswordResetGateway"
import FileUploadGateway from "@/gateway/FileUploadGateway"
import FileDownloadGateway from "@/gateway/FileDownloadGateway"
import PurchaseGateway from "@/gateway/PurchaseGateway"
import ProductGateway from "@/gateway/ProductGateway"
import CartGateway from "@/gateway/CartGateway"

export type Gateways = {
  auth: AuthGateway
  reset: {
    password: PasswordResetGateway
  }
  file: {
    upload: FileUploadGateway
    download: FileDownloadGateway
  }
  purchase: PurchaseGateway
  product: ProductGateway
  cart: CartGateway
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
    readonly $vuetify: Framework
  }

  interface Context {
    readonly $gateway: Gateways
    readonly $accessor: typeof accessorType
    readonly $vuetify: Framework
  }
}

declare module "@vue/composition-api" {
  interface SetupContext {
    readonly $accessor: typeof accessorType
    readonly $vuetify: Framework
  }
}
