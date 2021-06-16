import $axios from '@/http'

export default {
    state: {
        token: token || null,
        name: token ? decode(token).name : null,
        roles: token ? decode(token).roles : null
    },
    mutations: {
        login(state, data) {
            state.token = data
            state.name = decode(data).name
            state.roles = decode(data).roles
        },
        logout(state) {
            state.token = null
            state.name = null
            state.roles = null
            localStorage.removeItem('token')
        }
    },
    actions: {
        async getUserInfo({ commit }) {
            try {
                const { data } = await $axios.get('/api/user/info')
                commit('login', data)
            } catch (e) {
                commit('setError', e.response.data.message)
                setTimeout(() => commit('clearError'), 200)
                throw (e)
            }
        },
        async login({ commit }, body) {
            try {
                const { data } = await $axios.post('/api/user/login', body)
                localStorage.setItem('token', data)
                commit('login', data)
            } catch (e) {
                commit('setError', e.response.data.message)
                setTimeout(() => commit('clearError'), 200)
                throw (e)
            }
        },
        logout({ commit }) {
            commit('logout')
        },
        async authCheck({ commit }) {
            try {
                const { data } = await $axios.get('/api/user/auth')
                localStorage.setItem('token', data)
                commit('login', data)
            } catch (e) {
                commit('logout')
            }
        }
    },
    getters: {
        isLoggedIn: s => !!s.token,
        isAdmin: s => s.roles ? !!s.roles.length : false,
        username: s => s.name,
        roles: s => s.roles
    }
}