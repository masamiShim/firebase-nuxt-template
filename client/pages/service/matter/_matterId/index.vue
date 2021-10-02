<template>
  <div>
    <v-card>
      <v-card-title class="primary"><span class="white--text">案件入力</span></v-card-title>
      <v-card-text class="pa-3">
        <v-row dense>
          <v-col>
            <v-text-field dense label="案件名"></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <my-crud-autocomplete :items="state.companyList" label="受注元"
                                  @create="handleOpenCompanyDialog"></my-crud-autocomplete>
          </v-col>
        </v-row>
        <v-checkbox
          v-model="check"
          dense
          label="仲介有"
        ></v-checkbox>
        <!-- 仲介会社 start -->
        <template v-if="check">
          <v-divider class="my-2" />
          <p>仲介会社情報</p>
          <v-row v-for="(_, index) of state.mediationList" :key="index" dense>
            <v-col>
              <my-crud-autocomplete :items="state.companyList" :label="`${index + 1}次受け`"
                                    @create="handleOpenCompanyDialog('new')"></my-crud-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn color="primary" text @click.stop="addMediation">仲介を追加する</v-btn>
            </v-col>
          </v-row>
          <v-divider class="my-2" />
        </template>
        <!-- 仲介会社 end -->
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary">登録する</v-btn>
      </v-card-actions>
    </v-card>
    <v-row class="mt-5">
      <v-col>
        <matter-contract-list />
      </v-col>
    </v-row>

    <register-company :id="handleCompanyId" :open.sync="openCompanyDialog"></register-company>
  </div>

</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@nuxtjs/composition-api"
import MyCrudAutocomplete from "@/components/form/MyCrudAutocomplete.vue"
import RegisterCompany from "@/components/modal/ModalRegisterCompany.vue"
import MatterContractList from "@/components/service/matter/MatterContractList.vue"

export default defineComponent({
  components: { MatterContractList, RegisterCompany, MyCrudAutocomplete },
  setup() {
    const check = ref<boolean>(false)
    const update = ref<boolean>(true)
    const openCompanyDialog = ref<boolean>(false)
    const handleCompanyId = ref<string>("new")
    const state = reactive({
      mediationList: [""],
      companyList: ["BAMV合同会社", "exat株式会社", "LHC", "日鉄ソリューション"]
    })

    const addMediation = () => {
      state.mediationList.push("")
    }
    const handleOpenCompanyDialog = (id?: string) => {
      openCompanyDialog.value = true
      handleCompanyId.value = id || "new"
    }

    return {
      check,
      state,
      openCompanyDialog,
      handleOpenCompanyDialog,
      handleCompanyId,
      addMediation,
      update
    }
  }
})
</script>

<style scoped>

</style>