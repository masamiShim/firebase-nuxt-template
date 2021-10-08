<template>
  <div ref="root">
    <v-row>
      <v-col cols="3" class="text-right">
        カード番号
      </v-col>
      <v-col cols="5">
        <div id="card" class="payjs-outer"></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" class="text-right">
          有効期限
      </v-col>
      <v-col cols="3">
        <div id="expire" class="payjs-outer"></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" class="text-right">
          セキュリティコード
      </v-col>
      <v-col cols="3">
        <div id="cvc" class="payjs-outer"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@nuxtjs/composition-api"

export default defineComponent({
  props: {
    numberElement: {
      type: Object,
      required: true
    },
    expiryElement: {
      type: Object,
      required: true
    },
    cvcElement: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    onMounted(() => {
      props.numberElement.mount("#card")
      props.expiryElement.mount("#expire")
      props.cvcElement.mount("#cvc")
    })
  }
})
</script>

<style scoped>
div.payjs-outer {
  border-bottom: thin solid #198fcc;
  padding: 6px;
}
</style>