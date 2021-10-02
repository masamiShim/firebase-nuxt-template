<template>
  <div>
    <v-radio-group v-model="val" class="mt-1" style="height: 18px" dense row @input="v$.$touch()">
      <v-radio v-for="item in items" :key="item.value" :label="item.label" :value="item.value"
               :checked="val === String(item.value)">
      </v-radio>
    </v-radio-group>
    <p v-if="v$.$invalid" class="error--text">{{v$.$errors}}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType } from "@nuxtjs/composition-api"
import { useVuelidate } from "@vuelidate/core"
import { CheckProp, SelectionType } from "~/types/application"

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true
    },
    items: {
      type: Array as PropType<SelectionType[]>,
      required: true
    },
    check: {
      type: Object as PropType<CheckProp>,
      required: false,
      default: () => {
      }
    }
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