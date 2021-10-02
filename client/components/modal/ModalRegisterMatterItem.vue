<template>
  <modal-base :open.sync="dialogOpen">
    <template #modal-title>
      <span class="white--text">契約内容</span>
    </template>
    <template #modal-body>
      <contract-base :contract.sync="state" :rules="rules"/>
    </template>
    <template #modal-action>
      <v-btn @click.stop="handleRegister">登録する</v-btn>
    </template>
  </modal-base>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from "@nuxtjs/composition-api"
import ModalBase from "./ModalBase.vue"
import { ModalRegisterMatterItemStore } from "@/components/modal/ModalRegisterMatterItemStore"
import ContractBase from "@/components/service/matter/contract/ContractEdit.vue"

export default defineComponent({
  components: { ContractBase, ModalBase },
  props: {
    id: {
      type: String,
      required: false,
      default: "new"
    },
    open: {
      type: Boolean,
      required: true
    }
  },
  setup(prop, { emit }) {
    const ctx = useContext()
    const dialogOpen = computed({
      get: () => prop.open,
      set: (val) => emit("update:open", val)
    })

    const store = ModalRegisterMatterItemStore()

    const handleRegister = () => {
      ctx.$accessor.toast.show({ message: `${store.state.contract}を登録しました`, color: "success" })
    }
    return { dialogOpen, state: store.state, rules: store.rules, handleRegister }
  }
})
</script>

<style scoped>

</style>