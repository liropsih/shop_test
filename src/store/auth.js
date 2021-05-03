// import axios from 'axios'

import { useFetch } from '@/functions/useFetch.function'

export default {
    state: {
        token: JSON.parse(localStorage.getItem('userData.token')) || '',
        uid: null
    },
    mutations: {
        login(state, data) {
            state.uid = data.uid
            state.token = data.token
        },
        logout(state) {
            state.uid = null
            state.token = null
        }
    },
    actions: {
        //useFetch ЗАПИХНУТЬ В ЭКШН ТОЖЕ!!!!!!!
        
        async register({ dispatch, commit }, body) {
            try {
                const data = await useFetch('http://localhost:3000/api/auth/register', 'POST', body)
                // commit('login', data)
                await dispatch('login', body)
            } catch (e) {
                commit('setError', e.message)
                setTimeout(() => commit('clearError'), 200)
            }
        },

        async login({ commit }, body) {
            try {
                const data = await useFetch('http://localhost:3000/api/auth/login', 'POST', body)
                localStorage.setItem('userData', JSON.stringify({ 
                    token: data.token, 
                    uid: data.uid, 
                    name: data.name 
                }))
                commit('login', data)
            } catch (e) {
                commit('setError', e.message)
                setTimeout(() => commit('clearError'), 200)
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
        // username: state => state.user.name,
        // authStatus: state => state.status,
        // info: state => state.info
        uid: s => s.uid,
        token: s => s.token
    }
}