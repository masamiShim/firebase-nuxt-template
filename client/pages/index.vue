<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card>

        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <my-file-upload :value.sync="state.files" ></my-file-upload>
          <my-file-download-button label="download" :file="state.files.length ? state.files[0] : undefined"></my-file-download-button>
          <my-input-text-field
            v-model="state.emailAddress"
            :check="rules.emailAddress" />
          <modal width="500" :open.sync="open"></modal>
          <v-btn @click.stop="handleOpen()">オープン</v-btn>
          <p>
            For more information on Vuetify, check out the <a
            href="https://vuetifyjs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            documentation
          </a>.
          </p>
          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the
            future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">

import { email, helpers, required } from "@vuelidate/validators"
import { defineComponent, reactive, ref, useContext } from "@nuxtjs/composition-api"
import MyInputTextField from "@/components/form/MyInputTextField.vue"
import Modal from "@/components/modal/ModalBase.vue"
import MyFileUpload from "@/components/form/MyFileUpload.vue"
import MyFileDownloadButton from "@/components/form/MyFileDownloadButton.vue"

export default defineComponent({
  components: { MyFileDownloadButton, MyFileUpload, Modal, MyInputTextField },
  setup(_, __) {
    const ctx = useContext()
    const open = ref<Boolean>(false)

    const state = reactive({
      emailAddress: "eeeee@bbbb.com",
      files: []
    })
    const rules = {
      emailAddress: {
        required: helpers.withMessage("メールアドレスを入力して下さい。", required),
        email: helpers.withMessage("メールアドレスの形式が不正です。", email)
      }
    }

    const handleOpen = () => {
      open.value = true
    }

    const handleDownload = async () => {
      const res = await ctx.$gateway.file.download.download(state.files[0].url)
      const url = (window.URL || window.webkitURL).createObjectURL(res)
      const a = document.createElement('a')
      a.href = url
      a.download = state.files[0].name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

    }

    return { state, rules, open, handleOpen, handleDownload }
  }
})
</script>
