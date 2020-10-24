<template>
  <div id="">
    <b-card bg-variant="light">
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
        >
          <b-form-radio-group
            class="pt-2"
            :options="['男', '女', '保密']"
          ></b-form-radio-group>
        </b-form-group>
        <b-form-group class=" align-items-center">
          <b-button>保存</b-button>
          <b-button>重置</b-button>
        </b-form-group>
      </b-form-group>
    </b-card>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {

  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  })
}
</script>