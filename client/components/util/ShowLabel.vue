<template>
  <div>
    <v-chip>{{label}}</v-chip><span class="ml-3"><slot></slot></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
  }
})
</script>
