<template>
  <div
    class=""
    id=""
  >
    <b-button
      v-for="page_number in all_page_range"
      :key="page_number "
      @click="get_update(page_number)"
      :variant="current_page == page_number ? 'primary': 'outline-primary'"
    >
      {{page_number}}
    </b-button>
  </div>
</template>
<script>

export default {
  data () {
    return {
      current_page: 1,
      all_page_range: 0,
      each_page_amount: 10,
    }
  },
  props: [
    "service",
    "get_item_amount"
  ],
  methods: {
    get_update (number) {
      this.current_page = number
      if (this.service == 'comment') {
        this.$emit("get_comment", number)
      }
    },
  },
  mounted () {
    setTimeout(() => {
      this.all_page_range = this.get_item_amount()
      console.log(2000)
      console.log(this.all_page_range)
    }, 2000)


  }
}
</script>
