<template>
  <div
    class="text-center"
    id=""
  >
    <b-row>
      <b-col
        cols="12"
        md="9"
        class="mt-2"
      >
        <b-button
          @click="get_update(current_page - 1)"
          variant="outline-primary"
          v-if="current_page != 1"
          style="float:left"
          pill
        >&lt;</b-button>
        <span
          class="h5"
          v-show="current_page > 2"
        > ... </span>
        <b-button
          v-for="page_number in show_range"
          :key="page_number "
          @click="get_update(page_number)"
          :variant="current_page == page_number ? 'primary': 'outline-primary'"
          pill
          class="ml-1 mr-1"
        >
          {{page_number}}
        </b-button>
        <span
          class="h5"
          v-show="current_page < end_page - 1"
        > ... </span>

        <b-button
          @click="get_update(current_page + 1)"
          variant="outline-primary"
          v-if="current_page != end_page"
          style="float:right"
          pill
        >&gt;</b-button>

      </b-col>
      <b-col
        cols="12"
        md="3"
      >
        <b-input-group class="mt-2">
          <b-form-input
            class="w-25 form-control"
            v-model="jump_to_page"
            type="number"
            min="1"
            :max="end_page"
          ></b-form-input>
          <b-input-group-append>
            <b-button
              variant="primary"
              @click="() => {
                if((this.jump_to_page < 1)||(this.jump_to_page > this.end_page)){
                  this.showCustomError('操作失败', '该页码不存在')
                } else {
                  this.get_update(this.jump_to_page)
                }
                }"
            >跳转</b-button>
          </b-input-group-append>
        </b-input-group>

      </b-col>
    </b-row>

  </div>
</template>
<script>

export default {
  data () {
    return {
      current_page: 1,
      each_page_amount: 10,
      end_page: 0,
      show_range: null,
      jump_to_page: "",
    }
  },
  props: [
    "service",
    "get_item_amount"
  ],
  methods: {
    get_update (number) {
      this.current_page = number

      this.$emit(this.service, number)
      // 刷新范围
      this.show_range = this.get_show_range()
    },
    get_show_range () {
      var start = this.current_page > 1 ? this.current_page - 1 : 1
      return [...new Array(this.end_page + 1).keys()].slice(start, this.current_page + 3)
    }
  },
  mounted () {
    this.get_item_amount.then(amount => {
      console.log(amount)
      this.end_page = Math.ceil(amount / this.each_page_amount)
      this.show_range = this.get_show_range()
    }).catch(err => {
      this.showError(err)
    })

  }
}
</script>
