<template>
<v-overlay :value="isLoading">

</v-overlay>
</template>

<script>
import { computed, defineComponent, useContext } from "@nuxtjs/composition-api"

export default defineComponent({
  setup() {
    const { $accessor } = useContext()
    const isLoading = computed(() => $accessor.loading.isLoading)

    return { isLoading }
  }
})
</script>

<style scoped>

</style>