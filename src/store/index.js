import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import items from './items'
import filters from './filters'
import cart from './cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    SidenavTrigger: true,
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
    SidenavTrigger(state) {
      state.SidenavTrigger = !state.SidenavTrigger
    }
  },
  actions: {
    setError(error) {
      commit('setError', error.response.data.message)
      setTimeout(() => commit('clearError'), 200)
    },
    SidenavTrigger({ commit }) {
      commit('SidenavTrigger')
    }
  },
  getters: {
    error: s => s.error,
    SidenavChangeState: s => s.SidenavTrigger
  },
  modules: {
    auth,
    items,
    filters,
    cart
  }
})
