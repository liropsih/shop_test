import "./assets/sass/app.scss"
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import router from './router'
import store from './store'
import App from './App.vue'
import './registerServiceWorker'
import axios from 'axios'
import messagePlugin from './utils/message.plugin'
// import titlePlugin from './utils/title.plugin'
import Loader from './components/app/Loader'
import 'materialize-css/dist/js/materialize'

Vue.config.productionTip = false

Vue.use(messagePlugin)
// Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.component('Loader', Loader)

Vue.prototype.$http = axios;
// const token = localStorage.getItem('token')
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }

let app
app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
