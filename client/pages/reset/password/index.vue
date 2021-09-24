<template>
  <v-card>
    <v-card-title class="indigo darken-3">
      <span class="white--text">パスワードリセット</span>
    </v-card-title>
    <v-card-text>
      <v-form class="pa-2">
        <v-flex>
          <v-row>
            <v-col>
              <my-input-text-field
                v-model="state.email"
                :check="{ email: rules.email}"
                label="メールアドレス"
                hint="登録しているメールアドレスを入力してください"
                persistent-hint
                lazy
              ></my-input-text-field>
            </v-col>
          </v-row>
        </v-flex>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text
             :disabled="v$.$invalid"
             color="primary"
             @click="handleResetPassword"
      >リセット用メールを送信する
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, useContext } from "@nuxtjs/composition-api"
import { email, helpers, required } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
import MyInputTextField from "@/components/form/MyInputTextField.vue"

export default defineComponent({
  components: { MyInputTextField },
  layout: "noauth",
  setup(_, __) {

    const ctx = useContext()
    const loading = ref<Boolean>(false)
    const state = reactive({
      email: ""
    })

    const rules = {
      email: {
        required: helpers.withMessage("メールアドレスを入力して下さい", required),
        email: helpers.withMessage("メールアドレスの形式が不正です", email)
      }
    }
    const validations = {}
    const v$ = useVuelidate(validations, {})

    const handleResetPassword = async () => {
      const valid = await v$.value.$validate()
      if (!valid) return

      loading.value = true
      await ctx.$gateway.reset.password
        .resetPasswordRequest(state.email).then(() => {
          ctx.$accessor.toast.show({ message: "リセット用リンクをメールアドレスに送信しました。", color: "success" })
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          loading.value = false
        })
    }

    return { state, rules, v$, handleResetPassword }
  }
})
</script>

<style scoped>

</style>