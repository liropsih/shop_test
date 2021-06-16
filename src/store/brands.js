import $axios from "@/http"

export default {
    state: {
        brands: null
    },
    mutations: {
        getBrands(state, data) {
            state.brands = data.brands
        }
    },
    actions: {
        async getBrands({ commit }) {
            try {
                const { data } = await $axios.get(`/api/brand`)
                commit('getBrands', data)
            } catch (e) {
                commit('setError', e.response.data.message)
                setTimeout(() => commit('clearError'), 200)
                throw (e)
            }
        }
    },
    getters: {
        brands: s => s.brands
    }
}