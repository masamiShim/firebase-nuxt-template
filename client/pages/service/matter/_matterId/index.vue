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
            <my-crud-autocomplete :items="state.companyList" label="受注元" @create="handleOpenCompanyDialog"></my-crud-autocomplete>
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
              <my-crud-autocomplete :items="state.companyList" :label="`${index + 1}次受け`"></my-crud-autocomplete>
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
    <v-card class="mt-5">
      <v-card-title class="indigo">
        <span class="white--text">契約内容</span>
      </v-card-title>
      <v-card-text class="pa-3">
        <v-row>
          <v-col>
            契約期間(FROM)
          </v-col>
          <v-col>
            契約期間(TO)
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            時間幅
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            単価
          </v-col>
          <v-col>
            超過
          </v-col>
          <v-col>
            控除
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            精算時間(30分毎)
          </v-col>
          <v-col>
            業務報告書の要否
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            交通費/宿泊費請求
          </v-col>
          <v-col>
            延長/中途解約の告知
          </v-col>
          <v-col>
            NDA
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <register-company :open.sync="openCompanyDialog"></register-company>
  </div>

</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@nuxtjs/composition-api"
import MyCrudAutocomplete from "@/components/form/MyCrudAutocomplete.vue"
import RegisterCompany from "@/components/modal/ModalRegisterCompany.vue"

export default defineComponent({
  components: { RegisterCompany, MyCrudAutocomplete },
  setup() {
    const check = ref < boolean > (false)
    const update = ref < boolean > (true)
    const openCompanyDialog = ref<boolean>(false)
    const state = reactive({
      mediationList: [""],
      companyList: ["a","b","c"],
    })

    const addMediation = () => {
      state.mediationList.push("")
    }
    const handleOpenCompanyDialog = () => {
      openCompanyDialog.value = true
    }
    return { check, state, openCompanyDialog,handleOpenCompanyDialog ,addMediation, update }
  }
})
</script>

<style scoped>

</style>