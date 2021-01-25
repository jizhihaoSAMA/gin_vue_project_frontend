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
      <b-card id="reply_box">
        <p class="card-text">你想和大家说什么：</p>
        <form>
          <b-textarea
            rows="4"
            v-model="post_comment"
            :state="post_comment.length <= 200 && post_comment.length > 5"
            :placeholder="this.mention_user_tip || '发布和善内容哟~'"
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
          :id="'comment_' + comment.id"
        >
          <div>
            <div class="d-flex w-100 justify-content-between">

              <p>
                <b-avatar :src="getIcon(comment.user_id)" />

                {{comment.username}}
              </p>
              <small class="text-muted">{{ comment.floor }} 楼</small>

            </div>

            <p class="mb-1">
              {{ comment.comment }}
            </p>

            <b-row no-gutters>
              <b-col
                cols="5"
                lg="4"
              >
                <small class="text-muted">{{ convertedTimestamp(comment.created_at) }}</small>
              </b-col>
              <b-col cols="3">
                <span>
                  <b-icon-hand-thumbs-up
                    :variant="comment.vote_status == 1? 'primary': ''"
                    @click="upvote(comment.id, index)"
                    style="cursor: pointer;"
                  ></b-icon-hand-thumbs-up><span
                    class="text-muted"
                    style="font-size:9pt;margin-right: 15px;"
                  > {{ comment.upvote }}</span>
                  <b-icon-hand-thumbs-down
                    :variant="comment.vote_status == -1? 'primary': ''"
                    @click="downvote(comment.id, index)"
                    style="cursor: pointer;"
                  ></b-icon-hand-thumbs-down><span
                    class="text-muted"
                    style="font-size:9pt;"
                  > {{ comment.downvote }}</span>
                </span>
              </b-col>
              <b-col
                cols="3"
                offset="1"
                offset-lg="2"
              >
                <b-button
                  variant="link"
                  size="sm"
                  style="float:right; padding: 0px;"
                  @click="reply_to_user(comment.user_id, comment.username, comment.comment)"
                >回 复</b-button>
              </b-col>
            </b-row>
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
      BACKEND: "http://localhost:8081",
      post_comment: '',
      comment_list: [],
      tip: '',
      showCommentBox: false,
      mention_user_tip: ""
    }
  },
  computed: {
    convertedTimestamp () {
      return function (t) {
        var parsed_time = new Date(t)
        return parsed_time.toLocaleString()
      }
    }
  },
  props: ["news_id"],
  methods: {
    reply_to_user (user_id, username, comment) {
      this.mention_user_tip = '回复@' + username + '  ：' + comment
      document.location.hash("#reply_box")
      console.log(user_id, username)
    },
    upvote (comment_id, index) {
      var data = new FormData()
      data.append("from_user_id", this.$store.state.userModule.userInfo.id)
      data.append("target_comment_id", comment_id)
      data.append("status", this.comment_list[index].vote_status == 1 ? 0 : 1)
      request.post("post/voteOnComment", data).then(res => {
        this.showSuccessInfo(res)
        this.getComment()
      }).catch(err => {
        console.log(err.response)
      })
    },
    downvote (comment_id, index) {
      var data = new FormData()
      data.append("from_user_id", this.$store.state.userModule.userInfo.id)
      data.append("target_comment_id", comment_id)
      data.append("status", this.comment_list[index].vote_status == -1 ? 0 : -1)
      request.post("post/voteOnComment", data).then(res => {
        this.showSuccessInfo(res)
        this.getComment()
      }).catch(err => {
        console.log(err.response)
      })
    },
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
        console.log(res)
        this.comment_list = res.data.data.comments
      }).catch(err => {
        this.showError(err)
      })
    },
    getIcon (id) {
      return this.BACKEND + '/userIcon/userID_' + id + '.png'
    }
  },
  mounted () {
    this.getComment()
  }
}
</script>
