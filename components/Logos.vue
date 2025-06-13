<template>
  <div class="logos-carousel">
    <div class="logos-container" ref="logosContainer">
      <div class="logos-track" ref="logosTrack">
        <div 
          v-for="(logo, index) in duplicatedLogos" 
          :key="index" 
          class="logo-item"
        >
          <slot>
            <img :src="logo.imagen" :alt="logo.alt" />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logos',
  props: {
    logos: {
      type: Array,
      default: () => []
    },
    speed: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      animationId: null,
      currentTranslate: 0,
      logosWidth: 0
    }
  },
  computed: {
    duplicatedLogos() {
      return [...this.logos, ...this.logos, ...this.logos]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.calculateDimensions()
      this.startAnimation()
      window.addEventListener('resize', this.handleResize)
    })
  },
  beforeDestroy() {
    this.stopAnimation()
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    calculateDimensions() {
      const track = this.$refs.logosTrack
      if (track) {
        const firstSet = track.children.length / 3
        this.logosWidth = 0
        for (let i = 0; i < firstSet; i++) {
          this.logosWidth += track.children[i].offsetWidth
        }
      }
    },
    startAnimation() {
      const animate = () => {
        this.currentTranslate -= 1
        
        if (Math.abs(this.currentTranslate) >= this.logosWidth) {
          this.currentTranslate = 0
        }
        
        if (this.$refs.logosTrack) {
          this.$refs.logosTrack.style.transform = `translateX(${this.currentTranslate}px)`
        }
        
        this.animationId = requestAnimationFrame(animate)
      }
      this.animationId = requestAnimationFrame(animate)
    },
    stopAnimation() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
        this.animationId = null
      }
    },
    handleResize() {
      this.calculateDimensions()
    }
  }
}
</script>

<style scoped>
.logos-carousel {
  width: 100%;
  overflow: hidden;
  background: transparent;
}

.logos-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.logos-track {
  display: flex;
  align-items: center;
  will-change: transform;
}

.logo-item {
  flex-shrink: 0;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-item img {
  height: 60px;
  width: auto;
  max-width: 150px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.logo-item img:hover {
  filter: grayscale(0%);
  opacity: 1;
}

@media (max-width: 768px) {
  .logo-item {
    padding: 0 15px;
  }
  
  .logo-item img {
    height: 40px;
    max-width: 100px;
  }
}

@media (max-width: 480px) {
  .logo-item {
    padding: 0 10px;
  }
  
  .logo-item img {
    height: 30px;
    max-width: 80px;
  }
}
</style>