<template>
<v-card>
  <v-card-title>契約内容</v-card-title>
  <v-card-text>
    <contract-show :contract="store.state" :rules="store.rules"></contract-show>
  </v-card-text>
</v-card>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import { ModalRegisterMatterItemStore } from "@/components/modal/ModalRegisterMatterItemStore"
import ContractShow from "@/components/service/matter/contract/ContractShow.vue"

export default defineComponent({
  components: { ContractShow },
  setup(_, __) {
    const store = ModalRegisterMatterItemStore()
    return { store }
  }
})
</script>

<style scoped>

</style>