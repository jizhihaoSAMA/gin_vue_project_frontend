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
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <em>{{ userInfo.Username }}</em>
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

export default {
  computed: {
    userInfo(){
      return this.$store.state.userModule.userInfo;
    },
  },
};
</script>