import dayjs from "dayjs"
import { email, helpers, numeric, required } from "@vuelidate/validators"

const isDateRule = (params: { min: string; max: string }) => (value: any) => {
  const v = dayjs(value)
  if (!v.isValid()) return false

  const min = dayjs(params.min)
  const max = dayjs(params.max)

  return v.isAfter(min) && v.isBefore(max)
}

const isRequire = helpers.withMessage("必須です", required)

const isDate = helpers.withMessage(
  "不正な日付です",
  isDateRule({ min: "1970-01-01", max: "2999-12-31" })
)

const isNumeric = helpers.withMessage("数値を入力してください", numeric)
const isEmail = helpers.withMessage("形式が不正です", email)

export { isDate, isRequire, isNumeric, isEmail }
