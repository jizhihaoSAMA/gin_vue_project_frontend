<template>
  <div
    class=""
    id=""
  >

  </div>
</template>
<script>
export default {
  data () {
    return {
      current_page: 1,
      comment_amount: 24,
      each_page_amount: 30
    }
  },
  props: ["service"],
  mounted () {
    console.log(this.service)
  }
}
</script>
