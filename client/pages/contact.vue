<template>
  <v-container>
    <v-card flat max-width="600" class="mx-auto">
      <v-card-title>お問い合わせ</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <my-radio-group v-model="state.type" color="secondary" :items="types" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <my-input-text-field
              v-model="state.email"
              :check="{ email: rules.email}"
              type="text"
              prepend-icon="mdi-email"
              label="メールアドレス"
            ></my-input-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <my-input-text-field
              v-model="state.name"
              :check="{ email: rules.name}"
              type="text"
              prepend-icon="mdi-account-circle"
              label="お名前"
            ></my-input-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea v-model="state.content" label="内容" rows="5">

            </v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary">送信する</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script lang="ts">

import { defineComponent, reactive } from "@nuxtjs/composition-api"
import MyInputTextField from "@/components/form/MyInputTextField.vue"
import { isEmail, isRequire } from "@/helper/validator/validator.helper"
import MyRadioGroup from "@/components/form/MyRadioGroup.vue"

type ContactForm = {
  email: string,
  type: string,
  name: string,
  content: string,
}

export default defineComponent({
  components: { MyRadioGroup, MyInputTextField },
  setup(_, __) {
    const state = reactive<ContactForm>({
      email: "",
      type: "",
      name: "",
      content: ""
    })

    const rules = {
      email: {
        required: isRequire,
        email: isEmail
      },
      type: {
        required: isRequire
      },
      name: {
        required: isRequire
      },
      content: {
        required: isRequire
      }
    }

    const types = [{label: '商品について', value: '1'}, {label: 'お支払いについて', value: '2'}]

    return {
      state, rules, types
    }
  }
})
</script>
