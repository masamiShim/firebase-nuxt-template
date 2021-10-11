import { actionTree, getterTree, mutationTree } from "typed-vuex"

export const state = () => ({
  _items: [] as number[],
})

export const getters = getterTree(state, {
  list: (state): number[] => state._items,
  count: (state) => state._items.length || 0,
})

export const mutations = mutationTree(state, {
  ADD: (state, id: number[]) => {
    state._items = [...state._items, ...id]
  },
  REMOVE: (state, id: number[]) => {
    state._items = state._items.filter((i) => !id.includes(i))
  },
})

export const actions = actionTree(
  { state },
  {
    addItem({ commit }, id: number[]) {
      commit("ADD", id)
    },
    removeItem({ commit }, id: number[]) {
      commit("REMOVE", id)
    },
  }
)
