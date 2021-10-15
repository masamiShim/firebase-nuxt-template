<template>
  <v-data-table
    :headers="headers"
    :items="state.data"
    :options.sync="options"
    :server-items-length="state.total"
    :loading="loading"
    :footer-props="{
        itemsPerPageOptions: [2,10, 30, 50, 100],
        itemsPerPageText: '表示件数'
      }"
  >
    <template v-for="(slot, name) of $scopedSlots" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <!--

    <template #item.isPublish="{ item }">
      <v-chip v-if="item.isPublish" small
              color="success"
              dark
      >
        公開
      </v-chip>
      <v-chip v-else small
              color="secondary"
              dark
      >
        非公開
      </v-chip>
    </template>
    <template #footer>
      <v-data-footer
        :options="{
          page: state.params.page,
          itemsPerPage: state.params.perPage,
          sortBy: state.params.orderBy,
          sortDesc: state.params.asc !== 'asc'
        }"
        :pagination="{
      page: state.params.page,
      itemsPerPage: state.params.perPage,
      pageStart:1,
      pageStop: 4,
      pageCount: 1,
      pageCount: state.total > 0 ? Math.floor(state.total/state.params.perPage) : 1,
      itemsLength: state.total
    }"
        :items-per-page-options="[2, 5, 10, 30]">

      </v-data-footer>
    </template>
      -->
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "@nuxtjs/composition-api"
import { PaginateOptions } from "~/types/application"

export default defineComponent({
  props: {
    headers: {
      type: Array,
      required: true
    },
    fetchFunction: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const loading = ref(false)
    const state = reactive({
      data: [],
      total: 0
    })
    const options = ref({})
    watch(options, async (v: PaginateOptions) => {
      await fetch(v)
    }, { deep: true })

    const fetch = async (v) => {
      loading.value = true
      const res = await props.fetchFunction(v)
        .catch((err) => {
          console.log(err)
          return {
            data: [],
            total: 0
          }
        })
      state.data = res.data
      state.total = res.total
      loading.value = false
    }

    return { options, loading, state }
  }
})
</script>

<style scoped>

</style>