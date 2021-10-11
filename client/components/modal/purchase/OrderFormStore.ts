import { reactive } from "@nuxtjs/composition-api"
import { isEmail, isRequire } from "@/helper/validator/validator.helper"

type OrderForm = {
  name: string
  kana: string
  tel: string
  zipCode: string
  email: string
  address: string
  remember: boolean
}

export const OrderFormRules = {
  name: {
    required: isRequire,
  },
  kana: {
    required: isRequire,
  },
  tel: {
    required: isRequire,
  },
  zipCode: {
    required: isRequire,
  },
  email: {
    required: isRequire,
    email: isEmail,
  },
  address: {
    required: isRequire,
  },
}

export const OrderFormStore = () => {
  const state = reactive<OrderForm>({
    name: "",
    kana: "",
    tel: "",
    zipCode: "",
    email: "",
    address: "",
    remember: false,
  })

  const rules = {
    name: {
      required: isRequire,
    },
    kana: {
      required: isRequire,
    },
    tel: {
      required: isRequire,
    },
    zipCode: {
      required: isRequire,
    },
    email: {
      required: isRequire,
      email: isEmail,
    },
    address: {
      required: isRequire,
    },
  }

  return { state, rules }
}
