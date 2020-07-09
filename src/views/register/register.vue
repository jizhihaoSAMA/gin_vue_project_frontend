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
                type="number"
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
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import CustomValidator from '@/helper/validator.js'

export default {
  data() {
    return {
      user:{
        username:"",
        telephone:"",
        password:"",
      },
      validation: null,
    };
  },

  validations: {
    user:{
      username:{
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
    register(){
      // 先验证数据
      this.$v.user.$touch()
      if (this.$v.user.$anyError){// 如果前端发现错误，不发送请求
        return; 
      }
      const api = "http://localhost:8081/api/auth/register";
      this.axios.post(api,{ ...this.user }).then(res => {
        console.log(res)
      }).catch(err => {
        // 请求失败，让前端响应请求
        console.error(err.response.data); 
      });


    },
    validateState(name){
      const {$dirty ,$error} = this.$v.user[name];
      return $dirty ? ! $error : null;
    },
  }
}
</script>

<style lang='scss' scoped>
</style>