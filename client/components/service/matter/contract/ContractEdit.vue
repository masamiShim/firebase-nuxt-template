<template>
  <div>
    <v-row>
      <v-col>
        <my-radio-group v-model="state.contract" :check="rules.contract" :items="constants.contracts" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <my-input-text-field
          v-model="state.term.from"
          type="date"
          :check="{'term.from': rules.term.from}"
          label="契約期間(FROM)"
        ></my-input-text-field>
      </v-col>
      <v-col>
        <my-input-text-field
          v-model="state.term.to"
          type="date"
          :check="{'term.from': rules.term.to}"
          label="契約期間(TO)"
        ></my-input-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <my-input-text-field
          v-model="state.timeWidth.normal"
          min="0"
          max="200"
          type="number"
          :check="{'timeWidth.normal': rules.timeWidth.normal}"
          label="時間幅(標準)"
        ></my-input-text-field>
      </v-col>
      <v-col>
        <my-input-text-field
          v-model="state.timeWidth.lower"
          type="number"
          min="0"
          max="200"
          :check="{'timeWidth.lower': rules.timeWidth.lower}"
          label="時間幅(下限)"
        ></my-input-text-field>
      </v-col>
      <v-col>
        <my-input-text-field
          v-model="state.timeWidth.upper"
          min="0"
          max="300"
          type="number"
          :check="{'timeWidth.upper': rules.timeWidth.upper}"
          label="時間幅(上限)"
        ></my-input-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <my-input-text-field
          v-model="state.unitPrice"
          min="0"
          max="300"
          type="number"
          :check="{'unitPrice': rules.unitPrice}"
          label="単価"
        ></my-input-text-field>
      </v-col>
      <v-col>
        <my-input-text-field
          v-model="state.timePrice.lower"
          min="0"
          max="100000"
          step="1000"
          type="number"
          :check="{'timePrice.lower': rules.timePrice.lower}"
          label="控除"
        ></my-input-text-field>
      </v-col>
      <v-col>
        <my-input-text-field
          v-model="state.timePrice.upper"
          min="0"
          max="100000"
          step="1000"
          type="number"
          :check="{'timePrice.upper': rules.timePrice.upper}"
          label="超過"
        ></my-input-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <my-input-text-field
          v-model="state.billingTime"
          type="number"
          step="10"
          :check="{'billingTime': rules.billingTime}"
          label="精算時間"
        ></my-input-text-field>
      </v-col>
      <v-col>
        <my-input-text-field
          v-model="state.workWeight"
          type="number"
          min="0"
          max="1"
          :check="{'workWeight': rules.workWeight}"
          label="稼働負荷(人月)"
        ></my-input-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <my-check-box v-model="state.needWorkReport" label="業務報告書の提出義務"></my-check-box>
      </v-col>
      <v-col>
        <my-check-box v-model="state.canBillTrafficFee" label="交通費/旅費の請求可"></my-check-box>
      </v-col>
      <v-col>
        <my-check-box v-model="state.needNda" label="NDA締結"></my-check-box>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <my-input-text-field
          v-model="state.beforeExpireDays"
          type="number"
          min="0"
          max="120"
          label="延長/中途解約の告知(○日前)"
        ></my-input-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <label>契約書</label>
        <my-file-upload-form v-model="state.contractReport" :is-public="false" />
      </v-col>
      <v-col>
        <label>誓約書</label>
        <my-file-upload-form v-model="state.promissoryLetter" :is-public="false" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "@nuxtjs/composition-api"
import MyInputTextField from "@/components/form/MyInputTextField.vue"
import MyFileUploadForm from "@/components/form/MyFileUploadForm.vue"
import MyCheckBox from "@/components/form/MyCheckBox.vue"
import MyRadioGroup from "@/components/form/MyRadioGroup.vue"
import { CheckProp, SelectionType } from "~/types/application"
import { MatterContractItem } from "@/components/modal/ModalRegisterMatterItemStore"

const Contract: SelectionType[] = [
  {
    value: "1",
    label: "受託"
  },
  {
    value: "2",
    label: "準委任"
  }

]

export default defineComponent({
  components: { MyRadioGroup, MyCheckBox, MyFileUploadForm, MyInputTextField },
  props: {
    contract: {
      type: Object as PropType<MatterContractItem>,
      required: true
    },
    rules: {
      type: Object as PropType<CheckProp>,
      required: true
    }
  },
  setup(props, { emit }) {
    const state = computed<MatterContractItem>({
      get: () => props.contract,
      set: (val) => emit("update:contract", val)
    })

    return { state, constants: { contracts: Contract } }
  }
})

</script>

<style scoped>

</style>
