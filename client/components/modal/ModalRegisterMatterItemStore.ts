import { reactive } from "@nuxtjs/composition-api"
import { helpers, minValue } from "@vuelidate/validators"
import {
  isDate,
  isNumeric,
  isRequire,
} from "@/helper/validator/validator.helper"
import { UploadFile } from "~/types/application"

export type MatterContractItem = {
  contract: string
  term: {
    from: string
    to: string
  }
  timeWidth: {
    lower: string
    normal: string
    upper: string
  }
  unitPrice: string
  timePrice: {
    lower: string
    upper: string
  }
  billingTime: string
  workWeight: string
  needWorkReport: boolean
  canBillTrafficFee: boolean
  beforeExpireDays: string
  needNda: boolean
  contractReport: UploadFile[]
  promissoryLetter: UploadFile[]
  other: UploadFile[]
}
export const ModalRegisterMatterItemStore = () => {
  const state = reactive<MatterContractItem>({
    contract: "",
    term: {
      from: "",
      to: "",
    },
    timeWidth: {
      lower: "",
      normal: "",
      upper: "",
    },
    unitPrice: "",
    timePrice: {
      lower: "",
      upper: "",
    },
    billingTime: "",
    workWeight: "",
    needWorkReport: false,
    canBillTrafficFee: false,
    beforeExpireDays: "",
    needNda: false,
    contractReport: [],
    promissoryLetter: [],
    other: [],
  })

  const rules = {
    contract: {
      required: isRequire,
    },
    term: {
      from: {
        required: isRequire,
        date: isDate,
      },
      to: {},
    },
    timeWidth: {
      lower: {
        required: isRequire,
        numeric: isNumeric,
      },
      normal: {
        required: isRequire,
        numeric: isNumeric,
      },
      upper: {
        required: isRequire,
        numeric: isNumeric,
      },
    },
    unitPrice: {
      required: isRequire,
    },
    timePrice: {
      lower: {
        required: isRequire,
        min: helpers.withMessage("低すぎます", minValue(1)),
      },
      upper: {
        required: isRequire,
        min: helpers.withMessage("低すぎます", minValue(1)),
      },
    },
    billingTime: {
      required: isRequire,
    },
    workWeight: {
      required: isRequire,
    },
    address: {},
    phoneNumber: {},
    emailAddress: {
      required: isRequire,
      email: isRequire,
    },
    invoiceEmailAddress: {
      email: isRequire,
    },
  }

  return { state, rules }
}
