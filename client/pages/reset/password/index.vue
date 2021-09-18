<template>
<v-card>
  <v-card-title>
    <span>パスワードリセット</span>
  </v-card-title>
  <v-card-text>
    <my-input-text-field
      v-model="state.email"
      :check="rules.email"
      label="メールアドレス"
      hint="登録しているメールアドレスを入力してください"
      persistent-hint
    ></my-input-text-field>
  </v-card-text>
  <v-card-actions>
    <v-spacer />
    <v-btn text color="primary">リセット用メールを送信する</v-btn>
  </v-card-actions>
</v-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@nuxtjs/composition-api"
import { email, helpers, required } from "@vuelidate/validators"
import MyInputTextField from "@/components/form/MyInputTextField.vue"

export default defineComponent({
  components: { MyInputTextField },
  setup(_, __) {
    const state = reactive({
      email: "",
    })

    const rules = {
      email: {
        required: helpers.withMessage("メールアドレスを入力して下さい。", required),
        email: helpers.withMessage("メールアドレスの形式が不正です。", email)
      },
    }

    return { state, rules }
  }
})
</script>

<style scoped>

</style>