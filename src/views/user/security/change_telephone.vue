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
            >通过手机验证码</b-button>
            <b-button
              variant="outline-primary"
              :disabled="1"
              class="ml-5"
              href="?action=by_email"
            >通过邮箱验证码</b-button>
          </b-group-list-item>
        </b-group-list>
      </b-card>
      <b-card
        title="通过手机验证码修改手机号"
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
            >发送验证码</b-button>
          </b-form-group>
          <b-form-group
            label="验证码:"
            label-for="input-telephone"
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
          <b-form-group class="text-center">
            <b-button variant="primary">确认修改</b-button>
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
export default {
  data () {
    return {
      bound_telephone: null,
      telephone_captcha: null,
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.card-title {
  text-align: center;
}
</style>
