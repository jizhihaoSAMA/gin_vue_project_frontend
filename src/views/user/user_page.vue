<template>
  <div
    style="background:white;"
    class="pt-4"
  >
    <b-container>
      <div>
        <b-row>
          <b-col
            cols="12"
            lg="4"
            style="border-radius: 2%; border: 1px solid gray;"
            class="text-center p-4 m-1"
          >
            <div>
              <b-avatar
                :src="this.BACKEND+'/userIcon/'+$route.params.user_id+'.png'"
                size="12rem"
              >
              </b-avatar>
            </div>
            <div class="mt-3">
              <!-- ///要判断是否关注来确立样式 -->
              <h3 style="display:inline;">{{ userInfo.username }}</h3>
              <b-button :variant="userInfo.is_followed? 'primary': 'outline-primary'">{{ userInfo.is_followed ? '取消关注': '关注' }}</b-button>
            </div>
            <div class="pt-4">
              <b-row>
                <b-col>
                  <h4 class="pt-2 font-weight-bolder">动态</h4>
                  <h5
                    class="pt-3"
                    style="font-weight:100;"
                  >{{ changeVal(userInfo.action_amount) }}</h5>
                </b-col>
                <div style="float:left;width: 1px;height: 100px; background: gray;"></div>
                <b-col>
                  <h4 class="pt-2 font-weight-bolder">关注</h4>
                  <h5
                    class="pt-3"
                    style="font-weight:100;"
                  >{{ changeVal(userInfo.following_amount) }}</h5>
                </b-col>
                <div style="float:left;width: 1px;height: 100px; background: gray;"></div>
                <b-col>
                  <h4 class="pt-2 font-weight-bolder">粉丝</h4>
                  <h5
                    class="pt-3"
                    style="font-weight:100;"
                  >{{ changeVal(userInfo.follower_amount) }} </h5>
                </b-col>
              </b-row>
            </div>
            <div class="mt-4 text-left">
              <b-card
                header="个人资料"
                no-body
              >
                <b-card-body>
                  <b-row>
                    性别: {{ this.userInfo.gender }}
                  </b-row>
                  <hr>
                  <b-row>
                    个人说明: {{ this.userInfo.detail}}
                  </b-row>
                </b-card-body>
              </b-card>
            </div>
          </b-col>
          <b-col
            cols="12"
            lg="7"
          >
            <b-card no-body>
              <b-tabs card>
                <b-tab
                  title="所有动态"
                  no-body
                >
                  <b-card-body>
                    <b-list-group flush>
                      <b-list-group-item
                        v-for="(action,index) in actions"
                        :key='index'
                      >
                        <p
                          class="h4"
                          style="margin: 0;"
                        >
                          <b-icon
                            :icon="action_icon_mapper[action.type]"
                            class="mr-3 "
                          ></b-icon>
                          <span
                            v-html="convertToWord(action)"
                            class="h6"
                          ></span>
                        </p>
                      </b-list-group-item>
                      <p v-if="!actions"> 该用户还没有动态哟~ </p>
                    </b-list-group>
                  </b-card-body>
                </b-tab>
                <b-tab
                  title="关注列表"
                  lazy
                  no-body
                >
                  <b-card-body no-body>
                    <b-list-group flush>
                      <b-list-group-item
                        v-for="user in following"
                        :key='user.user_id'
                        :href="'/user/'+user.user_id"
                      >
                        <p style="margin: 0;">
                          <b-avatar :src="BACKEND+'/userIcon/'+user.user_id+'.png'"></b-avatar> {{user.username}}
                          <b-button
                            :variant="user.is_followed? 'primary' : 'outline-primary'"
                            class="h4"
                            style="float:right"
                          >{{user.is_followed? '取消关注' : '关注'}}</b-button>
                        </p>
                        <p v-if="!following"> 该用户还没有关注任何人噢~ </p>
                      </b-list-group-item>
                    </b-list-group>
                  </b-card-body>
                </b-tab>
                <b-tab
                  title="粉丝列表"
                  lazy
                  @click="print()"
                  no-body
                >
                  <b-card-body no-body>
                    <b-list-group flush>
                      <b-list-group-item
                        v-for="user in followers"
                        :key='user.user_id'
                        :href="'/user/'+user.user_id"
                      >
                        <p style="margin: 0;">
                          <b-avatar :src="BACKEND+'/userIcon/'+user.user_id+'.png'"></b-avatar> {{user.username}}
                          <b-button
                            :variant="user.is_followed? 'primary' : 'outline-primary'"
                            class="h4"
                            style="float:right"
                          >{{user.is_followed? '取消关注' : '关注'}}</b-button>
                        </p>
                        <p v-if="!followers"> 该用户还没有粉丝噢~ </p>
                      </b-list-group-item>
                    </b-list-group>
                  </b-card-body>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: {
        gender: '男',
        detail: '这个人很懒，什么都不想说。',
        username: 123,
        follower_amount: 2,
        following_amount: 3,
        action_amount: 41211,
        is_followed: true,

      },
      gender_mapper: {
        男: '他',
        女: '她',
        保密: 'TA'
      },

      actions: [{
        time: 123,
        // 1是评论， 2是点赞， 3是关注
        type: 3,
        target_user_id: 10,
        target_username: "机智豪SAMA",
      }, {
        time: 123,
        // 1是评论， 2是点赞某个评论， 3是关注
        type: 2,
        target_comment_id: 100,
      }, {
        time: 234,
        type: 1,
        target_news_id: 12333,
        target_news_name: "你居然xxxxx",
        target_comment_id: 123,
      }],
      followers: [{
        user_id: "2",
        username: "机智豪大人",
        is_followed: true,
      }, {
        user_id: "2",
        username: "机智豪大人",
        is_followed: false,
      }],
      following: [{
        user_id: "2",
        username: "机智豪大人",
        is_followed: true,
      }, {
        user_id: "2",
        username: "机智豪大人",
        is_followed: false,
      }],
    }
  },
  methods: {
    convertToWord (action) {
      return {
        1: `${this.gender_mapper[this.userInfo.gender]}在新闻${action['target_news_name']}中发布了评论`,
        2: `${this.gender_mapper[this.userInfo.gender]}赞了评论 <a href="${action['target_comment_id']}`,
        3: `${this.gender_mapper[this.userInfo.gender]}关注了用户 <a href="/user/${action['target_user_id']}"> ${action['target_username']} </a>`,
      }[action.type]
    },
    changeVal (val) {
      if (val >= 10000) {
        return parseFloat(val / 10000).toFixed(2) + ' w+'
      } else if (val >= 1000) {
        return parseFloat(val / 1000).toFixed(2) + ' k+'
      } else {
        return val
      }
    },
    print () {
      console.log(1)
    }
  },
  mounted () {
    // 如果id不存在或者res的status为400，则跳转notFound

  }
}
</script>

<style scoped>
</style>