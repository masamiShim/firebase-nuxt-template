<template>
  <v-card class="pa-4">
    <v-btn
      fab
      x-small
      color="secondary"
      style="position: absolute; top: -16px; right: -16px"
      @click="removeCart(item.id)"
    >

      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-card-subtitle>{{item.name}}</v-card-subtitle>
    <v-card-text>
      <v-row>
        <mock-image
          height="200"
          width="200"
          :src="item.src"
          :lazy-src="item.lazySrc" />
        </v-row>
      <v-row>
        <v-col>
          {{item.description}}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          価格： ¥ {{item.price}}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, useContext } from "@nuxtjs/composition-api"
import { Product } from "~/types/application"
import MockImage from "@/components/mock/MockImage.vue"
export default defineComponent({
  components: { MockImage },
  props: {
    item: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  setup() {
    const ctx = useContext()
    const removeCart = (id:number) => {
      ctx.$accessor.cart.removeItem([id])
    }

    return { removeCart }
  }
})
</script>

<style scoped>

</style>