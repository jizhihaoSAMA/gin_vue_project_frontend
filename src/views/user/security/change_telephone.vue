<template>
  <div
    class=""
    id=""
    style="background:white;"
  >
    <b-container>
      <b-card
        title="通过以下两种方式修改手机号"
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
              required
              class="col-sm-9"
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>
<script>
export default {

}
</script>

<style scoped>
.card-title {
  text-align: center;
}
</style>
