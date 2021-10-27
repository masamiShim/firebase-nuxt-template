<template>
  <v-checkbox
    v-model="val"
    dense
    :label="label"
  ></v-checkbox>

</template>

<script lang="ts">
import { computed, defineComponent } from "@nuxtjs/composition-api"
import { useVuelidate } from "@vuelidate/core"

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const val = computed<boolean>({
      get: () => props.value,
      set: (v) => emit("input", v)
    })

    /*
    const key = Object.keys(props.check || {})[0]

    const isLazy = attrs.lazy !== undefined
    */
    const v$ = useVuelidate({}, {})

    return { val, v$ }
  }
})
</script>

<style scoped>

</style>
