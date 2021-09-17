<template>
  <div>
    <v-text-field v-model="_value"
                  :error="v$.$invalid"
                  :error-messages="v$.$errors.map((e) => e.$message)"
                  :counter="$attrs.counter"
                  :disabled="$attrs.disabled"
                  @input="handleInput"
                  @change="v$.$touch()">

    </v-text-field>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "@nuxtjs/composition-api"
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
    const _value = ref<String>(props.value)
    const v$ = useVuelidate(props.check || {}, _value)
    const handleInput = (v: InputEvent) => {
      console.log(v)
      emit("input", v)
    }
    return { _value, v$, handleInput }
  }
})
</script>

<style scoped>

</style>