<template>
  <div v-if="items.length" class="infinite-carousel testimonials-mode">
    <div class="carousel-container" ref="carouselContainer">
      <div class="carousel-track" ref="carouselTrack">
        <div 
          v-for="(item, index) in duplicatedItems" 
          :key="index" 
          class="carousel-item"
          :class="itemClass"
        >
          <slot :item="item" :index="index">
            
            <!-- Default slot content for testimonials -->
            <figure class="testimonial-card">
              <blockquote class="testimonial-quote">{{ item.quote }}</blockquote>
              <figcaption class="testimonial-author">{{ item.author }}
                <br>
                <i><small>{{ item.course }}</small></i>
              </figcaption>
            </figure>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Testimonials',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    speed: {
      type: Number,
      default: 50
    },
    itemClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      animationId: null,
      currentTranslate: 0,
      itemsWidth: 0
    }
  },
  computed: {
    duplicatedItems() {
      const sourceItems = this.items
      return [...sourceItems, ...sourceItems, ...sourceItems]
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
      const track = this.$refs.carouselTrack
      if (track) {
        const firstSet = track.children.length / 3
        this.itemsWidth = 0
        for (let i = 0; i < firstSet; i++) {
          this.itemsWidth += track.children[i].offsetWidth
        }
      }
    },
    startAnimation() {
      const animate = () => {
        this.currentTranslate -= this.speed / 10
        
        if (Math.abs(this.currentTranslate) >= this.itemsWidth) {
          this.currentTranslate = 0
        }
        
        if (this.$refs.carouselTrack) {
          this.$refs.carouselTrack.style.transform = `translateX(${this.currentTranslate}px)`
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
.infinite-carousel {
  width: 100%;
  overflow: hidden;
  background: transparent;
}

.carousel-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.carousel-track {
  display: flex;
  align-items: center;
  will-change: transform;
}

.carousel-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Logos mode styles */
.infinite-carousel:not(.testimonials-mode) .carousel-item {
  padding: 0 20px;
}

.infinite-carousel:not(.testimonials-mode) .carousel-item img {
  height: 60px;
  width: auto;
  max-width: 150px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.infinite-carousel:not(.testimonials-mode) .carousel-item img:hover {
  filter: grayscale(0%);
  opacity: 1;
}

/* Testimonials mode styles */
.testimonials-mode .carousel-item {
  padding: 0 16px;
}

.testimonial-card {
  background: #000;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 320px;
  max-width: 350px;
  height: auto;
  min-height: 200px;
  margin: 0;
}

.testimonial-quote {
  color: #e5e7eb;
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 16px;
  font-style: italic;
}

.testimonial-author {
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: auto;
}

/* Responsive styles */
@media (max-width: 768px) {
  .infinite-carousel:not(.testimonials-mode) .carousel-item {
    padding: 0 15px;
  }
  
  .infinite-carousel:not(.testimonials-mode) .carousel-item img {
    height: 40px;
    max-width: 100px;
  }

  .testimonials-mode .carousel-item {
    padding: 0 12px;
  }

  .testimonial-card {
    min-width: 280px;
    max-width: 300px;
    padding: 24px;
  }

  .testimonial-quote {
    font-size: 1.125rem;
  }

  .testimonial-author {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .infinite-carousel:not(.testimonials-mode) .carousel-item {
    padding: 0 10px;
  }
  
  .infinite-carousel:not(.testimonials-mode) .carousel-item img {
    height: 30px;
    max-width: 80px;
  }

  .testimonials-mode .carousel-item {
    padding: 0 8px;
  }

  .testimonial-card {
    min-width: 250px;
    max-width: 280px;
    padding: 20px;
  }

  .testimonial-quote {
    font-size: 1rem;
  }

  .testimonial-author {
    font-size: 0.875rem;
  }
}
</style>