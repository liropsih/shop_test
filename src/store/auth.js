// import axios from 'axios'

import { useFetch } from '@/functions/useFetch.function'
const userData = JSON.parse(localStorage.getItem('userData')) || {}

export default {
    state: {
        token: userData.token || null,
        name: userData.name || null,
        status: userData.status || null
    },
    mutations: {
        login(state, data) {
            state.token = data.token
            state.name = data.name
            state.status = data.status || null
        },
        logout(state) {
            state.token = null
            localStorage.removeItem('userData')
        }
    },
    actions: {
        async register({ dispatch, commit }, body) {
            try {
                await useFetch('/api/auth/register', 'POST', body)
                await dispatch('login', body)
            } catch (e) {
                commit('setError', e.message)
                setTimeout(() => commit('clearError'), 200)
                throw (e)
            }
        },

        async login({ commit }, body) {
            try {
                const data = await useFetch('/api/auth/login', 'POST', body)
                localStorage.setItem('userData', JSON.stringify({
                    token: data.token,
                    name: data.name,
                    status: data.status
                }))
                commit('login', data)
            } catch (e) {
                commit('setError', e.message)
                setTimeout(() => commit('clearError'), 200)
                throw (e)
            }
        },

        logout({ commit }) {
            commit('logout')
        },

        async tokenVerify({ commit }) {
            try {
                const body = { token: this.getters.token }
                await useFetch('/api/auth/tokenverify', 'POST', body)
            } catch (e) {
                commit('logout')
            }
        }

        // async login({ commit }, user) {
        //     const response = await axios({ url: '/login', data: user, method: 'POST' })
        //     try {
        //         const token = response.data.token
        //         // const user = response.data.user
        //         // console.log(response)
        //         const data = { token }
        //         localStorage.setItem('token', token)
        //         axios.defaults.headers.common['Authorization'] = token
        //         commit('login', data)
        //     } catch (e) {
        //         localStorage.removeItem('token')
        //         commit('setError', e)
        //         throw e
        //     }
        // },
        // async register({ commit }, user) {
        //     const response = await axios({ url: '/register', data: user, method: 'POST' })
        //     try {
        //         console.log('reg_response :', response)
        //         // const token = response.data.token
        //         const user = response.data.user
        //         const data = { 
        //             // token, 
        //             user }
        //         console.log('data: ', data)
        //         // localStorage.setItem('token', token)
        //         // axios.defaults.headers.common['Authorization'] = token
        //         commit('login', data)

        //     } catch (e) {
        //         // localStorage.removeItem('token')
        //         commit('setError', e)
        //         throw e
        //     }

        // },

        // async getUser({ commit }) {
        //     const token = { token: this.getters.getToken }
        //     const response = await axios({ url: '/getuser', data: token, method: 'POST' })
        //     try {
        //         const user = response.data.user
        //         const data = { user }
        //         commit('setUser', data)
        //     } catch (e) {
        //         commit('setError', e)
        //         throw e
        //     }
        // },

        // logout({ commit }) {
        //     localStorage.removeItem('token')
        //     delete axios.defaults.headers.common['Authorization']
        //     commit('logout')
        // }

    },
    getters: {
        isLoggedIn: s => !!s.token,
        username: s => s.name,
        token: s => s.token,
        status: s => s.status
    }
}