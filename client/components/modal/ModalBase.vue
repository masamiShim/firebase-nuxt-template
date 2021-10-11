<template>
  <v-dialog v-model="showModal" scrollable v-bind="$attrs" min-width="300">
    <v-card class="white" z-index="20">
      <v-card-title v-if="option.showTitle" class="indigo">
        <slot name="modal-title"><span class="white--text">title</span></slot>
      </v-card-title>
      <slot name="header"></slot>
      <v-card-text class="pa-5 black--text">
        <slot name="modal-body">body</slot>
      </v-card-text>
      <v-card-actions>
        <v-btn text class="text--secondary" color="gray" @click.stop="handleClose">閉じる</v-btn>
        <v-spacer />
        <slot name="modal-action"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "@nuxtjs/composition-api"

type ModalOption = {
  showTitle: boolean
}

export default defineComponent({
  props: {
    open: {
      type: Boolean,
      required: true
    },
    option: {
      type: Object as PropType<ModalOption>,
      required: false,
      default: () => ({
        showTitle: true
      })
    }
  },
  setup(prop, { emit }) {
    const showModal = computed({
      get: () => prop.open,
      set: (v) => emit("update:open", v)
    })

    const handleClose = () => {
      showModal.value = false
    }

    return { handleClose, showModal }
  }
})
</script>

<style scoped>

</style>