<template>
    <v-dialog v-model="showModal" scrollable v-bind="$attrs" min-width="300">
      <v-card class="white" z-index="20">
        <v-card-title class="indigo">
          <slot name="modal-title"><span class="white--text">title</span></slot>
        </v-card-title>
        <v-card-text class="pa-3 black--text">
          <slot name="modal-body">body</slot>
        </v-card-text>
        <v-card-actions>
          <v-btn text class="text--secondary" color="gray" @click="handleClose">閉じる</v-btn>
          <v-spacer />
          <slot name="modal-action"></slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from "@nuxtjs/composition-api"

export default defineComponent({
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  setup(prop, { emit }) {
    const showModal = computed({
      get: () => prop.open,
      set: (v) => emit("update:open", v)
    })

    const handleClose = () => { showModal.value = false }

    return { handleClose, showModal }
  }
})
</script>

<style scoped>

</style>