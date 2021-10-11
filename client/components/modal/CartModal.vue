<template>
  <modal-base :open.sync="showModal" max-width="880" min-width="360">
    <template #modal-title>
      <span class="white--text">カート</span>
    </template>
    <template #modal-body>
      <div v-if="!cartItems.length">
        カートに商品がありません
      </div>
      <div v-else>

        <v-row>
          <v-col class="text-center"><span class="font-weight-bold">合計 {{ cartItems.length }}点</span></v-col>
        </v-row>
        <v-divider class="my-5" />
        <v-row class="pa-3">
          <v-col v-for="item in cartItems" :key="item.id" class="col-12 col-sm-6 col-md-4">
            <cart-item :item="item"></cart-item>
          </v-col>
        </v-row>

        <v-divider class="my-5" />
        <v-row>
          <v-col class="text-center"><span class="font-weight-bold">合計 {{ cartItems.length }}点</span></v-col>
        </v-row>
      </div>
    </template>
    <template #modal-action>
      <v-btn :disabled="!cartItems.length" color="primary" @click.stop="movePurchase">購入手続きへ</v-btn>
    </template>
  </modal-base>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, reactive, useContext } from "@nuxtjs/composition-api"
import ModalBase from "@/components/modal/ModalBase.vue"
import CartItem from "@/components/cart/CartItem.vue"
import { Product } from "~/types/application"

export default defineComponent({
  components: { CartItem, ModalBase },
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  setup(prop, { emit }) {
    const ctx = useContext()
    const state = reactive<{ products: Product[] }>({
      products: []
    })
    const showModal = computed({
      get: () => prop.open,
      set: (v) => emit("update:open", v)
    })

    const movePurchase = () => {
      emit("purchase")
      showModal.value = false
    }

    const cartItems = computed(() => {
      const items = ctx.$accessor.cart.list
      return state.products.filter((p) => items.includes(p.id))
    })

    onBeforeMount(async () => {
      await ctx.$gateway.product.list("").then((res) => {
        state.products = res.body
      })
    })


    return { showModal, movePurchase, state, cartItems }
  }
})
</script>

<style scoped>

</style>