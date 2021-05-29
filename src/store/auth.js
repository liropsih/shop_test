// import axios from 'axios'

import { useFetch } from '@/functions/useFetch.function'
import { decode } from 'jsonwebtoken'
const userData = JSON.parse(localStorage.getItem('userData')) || {}

export default {
    state: {
        token: userData.token || null,
        name: userData.name || null,
        roles: userData.roles || null
    },
    mutations: {
        login(state, token) {
            state.token = token
            state.name = decode(token).name
            state.roles = decode(token).roles
        },
        logout(state) {
            state.token = null
            state.name = null
            state.roles = null
            localStorage.removeItem('userData')
        }
    },
    actions: {
        async register({ dispatch, commit }, body) {
            try {
                const token = await useFetch('/api/user/register', 'POST', body)
                localStorage.setItem('userData', JSON.stringify({
                    token,
                    name: decode(token).name,
                    roles: decode(token).roles
                }))
                commit('login', token)
            } catch (e) {
                commit('setError', e.message)
                setTimeout(() => commit('clearError'), 200)
                throw (e)
            }
        },

        async login({ commit }, body) {
            try {
                const token = await useFetch('/api/user/login', 'POST', body)
                localStorage.setItem('userData', JSON.stringify({
                    token,
                    name: decode(token).name,
                    roles: decode(token).roles
                }))
                commit('login', token)
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
                // const body = { token: this.getters.token }
                // await useFetch('/api/user/auth')
            } catch (e) {
                // commit('logout')
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
        roles: s => s.roles
    }
}