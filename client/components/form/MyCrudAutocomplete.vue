<template>
  <v-autocomplete
    v-model="stat.selected"
    dense
    :label="label"
    :search-input.sync="search"
    :items="items"
    prepend-icon="mdi-city"
    clearable
  >
    <template #append-outer>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            class="mx-2"
            fab
            dark
            x-small
            color="indigo"
            v-bind="attrs"
            v-on="on"
            @click.stop="handler.create()"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
        <span>追加する</span>
      </v-tooltip>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from "@nuxtjs/composition-api"

type MyCrudAutoCompleteProp = {
  label: string,
  options: {
    create: boolean
    update: boolean
  }
}

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<any>,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Object as PropType<MyCrudAutoCompleteProp>,
      required: false,
      default: () => ({create: true, update: true, delete: true})
    }
  },
  setup(_, { emit }) {
    const stat = reactive({
      selected: null
    })
    const search = ref<string>('')
    watch(search, (v) => {
      emit('search', v)
    })

    const handleCreate = () => {
      emit("create")
    }
    const handleUpdate = () => {
      emit("update")
    }
    return { stat, search, handler: { create: handleCreate, update: handleUpdate } }
  }
})
</script>

<style scoped>

</style>