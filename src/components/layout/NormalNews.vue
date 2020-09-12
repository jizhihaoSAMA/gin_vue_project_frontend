<template>
  <div
    class=""
    id=""
  >
    <div
      v-for="(line,index) in zip_content_image"
      :key="index"
      v-html="line"
    >
    </div>
  </div>
</template>
<script>
export default {
  props: ["content", "images"],
  computed: {
    zip_content_image () {
      var r = []
      for (let i = 0, j = 0; i < this.content.length; i++) {
        if (this.content[i] == "&index&") {
          r[i] = `<img src="${this.images[j]}" style="max-width:100%"/>`
          j++
        } else {
          r[i] = `<p>${this.content[i]}</p>`
        }
      }
      return r
    }
  }
}
</script>