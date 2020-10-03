<template>
  <div>
    <b-row>
      <b-col class="my-2">
        <label>有关 {{ $route.params.news_type }} 的最新新闻</label>
      </b-col>
    </b-row>
    <b-row>
      <div
        class="col-12 col-md-8"
        id="new_news"
      >
        <b-card
          no-body
          v-for="news in news_list"
          :key="news.id"
          class="my-2"
        >
          <b-list-group>
            <b-list-group-item :href="'/news/' + news.id">
              {{ news.title }}
            </b-list-group-item>
          </b-list-group>
          <b-card-body>
            {{ news.text }}
          </b-card-body>
        </b-card>
      </div>
      <div
        class="d-none d-md-block col-sm-4"
        id="hot_news"
      >
        <b-card
          header="热榜新闻"
          no-body
        >
          <b-tabs
            content-class="mt-2"
            class="my-2"
            align="right"
            pills
          >
            <b-tab title="Day">
              <b-list-group>
                <b-list-group-item
                  v-for="news in hot_news"
                  :key="news.id"
                  :href="'/news?id=' + news.id"
                  class="noRadius"
                >
                  {{ news.title }}
                </b-list-group-item>
              </b-list-group>
            </b-tab>
            <b-tab title="Week">

            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </b-row>
  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  data () {
    return {
      news_list: [{
        "id": 1,
        "title": "这是新闻1-这是新闻1-这是新闻1-这是新闻1-这是新闻1-这是新闻1",
        "time": "2020-08-01",
        "from": "BBC",
        "text": "据本台消息，发生了新闻1",
      }, {
        "id": 2,
        "title": "这是新闻二desu",
        "time": "2020-09-01",
        "from": "CCTV",
        "text": "据本台消息，这是啥？"
      }],
      hot_news: [{
        "id": 1,
        "title": "这是新闻1-这是新闻1-这是新闻1-这是新闻1-这是新闻1-这是新闻1",
        "time": "2020-08-01",
        "from": "BBC",
        "text": "据本台消息，发生了新闻1",
      }, {
        "id": 2,
        "title": "这是新闻二desu",
        "time": "2020-09-01",
        "from": "CCTV",
        "text": "据本台消息，这是啥？"
      }],
    }
  },
  mounted () {
    var news_type = this.$route.params.news_type
    request.get("/get/news", {
      params: {
        "news_type": news_type
      }
    }).then(res => {
      this.news_list = res.data.news
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
}
</script>
<style scoped>
.noRadius {
  border-radius: 0 !important;
}
</style>
