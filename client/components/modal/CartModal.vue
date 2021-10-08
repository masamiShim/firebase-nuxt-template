<template>
  <modal-base :open.sync="showModal" max-width="880" min-width="360">
    <template #modal-title>
      <span class="white--text">カート</span>
    </template>
    <template #modal-body>
      <v-card class="pa-4">
        <v-card-subtitle>商品名</v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col class="col-md-3 col-sm-6">
              <v-img
                height="200"
                width="200"
                :src="`https://picsum.photos/500/300?image=5`"
                :lazy-src="`https://picsum.photos/10/6?image=5`"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
            <v-col class="col-sm-12 col-md-9">
              <v-row dense>
                <v-col>
                  samplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesample
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  価格： ¥300
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  数量： 1 個
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="pa-4 mt-5">
        <v-card-subtitle>商品名</v-card-subtitle>
        <v-row>
          <v-col class="col-md-3 col-sm-6">
            <v-img
              height="200"
              width="200"
              :src="`https://picsum.photos/500/300?image=5`"
              :lazy-src="`https://picsum.photos/10/6?image=5`"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template #placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-col class="col-sm-12 col-md-9">
            <v-row dense>
              <v-col>
                samplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesample
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                価格： ¥300
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                数量： 1 個
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-divider class="mt-5" />
      <v-row>
        <v-col class="text-right"><span class="font-weight-bold">小計 ¥300</span></v-col>
      </v-row>
    </template>
    <template #modal-action>
      <v-btn color="primary" @click.stop="movePurchase">購入手続きへ</v-btn>
    </template>
  </modal-base>
</template>

<script lang="ts">
import { computed, defineComponent } from "@nuxtjs/composition-api"
import ModalBase from "@/components/modal/ModalBase.vue"

export default defineComponent({
  components: { ModalBase },
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  setup(prop, { emit }) {
    const showModal = computed({
      get: () => prop.open,
      set: (v) => emit("update:open", v)
    })

    const movePurchase = () => {
      emit("purchase")
      showModal.value = false
    }

    return { showModal, movePurchase }
  }
})
</script>

<style scoped>

</style>