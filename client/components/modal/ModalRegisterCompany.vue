<template>
  <modal-base :open.sync="dialogOpen">
    <template #modal-title>
      <span class="white--text">会社登録</span>
    </template>
    <template #modal-body>
      <v-row>
        <v-col>
          <my-input-text-field
            v-model="state.name"
            :check="rules.name"
            label="会社名"
            lazy
          ></my-input-text-field>
        </v-col>
        <v-col>
          <my-input-text-field
            v-model="state.ceoName"
            :check="rules.ceoName"
            label="代表名"
            lazy
          ></my-input-text-field>
        </v-col>
        <v-col>
          <my-input-text-field
            v-model="state.salesStaffName"
            :check="rules.salesStaffName"
            label="営業担当名"
            lazy
          ></my-input-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <my-input-text-field
            v-model="state.address"
            label="住所"
            lazy
          ></my-input-text-field>
        </v-col>
        <v-col>
          <my-input-text-field
            v-model="state.phoneNumber"
            label="電話番号"
            lazy
          ></my-input-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <my-input-text-field
            v-model="state.emailAddress"
            :check="rules.emailAddress"
            label="メールアドレス"
            lazy
          ></my-input-text-field>
        </v-col>
        <v-col>
          <my-input-text-field
            v-model="state.invoiceEmailAddress"
            :check="rules.invoiceEmailAddress"
            label="請求書送信用メールアドレス"
            lazy
          ></my-input-text-field>
        </v-col>
        <v-col>
          <v-checkbox label="電子請求可"></v-checkbox>
        </v-col>
      </v-row>
    </template>
    <template #modal-action>
      <v-btn @click.stop="handleRegister">登録する</v-btn>
    </template>
  </modal-base>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, useContext } from "@nuxtjs/composition-api"
import { email, helpers, required } from "@vuelidate/validators"
import ModalBase from "./ModalBase.vue"
import MyInputTextField from "@/components/form/MyInputTextField.vue"

export default defineComponent({
  components: { MyInputTextField, ModalBase },
  props: {
    id: {
      type: String,
      required: false,
      default: 'new'
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

    const state = reactive({
      name: '',
      ceoName: '',
      salesStaffName: '',
      address: '',
      phoneNumber: '',
      emailAddress: '',
      invoiceEmailAddress: ''
    })

    const rules = {
      name: {
        required: helpers.withMessage("会社名は必須です", required),
      },
      ceoName: {
        required: helpers.withMessage("代表名は必須です", required),
      },
      address: {
      },
      phoneNumber: {
      },
      emailAddress: {
        required: helpers.withMessage("メールアドレスは必須です", required),
        email: helpers.withMessage("メールアドレスの形式が不正です", email)
      },
      invoiceEmailAddress: {
        email: helpers.withMessage("メールアドレスの形式が不正です", email)
      },
    }

    const handleRegister = () => {
      ctx.$accessor.toast.show({message: `${state.name}を登録しました`, color: 'success'})
    }
    return { dialogOpen, state, rules, handleRegister }
  }
})
</script>

<style scoped>

</style>