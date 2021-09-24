<template>
  <v-card style="width: 400px" class="mx-auto mt-5">
    <v-card-title class="indigo darken-3">
      <span class="white--text">ログイン</span>
    </v-card-title>
    <v-card-text class="pa-4">
      <my-input-text-field
        v-model="state.email"
        :check="{ email: rules.email}"
        type="text"
        prepend-icon="mdi-account-circle"
        label="メールアドレス"
      >
      </my-input-text-field>
      <my-input-text-field
        v-model="state.password"
        :check="{ password: rules.password}"
        prepend-icon="mdi-lock"
        append-icon="mdi-eye-off"
        label="パスワード"
        type="password"
      >
      </my-input-text-field>
      <v-flex>
        <NuxtLink to="/reset/password">パスワードを忘れた方はこちら</NuxtLink>
      </v-flex>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        :disabled="v$.$invalid"
        :loading="loading"
        @click="handleLogin"
      >
        ログイン
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { email, helpers, required } from "@vuelidate/validators"
import { defineComponent, onBeforeMount, reactive, ref, useContext, useRouter } from "@nuxtjs/composition-api"
import { useVuelidate } from "@vuelidate/core"
import MyInputTextField from "@/components/form/MyInputTextField.vue"

type LoginForm = {
  email: string,
  password: string
}

export default defineComponent({
  components: { MyInputTextField },
  layout: "noauth",
  setup(_) {
    const ctx = useContext()
    const { $accessor, $gateway } = ctx
    const router = useRouter()

    const loading = ref<Boolean>(false)

    onBeforeMount(() => {
      const router = useRouter()
      if ($accessor.auth.isAuthorized) {
        router.push("/service")
      }
    })
    const state = reactive<LoginForm>({
      email: "",
      password: ""
    })

    const rules = {
      email: {
        required: helpers.withMessage("メールアドレスを入力して下さい", required),
        email: helpers.withMessage("メールアドレスの形式が不正です", email)
      },
      password: {
        required: helpers.withMessage("パスワードを入力して下さい", required)
      }
    }

    const validations = {}
    const v$ = useVuelidate(validations, {})


    const handleLogin = async () => {
      loading.value = true
      await setTimeout(async () => {
        await $gateway.auth.loginByEmail(state.email, state.password)
          .then((res) => {
            $accessor.auth.login({ accessToken: res.body.accessToken, refreshToken: res.body.refreshToken })
            router.push("/service")
          }).catch((err: any) => {
            console.log(err.message)
          }).finally(() => {
            loading.value = false
          })
      }, 1000)

    }

    return { state, rules, loading, handleLogin, v$ }

  }
})
</script>

<style scoped>

</style>