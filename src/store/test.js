login({ commit }, user){
    return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:3000/login', data: user, method: 'POST' })
            .then(resp => {
                const token = resp.data.token
                const user = resp.data.user
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', token, user)
                resolve(resp)
            })
            .catch(err => {
                commit('auth_error')
                localStorage.removeItem('token')
                reject(err)
            })
    })
}

async login({ commit }, user){
    return new Promise((resolve, reject) => {
        commit('auth_request')
        try {
            await axios({ url: 'http://localhost:3000/login', data: user, method: 'POST' })
            resp => {
                const token = resp.data.token
                const user = resp.data.user
                localStorage.setItem('token', token)
                await axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', token, user)
                resolve(resp)
            }
        } catch (e) {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(e)
        }
    })
}

async register({ commit }, user){
    return new Promise((resolve, reject) => {
        commit('auth_request')
        try {
            await axios({ url: 'http://localhost:3000/register', data: user, method: 'POST' })
            resp => {
                const token = resp.data.token
                const user = resp.data.user
                localStorage.setItem('token', token)
                await axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', token, user)
                resolve(resp)
            }
        } catch (e) {
            commit('auth_error', e)
            localStorage.removeItem('token')
            reject(e)
        }

    })
}


async logout({commit}){
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      await delete axios.defaults.headers.common['Authorization']
      resolve()
    })
   }