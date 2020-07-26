<template>
  <div id="">
    <h3>你好 {{ userInfo.username }}</h3>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {

  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  })
}
</script>