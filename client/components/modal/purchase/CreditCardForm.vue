<template>
  <div ref="root">
    <v-row>
      <v-col class="col-5 col-md-3 text-right mt-2">
        カード番号
      </v-col>
      <v-col class="col-7 col-md-5">
        <v-row>
          <v-col>
            <div id="card" class="payjs-outer"></div>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <div class="red--text mt-1">{{ state.numberError }}</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-5 col-md-3 text-right mt-2">
        有効期限
      </v-col>
      <v-col>
        <v-row dense>
          <v-col class="col-5 col-md-3">
            <div id="expire" class="payjs-outer"></div>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col class="col-12">
            <div class="red--text mt-1">{{ state.expiryError }}</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-5 col-md-3 text-right mt-2">
        セキュリティコード
      </v-col>
      <v-col>
        <v-row dense>
          <v-col class="col-4 col-md-3" style="max-width: 120px;">
            <div id="cvc" class="payjs-outer"></div>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <div class="red--text mt-1">{{ state.cvcError }}</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from "@nuxtjs/composition-api"

export default defineComponent({
  props: {
    numberElement: {
      type: Object,
      required: true
    },
    expiryElement: {
      type: Object,
      required: true
    },
    cvcElement: {
      type: Object,
      required: true
    },
    numberValid: {
      type: Boolean,
      required: true
    },
    expiryValid: {
      type: Boolean,
      required: true
    },
    cvcValid: {
      type: Boolean,
      required: true
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      numberError: "必須です",
      expiryError: "必須です",
      cvcError: "必須です"
    })
    const _numberValid = computed({
      get: () => props.numberValid,
      set: (v) => emit("update:numberValid", v)
    })
    const _expiryValid = computed({
      get: () => props.expiryValid,
      set: (v) => emit("update:expiryValid", v)
    })
    const _cvcValid = computed({
      get: () => props.valid.cvcValid,
      set: (v) => emit("update:cvcValid", v)
    })
    props.numberElement.on("change", (e: any) => {
      if (e.complete) {
        state.numberError = ""
        _numberValid.value = true
        return
      }

      _numberValid.value = false

      if (e.empty) {
        state.numberError = "必須です"
        return
      }

      if (e.error) {
        state.numberError = e.error.message
      }
    })

    props.expiryElement.on("change", (e: any) => {
      if (e.complete) {
        state.expiryError = ""
        _expiryValid.value = true
        return
      }

      _expiryValid.value = false

      if (e.empty) {
        state.expiryError = "必須です"
        return
      }

      if (e.error) {
        state.expiryError = e.error.message
      }
    })
    props.cvcElement.on("change", (e: any) => {
      if (e.complete) {
        state.cvcError = ""
        _cvcValid.value = true
        return
      }

      _cvcValid.value = false

      if (e.empty) {
        state.cvcError = "必須です"
        return
      } else {
        state.cvcError = "入力が完了していません"
      }

      if (e.error) {
        state.cvcError = e.error.message
      }
    })

    onMounted(() => {
      props.numberElement.mount("#card")
      props.expiryElement.mount("#expire")
      props.cvcElement.mount("#cvc")
    })

    return { state }
  }
})
</script>

<style scoped>
div.payjs-outer {
  border-bottom: thin solid #198fcc;
  padding: 6px;
}
</style>