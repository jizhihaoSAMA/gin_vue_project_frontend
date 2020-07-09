<template>
  <div id="app">
    <navbar />
    <!-- <b-container> -->
    <router-view></router-view>
    <!-- </b-container> -->
  </div>
</template>

<script>
import navbar from "./views/layout/Navbar.vue";

export default {
  name: "App",
  components: {
    navbar
  }
};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   color: #2c3e50;
// }
</style>
