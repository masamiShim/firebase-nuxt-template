<template>
  <div>
    <v-text-field v-model="_value"
                  :error="v$.$invalid"
                  :error-messages="v$.$errors.map((e) => e.$message)"
                  v-bind="$attrs"
                  @input="v$.$touch()"
    >

    </v-text-field>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "@nuxtjs/composition-api"
import ValidationRuleCollection from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true
    },
    check: {
      type: Object as PropType<ValidationRuleCollection>,
      required: false,
      default: () => {
      }
    }
  },
  setup(props, { emit }) {
    const _value = computed({
      get: () => props.value,
      set: (v) => emit("input", v)
    })
    const v$ = useVuelidate(props.check || {}, _value, { $lazy: true })

    return { _value, v$ }
  }
})
</script>

<style scoped>

</style>