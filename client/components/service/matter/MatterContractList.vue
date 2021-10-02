<template>
  <div>
    <v-data-table
      :headers="data.dtHeader"
      :items="data.dtItems">
      <template
        #header="{ props: { headers } }"
      >
        <thead>
        <tr>
          <th :colspan="headers.length">
            契約一覧
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  x-small
                  v-bind="attrs"
                  color="indigo"
                  v-on="on"
                  @click.stop="handleOpenMatterItemDialog('new')"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </template>
              <span>契約を追加する</span>
            </v-tooltip>
          </th>
        </tr>
        </thead>
      </template>
      <template #item.fromTo="{ item }">
        <NuxtLink to="#">{{ item.fromTo }}</NuxtLink>
      </template>
      <template #item.actions="{ item }">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-icon
              small
              class="mr-2"
              v-bind="attrs"
              v-on="on"
              @click="() => item"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>編集する</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-icon
              small
              v-bind="attrs"
              v-on="on"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>削除する</span>
        </v-tooltip>
      </template>
      <template #no-data>
        <v-btn
          color="primary"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <modal-register-matter-item :id="handleMatterId" :open.sync="openMatterItemDialog" />
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from "@nuxtjs/composition-api"
import ModalRegisterMatterItem from "@/components/modal/ModalRegisterMatterItem.vue"

export default defineComponent({
  components: { ModalRegisterMatterItem },
  setup() {
    const dtHeader = [
      { text: "契約期間", value: "fromTo" },
      { text: "稼働率", value: "work" },
      { text: "時間幅", value: "duration" },
      { text: "契約単価", value: "price" },
      { text: "単価", value: "realPrice" },
      { text: "Actions", value: "actions", sortable: false }
    ]

    const dtItems = [
      {
        fromTo: "2021-10 ~ 2021-11",
        work: 0.6,
        duration: `${(Math.floor(160 * 0.6 - 16))}-${(Math.floor(160 * 0.6))}-${(Math.floor(160 * 0.6 + 16))}`,
        price: 80,
        realPrice: Math.floor(80 * 0.6)
      },
      {
        fromTo: "2021-11 ~ 2021-12",
        work: 1,
        duration: `${(Math.floor(160 * 1 - 16))}-${(Math.floor(160 * 1))}-${(Math.floor(160 * 1 + 16))}`,
        price: 80,
        realPrice: Math.floor(80 * 1)
      }
    ]

    const openMatterItemDialog = ref<boolean>(false)
    const handleMatterId = ref<string>("new")

    const handleOpenMatterItemDialog = (id?: string) => {
      openMatterItemDialog.value = true
      handleMatterId.value = id || "new"
    }



    return {
      data: { dtHeader, dtItems },
      handleMatterId,
      openMatterItemDialog,
      handleOpenMatterItemDialog,

    }
  }
})
</script>

<style scoped>

</style>