<template>
  <div
    class=""
    id=""
  >
    <b-container>
      <b-row>
        <div
          class="col-5 offset-1 text-center"
          style="border-right: 1px solid grey;"
        >
          当前头像
        </div>
        <div class="col-5 text-center">
          头像预览
        </div>
      </b-row>
      <b-row>
        <div
          class="col-5 offset-1 text-center"
          style="border-right: 1px solid grey;"
        >
          <b-avatar
            src='http://localhost:7000/img/haosamaglasses.dbe5ca10.png'
            size="10rem"
          ></b-avatar>
        </div>
        <div class="col-5 text-center">
          <b-avatar size="10rem"></b-avatar>
        </div>
      </b-row>
      <b-row>
        <b-form-file
          v-model="user_upload_icon"
          :state="Boolean(user_upload_icon)"
          placeholder="选择一个文件或拖动这里"
          drop-placeholder="拖动到这里"
          class="mt-3"
          accept=".jpg, .png"
          title="123"
        ></b-form-file>
      </b-row>
      <b-row>
        <b-button
          :disabled="user_upload_icon == null"
          variant="primary"
          class="col-2 mt-4"
          style="margin: auto;"
          @click="updateIcon"
        >更新头像</b-button>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import request from "@/utils/request"
export default {
  data () {
    return {
      user_upload_icon: null
    }
  },
  methods: {
    updateIcon () {
      var data = new FormData()
      data.append("updateIcon", this.user_upload_icon)
      console.log(this.user_upload_icon)
      request.post("post/userIcon", data).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
