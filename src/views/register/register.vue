<template>
    <div class="register">
      <b-card title="注册">
        <b-form>
          <b-form-group>
            <b-form-input
              id="input-1"
              v-model="user.username"
              type="text"
              placeholder="输入你的名称（选填）"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
              id="input-1"
              v-model="user.telephone"
              type="number"
              required
              placeholder="输入手机号"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input
              id="input-1"
              v-model="user.password"
              type="password"
              required
              placeholder="输入你的密码"
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user:{
        username:"",
        password:"",
        telephone:"",
      }
    };
  },
}
</script>

<style lang='scss' scoped>
</style>