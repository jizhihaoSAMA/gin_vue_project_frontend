<template>
  <div
    class=""
    id="translateBox"
    v-show="$store.state.showBox"
  >
    <b-card title="翻译结果">
      <b-form-textarea
        v-model="translation"
        rows="6"
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
  bottom: 0%;
  right: 2%;
  position: fixed;
  max-width: 40%;
  width: 35%;
}
</style>
