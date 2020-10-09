<template>
  <div
    class=""
    id="classification"
  >
    <b-navbar>
      <b-navbar-brand class="d-none d-md-block mx-auto">
        <img
          src="@/assets/haosamaglasses.png"
          style="border-radius:100%; width:40px;"
        />
        哈哈新闻
      </b-navbar-brand>
      <b-nav
        pills
        class="mx-auto"
      >
        <b-navbar-nav>
          <b-nav-item
            :active="$route.params.news_type == 'war'"
            @click="$router.push({path:'/news/type/war'})"
          >军事</b-nav-item>
          <b-nav-item
            :active="$route.params.news_type == 'war'"
            @click="$router.push({path:'/news/type/war'})"
          >军事</b-nav-item>
          <b-nav-item
            :active="$route.params.news_type == 'war'"
            @click="$router.push({path:'/news/type/war'})"
          >军事</b-nav-item>
          <b-nav-item
            :active="$route.params.news_type == 'tech'"
            @click="$router.push({path:'/news/type/tech'})"
          >科技</b-nav-item>
          <b-nav-item
            :active="$route.params.news_type == 'tech'"
            @click="$router.push({path:'/news/type/tech'})"
          >科技</b-nav-item>
          <b-nav-item
            :active="$route.params.news_type == 'tech'"
            @click="$router.push({path:'/news/type/tech'})"
          >科技</b-nav-item>
        </b-navbar-nav>
      </b-nav>
    </b-navbar>
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
#classification {
  background: #f5f5f5;
}
</style>