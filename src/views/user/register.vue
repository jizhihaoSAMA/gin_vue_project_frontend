<template>
  <div class="register">
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <b-card title="注册">
          <b-form>
            <b-form-group label="用户名">
              <b-form-input
                v-model="$v.user.username.$model"
                type="text"
                placeholder="输入你的名称（选填）"
                name="username"
                autocomplete="username"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="手机号">
              <b-form-input
                v-model="$v.user.telephone.$model"
                type="text"
                required
                placeholder="输入手机号"
                name="telephone"
                :state="validateState('telephone')"
              ></b-form-input>
              <!-- <b-form-text id="password-help-block" text-variant="danger" v-show="telephoneWarn">
                手机号必须是11位
              </b-form-text> -->
              <b-form-invalid-feedback :state="validateState('telephone')">
                手机号格式不正确
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="密码">
              <b-form-input
                v-model="$v.user.password.$model"
                type="password"
                required
                placeholder="输入你的密码"
                name="password"
                autocomplete="current-password"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('password')">
                密码必须大于等于6位，小于20位
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              label="验证码"
              :invalid-feedback="checkCaptcha"
            >
              <b-form-input
                class="col-7"
                style="display:inline-block;"
                required
                placeholder="输入验证码"
                v-model="$v.user.captcha.$model"
                :state="validateState('captcha')"
              ></b-form-input>
              <b-button
                variant="outline-primary"
                class="col-4 ml-4"
                style="bottom:1px;"
                @click="getCaptcha"
              >获取验证码</b-button>
            </b-form-group>
            <b-form-group>
              <b-button
                variant="outline-primary"
                block
                @click="register"
              >注册</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import CustomValidator from '@/helper/validator';
import { mapActions } from 'vuex'
import request from '@/utils/request'

export default {
  data () {
    return {
      user: {
        username: "",
        telephone: "",
        password: "",
        captcha: "",
      },
      validation: null,
    };
  },

  validations: {
    user: {
      username: {
      },
      telephone: {
        required,
        telephone: CustomValidator.telephoneValidator,
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
      captcha: {
        required,
        maxLength: maxLength(6),
      }
    }
  },
  computed: {
    checkCaptcha () {
      if (this.user.captcha.length == 0) {
        return "验证码不能为空"
      } else if (this.user.captcha.length >= 7) {
        return "验证码格式错误"
      } else if (this.validateState('telephone')) {
        return "手机号不能为空"
      } else {
        return ""
      }
    }
  },
  methods: {
    // 由于已经存在register 方法，所以需要用userRegister修改.
    ...mapActions('userModule', { userRegister: 'register' }),

    register () {
      // 先验证数据
      this.$v.user.$touch()
      if (this.$v.user.$anyError) {// 如果前端发现错误，不发送请求
        return;
      }
      // 发送请求
      this.userRegister(this.user).then(() => {
        // 跳转主页
        this.$router.replace({ name: 'profile' })
      }).catch(err => { // 只要状态码不是成功，就会失败
        // 请求失败，让前端响应请求
        this.showError(err)
      })
    },
    getCaptcha () {
      if (this.validateState('telephone')) {
        // 正确请求电话
        var data = new FormData()
        data.append('telephone', this.user.telephone)

        request.post("/post/getCaptcha?for=register", data).then(res => {
          console.log(res)
        }).catch(err => {
          this.showError(err)

        })
      } else { // 电话填写栏有问题
        alert("请检查手机号是否输入正确")
      }
    },
    validateState (name) {
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },
  }
}
</script>

<style lang='scss' scoped>
</style>