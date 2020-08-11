import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue';
import './assets/scss/index.scss';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import VueAxios from 'vue-axios';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'
// Vue.config.productionTip = false;

// Use Bootstrap
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
// Use vuelidate
Vue.use(Vuelidate)

// Use axious
Vue.use(VueAxios, axios)

new Vue({
  // 让路由使用
  router,
  store,
  render: h => h(App),
}).$mount("#app")
