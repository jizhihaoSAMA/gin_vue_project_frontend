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
            <b-nav-item-dropdown
              v-if="userInfo"
              no-caret
            >
              <template v-slot:button-content>
                <b-icon
                  icon="bell"
                  @click="showMessage"
                >
                </b-icon>
                <b-badge v-if="unreadmessage">{{ unreadmessage }}</b-badge>
              </template>
              <b-dropdown-item
                v-for="(message, index) in recent_message"
                :key="index"
              >
                <!-- 以后做消息的分类 -->
                <!-- <b-tabs
                  pills
                  card
              
                >
                  <b-tab title="所有未读消息">

                  </b-tab>
                  <b-tab title="关注"></b-tab>
                  <b-tab title="回复"></b-tab>
                </b-tabs> -->
                <b-icon :icon="this.action_icon_mapper[message.type]"></b-icon>
              </b-dropdown-item>
              <b-button
                variant="link"
                size="sm"
              >查看所有消息</b-button>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown
              right
              v-if="userInfo"
            >

              <template v-slot:button-content>
                <em>{{ userInfo.username }}</em>
              </template>
              <b-dropdown-item @click="$router.push({name: 'user_page', params:{user_id: $store.state.userModule.userInfo.id}})">个人主页</b-dropdown-item>
              <b-dropdown-item @click="$router.push({name: 'user_profile'})">设置</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
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
import { mapState, mapActions } from 'vuex'
import request from '@/utils/request'

export default {
  data () {
    return {
      // action_icon_mapper: {
      //   // 暂时不做查看赞了哪个评论
      //   1: 'chat',
      //   2: 'heart',
      //   3: 'box-arrow-up',
      // },
      // actions: [{
      //   time: 123,
      //   // 1是评论， 2是点赞， 3是关注
      //   type: 3,
      //   target_user_id: 10,
      //   target_username: "机智豪SAMA",
      // }, {
      //   time: 123,
      //   // 1是评论， 2是点赞某个评论， 3是关注
      //   type: 2,
      //   target_comment_id: 100,
      // }, {
      //   time: 234,
      //   type: 1,
      //   target_news_id: 12333,
      //   target_news_name: "你居然xxxxx",
      //   target_comment_id: 123,
      // }],
      unreadmessage_amount: 0,
      recent_message: [{
        type: 2,
        time: 123,
        from_user_id: "某个人1"
      }, {
        type: 1,
        time: 123,
        from_user_id: "某个人1"
      }, {

      }],
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
    },
    getUnreadMessage () {
      request.get("/test").then(res => {
        this.unreadmessage = res.data.unread
      })
    },
    showMessage () {
      console.log("获取数据库内容")
    }
  },
  mounted () {
    setTimeout(this.getUnreadMessage, 10)
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