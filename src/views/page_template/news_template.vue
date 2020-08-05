<template>
  <div v-if="idInvalided">
    页面不存在
  </div>
  <div v-else>
    <b-container>
      <b-row>
        <b-col
          cols="12"
          md="8"
        >
          <b-container>
            <div id="content">
              This is {{$route.query.id}}
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
            </div>
            <hr>
            <h5>评论</h5>
            <div id="comment">

            </div>
          </b-container>
        </b-col>
        <b-col
          cols="12"
          md="4"
        >
          <b-card
            header="相关新闻"
            no-body
          >
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      comments: [{
        user_id: 123,
        comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
        post_time: "2000-10-10",
      }, {
        user_id: 13,
        comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
        post_time: "2000-11-10",
      }]
    }
  },
  computed: {
    idInvalided () {
      if (this.$route.query.id == null) {
        // 或者请求id不存在
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.card-header {
  font-size: 0.8rem !important;
}
</style>