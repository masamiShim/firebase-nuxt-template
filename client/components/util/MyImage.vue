<template>
  <v-img :src="`${fileUrl}${src}`"
         v-bind="$attrs"
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
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true
    }
  },
  setup(props, _) {
    const fileUrl = process.env.fileURL
    return { props, fileUrl }
  }
})
</script>

<style scoped>

</style>