import $axios from '@/http'

export default {
    state: {
        items: [],
        itemsCount: 0,
        searchItems: []
    },
    mutations: {
        getItems(state, items) {
            state.items = items.rows
            state.itemsCount = items.count
        },
        searchItems(state, searchItems) {
            state.searchItems = searchItems
        }
    },
    actions: {
        async getItems({ commit }, { catId, get }) {
            try {
                const { data } = await $axios.get(`/api/item/get/${catId}?${get}`)
                commit('getItems', data)
            } catch (e) {
                commit('setError', e.response.data.message)
                setTimeout(() => commit('clearError'), 200)
                throw (e)
            }
        },
        async searchItems({ commit }, get) {
            try {
                const { data } = await $axios.get(`/api/item/search?name=${get}`)
                commit('searchItems', data)
            } catch (e) {
                commit('setError', e.response.data.message)
                setTimeout(() => commit('clearError'), 200)
                throw (e)
            }
        }
    },
    getters: {
        items: s => s.items,
        itemsCount: s => s.itemsCount,
        searchItems: s => s.searchItems
    }
}