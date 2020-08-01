<template>
  <div
    class=""
    id=""
  >
    <b-nav
      align="center"
      pills
    >
      <b-navbar-brand class="sm-hide hide">
        <img
          src="@/assets/haosamaglasses.png"
          style="border-radius:100%; width:40px;"
        />
        哈哈新闻
      </b-navbar-brand>
      <b-nav-item
        :active="$route.params.news_type == 'war'"
        @click="$router.push({path:'/news/war'})"
      >军事</b-nav-item>
      <b-nav-item
        :active="$route.params.news_type == 'war'"
        @click="$router.push({path:'/news/war'})"
      >军事</b-nav-item>
      <b-nav-item
        :active="$route.params.news_type == 'war'"
        @click="$router.push({path:'/news/war'})"
      >军事</b-nav-item>
      <b-nav-item
        :active="$route.params.news_type == 'tech'"
        @click="$router.push({path:'/news/tech'})"
      >科技</b-nav-item>
      <b-nav-item
        :active="$route.params.news_type == 'tech'"
        @click="$router.push({path:'/news/tech'})"
      >科技</b-nav-item>
      <b-nav-item
        :active="$route.params.news_type == 'tech'"
        @click="$router.push({path:'/news/tech'})"
      >科技</b-nav-item>
    </b-nav>
  </div>
</template>
<script>
export default {
}
</script>

<style scoped>
.class_item {
  text-align: center;
}
</style>