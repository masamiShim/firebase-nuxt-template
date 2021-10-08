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
    <section class="my-2">
      <v-card flat>
        <v-card-text class=" text-center">
          <div class="caption mb-1">2022.3.19</div>
          <div>お知らせ追加</div>
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
        <v-row>
          <v-col
            v-for="n in 9"
            :key="n"
            class="d-flex child-flex"
            cols="4"
          >
            <v-card>
              <v-img
                height="250"
                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
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
              <v-card-subtitle class="text-center">image {{ n }}</v-card-subtitle>
              <v-card-text class="text-center">
                <p>samplesamplesamplesamplesamplesamplesamplesamplesample</p>
                <p>¥ 300</p>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-spacer />
                <v-tooltip top>
                  <template #activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-cart-plus</v-icon>
                  </v-btn>
                  </template>
                  <span>カートに追加する</span>
                </v-tooltip>
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

import { defineComponent } from "@nuxtjs/composition-api"

export default defineComponent({
  setup(_, __) {
  }
})
</script>
