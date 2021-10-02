<template>
  <div>
    <v-row>
      <v-col>
        <show-label label="契約内容">a{{contract.contract}}</show-label>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row>
        <v-col>
          <show-label label="契約期間">a{{contract.term.from}}~{{contract.term.to}}</show-label>
        </v-col>
      <v-spacer />
    </v-row>
    <v-row>
      <v-col>
        <show-label label="時間幅">{{contract.timeWidth.lower}}~{{contract.timeWidth.normal}}~{{contract.timeWidth.upper}}</show-label>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <show-label label="単価">{{contract.unitPrice}}</show-label>
      </v-col>
      <v-col>
        <show-label label="控除">{{contract.timePrice.lower}}</show-label>
      </v-col>
      <v-col>
        <show-label label="超過">{{contract.timePrice.upper}}</show-label>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <show-label label="精算時間">{{contract.billingTime}}</show-label>
      </v-col>
      <v-col>
        <show-label label="稼働負荷(人月)">{{contract.workWeight}}</show-label>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <show-label label="業務報告書の提出義務">{{contract.needWorkReport ? '有り' : '無し'}}</show-label>
      </v-col>
      <v-col>
        <show-label label="交通費/旅費の請求">{{contract.canBillTrafficFee ? '可能' : '不可'}}</show-label>
      </v-col>
      <v-col>
        <show-label label="NDA締結">{{contract.canBillTrafficFee ? '有り' : '無し'}}</show-label>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <show-label label="延長/中途解約の告知">{{contract.beforeExpireDays}}日前</show-label>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <label>契約書</label>
      </v-col>
      <v-col>
        <label>誓約書</label>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api"
import { CheckProp, SelectionType } from "~/types/application"
import { MatterContractItem } from "@/components/modal/ModalRegisterMatterItemStore"
import ShowLabel from "@/components/util/ShowLabel.vue"

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
  components: { ShowLabel },
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
  setup(_, __) {

    return {  constants: { contracts: Contract } }
  }
})

</script>

<style scoped>

</style>