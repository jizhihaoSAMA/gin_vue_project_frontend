<template>
  <div
    class=""
    id=""
  >
    <!-- <b-list-group>
      <b-list-group-item
        v-for="news in news_list"
        :key="news"
        @click="1"
        href="#"
      >
        {{ news.title }}
      </b-list-group-item>
    </b-list-group> -->
    <b-card
      no-body
      v-for="news in news_list"
      :key="news"
      class="my-4"
    >
      <b-list-group>
        <b-list-group-item href="#">
          {{ news.title }}
        </b-list-group-item>
      </b-list-group>
      <b-card-body>
        {{ news.text }}
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      news_list: [{
        "id": "1",
        "title": "这是新闻1-这是新闻1-这是新闻1-这是新闻1-这是新闻1-这是新闻1",
        "post_time": "2020-08-01",
        "from": "BBC",
        "text": "据本台消息，发生了新闻1",
      }, {
        "id": "2",
        "title": "这是新闻二desu",
        "post_time": "2020-09-01",
        "from": "CCTV",
        "text": "据本台消息，这是啥？"
      }
      ]
    }
  }
}
</script>
