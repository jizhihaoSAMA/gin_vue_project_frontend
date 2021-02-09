<template>
  <div class="">
    <div style="font-size:18px;display:inline-block;">评论</div>
    <div style="float:right">
      <b-button
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
            @input="change_tip"
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
              cols="4"
              style="font-size: 0.8rem"
              class="ml-auto my-auto"
            >
              <div style="color:red;">{{ tip }}</div>
            </b-col>
            <b-col cols="3">
              <b-button
                class="w-100 h-100"
                variant="link"
                v-show="target_comment_id"
                @click="()=>{
                  target_comment_id = 0
                  mention_user_tip = '发布和善内容哟~'
                }"
              >取消回复</b-button>
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
                @click="send_comment"
              >发送</b-button>
            </b-col>
          </b-row>
        </form>
      </b-card>
    </b-collapse>
    <div
      class="mt-3"
      style="border-color:black;"
    >
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
                <b-avatar
                  :src="get_icon(comment.user_id)"
                  :href="'/user/'+ comment.user_id"
                />
                <b-button
                  variant="link"
                  :href="'/user/'+ comment.user_id"
                  class="text-decoration-none"
                  style="color:black;"
                >{{comment.username}}</b-button>
              </p>
              <small class="text-muted">{{ comment.floor }} 楼</small>

            </div>

            <b-card
              v-if="comment.target_comment_user_id"
              class="target_comment mb-2"
            >
              <b-avatar
                :href="'/user/'+comment.target_comment_user_id"
                :src="get_icon(comment.target_comment_user_id)"
              ></b-avatar>
              {{ comment.target_comment_username}}
              <hr>
              {{ comment.target_comment_content }}
            </b-card>
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
                  ></b-icon-hand-thumbs-up>
                  <span
                    class="text-muted"
                    style="font-size:9pt;margin-right: 15px;"
                    for
                  > {{ comment.upvote }}</span>
                  <b-icon-hand-thumbs-down
                    :variant="comment.vote_status == -1? 'primary': ''"
                    @click="downvote(comment.id, index)"
                    style="cursor: pointer;"
                  ></b-icon-hand-thumbs-down>
                  <span
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
      <paginator
        service="comment"
        :get_item_amount="get_comment_amount"
        @get_comment="get_comment($event)"
      />
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
// import Paginator from './Paginator.vue'
import qs from 'querystring'

export default {
  components: {
    Paginator: () => import("./Paginator.vue")
  },
  data () {
    return {
      post_comment: '',
      comment_list: [],
      tip: '',
      showCommentBox: false,
      mention_user_tip: "",
      target_comment_id: 0,
      current_page: 1,
      each_page_amount: 10,
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
    reply_to_user (comment_id, username, comment) {
      this.showCommentBox = true
      this.mention_user_tip = '回复@' + username + '  ：' + comment
      // 不设置延时无法跳转
      setTimeout(() => {
        document.querySelector("#reply_box").scrollIntoView({ behavior: 'smooth' })
      }, 50)
      this.target_comment_id = comment_id
    },
    upvote (comment_id, index) {
      var data = new FormData()
      data.append("from_user_id", this.$store.state.userModule.userInfo.id)
      data.append("target_comment_id", comment_id)
      data.append("status", this.comment_list[index].vote_status == 1 ? 0 : 1)
      request.post("post/voteOnComment", data).then(res => {
        this.showSuccessInfo(res)
        this.get_comment()
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
        this.get_comment()
      }).catch(err => {
        console.log(err.response)
      })
    },
    change_tip () {
      if (this.post_comment.length <= 5) {
        this.tip = "评论字数不得少于5个"
      } else if (this.post_comment.length >= 50) {
        this.tip = "评论字数不得多于50"
      } else {
        this.tip = ""
      }
    },
    send_comment () {
      if (this.post_comment && this.tip == "") {
        var data = new FormData()
        data.append("news_id", this.news_id)
        data.append("comment", this.post_comment)
        data.append("target_comment_id", this.target_comment_id)
        request.post("/post/comment", data).then(res => {
          this.showSuccessInfo(res)
          this.get_comment(1)
        }).catch(err => {
          this.showCustomError("发送失败", err.response.data.msg)
        })
      } else {
        this.showCustomError("发送失败", "请检查输入")
      }
    },
    get_comment (page) {
      request.get("/get/comments", {
        params: {
          news_id: this.$route.params.news_id,
          page: page
        }
      }).then(res => {
        console.log(res)
        this.comment_list = res.data.data.comment_info.comments
        this.current_page = res.data.data.current_page
      }).catch(err => {
        this.showError(err)
      })
    },
    get_icon (id) {
      return this.BACKEND + '/userIcon/' + id + '.png'
    },
    get_comment_amount () {
      var news_id = this.news_id
      request.post("/post/commentAmount", qs.stringify({ news_id })).then(res => {
        return res.data.data.comment_amount
      }).catch(err => {
        this.showError(err)
        return 0
      })
    }
  },
  mounted () {
    this.get_comment()
  }
}
</script>

<style scoped>
.target_comment {
  border-color: black;
}
</style>