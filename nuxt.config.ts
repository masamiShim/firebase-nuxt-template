import { NuxtConfig } from "@nuxt/types"

const nuxtConfig: NuxtConfig = {
  target: "static",
  env: {
    fileURL: process.env.FILE_URL || "http://localhost:3000"
  },
  generate: {
    interval: 2000
  },
  router: {
    base: "/"
  },
  srcDir: "client/",
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - front-nuxt-template",
    title: "front-nuxt-template",
    htmlAttrs: {
      lang: "ja"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/composition-api",
    "@/plugins/axios",
    { src: "@/plugins/vuex-persist", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    // composition-api
    "@nuxtjs/composition-api/module",
    "nuxt-typed-vuex"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/proxy",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/firebase"
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    prefix: "/api/v1",
    host: "localhost",
    port: 3000,
    debug: true,
    proxy: true
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false
    }
  },

  // firebase
  firebase: {
    config: {
      apiKey: process.env.FB_API_KEY || "",
      authDomain: process.env.FB_AUTH_DOMAIN || "",
      projectId: process.env.FB_PROJECT_ID || "",
      storageBucket: process.env.FB_STORAGE_BUCKET || "",
      messagingSenderId: process.env.FB_MESSAGING_SENDER_ID || "",
      appId: process.env.FB_APP_ID || "",
      measurementId: process.env.FB_MESUREMENT_ID || ""
    },
    services: {
      auth: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["/typed-vuex/"]
  }
}

export default nuxtConfig
