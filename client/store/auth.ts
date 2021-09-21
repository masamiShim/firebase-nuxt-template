import { actionTree, getterTree, mutationTree } from "typed-vuex"

type AuthToken = {
  accessToken: string
  refreshToken: string
}

const ignoreRoutes = ["/login", "/logout"]

export const state = () => ({
  auth: null as AuthToken | null,
  // This is correct
  resumeRoute: null as string | null
})

export const getters = getterTree(state, {
  isAuthorized: (state) => !!state.auth,
  accessToken: (state) => state.auth?.accessToken,
  refreshToken: (state) => state.auth?.refreshToken,
  resumeRoute: (state) => state.resumeRoute
})

export const mutations = mutationTree(state, {
  setToken: (state, auth?: AuthToken) => {
    if (!auth) {
      state.auth = null
    } else {
      state.auth = auth
    }
  },
  setRoute: (state, routePath?: string) => {
    if (!routePath) {
      state.resumeRoute = null
    } else {
      state.resumeRoute = routePath
    }
  }
})

export const actions = actionTree({ state }, {
  login({ commit }, token: AuthToken) {
    commit("setToken", token)
  },
  logout({ commit }) {
    commit("setToken")
  },
  async redirectRoute({ commit }, route?: string) {
    if (!route || ignoreRoutes.includes(route)) {
      await commit("setRoute")
    } else {
      await commit("setRoute", route)
    }
  }
})
