<template>
  <div class="login">
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <b-card title="登录">
          <b-form>
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
            <b-form-group>
              <b-button
                variant="outline-primary"
                block
                @click="login"
              >登录</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import CustomValidator from '@/helper/validator.js'
import storageService from '@/service/storageService';
import userService from '@/service/userService'


export default {
  data() {
    return {
      user:{
        telephone:"",
        password:"",
      },
    };
  },

  validations: {
    user:{
      username:{
        required,
      },
      telephone:{
        required,
        telephone: CustomValidator.telephoneValidator,
      },
      password:{
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
    }
  },
  methods:{
    validateState(name){
      const {$dirty ,$error} = this.$v.user[name];
      return $dirty ? ! $error : null;
    },
    login(){
      // this.$v.user.$touch()
      if (this.$v.user.$anyError){// 如果前端发现错误，不发送请求
        return; 
      }
      // 发送请求
      userService.login(this.user).then(res => {
        // 保存token
        storageService.set(storageService.USER_TOKEN, res.data.data.token);
        userService.info().then(res=>{
          // 以json格式保存用户信息
          storageService.set(storageService.USER_INFO, JSON.stringify(res.data.data.user));
          // 跳转主页
        this.$router.replace({name:'profile'});
        })
      }).catch(err => { // 只要状态码不是成功，就会失败
        // 请求失败，让前端响应请求
        this.$bvToast.toast(err.response.data.msg, {
          title: '登录失败',
          variant: 'danger',
          solid: true,
        })
      });
    }
  }
}
</script>

<style lang='scss' scoped>
</style>