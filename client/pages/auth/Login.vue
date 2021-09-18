<template>
  <v-card style="width: 400px" class="mx-auto mt-5">
    <v-card-title class="indigo darken-3">
      <span class="white--text">ログイン</span>
    </v-card-title>
    <v-card-text class="pa-4">
      <my-input-text-field
        v-model="state.email"
        :check="state.email"
        type="text"
        prepend-icon="mdi-account-circle"
        label="メールアドレス"
      >
      </my-input-text-field>
      <my-input-text-field
        v-model="state.password"
        :check="state.password"
        prepend-icon="mdi-lock"
        append-icon="mdi-eye-off"
        label="パスワード"
        type="password"
      >
      </my-input-text-field>
      <v-flex>
        <a href="#">パスワードを忘れた方はこちら</a>
      </v-flex>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary">
        ログイン
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { email, helpers, required } from "@vuelidate/validators"
import { defineComponent, reactive } from "@nuxtjs/composition-api"
import MyInputTextField from "@/components/form/MyInputTextField"


export default defineComponent({
  components: { MyInputTextField },
  setup(_, __) {

    const state = reactive({
      email: "",
      password: ""
    })

    const rules = {
      email: {
        required: helpers.withMessage("メールアドレスを入力して下さい。", required),
        email: helpers.withMessage("メールアドレスの形式が不正です。", email)
      },
      password: {
        required: helpers.withMessage("パスワードを入力して下さい。", required)
      }
    }

    return { state, rules }

  }
})
</script>

<style scoped>

</style>