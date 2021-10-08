<template>
<div>
  <v-list-item v-if="isXs" dense>
    <v-list-item-content>
      <v-card flat>
        <v-card-text>
          <v-row>
            <v-col class="text-center" cols="6" offset="3">
              <v-avatar size="150" tile>
                <v-img src="https://picsum.photos/500/300?image=5"></v-img>
              </v-avatar>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-subtitle>商品名１</v-card-subtitle>
        <v-card-text>
          <v-row dense>
            <v-col>
              <p class="font-weight-regular">
                samplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesampl
                esamplesample
              </p>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-chip label outlined class="mr-2">金額</v-chip>
              <span>¥ 300</span>
            </v-col>
            <v-col>
              <v-chip label outlined class="mr-2">数量</v-chip>
              <span>1</span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-checkbox dense label="購入"></v-checkbox>
        </v-card-actions>
      </v-card>
    </v-list-item-content>
  </v-list-item>
  <v-list-item v-else class="d-flex" dense>
    <v-list-item-avatar size="100" tile>
      <v-img src="https://picsum.photos/500/300?image=5"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>アクセサリー１</v-list-item-title>
      <v-row dense>
        <v-col class="col-12" style="width: 200px; overflow-wrap: break-word">
          <p>
            samplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesampl
            esamplesample

            samplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesample
            samplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesamplesample
          </p>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col class="col-12 col-md-3">
          <v-chip label outlined class="mr-2">金額</v-chip>
          ¥300
        </v-col>
        <v-col class="col-12 col-md-3">
          <v-chip label outlined class="mr-2">数量</v-chip>
          1
        </v-col>
        <v-spacer />
      </v-row>
    </v-list-item-content>
    <v-list-item-action>
      <v-checkbox label="購入"></v-checkbox>
    </v-list-item-action>
  </v-list-item>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from "@nuxtjs/composition-api"

export default defineComponent({
  setup() {
    const ctx = useContext()
    const isXs = computed(() => ctx.$vuetify.breakpoint.xsOnly)
    return { isXs }
  }
})
</script>

<style scoped>

</style>