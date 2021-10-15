<template>
  <v-card>
    <v-card-title>商品一覧<v-spacer />
      <nuxt-link to="/service/product/new">
        <v-btn color="primary">新規登録</v-btn>
      </nuxt-link>
    </v-card-title>
    <v-card-text>
      <base-data-table
        :headers="headers"
        :fetch-function="fetchPaginate"
      >
        <template #item.name="{item}">
          <NuxtLink :to="`/service/product/${item.id}`">{{item.name}}</NuxtLink>
        </template>
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
        <template #item.actions="{item}">
          <nuxt-link :to="`/service/product/${item.id}?copy=1`">
            <v-icon
              small
              color="primary"
            >
              mdi-content-copy
            </v-icon>
          </nuxt-link>
          <v-icon
            class="ml-1"
            small
            color="error"
            @click="handler.deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </base-data-table>
    </v-card-text>

    <confirm-modal :open.sync="confirmModalOpen" >
      <template #modal-body>
        {{!state.selected ? '' : state.selected.name}}を削除しますか？
      </template>
      <template #modal-action>
        <v-btn color="error" @click.stop="handler.confirmDelete()">削除する</v-btn>
      </template>
    </confirm-modal>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, useContext, watch } from "@nuxtjs/composition-api"
import BaseDataTable from "@/components/util/BaseDataTable.vue"
import { PaginateOptions, Product } from "~/types/application"
import ConfirmModal from "@/components/modal/ConfirmModal.vue"


export default defineComponent({
  components: { ConfirmModal, BaseDataTable },
  setup() {
    const ctx = useContext()
    const headers = [{
      text: "商品名",
      align: "start",
      filterable: false,
      value: "name"
    },
      { text: "商品コード", value: "code" },
      { text: "通常価格", value: "regularPrice" },
      { text: "販売価格", value: "sellPrice" },
      { text: "販売制限", value: "sellLimit" },
      { text: "公開状況", value: "isPublish" },
      { text: '', value: 'actions'}
    ]
    const state = reactive({
      data: [],
      total: 0,
      params: { page: 1, perPage: 10, orderBy: "products.id", asc: "asc" },
      selected: null
    })

    const confirmModalOpen = ref<boolean>(false)
    watch(confirmModalOpen, (v) => {
      if(!v) {
        state.selected = null
      }
    })

    const fetchPaginate = async (v: PaginateOptions) => {
      console.log("fetchPaginate", v)
      return await ctx.$gateway.admin.product.paginate(v)
        .then((res) => {
          return {
            data: res.body.data,
            total: res.body.total
          }
        })
    }

    const deleteItem = (item: Product) => {
      state.selected = item
      confirmModalOpen.value = true
    }

    const confirmDelete = async () => {
      return await ctx.$gateway.admin.product.delete(item.id)
        .then(() => {
          ctx.$accessor.toast.show({message: '削除しました', color: 'error'})
        }).finally(() => {
          confirmModalOpen.value = false
        })
    }

    return { state, confirmModalOpen, headers, fetchPaginate, handler: { deleteItem, confirmDelete } }
  }
})
</script>

<style scoped>

</style>