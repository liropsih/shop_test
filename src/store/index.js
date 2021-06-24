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
    error: null,
    message: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    },
    SidenavTrigger(state) {
      state.SidenavTrigger = !state.SidenavTrigger
    }
  },
  actions: {
    setError({ commit }, error) {
      const e = error?.response?.data?.message ? error.response.data.message : 'Что-то пошло не так'
      commit('setError', e)
      setTimeout(() => commit('clearError'), 200)
    },
    setMessage({ commit }, message) {
      const m = message?.data?.message ? message.data.message : message
      commit('setMessage', m)
      setTimeout(() => commit('clearMessage'), 200)
    },
    SidenavTrigger({ commit }) {
      commit('SidenavTrigger')
    }
  },
  getters: {
    error: s => s.error,
    message: s => s.message,
    SidenavChangeState: s => s.SidenavTrigger
  },
  modules: {
    auth,
    items,
    filters,
    cart
  }
})
