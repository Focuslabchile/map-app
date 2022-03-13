<template>
<div>
  <div class="slider-container relative">
    <div class="slider-body px-6">
      <div class="my-slider">
        <slot />
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { tns } from "../node_modules/tiny-slider/src/tiny-slider.js"
import "../node_modules/tiny-slider/dist/tiny-slider.css"
export default {
  data() {
    return {
      slider: null
    }
  },
  mounted() {
    this.slider = tns({
      container: '.my-slider',
      items: 1,
      slideBy: 'page',
      autoplay: true,
      mouseDrag: true,
    });
  }
}
</script>
<style lang="scss">
.slider-container {
  button {
    display: none;
  }
}
</style>
