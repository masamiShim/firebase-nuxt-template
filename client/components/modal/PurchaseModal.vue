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
            >
              <v-card-subtitle>購入商品の確認</v-card-subtitle>
              <v-divider />
              <purchase-confirm-item v-for="item in state.purchaseItems" :key="item.id" :item="item"
                                     @changeQuantity="handler.handleChangeQuantity" />
              <v-divider />
              <v-card-actions>
                合計金額：¥ {{ Number(totalAmount).toLocaleString() }}
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card flat>
              <v-card-subtitle>配送先住所の入力</v-card-subtitle>
              <v-divider class="my-3" />
              <v-card-text>
                <order-form :scope="'order'" :valid.sync="orderFormValid" :item="state.orderForm" />
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card flat>
              <v-card-subtitle>決済情報の入力</v-card-subtitle>
              <v-divider class="my-3" />
              <credit-card-form :number-element="numberElement"
                                :number-valid.sync="state.card.numberValid"
                                :expiry-element="expiryElement"
                                :expiry-valid.sync="state.card.expiryValid"
                                :cvc-element="cvcElement"
                                :cvc-valid.sync="state.card.cvcValid"
              />
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </template>
    <template #modal-action>
      <v-btn v-if="e1 > 1" text color="secondary" @click="handler.back()">戻る</v-btn>
      <v-btn color="primary" :disabled="disabledButton" @click="handler.next()">{{ nextBtnLabel }}</v-btn>
    </template>
  </modal-base>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeMount, reactive, ref, useContext } from "@nuxtjs/composition-api"
import { useVuelidate } from "@vuelidate/core"
import ModalBase from "@/components/modal/ModalBase.vue"
import OrderForm from "@/components/modal/purchase/OrderForm.vue"
import CreditCardForm from "@/components/modal/purchase/CreditCardForm.vue"
import PurchaseConfirmItem from "@/components/modal/purchase/PurchaseConfirmItem.vue"
import { Product } from "~/types/application"
import { OrderFormStore } from "@/components/modal/purchase/OrderFormStore"

type OrderInputForm = {
  name: string,
  kana: string,
  tel: string,
  zipCode: string,
  email: string,
  address: string,
  remember: boolean
}

type State = {
  purchaseItems: Product & { quantity: number }[],
  orderForm: OrderInputForm,
  card: {
    numberValid: boolean,
    expiryValid: boolean,
    cvcValid: boolean,
  }
}

export default defineComponent({
  components: { PurchaseConfirmItem, CreditCardForm, OrderForm, ModalBase },
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  setup(prop, { emit }) {
    const ctx = useContext()
    const e1 = ref<number>(1)
    const orderFormValid = ref<boolean>(false)
    const cardInputValid = computed(() => state.card.numberValid && state.card.expiryValid && state.card.cvcValid)
    const showModal = computed({
      get: () => prop.open,
      set: (v) => emit("update:open", v)
    })

    const orderFormStore = OrderFormStore()

    const state = reactive<State>({
      purchaseItems: [],
      orderForm: orderFormStore.state,
      card: {
        numberValid: false,
        expiryValid: false,
        cvcValid: false
      }
    })



    const totalAmount = computed((): number => {
      return state.purchaseItems.map((p) => {
        const { price, quantity } = p
        return Number(price) * Number(quantity)
      }).reduce((c, v) => c + v, 0)
    })


    const handleChangeQuantity = (v: { id: number, value: string }) => {
      state.purchaseItems = state.purchaseItems.map((p) => {
        if (p.id === v.id) {
          p.quantity = v.value
        }
        return p
      })
    }

    const disabledButton = computed(() => {
      if (e1.value === 1 && state.purchaseItems.length) {
        return false
      }
//      if(e1.value === 2 && !vOrder$.value.$invalid) {
      if (e1.value === 2) {
        return false
      }
      if (e1.value === 3 && cardInputValid.value) {
        return false
      }

      return true
    })

    // カード決済用の設定
    const elements = window._payJp.elements()
    const numberElement = elements.create("cardNumber")
    const expiryElement = elements.create("cardExpiry")
    const cvcElement = elements.create("cardCvc")
    const onSubmit = async () => {
      const r = await window._payJp.createToken(numberElement)
      if ("error" in r) {
        await ctx.$accessor.toast.show({
          message: r.error.message,
          color: "error"
        })
        return
      }
      // TODO: 決済APIを実行
      if ("card" in r) {
        if (r.card.address_zip_check === "failed") {
          await ctx.$accessor.toast.show({
            message: "カード登録情報の郵便番号が不正です",
            color: "error"
          })
          return
        } else if (r.card.cvc_check === "failed" || r.card.cvc_check === "unavailable") {
          await ctx.$accessor.toast.show({
            message: "セキュリティコードの認証に失敗しました",
            color: "error"
          })
          return
        }
      }

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
        if (e1.value === 3) {
          await onSubmit()
        }
      })
    }
    const back = () => {
      if (e1.value > 1) {
        e1.value -= 1
      }
    }

    const validations = {}
    const vOrder$ = useVuelidate(validations, {}, { $scope: "order" })

    onBeforeMount(async () => {

      await ctx.$gateway.product.list("").then((res) => {
        const products = res.body
        const cartItems = ctx.$accessor.cart.list
        console.log('cartItems:', cartItems)
        state.purchaseItems = products.filter((p) => cartItems.includes(p.id))
          .map((p) => {
            p.quantity = "1"
            return p
          })
      })
    })

    return {
      state,
      orderFormValid,
      cardInputValid,
      disabledButton,
      e1,
      showModal,
      onSubmit,
      numberElement,
      expiryElement,
      cvcElement,
      nextBtnLabel,
      totalAmount,
      vOrder$,
      handler: {
        next,
        back,
        handleChangeQuantity
      }
    }
  }
})
</script>

<style scoped>

</style>