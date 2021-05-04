// import axios from 'axios'

import { useFetch } from '@/functions/useFetch.function'
const userData = JSON.parse(localStorage.getItem('userData')) || {}

export default {
    state: {
        token: userData.token || null,
        uid: userData.uid || null,
        name: userData.name || null,
        permission: userData.permission || null
    },
    mutations: {
        login(state, data) {
            state.token = data.token
            state.uid = data.uid
            state.name = data.name
            state.status = data.status || null
        },
        logout(state) {
            state.uid = null
            state.token = null
        }
    },
    actions: {
        async register({ dispatch, commit }, body) {
            try {
                const data = await useFetch('http://localhost:3000/api/auth/register', 'POST', body)
                await dispatch('login', body)
            } catch (e) {
                commit('setError', e.message)
                setTimeout(() => commit('clearError'), 200)
                throw (e)
            }
        },

        async login({ commit }, body) {
            try {
                const data = await useFetch('http://localhost:3000/api/auth/login', 'POST', body)
                localStorage.setItem('userData', JSON.stringify({
                    token: data.token,
                    uid: data.uid,
                    name: data.name,
                    permission: data.permission
                }))
                commit('login', data)
            } catch (e) {
                commit('setError', e.message)
                setTimeout(() => commit('clearError'), 200)
                throw (e)
            }
        },

        logout({ commit }) {
            localStorage.removeItem('userData')
            commit('logout')
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
        // user: state => state.user,
        // getToken: state => state.token
        username: s => s.name,
        // authStatus: state => state.status,
        // info: state => state.info
        uid: s => s.uid,
        token: s => s.token,
        permission: s => s.permission
    }
}