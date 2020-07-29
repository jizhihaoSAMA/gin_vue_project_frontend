<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
    >
      <b-container>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-brand
          href="#"
          @click="$router.push({name:'index'})"
          class="mx-auto"
        >测试网页</b-navbar-brand>

        <b-nav-form>
          <b-form-input
            size="sm"
            class="mr-auto ml-1 my-2 my-sm-1 mr-md-1 col-9 offset-0 col-md-4 offset-md-4"
            placeholder="Search"
          ></b-form-input>
          <b-button
            size="sm"
            class="col-2 col-md-1"
            type="submit"
          >Search</b-button>
        </b-nav-form>

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
                <em>{{ userInfo.username }}</em>
              </template>
              <b-dropdown-item href="#">个人主页</b-dropdown-item>
              <b-dropdown-item @click="logout">注销</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item
              :active="$route.name == 'login'"
              @click="$router.replace({name:'login'})"
              v-if="!userInfo"
            >登陆</b-nav-item>
            <b-nav-item
              :active="$route.name == 'register'"
              @click="$router.replace({name:'register'})"
              v-if="!userInfo"
            >注册</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  }),
  methods: mapActions('userModule', ['logout']),
};
</script>

<style scoped>
.form-inline {
  width: 100%;
}
</style>