import $axios from "@/http"

export default {
    state: {
        brandsFilter: [],
    },
    mutations: {
        setBrandsFilter(state, brandsFilter) {
            state.brandsFilter = brandsFilter
        },
        clearFilters(state) {
            state.brandsFilter = []
        }
    },
    actions: {
        async getBrandsFilter({ commit, dispatch }, brandId) {
            try {
                const { data } = await $axios.get(`/api/brand`, { params: { brandId } })
                commit('setBrandsFilter', data.brands)
            } catch (e) {
                dispatch('setError', e)
            }
        },
        setBrandsFilter({ commit }, brandsFilter) {
            commit('setBrandsFilter', brandsFilter)
        },
        clearFilters({ commit }) {
            commit('clearFilters')
        }
    },
    getters: {
        brandsFilter: s => s.brandsFilter
    }
}