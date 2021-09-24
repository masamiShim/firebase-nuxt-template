import { actionTree, getterTree, mutationTree } from "typed-vuex"

type Toast = {
  message: string
  color: "error" | "success" | "primary" | "warning" | "secondary"
  timeout: number
}

type ToastSetting = Pick<Toast, "message"> & Partial<Omit<Toast, "message">>

export const state = () => ({
  val: null as Toast | null,
})

export const getters = getterTree(state, {
  getToast: (state) => state.val,
  showMessage: (state) => !!state.val,
})

export const mutations = mutationTree(state, {
  setToast: (state, toast?: Toast) => {
    if (!toast) {
      state.val = null
    } else {
      state.val = toast
    }
  },
})

export const actions = actionTree(
  { state },
  {
    show({ commit }, toast: ToastSetting) {
      if (!toast.timeout) {
        toast.timeout = 5000
      }
      if (!toast.color) {
        toast.color = "error"
      }
      commit("setToast", toast)
    },
    hide({ commit }) {
      commit("setToast")
    },
  }
)
