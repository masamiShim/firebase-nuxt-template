<template>
  <v-card class="mx-auto mt-5" min-width="300" max-width="600">
    <v-card-title class="indigo darken-3">
      <span class="white--text">パスワード変更</span>
    </v-card-title>
    <v-card-text>
      <v-form class="pa-2">
        <v-flex>
          <v-row>
            <v-col>
              <my-input-text-field
                v-model="state.password"
                :check="rules.password"
                prepend-icon="mdi-lock"
                append-icon="mdi-eye-off"
                label="新しいパスワード"
                autocomplete="new-password"
                type="password"
              >
              </my-input-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <my-input-text-field
                v-model="state.confirm"
                :check="rules.confirm"
                prepend-icon="mdi-lock"
                append-icon="mdi-eye-off"
                label="確認用パスワード"
                autocomplete="new-password"
                type="password"
              >
              </my-input-text-field>
            </v-col>
          </v-row>
        </v-flex>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text color="primary"
             :disabled="v$.$invalid"
             @click="handleChangePassword()"
      >パスワードを変更する
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  reactive,
  useContext,
  useRoute,
  useRouter
} from "@nuxtjs/composition-api"
import { helpers, required, sameAs } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
import MyInputTextField from "@/components/form/MyInputTextField.vue"

export default defineComponent({
  components: { MyInputTextField },
  layout: "noauth",
  setup(_, __) {
    const ctx = useContext()

    const state = reactive({
      password: "",
      confirm: ""
    })

    // vuelidateだと動的パラメータにstateは対応しないらしいのでcomputedで取得した値を動的パラメータへ入れ込む
    const passwordRef = computed(() => state.password)
    const rules = {
      password: {
        required: helpers.withMessage("新しいパスワードを入力して下さい", required)
      },
      confirm: {
        required: helpers.withMessage("確認用のパスワードを入力して下さい", required),
        sameAsPassword: helpers.withMessage("入力したパスワードと一致しません", sameAs(passwordRef))
      }
    }
    const validations = {}
    const v$ = useVuelidate(validations, {})

    onBeforeMount(async () => {
      const route = useRoute()
      const router = useRouter()
      const { token } = route.value.query
      if(!token || Array.isArray(token)) {
        ctx.$accessor.toast.show({
          message: '無効な遷移です',
          color: 'error',
        })
        return
      }
      await ctx.$gateway.reset.password.tokenVerify(token)
        .catch((err) => {
          /*
          ctx.$accessor.toast.show({
            message: '有効期限が切れています。再度リセットメールを送信してください。',
            color: 'error',
          })
          */
          console.log(err)
          router.push('/auth/login')
        })
    })
    const handleChangePassword = async () => {
      const valid = await v$.value.$validate()
      if (!valid) return
      console.log("ok")
    }

    return { state, rules, v$, handleChangePassword }
  }
})
</script>

<style scoped>

</style>