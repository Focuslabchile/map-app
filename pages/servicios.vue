<template>
  <AppSection background="primary">
    <div class="grid grid-cols-6 gap-16">

      <div class="col-span-6 md:col-span-2">
        <div class="us-container relative md:sticky md:top-[20vh] top-0">
          <h3 class="h2">
            Nuestros servicios
          </h3>
          <p>Somos profesionales con licencia SEC y nuestros equipos se encuentran calibrados por laboratorios acreditado por el instituto nacional de normalización (INN). Somos especialistas en buscar soluciones a la medida de nuestros clientes.</p>
        </div>
      </div>
      <div class="col-span-6 md:col-span-4">
        <div>
          <div v-for="(item, index) in data" :key="index" class="font-bold service mb-16">
            <h3>{{item.attributes.long_name}}</h3>
            <p class="description" v-html="marked(item.attributes.description)"></p>
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
      data: []
    }
  },
  methods: {
    marked(val) {
      return marked(val)
    },
    async getData() {
      await this.$api.get('api/services?populate=image').then(res => {
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
.service {
  .description{
    white-space: pre-line;
    ul {
      li {
        margin-left: 15px;
        list-style-type: circle;
      }
    }
  }
}
</style>