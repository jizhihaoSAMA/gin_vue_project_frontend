<template>
  <div>
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000;width:100%;"
      role="listbox"
      indicators
      img-width="1024"
      img-height="480"
      fade
    >

      <b-carousel-slide
        v-for="(image,index) in images"
        :caption="getCaption"
        :key="index"
        :img-src="image"
        id="ttt"
        style="max-height: 400px!important;"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>
<script>
export default {
  props: ["content", "images"],
  computed: {
    getCaption () {
      return this.content.join("")
    }
  },
}
</script>
<style>
.carousel-caption {
  text-align: left;
  top: 0;
}

.carousel-caption > h3 {
  font-size: 1rem !important;
}
</style>