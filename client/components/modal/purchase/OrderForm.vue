<template>
  <div class="pa-3">
    <v-row dense>
      <v-col>
        <my-input-text-field v-model="state.name" label="お名前" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <my-input-text-field v-model="state.kana" label="カナ" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <my-input-text-field v-model="state.tel" label="電話番号" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <my-input-text-field v-model="state.email" label="メールアドレス" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <my-input-text-field v-model="state.zipCode" label="郵便番号" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <my-input-text-field v-model="state.address" label="住所" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-checkbox v-model="state.remember" label="送付先情報を記憶する" />
        <p class="caption">※ブラウザに記憶して次回入力の手間を省けます</p>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@nuxtjs/composition-api"
import MyInputTextField from "../../form/MyInputTextField.vue"

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
  setup() {
    const state = reactive<OrderForm>({
      name: "",
      kana: "",
      tel: "",
      zipCode: "",
      email: "",
      address: "",
      remember: false
    })

    return { state }
  }
})
</script>

<style scoped>

</style>