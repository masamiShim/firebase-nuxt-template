<template>
  <div>
    <v-row>
      <v-col>
        <v-img
          :aspect-ratio="16/9"
          src="https://picsum.photos/1920/1080?image=1027"
          max-height="400"
        ></v-img>
      </v-col>
    </v-row>
    <section class="my-16">
      <v-card flat>
        <v-card-subtitle class="text-center"><h1>News</h1></v-card-subtitle>
        <v-card-text class=" text-center">
          <v-carousel v-model="slide"
                      cycle
                      height="50"
                      hide-delimiters
                      hide-delimiter-background
          >
            <v-carousel-item
              v-for="content in state.news"
              :key="content.id"
            >
              <div class="caption mb-1">{{content.date}}</div>
              <div>
                {{ content.text }}
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-card-text>
      </v-card>
    </section>
    <v-container>
      <v-row justify="space-between">
        <v-col class="offset-1 col-10">
          <v-img
            :aspect-ratio="16/9"
            class="justify-space-around"
            src="https://picsum.photos/1920/1080?image=1027"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
            max-height="200"
            max-width="1000"
          ></v-img>
        </v-col>
      </v-row>
      <section>
        <v-row justify="center">
          <v-col
            v-for="product in state.products"
            :key="product.id"
            class="col-12 col-sm-6 col-md-4"
          >
            <v-card>
              <mock-image :src="product.src" :lazy-src="product.lazySrc" />
              <v-card-subtitle class="text-center">{{ product.name }}</v-card-subtitle>
              <v-card-text class="text-center">
                <p>{{ product.description }}</p>
                <p>¥ {{ product.price }}</p>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-spacer />
                <cart-remove v-if="hasCart(product.id)" @remove="removeCart(product.id)" />
                <cart-add v-else @add="addCart(product.id)" />
                <v-btn text color="primary">購入する</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>
<script lang="ts">

import { computed, defineComponent, onBeforeMount, reactive, ref, useContext } from "@nuxtjs/composition-api"
import MockImage from "@/components/mock/MockImage.vue"
import { Product } from "~/types/application"
import CartAdd from "@/components/util/CartAdd.vue"
import CartRemove from "@/components/util/CartRemove.vue"
import { news } from "@/mock/mock"

export default defineComponent({
  components: { CartRemove, CartAdd, MockImage },
  setup(_, __) {
    const ctx = useContext()
    const slide = ref(0)
    const state = reactive<{ products: Product[], news: any[] }>({
      products: [],
      news: []
    })
    const cartItems = computed(() => {
      return ctx.$accessor.cart.list
    })

    onBeforeMount(async () => {
      await ctx.$gateway.product.list("").then((res) => {
        state.products = res.body
      })
      state.news = news
    })

    const hasCart = (id: number) => {
      return cartItems.value.includes(id)
    }

    const addCart = (id: number) => {
      ctx.$accessor.cart.addItem([id])
    }
    const removeCart = (id: number) => {
      ctx.$accessor.cart.removeItem([id])
    }

    return { state,slide, hasCart, addCart, removeCart }
  }
})
</script>
