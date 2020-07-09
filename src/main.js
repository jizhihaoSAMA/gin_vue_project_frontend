import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/scss/index.scss'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Vue from 'vue'
import App from './App.vue'
import router from './routers/router'

Vue.config.productionTip = false;

// Use Bootstrap
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Use vuelidate
Vue.use(Vuelidate)

// Use axious
Vue.use(VueAxios, axios)

new Vue({
  // 让路由使用
  router,
  render: h => h(App),
}).$mount("#app")
