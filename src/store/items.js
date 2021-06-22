import $axios from '@/http'

export default {
    state: {
        items: [],
        itemsCount: 0,
        // searchItems: [],
        brands: null,
        cats: null
    },
    mutations: {
        getItems(state, items) {
            state.items = items.rows
            state.itemsCount = items.count
        },
        // searchItems(state, searchItems) {
            // state.searchItems = searchItems
        // },
        getBrands(state, data) {
            state.brands = data.brands
        },
        getCats(state, data) {
            state.cats = data.cats
        },
    },
    actions: {
        async getItems({ commit, dispatch }, { catId, get }) {
            try {
                const { data } = await $axios.get(`/api/item/get/${catId}?${get}`)
                commit('getItems', data)
            } catch (e) {
                dispatch('setError', e)
            }
        },
        // async searchItems({ commit, dispatch }, get) {
        //     try {
        //         const { data } = await $axios.get(`/api/item/search?name=${get}`)
        //         commit('searchItems', data)
        //     } catch (e) {
        //         dispatch('setError', e)
        //     }
        // },
        async getBrands({ commit, dispatch }) {
            try {
                const { data } = await $axios.get(`/api/brand`)
                commit('getBrands', data)
            } catch (e) {
                dispatch('setError', e)
            }
        },
        async getCats({ commit, dispatch }) {
            try {
                const { data } = await $axios.get(`/api/cat`)
                commit('getCats', data)
            } catch (e) {
                dispatch('setError', e)
            }
        }
    },
    getters: {
        items: s => s.items,
        itemsCount: s => s.itemsCount,
        // searchItems: s => s.searchItems,
        brands: s => s.brands,
        cats: s => s.cats
    }
}