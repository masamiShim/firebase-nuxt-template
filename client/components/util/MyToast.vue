<template>
  <v-snackbar
    v-model="showToast"
    top
    text
    right
    :timeout="showToast ? toast.timeout : -1"
    :color="showToast ? toast.color : 'secondary'"
  >
    {{ showToast ? toast.message : "" }}
    <template #action="{ attrs }">
      <v-btn text :color="showToast ? toast.color : 'secondary'" v-bind="attrs" @click="handleCloseToast">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, useContext } from "@nuxtjs/composition-api"

export default defineComponent({
  setup(_, __) {
    const ctx = useContext()

    const showToast = computed({
      get: () => ctx.$accessor.toast.showMessage,
      set: (_) => {
        ctx.$accessor.toast.hide()
      }
    })
    const toast = computed(() => ctx.$accessor.toast.getToast)

    const handleCloseToast = () => ctx.$accessor.toast.hide()

    onBeforeUnmount(() => {
      console.log('unmount')
    })
    return { showToast, toast, handleCloseToast }
  }
})
</script>

<style scoped>

</style>