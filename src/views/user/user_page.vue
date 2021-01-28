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
                :src="this.BACKEND+'/userIcon/userID_'+$route.params.user_id+'.png'"
                size="12rem"
              >
              </b-avatar>
            </div>
            <div class="mt-3">
              <!-- ///要判断是否关注来确立样式 -->
              <h3 style="display:inline;">{{ userInfo.username }}</h3>
              <b-button :variant="userInfo.is_followed? 'primary': 'outline-primary'">{{ userInfo.is_followed ? '取消关注': '关注' }}</b-button>
            </div>
            <div class="mt-4">
              <b-row>
                <b-col>
                  <h4 class="mt-2">动态</h4>
                  <h5
                    class="mt-3"
                    style="font-weight:100;"
                  >{{ changeVal(userInfo.actions) }}</h5>
                </b-col>
                <div style="float:left;width: 1px;height: 100px; background: gray;"></div>
                <b-col>
                  <h4 class="mt-2">关注</h4>
                  <h5
                    class="mt-3"
                    style="font-weight:100;"
                  >{{ changeVal(userInfo.following) }}</h5>
                </b-col>
                <div style="float:left;width: 1px;height: 100px; background: gray;"></div>
                <b-col>
                  <h4 class="mt-2">粉丝</h4>
                  <h5
                    class="mt-3"
                    style="font-weight:100;"
                  >{{ changeVal(userInfo.followers) }} </h5>
                </b-col>
              </b-row>
            </div>
            <div class="mt-4">
              <b-card>
                <b-row>
                  性别: {{ this.userInfo.gender }}
                </b-row>
              </b-card>
            </div>
          </b-col>
          <b-col
            cols="12"
            lg="7"
            style="background:yellow;"
          >
            RIGHT
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
        username: 123,
        followers: 2,
        following: 3,
        actions: 41211,
        is_followed: true,
      }
    }
  },
  methods: {
    changeVal (val) {
      if (val >= 10000) {
        return parseFloat(val / 10000).toFixed(2) + ' w+'
      } else if (val >= 1000) {
        return parseFloat(val / 1000).toFixed(2) + ' k+'
      } else {
        return val
      }
    }
  },
  mounted () {

  }
}
</script>