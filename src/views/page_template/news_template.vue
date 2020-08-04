<template>
  <div v-if="idInvalided">
    页面不存在
  </div>
  <div v-else>
    This is {{$route.query.id}}
  </div>
</template>
<script>
export default {
  computed: {
    idInvalided () {
      if (this.$route.query.id == null) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
