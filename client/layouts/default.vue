<template>
  <v-app dark>
    <global-loader />
    <my-toast/>
    <v-navigation-drawer
      v-model="state.drawer"
      :mini-variant="state.miniVariant"
      :clipped="state.clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in state.items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="state.clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="state.drawer = !state.drawer" />
      <v-btn
        icon
        @click.stop="state.miniVariant = !state.miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${state.miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="state.clipped = !state.clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="state.fixed = !state.fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="state.title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="state.rightDrawer = !state.rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container v-show="!globalLoading">
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="state.rightDrawer"
      :right="state.right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="state.right = !state.right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!state.fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  useContext,
  useRouter
} from "@nuxtjs/composition-api"
import MyToast from "@/components/util/MyToast.vue"
import GlobalLoader from "@/components/util/GlobalLoader.vue"

export default defineComponent({
  components: { GlobalLoader, MyToast },
  setup(_) {
    const ctx = useContext()
    const globalLoading = computed(() => ctx.$accessor.loading.isLoading)
    const router = useRouter()

    const state = reactive({
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    })
    const visibleHandler = async () => {
      if (window.document.visibilityState === "visible") {
        ctx.$accessor.loading.start()
        // コンテンツ表示
        if (!ctx.$accessor.auth.isAuthorized) {
          ctx.$accessor.loading.complete()
          await router.push("/auth/login")
        }
        ctx.$accessor.loading.complete()
      }

      if (window.document.visibilityState === "hidden") {
        // コンテンツ非表示
      }

    }
    onMounted(() => {
      window.document.addEventListener("visibilitychange", visibleHandler)
    })
    onUnmounted(() => {
      window.document.removeEventListener("visibilitychange", visibleHandler)
    })
    return { state, globalLoading }
  }
})
</script>
