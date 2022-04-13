<template>
<div>
  <div v-if="this.id" class="slider-container relative">
    <div class="slider-body px-6">
      <div :class="id">
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
  props: {
    id: {
      type: String,
      default: "my-slider"
    }
  },
  data() {
    return {
      slider: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.slider = tns({
        container: '.'+this.id,
        items: 1,
        slideBy: 'page',
        autoplay: true,
        mouseDrag: true,
      })
    }, 10)
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
