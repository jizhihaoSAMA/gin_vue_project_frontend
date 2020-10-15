<template>
  <div>
    <b-container>
      <b-row>
        <b-col
          cols="12"
          md="8"
        >
          <b-container>
            <h5
              style="text-align:center"
              class="mt-3 mb-4"
            >{{ this.news_obj.title }}</h5>
            <div
              style="font-size:0.5rem;"
              class="d-flex align-items-center"
            >
              <div>来源：<a :href="news_obj.url">{{ news_obj.from }}</a></div>
              <div>时间：{{ news_obj.time }}</div>
              <div>浏览量：{{ news_obj.views }} 次</div>
            </div>
            <div v-if="news_obj.layout=='normal' || news_obj.layout == 'dy'">
              <normalNews
                :content="news_obj.content"
                :images="news_obj.images"
              />
            </div>
            <div v-if="news_obj.layout=='photoview' ">
              <photoviewsNews
                :content="news_obj.content"
                :images="news_obj.images"
              />
            </div>

            <hr>
            <commentbox :news_id="$route.params.news_id">
            </commentbox>
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
import commentbox from "@/components/layout/Commentbox"
import request from '@/utils/request'
import normalNews from '@/components/layout/NormalNews'
import photoviewsNews from '@/components/layout/PhotoviewNews'

export default {
  data () {
    return {
      news_obj: {},
      toggleText: "发表评论▾",
      comments: [{
        user_id: 123,
        comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
        post_time: "2000-10-10",
      }, {
        user_id: 13,
        comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.",
        post_time: "2000-11-10",
      }],
      comment_list: [],
    }
  },
  // methods: {
  //   notFound () {
  //     this.$router.replace({ name: "notFound" })
  //   }
  // },
  components: {
    commentbox,
    normalNews,
    photoviewsNews,
  },
  mounted () {
    request.get("/get/news", {
      params: {
        id: this.$route.params.news_id,
      }
    }).then(res => {
      this.news_obj = res.data.data
      console.log(res)
    }).catch(err => {
      if (err.response.status == 404) {
        this.$router.replace({ name: "notFound" })
      }
    })
  }
}
</script>