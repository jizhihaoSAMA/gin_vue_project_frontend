<template>
  <div
    class=""
    id=""
  >
    <b-card-body class="text-center">
      <b-form-group
        label-cols="12"
        label="个人资料"
        label-size="lg"
        label-class="pt-0 text-center"
        class="mb-0"
      >
        <b-form-group
          label-cols-sm="3"
          label="ID:"
          label-align-sm="right"
          label-for="userID"
        >
          <b-form-input
            id="userID"
            :value="getUserID"
            readonly
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="用户名:"
          label-align-sm="right"
          label-for="username"
        >
          <b-form-input
            id="username"
            :value="getUsername"
            v-model="username"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="个人说明:"
          label-align-sm="right"
          label-for="nested-state"
        >
          <b-textarea
            id="nested-state"
            :value="getUserDetail"
            v-model="detail"
          ></b-textarea>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="性别:"
          label-align-sm="right"
          class="left-align"
          style="text-align:left;"
          v-model="$store.state.userModule.userInfo.gender"
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
            @click="update"
          >保存</b-button>
          <b-button class="offset-4 col-2 col-md-2 offset-md-2">重置</b-button>
        </b-form-group>
      </b-form-group>
    </b-card-body>
  </div>
</template>
<script>
import request from '@utils/request'

export default {
  data () {
    return {
      username: this.$store.state.userModule.userInfo.username,
      detail: this.$store.state.userModule.userInfo.detail,
    }
  },
  methods: {
    update () {
      request.get("post")
    }
  },
  computed: {
    getUserID () {
      return this.$store.state.userModule.userInfo.id
    },
  }
}
</script>
