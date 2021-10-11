<template>
  <v-app dark>
    <global-loader />
    <my-toast />
    <header>
      <v-app-bar
        color="#ffffff"
        flat
        fixed
        height="64"
      >
        <v-app-bar-title>{{ state.title }}</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon @click="showCartModal = true">
          <v-badge
            v-if="cartCount > 0"
            color="blue"
            :content="cartCount"
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
          <v-icon v-else>mdi-cart</v-icon>

        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template #extension>
          <v-tabs fixed-tabs>
            <v-tab nuxt to="/">Home</v-tab>
            <v-tab nuxt to="/about">ABOUT</v-tab>
            <v-tab nuxt to="/blog">BLOG</v-tab>
            <v-tab nuxt to="/contact">CONTACT</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
    </header>
    <v-main class="pt-16 mt-12">
      <Nuxt />
    </v-main>
    <footer>
      <v-footer
        :absolute="!state.fixed"
        app
      >
        <span>&copy; 2020 - {{ new Date().getFullYear() }}</span>
      </v-footer>
    </footer>
    <cart-modal v-if="showCartModal" :open.sync="showCartModal" @purchase="handlePurchase"></cart-modal>
    <purchase-modal v-if="showPurchaseModal" :open.sync="showPurchaseModal"></purchase-modal>
  </v-app>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  useContext
} from "@nuxtjs/composition-api"
import MyToast from "@/components/util/MyToast.vue"
import GlobalLoader from "@/components/util/GlobalLoader.vue"
import CartModal from "@/components/modal/CartModal.vue"
import PurchaseModal from "@/components/modal/PurchaseModal.vue"

export default defineComponent({
  components: { PurchaseModal, GlobalLoader, MyToast, CartModal },
  setup(_) {
    const ctx = useContext()
    const globalLoading = computed(() => ctx.$accessor.loading.isLoading)
    const cartCount = computed(() => ctx.$accessor.cart.count)
    const state = reactive({
      clipped: false,
      drawer: false,
      fixed: false,
      tabs: [
        "Top",
        ""
      ],
      items: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/service"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Matter",
          to: "/service/matter"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "EC-Demo"
    })
    const visibleHandler = async () => {
      /*
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
      */
    }
    onMounted(() => {
      window.document.addEventListener("visibilitychange", visibleHandler)
    })
    onUnmounted(() => {
      window.document.removeEventListener("visibilitychange", visibleHandler)
    })

    const showCartModal = ref<boolean>(false)
    const showPurchaseModal = ref<boolean>(false)

    const handlePurchase = () => {
      showPurchaseModal.value = true
    }
    onBeforeMount(() => {
      if (!window._payJp) {
        const key = process.env.payJpPublicKey
        window._payJp = window.Payjp(key)
      }
    })

    return { state, cartCount, globalLoading, showCartModal, showPurchaseModal, handlePurchase }
  }
})
</script>
