<template>
  <div id='app'>
    <navbar />
    <b-container style="background:white">
      <classification v-if='showClassification' />
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import navbar from '@/components/layout/Navbar'
import classification from '@/components/layout/Classification'

export default {
  name: 'App',
  data () {
    return {
      classificationBlackList: ['login', 'register', 'profile']
    }
  },
  computed: {
    showClassification: function () {
      if (this.classificationBlackList.indexOf(this.$route.name) == -1) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    navbar,
    classification,
  }
};
</script>

<style lang='scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: whitesmoke;
}
.row {
  margin-left: 0px;
  margin-right: 0px;
}
</style>
