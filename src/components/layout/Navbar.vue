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
        >News</b-navbar-brand>

        <b-nav-form class="mx-auto">
          <b-form-input
            size="sm"
            class="my-2 my-sm-1 mr-md-1 col-8 col-md-8 "
            placeholder="Search"
            id="search_input"
          ></b-form-input>
          <b-button
            size="sm"
            class="col-3 col-md-3"
            type="submit"
          >Search</b-button>
        </b-nav-form>

        <b-collapse
          id="nav-collapse"
          is-nav
        >
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <b-icon icon="bell">

              </b-icon>
              <b-badge>{{ unreadmessage }}</b-badge>
            </b-nav-item>
            <b-nav-item-dropdown
              right
              v-if="userInfo"
            >
              <template v-slot:button-content>
                <em>{{ userInfo.username }}</em>
              </template>
              <b-dropdown-item @click="$router.push({name: 'user_profile'})">个人主页</b-dropdown-item>
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
  data () {
    return {
      unreadmessage: 1,
    }
  },
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  }),
  methods: {
    ...mapActions('userModule', { userLogout: 'logout' }),

    logout () {
      this.$router.push({ name: "index" })
      this.userLogout()
    }
  }


};
</script>

<style scoped>
#search_input {
  width: 80%;
  margin-left: 10px;
}
form {
  width: 100%;
}
</style>