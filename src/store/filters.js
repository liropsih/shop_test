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
        async getBrandsFilter({ commit, dispatch }, id) {
            try {
                const { data } = await $axios.get(`/api/brand?${id}`)
                commit('setBrandsFilter', data)
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