<template>
  <div
    class=""
    id=""
    @mouseup="getSelected"
  >
    <div
      v-for="(line,index) in zip_content_image"
      :key="index"
      v-html="line"
    >
    </div>
    <translationBox :translation="translation" />
  </div>
</template>
<script>
import request from "@/utils/request"
import qs from "querystring"
import translationBox from "@/components/layout/TranslateBox"

export default {
  data () {
    return {
      translation: '',
    }
  },
  methods: {
    getSelected () {
      // 发送 选中信息
      var select_obj = window.getSelection()
      var selected_text = select_obj.toString()
      // var postion = select_obj.anchorOffset.valueOf()
      console.log(select_obj.getRangeAt(0).getBoundingClientRect().bottom)
      if (selected_text != "") {
        request.post('/post/translate', qs.stringify({ selected_text })).then(res => {
          console.log(res)
          this.$store.state.showBox = true
          this.translation = res.data.Result
        }).catch(err => {
          console.log(err)
        })
      }

    }
  },
  components: {
    translationBox,
  },
  props: ["content", "images"],
  computed: {
    zip_content_image () {
      var r = []
      for (let i = 0, j = 0; i < this.content.length; i++) {
        if (this.content[i] == "&index&") {
          r[i] = `<p><img src="${this.images[j]}" style="max-width:100%"/></p>`
          j++
        } else {
          r[i] = `<p>${this.content[i]}</p>`
        }
      }
      return r
    },
    postion () {
      var r = window.getSelection();
      // var relative = document.body.parentNode.getBoundingClientRect();

      return [r.bottom]
    }
  }
}
</script>

<style scoped>
</style>