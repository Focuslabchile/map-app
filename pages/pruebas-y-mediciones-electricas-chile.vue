<template>
  <AppSection background="primary">
    <div>

      <div class="max-w-[730px]">
        <div class="us-container mb-16">
          <h3 class="h2">
            Nuestros servicios
          </h3>
          <p>Somos profesionales con licencia SEC y nuestros equipos se encuentran calibrados por laboratorios acreditado por el instituto nacional de normalización (INN). Somos especialistas en buscar soluciones a la medida de nuestros clientes.</p>
        </div>
      </div>
      <div  class="grid grid-cols-12 md:gap-8">
        <div class="col-span-12 md:col-span-2 hidden md:block">
          <nav class="side-nav sticky top-[3rem]">
            <ul class="text-[14px]">
              <li
                v-for="(item, index) in data"
                :key="index"
                @click="current = item.attributes.name"
                :class="['mb-4', {active: current === item.attributes.name}]"
              >
                <a :href="'#'+item.attributes.name">{{item.attributes.long_name}}</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-span-12 md:col-span-10">
          <div>
            <div
              v-for="(item, index) in data"
              :key="index"
              :id="item.attributes.name"
              class="service grid grid-cols-6 mb-24 md:mb-8 px-0 py-0 md:px-4 md:py-12"
            >
              <div class="col-span-6 md:col-span-2">
                <div v-if="item.attributes.gallery.data" class="img flex items-center mb-4 md:mb-0">
                  <Slider :id="'slide-'+index">
                    <div
                      v-for="(slide, slideIndex) in item.attributes.gallery.data"
                      :key="slideIndex+'-slide'"
                      class="slider-item"
                    >
                      <img :src="slide.attributes.url" :alt="'slide '+slide.attributes.hash">
                    </div>
                  </Slider>

                </div>
              </div>
              <div class="col-span-6 md:col-span-4">
                <h3>{{item.attributes.long_name}}</h3>
                <div class="description">
                  <p>{{ item.attributes.description }}</p>
                  <ul v-if="item.attributes.specs">
                    <li class="flex items-center" v-for="(i, iindex) in item.attributes.specs" :key="iindex+'-'+index">
                      <span class="material-icons">done_outlines</span><span>{{i.text}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppSection>
</template>
<script>
import { marked } from 'marked/src/marked.js'

export default {
  data() {
    return {
      current: '',
      data: []
    }
  },
  methods: {
    marked(val) {
      return marked(val)
    },
    async getData() {
      await this.$api.get('api/services?populate=image,specs,gallery').then(res => {
        this.data = res.data.data
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>
<style lang="scss">
@import '~assets/scss/colors.scss';
.dark-mode {
  .side-nav {
    li {
      border-left: 2px solid var(--white);
    }
  }
}
.side-nav {
  li {
    border-left: 2px solid var(--black);
    padding-left: .5rem;
    &:hover, &.active {
      font-weight: bold;
    }
  }
  a {
    &:active, &:focus, &:focus-within {
      font-weight: bold;
    }
  }
}
.slider-item {
  img {
    margin: auto;
  }
}
.service {
  .description{
    white-space: pre-line;
    .material-icons {
      font-size: 1rem;
    }
  }
}
</style>