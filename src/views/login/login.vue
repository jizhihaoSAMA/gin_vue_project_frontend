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
  }
}
</script>

<style lang='scss' scoped>
</style>