<template>
  <div
    class=""
    id=""
  >
    <div>
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
              v-model="comment"
              :state="comment.length <= 200 && comment.length > 5"
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
                >发送</b-button>
              </b-col>
            </b-row>
          </form>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      comment: '',
      tip: '',
      showCommentBox: false,
    }
  },
  methods: {
    changeTip () {
      if (this.comment.length <= 5) {
        this.tip = "评论字数不得少于5个"
      } else if (this.comment.length >= 200) {
        this.tip = "评论字数不得多于200"
      } else {
        this.tip = ""
      }
    }
  }
}
</script>
