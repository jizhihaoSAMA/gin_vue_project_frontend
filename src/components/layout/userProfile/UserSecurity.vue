<template>
  <div
    class=""
    id=""
  >
    <b-list-group style="background:white;">
      <b-list-group-item>
        <b-icon
          :icon="sec.phone ? 'check-circle-fill': 'x-circle-fill'"
          :variant="sec.phone ? 'success': 'danger'"
          class="mr-4"
        ></b-icon>
        {{ sec.phone ? "您的手机为："+sec.phone: "您还没有保存手机" }}
        <a
          href="/security/bindTelephone"
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
          href="/security/bindEmail"
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
        'phone': this.$store.state.userModule.userInfo.telephone,
        'email': this.$store.state.userModule.userInfo.email,
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
