<template>
  <div
    class=""
    id=""
  >
    <b-card-body class="text-center">
      <b-form-group
        label-cols="12"
        label="个人资料"
        label-size="lg"
        label-class="pt-0 text-center"
        class="mb-0"
      >
        <b-form-group
          label-cols-sm="3"
          label="ID:"
          label-align-sm="right"
          label-for="userID"
        >
          <b-form-input
            id="userID"
            :value="getUserID"
            readonly
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="用户名:"
          label-align-sm="right"
          label-for="username"
        >
          <b-form-input
            id="username"
            v-model="username"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="个人说明:"
          label-align-sm="right"
          label-for="nested-state"
        >
          <b-textarea
            id="nested-state"
            v-model="detail"
          ></b-textarea>
        </b-form-group>

        <b-form-group>
          <b-button
            class="col-2 col-md-2"
            variant="primary"
            @click="update"
          >保存</b-button>
          <b-button class="offset-4 col-2 col-md-2 offset-md-2">重置</b-button>
        </b-form-group>
      </b-form-group>
    </b-card-body>
  </div>
</template>
<script>
import request from '@/utils/request'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: this.$store.state.userModule.userInfo.username,
      detail: this.$store.state.userModule.userInfo.detail,
    }
  },
  methods: {
    ...mapActions('userModule', { userLogin: 'login' }),

    update () {
      var data = new FormData()
      data.append("updatedUsername", this.username)
      data.append("updatedDetail", this.detail)
      // 刷新页面以修改资料 
      request.post("post/updateInfo", data).then(res => {
        this.showSuccessInfo(res)
        this.userLogin(this.user).then(res => {
          // 跳转主页
          console.log(res)
        }).catch(err => { // 只要状态码不是成功，就会失败
          // 请求失败，让前端响应请求
          this.$bvToast.toast(err.response.data.msg, {
            title: '登录失败',
            variant: 'danger',
            solid: true,
          })
        })
      }).catch(err => {
        this.showError(err)
      })
    }
  },
  computed: {
    getUserID () {
      return this.$store.state.userModule.userInfo.id
    },
  }
}
</script>
