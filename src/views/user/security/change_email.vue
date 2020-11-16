<template>
  <div
    class=""
    id=""
    style="background:white;"
  >
    <b-container>
      <b-card
        title="通过以下两种方式修改手机号"
        class="text-center"
        v-if="$route.query.action == undefined"
      >
        <b-group-list>
          <b-group-list-item>
            <b-button
              variant="outline-primary"
              href="?action=by_telephone"
              :disabled="!$store.state.userModule.userInfo.telephone"
            >通过手机验证码</b-button>
            <b-button
              variant="outline-primary"
              :disabled="!$store.state.userModule.userInfo.email"
              class="ml-5"
              href="?action=by_email"
            >通过邮箱验证码</b-button>
          </b-group-list-item>
        </b-group-list>
      </b-card>
      <b-card
        title="通过手机验证码修改邮箱"
        v-if="$route.query.action == 'by_telephone'"
      >
        <b-form>
          <b-form-group
            label="已绑定的手机号:"
            label-for="input-telephone"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="input-telephone"
              v-model="bound_telephone"
              required
              class="col-sm-8"
            ></b-form-input>
            <b-button
              style="position:absolute;top:0%;left:68%;"
              class="col-4 col-md-3"
              variant="primary"
              @click="sendCaptcha"
            >发送验证码</b-button>
          </b-form-group>
          <b-form-group
            label="验证码:"
            label-for="input-captcha"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="input-captcha"
              v-model="telephone_captcha"
              required
              class="col-sm-8"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="修改后的手机号:"
            label-for="input-update-telephone"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="input-update-telephone"
              v-model="update_telephone"
              required
              class="col-sm-8"
            ></b-form-input>
          </b-form-group>
          <b-form-group class="text-center">
            <b-button
              variant="primary"
              @click="updateInfo"
            >确认修改</b-button>
            <b-button
              variant="outline-primary"
              class="ml-5"
              @click="$router.go(-1)"
            >返回</b-button>
          </b-form-group>
        </b-form>
      </b-card>
      <b-card
        title="通过手机验证码修改邮箱"
        v-if="$route.query.action == 'by_email'"
      >
        <b-form>
          <b-form-group
            label="已绑定的邮箱:"
            label-for="input-telephone"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="input-telephone"
              v-model="bound_telephone"
              required
              class="col-sm-8"
            ></b-form-input>
            <b-button
              style="position:absolute;top:0%;left:68%;"
              class="col-4 col-md-3"
              variant="primary"
              @click="sendCaptcha"
            >发送验证码</b-button>
          </b-form-group>
          <b-form-group
            label="验证码:"
            label-for="input-captcha"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="input-captcha"
              v-model="telephone_captcha"
              required
              class="col-sm-8"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="修改后的手机号:"
            label-for="input-update-telephone"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="input-update-telephone"
              v-model="update_telephone"
              required
              class="col-sm-8"
            ></b-form-input>
          </b-form-group>
          <b-form-group class="text-center">
            <b-button
              variant="primary"
              @click="updateInfo"
            >确认修改</b-button>
            <b-button
              variant="outline-primary"
              class="ml-5"
              @click="$router.go(-1)"
            >返回</b-button>
          </b-form-group>
        </b-form>
      </b-card>

    </b-container>
  </div>
</template>
<script>
import request from "@/utils/request"

export default {
  data () {
    return {
      bound_telephone: "",
      telephone_captcha: "",
      update_email: "",
    }
  },
  methods: {
    sendCaptcha () {
      var data = new FormData()
      data.append("userID", this.$store.state.userModule.userInfo.id)
      data.append("telephone", this.bound_telephone)
      // console.log(this.$store.state.userModule.userInfo)
      request.post("post/getCaptcha?for=security", data).then(res => {
        this.showSuccessInfo(res)
      }).catch(err => {
        this.showError(err)
      })

    },
    updateInfo () {
      if (this.bound_telephone == "" || this.telephone_captcha == "" || this.update_telephone == "") {
        this.showCustomError("输入错误", "提交信息有误，请检查输入信息")
        return
      }
      var data = new FormData()
      data.append("captcha", this.telephone_captcha)
      data.append("userID", this.$store.state.userModule.userInfo.id)
      data.append("formTelephone", this.bound_telephone)
      request.post("post/updateUserTelephone", data).then(res => {
        console.log(res)
      }).catch(err => {
        this.showError(err)
      })
    }
  }
}
</script>

<style scoped>
.card-title {
  text-align: center;
}
</style>