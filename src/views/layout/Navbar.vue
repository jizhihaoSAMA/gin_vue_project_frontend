<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
    >
      <b-container>
        <b-navbar-brand href="#" @click="$router.push({name:'The tool'})">老子的网页</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse
          id="nav-collapse"
          is-nav
        >

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown
              right
              v-if="userInfo"
            >
              <template v-slot:button-content>
                <em>{{ userInfo.name }}</em>
              </template>
              <b-dropdown-item href="#">个人主页</b-dropdown-item>
              <b-dropdown-item href="#">注销</b-dropdown-item>
            </b-nav-item-dropdown>
            <div v-if="!userInfo">
              <b-nav-item :active="$route.name == 'login'" @click="$router.replace({name:'login'})">登陆</b-nav-item>
              <b-nav-item :active="$route.name == 'register'" @click="$router.replace({name:'register'})">注册</b-nav-item>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>
<script>
import storageService from '@/service/storageService';

export default {
  data() {
    return {};
  },
  activated() {},
  //监听属性 类似于data概念
  computed: {
    userInfo(){
      return JSON.parse(storageService.get(storageService.USER_INFO));
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
};
</script>