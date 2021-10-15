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
  path: string
  name: string
}

export type PaginateOptions = {
  groupBy: any[]
  groupDesc: any[]
  itemsPerPage: number
  multiSort: boolean
  mustSort: false
  page: number
  sortBy: any[]
  sortDesc: any[]
}

export type Product = {
  id: string | number
  productKey: string
  name: string
  code: string
  janCode: string
  sellPrice: string
  regularPrice: string
  description: string
  feature: string
  sellLimit: string
  isPublish: boolean
}

export type ProductRegisterType = Product & {
  images: {
    main: UploadFile[]
    sub1: UploadFile[]
    sub2: UploadFile[]
  }
}
