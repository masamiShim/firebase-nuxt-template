<template>
  <v-card style="width: 400px" class="mx-auto mt-5">
    <v-card-title class="indigo darken-3">
      <span class="white--text">会員登録</span>
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
      <my-input-text-field
        v-model="state.confirm"
        :check="{ confirm: rules.confirm}"
        prepend-icon="mdi-lock"
        append-icon="mdi-eye-off"
        label="確認用パスワード"
        type="password"
      >
      </my-input-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        :disabled="v$.$invalid"
        :loading="loading"
        @click="handleSignup"
      >
        登録する
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { useVuelidate } from "@vuelidate/core"
import { computed, defineComponent, reactive, ref, useContext } from "@nuxtjs/composition-api"
import { email, helpers, minLength, required, sameAs } from "@vuelidate/validators"
import MyInputTextField from "@/components/form/MyInputTextField.vue"

type SignupForm = {
  email: string,
  password: string,
  confirm: string
}

export default defineComponent({
  components: { MyInputTextField },
  layout: "noauth",
  setup(_, __) {

    const ctx = useContext()

    const loading = ref<Boolean>(false)
    const state = reactive<SignupForm>({
      email: "",
      password: "",
      confirm: ""
    })

    const passwordRef = computed(() => state.password)

    const rules = {
      email: {
        required: helpers.withMessage("メールアドレスを入力して下さい", required),
        email: helpers.withMessage("メールアドレスの形式が不正です", email)
      },
      password: {
        required: helpers.withMessage("パスワードを入力して下さい", required),
        minLength: helpers.withMessage("パスワードは８文字以上で入力してください", minLength(8))
      },
      confirm: {
        required: helpers.withMessage("確認用パスワードを入力して下さい", required),
        sameAsPassword: helpers.withMessage("入力したパスワードと一致しません", sameAs(passwordRef))
      }
    }

    const validations = {}
    const v$ = useVuelidate(validations, {})

    const handleSignup = async () => {
      loading.value = true
      await ctx.$fire.auth.createUserWithEmailAndPassword(
        state.email,
        state.password
      )
        .catch((err) => console.log(err))
        .finally(() => {
          loading.value = false
        })
    }

    return { loading, state, rules, v$, handleSignup }
  }
})
</script>

<style scoped>

</style>
