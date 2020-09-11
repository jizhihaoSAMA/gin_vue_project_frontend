<template>
  <div>
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      img-width="1024"
      img-height="480"
    >

      <b-carousel-slide
        v-for="(image,index) in images"
        :caption="content"
        :key="index"
        :img-src="image"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>
<script>
export default {
  props: ["content", "images"]

}
</script>
