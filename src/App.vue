<template>
  <div id='app'>
    <navbar />
    <classification v-if='showClassification' />
    <b-container style="background:white">
      <router-view :key="key"></router-view>
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
    },
    key: function () {
      return this.$route.name !== undefined ? this.$route.name + new Date().getTime() : this.$route + new Date().getTime()
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
