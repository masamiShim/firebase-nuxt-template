<template>
  <v-tooltip top>
    <template #activator="{ on, attrs }">
      <v-btn color="enable" icon v-bind="attrs" v-on="on" @click="$emit('add')">
        <v-icon>mdi-cart-plus</v-icon>
      </v-btn>
    </template>
    <span>カートに追加する</span>
  </v-tooltip>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"

export default defineComponent({
  setup(){}
})
</script>

<style scoped>

</style>