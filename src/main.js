import Vue from 'vue'
import App from './App.vue'
import router from './routers/router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/scss/index.scss'

Vue.config.productionTip = false;

// Use Bootstrap
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  // 让路由使用
  router,
  render: h => h(App),
}).$mount("#app")
