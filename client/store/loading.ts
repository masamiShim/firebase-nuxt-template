import { actionTree, getterTree, mutationTree } from "typed-vuex"

export const state = () => ({
  loading: false,
})

export const getters = getterTree(state, {
  isLoading: (state) => state.loading,
})

export const mutations = mutationTree(state, {
  changeLoading: (state, isLoading: boolean) => {
    state.loading = isLoading
  },
})

export const actions = actionTree(
  { state },
  {
    start({ commit }) {
      commit("changeLoading", true)
    },
    complete({ commit }) {
      commit("changeLoading", false)
    },
  }
)
