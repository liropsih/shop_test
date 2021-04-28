// import axios from 'axios'

export default {
    state: {
        // loading: false
        user: null
    },
    mutations: {
        login(state, data) {
            state.user = data
        },
    },
    actions: {
        async register({ commit }, { url, method = 'GET', body = null, headers = {} }) {
            try {
                if (body) {
                    body = JSON.stringify(body)
                    headers['Content-Type'] = 'application/json'
                }
                const response = await fetch(url, { method, body, headers })
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.message || 'Что-то пошло не так')
                }
                commit('login', data)
            } catch (e) {
                // commit('setLoading', false)
                // commit('setError', e.message)
                // console.log('catch ', e)
                commit('setError', e.message)
                setTimeout(() => commit('clearError'), 500)
                // debugger
                // throw e
            }
            // }
            // commit('setError', null)
            // return { loading, request, error }
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
        // isLoggedIn: state => !!state.token,
        user: state => state.user,
        // getToken: state => state.token
        // username: state => state.user.name,
        // authStatus: state => state.status,
        // info: state => state.info
    }
}