<template>
  <div
    class=""
    id="commentBox"
  >
    <div style="font-size:18px;display:inline-block;">评论</div>
    <div style="float:right">
      <b-button
        aria-controls="commentbox"
        size="sm"
        variant="outline-secondary"
        @click="showCommentBox = !showCommentBox"
        :pressed="showCommentBox"
      >发表评论{{ showCommentBox? "▴":"▾" }}</b-button>
    </div>
    <b-collapse
      id="commentbox"
      v-model="showCommentBox"
      class="mt-2"
    >
      <b-card>
        <p class="card-text">你想和大家说什么：</p>
        <form>
          <b-textarea
            rows="4"
            v-model="post_comment"
            :state="post_comment.length <= 200 && post_comment.length > 5"
            placeholder="发布和善内容"
            @input="changeTip"
          ></b-textarea>
          <b-row>
            <b-col
              cols="3"
              class="my-auto"
              style="padding: 5px;"
            >
              <b-icon-emoji-smile />
            </b-col>
            <b-col
              cols="5"
              style="font-size: 0.8rem"
              class="ml-auto my-auto"
            >
              <div style="color:red;">{{ tip }}</div>
            </b-col>
            <b-col
              cols="2"
              style="padding:0"
              class="my-2 ml-auto"
            >
              <b-button
                block
                pill
                variant="primary"
                @click="sendComment"
              >发送</b-button>
            </b-col>
          </b-row>
        </form>
      </b-card>
    </b-collapse>
    <div class="mt-3">
      <b-list-group>
        <b-list-group-item
          class="flex-column align-items-start"
          v-for="(comment,index) in comment_list"
          :key="index"
        >
          <div>
            <div class="d-flex w-100 justify-content-between">

              <p>
                <b-avatar></b-avatar> {{comment.username}}
              </p>
              <small class="text-muted">{{ comment.floor }} 楼</small>

            </div>

            <p class="mb-1">
              {{ comment.comment }}
            </p>

            <div>
              <small class="text-muted">{{ convertedTimestamp(comment.created_at) }}</small>
              <!-- <small
                style="float:right"
                class="text-muted"
              >引用回复者</small> -->
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  data () {
    return {
      post_comment: '',
      comment_list: [],
      tip: '',
      showCommentBox: false,
    }
  },
  computed: {
    convertedTimestamp () {
      return function (t) {
        var parsed_time = new Date(t)
        // var stringTime = "2014-07-10 10:21:12";
        // var timestamp2 = parsed_time.parse(new Date(stringTime));
        return parsed_time.toLocaleString()
      }
    }
  },
  props: ["news_id"],
  methods: {
    changeTip () {
      if (this.post_comment.length <= 5) {
        this.tip = "评论字数不得少于5个"
      } else if (this.post_comment.length >= 200) {
        this.tip = "评论字数不得多于200"
      } else {
        this.tip = ""
      }
    },
    sendComment () {
      if (this.post_comment && this.tip == "") {
        var data = new FormData()
        data.append("news_id", this.news_id)
        data.append("comment", this.post_comment)

        request.post("/post/comment", data).then(res => {
          this.showSuccessInfo(res)
          this.getComment()
        }).catch(err => {
          alert(err.response.data.msg)
        })
      } else {
        this.showCustomError("发送失败", "请检查输入")
      }
    },
    getComment () {
      request.get("/get/comments", {
        params: {
          news_id: this.$route.params.news_id,
        }
      }).then(res => {
        this.comment_list = res.data.data
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getComment()
  }
}
</script>
