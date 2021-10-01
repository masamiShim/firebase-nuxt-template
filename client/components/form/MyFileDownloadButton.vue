<template>
  <v-btn :loading="loading" :disabled="!file" @click="handleDownload(file)">{{ label }}</v-btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api"
import { UploadFile } from "@/container/FileUploadContainer"
import { FileDownloadContainer } from "@/container/FileDownloadContainer"

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
    file: {
      type: Object as PropType<UploadFile>,
      required: true
    }
  },
  setup(_, __) {
    const container = FileDownloadContainer()

    return { handleDownload: container.handleDownload, loading: container.loading }
  }
})
</script>

<style scoped>

</style>