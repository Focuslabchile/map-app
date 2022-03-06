<template>
<div class="slider-container relative">
  <div class="slider-controls absolute flex justify-between w-full z-10 h-full">
    <span @click="slider.goTo('prev')" class="material-icons cursor-pointer flex items-center h-full">
      navigate_before
    </span>
    <span @click="slider.goTo('next')" class="material-icons cursor-pointer flex items-center h-full">
      navigate_next
    </span>
  </div>
  <div class="slider-body px-6">
    <div class="my-slider">
      <slot />
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
      controls: false,
      nav: false
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
