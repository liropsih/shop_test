import axios from 'axios'

export default {
    state: {
        // status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },
    mutations: {
        // auth_request(state) {
        //     // state.status = 'loading'
        // },
        login(state, data) {
            // state.status = 'success'
            // state.token = data.token
            state.user = data.user
        },
        // auth_error(state) {
        //     // state.status = 'error'
        // },
        logout(state) {
            // state.status = ''
            state.token = ''
            state.user = {}
        },
        setUser(state, data) {
            state.user = data.user
        }
        // FETCH_USER(state, user) {
        //     state.info = user;
        // },
    },
    actions: {
        // login({ commit }, user) {
        //     return new Promise((resolve, reject) => {
        //         commit('auth_request')
        //         axios({ url: '/login', data: user, method: 'POST' })
        //             .then(resp => {
        //                 const token = resp.data.token
        //                 const user = resp.data.user
        //                 localStorage.setItem('token', token)
        //                 axios.defaults.headers.common['Authorization'] = token
        //                 commit('auth_success', token, user)
        //                 resolve(resp)
        //             })
        //             .catch(err => {
        //                 commit('auth_error')
        //                 localStorage.removeItem('token')
        //                 // reject(err)
        //                 commit('setError', err)
        //                 throw err
        //             })
        //     })
        // },
        async login({ commit }, user) {
            const response = await axios({ url: '/login', data: user, method: 'POST' })
            try {
                const token = response.data.token
                // const user = response.data.user
                // console.log(response)
                const data = { token }
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                commit('login', data)
            } catch (e) {
                localStorage.removeItem('token')
                commit('setError', e)
                throw e
            }
        },
        async register({ commit }, user) {
            const response = await axios({ url: '/register', data: user, method: 'POST' })
            try {
                console.log('reg_response :', response)
                // const token = response.data.token
                const user = response.data.user
                const data = { 
                    // token, 
                    user }
                console.log('data: ', data)
                // localStorage.setItem('token', token)
                // axios.defaults.headers.common['Authorization'] = token
                commit('login', data)

            } catch (e) {
                // localStorage.removeItem('token')
                commit('setError', e)
                throw e
            }

        },
        // register({ commit }, user) {
        //     return new Promise((resolve, reject) => {
        //         commit('auth_request')
        //         axios({ url: '/register', data: user, method: 'POST' })
        //             .then(resp => {
        //                 const token = resp.data.token
        //                 const user = resp.data.user
        //                 localStorage.setItem('token', token)
        //                 axios.defaults.headers.common['Authorization'] = token
        //                 commit('auth_success', token, user)
        //                 resolve(resp)
        //             })
        //             .catch(err => {
        //                 commit('auth_error', err)
        //                 localStorage.removeItem('token')
        //                 // reject(err)
        //                 commit('setError', err)
        //                 throw err
        //             })
        //     })
        // },
        // name({ commit }, user) {
        //     return new Promise((resolve, reject) => {
        //         commit('auth_request')
        //         axios({ url: 'http://localhost:3000/register', data: user, method: 'POST' })
        //             .then(resp => {
        //                 const token = resp.data.token
        //                 const user = resp.data.user
        //                 localStorage.setItem('token', token)
        //                 axios.defaults.headers.common['Authorization'] = token
        //                 commit('auth_success', token, user)
        //                 resolve(resp)
        //             })
        //             .catch(err => {
        //                 commit('auth_error', err)
        //                 localStorage.removeItem('token')
        //                 // reject(err)
        //                 commit('setError', err)
        //                 throw err
        //             })
        //     })
        // },
        async getUser({ commit }) {
            const token = { token: this.getters.getToken }
            const response = await axios({ url: '/getuser', data: token, method: 'POST' })
            try {
                const user = response.data.user
                const data = { user }
                commit('setUser', data)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        // getUid() {
        //     const user = firebase.auth().currentUser
        //     return user ? user.uid : null
        // },
        // async logout({ commit }) {
        //     await firebase.auth().signOut()
        //     commit('clearInfo')
        // },
        logout({ commit }) {
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            commit('logout')
        }
        // logout({ commit }) {
        //     return new Promise((resolve, reject) => {
        //         commit('logout')
        //         localStorage.removeItem('token')
        //         delete axios.defaults.headers.common['Authorization']
        //         resolve()
        //     })
        // }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        user: state => state.user,
        getToken: state => state.token
        // username: state => state.user.name,
        // authStatus: state => state.status,
        // info: state => state.info
    }
}