<template>
  <div
    class=""
    id="translateBox"
    v-show="$store.state.userModule.showBox"
  >
    {{ translation }}
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: ['translation'],
}
</script>

<style scoped>
#translateBox {
  bottom: 0%;
  right: 0%;
  position: fixed;
  background: red;
}
</style>
