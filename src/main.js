import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import vSelect from 'vue-select'
import VueMask from 'v-mask'
import VueMeta from 'vue-meta'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'
import messagePlugin from '@/utils/message.plugin'
// import titlePlugin from '@/utils/title.plugin'
import Loader from '@/components/app/Loader'
import "@/assets/sass/app.scss"
import 'materialize-css/dist/js/materialize'

Vue.config.productionTip = false
Vue.use(messagePlugin)
// Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMask)
Vue.use(VueMeta)

Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.component('v-select', vSelect)

let app
app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
