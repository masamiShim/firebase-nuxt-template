<template>
  <v-card class="ma-3 pa-3" dense>
    <v-card-text>
      <v-row>
        <v-col>{{ item.name }}</v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-avatar size="100" tile>
            <mock-image :src="item.src" :lazy-src="item.lazySrc" />
          </v-avatar>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col class="col-12" style="width: 200px; overflow-wrap: break-word">
          <p>
            {{ item.description }}
          </p>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col class="col-12 col-md-3">
          <v-row justify="center" align="center">
            <v-col cols="2" style="min-width: 80px">
              <v-chip label outlined class="mr-2">金額</v-chip>
            </v-col>
            <v-col>
              ¥ {{ item.price }}
            </v-col>
          </v-row>
        </v-col>
        <v-col class="col-12 col-md-3">
          <v-row>
            <v-col cols="2" style="min-width: 80px">
              <v-chip label outlined class="mr-2">数量</v-chip>
            </v-col>
            <v-col class="col-3 col-sm-2 col-md-4">
              <my-input-text-field  v-model="quantity" min="1" max="99" type="number" @input="(e) => $emit('changeQuantity', {id: item.id, value: quantity})" />
            </v-col>
            <v-spacer />
          </v-row>
        </v-col>
        <v-spacer />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, useContext } from "@nuxtjs/composition-api"
import { Product } from "~/types/application"
import MockImage from "@/components/mock/MockImage.vue"
import MyInputTextField from "@/components/form/MyInputTextField.vue"

export default defineComponent({
  components: { MyInputTextField, MockImage },
  props: {
    item: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  setup() {
    const ctx = useContext()
    const quantity = ref<string>("1")
    const isXs = computed(() => ctx.$vuetify.breakpoint.xsOnly)
    return { isXs, quantity }
  }
})
</script>

<style scoped>

</style>