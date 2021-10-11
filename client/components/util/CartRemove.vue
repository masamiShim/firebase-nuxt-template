<template>
  <v-tooltip top>
    <template #activator="{ on, attrs }">
      <v-btn color="danger" icon v-bind="attrs" v-on="on" @click="$emit('remove')">
        <v-icon>mdi-cart-off</v-icon>
      </v-btn>
    </template>
    <span>カートから戻す</span>
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