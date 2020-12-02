<template>
  <div
    class="d-sm-none d-md-block"
    id="translateBox"
    v-show="$store.state.showBox"
  >
    <b-card title="翻译结果">
      <b-form-textarea
        v-model="translation"
        disabled
      >
      </b-form-textarea>
    </b-card>
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
  display: none !important;
  bottom: 0%;
  right: 2%;
  position: fixed;
  max-width: 40%;
  max-height: 30%;
  width: 35%;
  z-index: 99;
}
</style>
