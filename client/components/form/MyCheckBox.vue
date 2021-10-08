<template>
  <v-checkbox
    v-model="val"
    dense
    :label="label"
  ></v-checkbox>

</template>

<script lang="ts">
import { computed, defineComponent } from "@nuxtjs/composition-api"

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
  setup(props, { emit }) {
    const val = computed<boolean>({
      get: () => props.value,
      set: (v: boolean) => emit("input", v)
    })
/*
    const key = Object.keys(props.check || {})[0]

    const isLazy = attrs.lazy !== undefined
    const v$ = useVuelidate(props.check || {}, { [key]: val }, { $lazy: isLazy, $autoDirty: true })

    onMounted(async () => {
      if (!isLazy) {
        await v$.value.$validate()
      }
    })
*/
    return { val }
  }
})
</script>

<style scoped>

</style>