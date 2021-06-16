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
        async getCart({ commit, dispatch }) {
            try {
                const { data } = await $axios.get('/api/user/cart')
                commit('getCart', data)
            } catch (e) {
                dispatch('setError', e)
            }
        }
    },
    getters: {
        cart: s => s.cart
    }
}