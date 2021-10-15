<template>
  <v-text-field v-model="_value"
                dense
                :error="v$.$invalid"
                :error-messages="v$.$errors.map((e) => e.$message)"
                v-bind="$attrs"
                @input="v$.$touch()"
                @blur="v$.$touch()"
  >

  </v-text-field>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType } from "@nuxtjs/composition-api"
import { useVuelidate } from "@vuelidate/core"
import { CheckProp } from "~/types/application"


export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    check: {
      type: Object as PropType<CheckProp>,
      required: false,
      default: () => {
      }
    },
    scope: {
      type: [String, Boolean],
      required: false,
      default: true
    }
  },
  setup(props, { emit, attrs }) {
    const _value = computed({
      get: () => props.value,
      set: (v) => emit("input", v)
    })

    const key = Object.keys(props.check || {})[0]

    const isLazy = attrs.lazy !== undefined
    const v$ = useVuelidate(props.check || {}, { [key]: _value }, { $lazy: isLazy, $autoDirty: true, $scope: props.scope })

    onMounted(async () => {
      if (!isLazy) {
        await v$.value.$validate()
      }
    })

    return { _value, v$ }
  }
})
</script>

<style scoped>

</style>