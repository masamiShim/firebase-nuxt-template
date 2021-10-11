import type { ValidationRuleCollection } from "@vuelidate/core"

export type MyResponse<T> = {
  code: string
  body: T
}

export type CheckProp = {
  [key: string]: ValidationRuleCollection
}

export type SelectionType = {
  value: string
  label: string
}

export type UploadFile = {
  key: string
  url: string
  name: string
}

export type Product = {
  id: number
  src: string
  lazySrc: string
  name: string
  description: string
  price: number
  createdAt: string
}
