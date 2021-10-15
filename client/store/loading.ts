import { actionTree, getterTree, mutationTree } from "typed-vuex"

export const state = () => ({
  _loading: false,
})

export const getters = getterTree(state, {
  isLoading: (state) => state._loading,
})

export const mutations = mutationTree(state, {
  CHANGE_LOADING: (state, isLoading: boolean) => {
    state._loading = isLoading
  },
})

export const actions = actionTree(
  { state },
  {
    start({ commit }) {
      commit("CHANGE_LOADING", true)
    },
    complete({ commit }) {
      commit("CHANGE_LOADING", false)
    },
  }
)
