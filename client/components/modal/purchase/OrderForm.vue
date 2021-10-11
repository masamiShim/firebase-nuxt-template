<template>
  <div class="pa-3">
    <v-row dense>
      <v-col>
        <my-input-text-field v-model="form.name" :scope="scope" :check="{name: rules.name}" label="お名前" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <my-input-text-field v-model="form.kana" :scope="scope" :check="{kana: rules.kana}" label="カナ" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <my-input-text-field v-model="form.tel" :scope="scope" :check="{tel: rules.tel}" label="電話番号" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <my-input-text-field v-model="form.email" :scope="scope" :check="{email: rules.email}" label="メールアドレス" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <my-input-text-field v-model="form.zipCode" :scope="scope" :check="{zipCode: rules.zipCode}" label="郵便番号" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <my-input-text-field v-model="form.address" :scope="scope" :check="{address: rules.address}" label="住所" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-checkbox v-model="form.remember" label="送付先情報を記憶する" />
        <p class="caption">※ブラウザに記憶して次回入力の手間を省けます</p>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "@nuxtjs/composition-api"
import { useVuelidate } from "@vuelidate/core"
import MyInputTextField from "../../form/MyInputTextField.vue"
import { OrderFormRules } from "@/components/modal/purchase/OrderFormStore"

type OrderForm = {
  name: string,
  kana: string,
  tel: string,
  zipCode: string,
  email: string,
  address: string,
  remember: boolean
}

export default defineComponent({
  components: { MyInputTextField },
  props: {
    item: {
      type: Object as PropType<OrderForm>,
      required: true
    },
    valid: {
      type: Boolean,
      required: true
    },
    scope: {
      type: [String, Boolean],
      required: false,
      default: true
    }
  },
  setup(props, { emit }) {
    const form = computed({
      get: () => props.item,
      set: (v) => emit("update:item", v)
    })
    const rules = OrderFormRules
    const validations = {}
    const v$ = useVuelidate(validations, {}, { $scope: props.scope })
    return { form, rules, v$ }
  }
})
</script>

<style scoped>

</style>