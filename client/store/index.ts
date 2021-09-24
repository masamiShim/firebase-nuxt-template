import { getAccessorType } from "typed-vuex"

import * as auth from "@/store/auth"
import * as toast from "@/store/toast"
import * as loading from "@/store/loading"

export const state = () => ({})
export const getters = {}
export const mutations = {}
export const actions = {} // This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    // The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
    auth,
    toast,
    loading,
  },
})
