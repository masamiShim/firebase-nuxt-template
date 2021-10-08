<template>
  <modal-base :open.sync="showModal" :option="{showTitle: false}" max-width="880" min-width="360">
    <template #modal-body>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
          >
            購入商品の確認
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 2"
            step="2"
          >
            配送先住所の入力
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">
            決済情報の入力
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card flat
                    class="mb-12"
                    color="grey lighten-1"
            >
              <v-list three-line>
                <v-subheader>購入商品一覧
                  <v-spacer />
                  合計金額：aaa
                </v-subheader>
                <v-divider />
                <purchase-confirm-list />
                <v-divider></v-divider>
              </v-list>
              <v-card-actions>
                合計金額：aaa
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <order-form />
          </v-stepper-content>

          <v-stepper-content step="3">
            <credit-card-form :number-element="numberElement" :expiry-element="expiryElement"
                              :cvc-element="cvcElement" />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </template>
    <template #modal-action>
      <v-btn v-if="e1 > 1" text color="secondary" @click="handler.back()">戻る</v-btn>
      <v-btn color="primary" @click="handler.next()">{{ nextBtnLabel }}</v-btn>
    </template>
  </modal-base>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, useContext } from "@nuxtjs/composition-api"
import ModalBase from "@/components/modal/ModalBase.vue"
import PurchaseConfirmList from "@/components/modal/purchase/PurchaseConfirmList.vue"
import OrderForm from "@/components/modal/purchase/OrderForm.vue"
import CreditCardForm from "@/components/modal/purchase/CreditCardForm.vue"

export default defineComponent({
  components: { CreditCardForm, OrderForm, PurchaseConfirmList, ModalBase },
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  setup(prop, { emit }) {
    const ctx = useContext()
    const e1 = ref<number>(1)
    const showModal = computed({
      get: () => prop.open,
      set: (v) => emit("update:open", v)
    })

    const elements = window._payJp.elements()
    const numberElement = elements.create("cardNumber")
    const expiryElement = elements.create("cardExpiry")
    const cvcElement = elements.create("cardCvc")
    const onSubmit = async () => {
      const r = await window._payJp.createToken(numberElement)
      if('error' in r) {
        await ctx.$accessor.toast.show({
          message: r.error.message,
          color: 'error'
        })
        return
      }
      // TODO: 決済APIを実行
      console.log(r)
    }

    const nextBtnLabel = computed(() => {
      switch (e1.value) {
        case 1:
          return "配送先情報入力へ"
        case 2:
          return "決済情報入力へ"
        case 3:
          return "購入する"
        default:
          return "次へ"
      }
    })
    const next = async () => {
      await nextTick(async () => {
        if (e1.value < 3) {
          e1.value += 1
          return
        }
        if(e1.value === 3) {
          await onSubmit()
        }
      })
    }
    const back = () => {
      if (e1.value > 1) {
        e1.value -= 1
      }
    }
    return {
      e1,
      showModal,
      onSubmit,
      numberElement,
      expiryElement,
      cvcElement,
      nextBtnLabel,
      handler: {
        next,
        back
      }
    }
  }
})
</script>

<style scoped>

</style>