<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col class="col-8">
          <v-card flat>
            <v-img
              height="250"
              :src="`https://picsum.photos/500/300?image=4`"
              :lazy-src="`https://picsum.photos/10/6?image=4`"
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
            <v-card-text>
              <v-row justify="space-between">
                <v-spacer />
                <v-col>
                  <v-img
                    height="100"
                    width="100"
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
                <v-col>
                  <v-img
                    height="100"
                    width="100"
                    :src="`https://picsum.photos/500/300?image=6`"
                    :lazy-src="`https://picsum.photos/10/6?image=6`"
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
                <v-col>
                  <v-img
                    height="100"
                    width="100"
                    :src="`https://picsum.photos/500/300?image=7`"
                    :lazy-src="`https://picsum.photos/10/6?image=7`"
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
                <v-spacer />
              </v-row>
            </v-card-text>
            <v-divider />
            <v-card-subtitle>商品説明</v-card-subtitle>
            <v-card-text>
              <p>サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト</p>
              <br>
              <p>サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="offset-1 col-2">
          <v-row>
            <v-col>商品名</v-col>
          </v-row>
          <v-row>
            <v-col>¥ 300</v-col>
          </v-row>
          <v-row>
            <v-col>
              <my-input-text-field v-model="state.quantity" label="数量" />
            </v-col>
          </v-row>
          <v-row>
            <v-col><v-btn color="secondary">      <v-icon left>
              mdi-cart-plus
            </v-icon>
              カートに入れる</v-btn></v-col>
          </v-row>
          <v-row>
            <v-col><v-btn color="primary">購入する</v-btn></v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@nuxtjs/composition-api"
import MyInputTextField from "@/components/form/MyInputTextField.vue"

export default defineComponent({
  components: { MyInputTextField },
  setup() {
    const state = reactive({
      quantity: 1
    })

    return { state }
  }
})
</script>

<style scoped>

</style>