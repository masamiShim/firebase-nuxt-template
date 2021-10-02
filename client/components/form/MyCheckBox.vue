<template>
  <v-checkbox
    v-model="val"
    dense
    :label="label"
  ></v-checkbox>

</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "@nuxtjs/composition-api"
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
    },
  },
  setup(props, { emit, attrs }) {
    const val = computed<string>({
      get: () => props.value,
      set: (v) => emit("input", v)
    })

    const key = Object.keys(props.check || {})[0]

    const isLazy = attrs.lazy !== undefined
    const v$ = useVuelidate(props.check || {}, { [key]: val }, { $lazy: isLazy, $autoDirty: true })

    onMounted(async () => {
      if (!isLazy) {
        await v$.value.$validate()
      }
    })

    return { val, v$ }
  }
})
</script>

<style scoped>

</style>