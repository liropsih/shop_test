import $axios from '@/http'

export default {
    state: {
        cart: {}
    },
    mutations: {
        getCart(state, data) {
            state.cart = data
        }
    },
    actions: {
        async getCart({ commit }) {
            try {
                const { data } = await $axios.get('/api/user/cart')
                commit('getCart', data)
            } catch (e) {
                commit('setError', e.response.data.message)
                setTimeout(() => commit('clearError'), 200)
                throw (e)
            }
        }
    },
    getters: {
        cart: s => s.cart
    }
}