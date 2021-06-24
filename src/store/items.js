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
        async getItems({ commit, dispatch }, { catId, params, sale, search }) {
            try {
                const { data } = (sale && await $axios.get(`/api/item/sale`, { params: { ...params, sale } })) ||
                    (search && await $axios.get(`/api/item/search`, { params })) ||
                    await $axios.get(`/api/item/get/${catId}`, { params })
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
                data.brands.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (a.name < b.name) {
                        return -1
                    }
                    return 0
                })
                commit('getBrands', data)
            } catch (e) {
                dispatch('setError', e)
            }
        },
        async getCats({ commit, dispatch }) {
            try {
                const { data } = await $axios.get(`/api/cat`)
                data.cats.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (a.name < b.name) {
                        return -1
                    }
                    return 0
                })
                data.cats.forEach(cat => {
                    cat.children.sort((a, b) => {
                        if (a.name > b.name) {
                            return 1
                        }
                        if (a.name < b.name) {
                            return -1
                        }
                        return 0
                    })
                })
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