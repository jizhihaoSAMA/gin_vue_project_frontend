<template>
  <div
    class=""
    id=""
  >
    <!-- <b-card-body class="text-center"> -->
    <!-- <b-form-group
            label-cols="12"
            label="账户安全"
            label-size="lg"
            label-class="pt-0 text-center"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="修改手机号"
              label-align-sm="right"
              label-for="userID"
            >
              <b-form-input
                id="userID"
                readonly
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="用户名:"
              label-align-sm="right"
              label-for="username"
            >
              <b-form-input id="username"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="手机号:"
              label-align-sm="right"
              label-for="nested-state"
            >
              <b-form-input
                id="nested-state"
                readonly
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="性别:"
              label-align-sm="right"
              class="left-align"
              style="text-align:left;"
            >
              <b-form-radio-group
                class="pt-2"
                :options="['男', '女', '保密']"
              ></b-form-radio-group>
            </b-form-group>
            <b-form-group>
              <b-button
                class="col-2 col-md-2"
                variant="primary"
              >保存</b-button>
              <b-button class="offset-4 col-2 col-md-2 offset-md-2">重置</b-button>
            </b-form-group>
          </b-form-group> -->
    <!-- <div></div> -->
    <!-- </b-card-body> -->

    <b-list-group style="background:white;">
      <b-list-group-item>
        <b-icon
          :icon="sec.phone ? 'check-circle-fill': 'x-circle-fill'"
          :variant="sec.phone ? 'success': 'danger'"
          class="mr-4"
        ></b-icon>
        {{ sec.phone ? "您的手机为："+sec.phone: "您还没有保存手机" }}
        <a
          href="/security/change_telephone"
          style="float:right;"
        >修改手机号</a>
      </b-list-group-item>
      <b-list-group-item>
        <b-icon
          :icon="sec.email ? 'check-circle-fill': 'x-circle-fill'"
          :variant="sec.email ? 'success': 'danger'"
          class="mr-4"
        ></b-icon>
        {{ sec.email ? "您的邮箱为："+sec.email: "您还没有绑定邮件" }}
        <a
          href="/security/change_email"
          style="float:right;"
        >修改邮箱</a>
      </b-list-group-item>
    </b-list-group>
    <!-- x-circle and check-circle -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      sec: {
        'phone': '123******',
        'email': null,
      }
    }
  }
}
</script>

<style>
th {
  display: none;
}
</style>
