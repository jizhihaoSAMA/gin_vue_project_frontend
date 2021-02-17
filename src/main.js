import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue';
import './assets/scss/index.scss';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import VueAxios from 'vue-axios';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'


Vue.config.productionTip = false;

// Use Bootstrap
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
// Use vuelidate
Vue.use(Vuelidate)

// Use axious
Vue.use(VueAxios, axios);

Vue.prototype.BACKEND = process.env.VUE_APP_BACKEND

Vue.prototype.action_icon_mapper = {
  // 暂时不做查看赞了哪个评论
  // 1: 评论
  // 2: 点赞
  // 3: 关注
  1: 'chat',
  2: 'heart',
  3: 'box-arrow-up',
},

  Vue.prototype.showError = function (err) {
    this.$bvToast.toast(err.response.data.msg, {
      title: '操作失败',
      variant: 'danger',
      solid: true,
    })
  }

Vue.prototype.showCustomError = function (title, msg) {
  this.$bvToast.toast(msg, {
    title: title,
    variant: 'danger',
    solid: true,
  })
}

Vue.prototype.showSuccessInfo = function (res) {
  this.$bvToast.toast(res.data.msg, {
    title: '操作成功',
    variant: 'success',
    solid: true,
  })
}

Vue.prototype.showSuccessCustomInfo = function (title, msg) {
  this.$bvToast.toast(msg, {
    title: title,
    variant: 'success',
    solid: true,
  })
}

new Vue({
  // 让路由使用
  router,
  store,
  render: h => h(App),
}).$mount("#app")
