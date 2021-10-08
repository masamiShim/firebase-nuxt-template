// TODO: import Vue忘れるとすごいめんどい
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from "vue"
import "@vue/composition-api"
import type { Framework } from "vuetify"
import { accessorType } from "@/store"
import AuthGateway from "@/gateway/AuthGateway"
import PasswordResetGateway from "@/gateway/PasswordResetGateway"
import FileUploadGateway from "@/gateway/FileUploadGateway"
import FileDownloadGateway from "@/gateway/FileDownloadGateway"

export type Gateways = {
  auth: AuthGateway
  reset: {
    password: PasswordResetGateway
  }
  file: {
    upload: FileUploadGateway
    download: FileDownloadGateway
  }
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
