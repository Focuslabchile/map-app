<template>
  <AppSection background="secondary">
    <Workshop :workshop="workshop"/>
  </AppSection>
</template>
<script>
import Workshop from '../../components/Workshop.vue'

export default {
  async asyncData({ params }) {
    const id = params.slug
    return { id }
  },
  data() {
    return {
      workshop: {}
    }
  },
  mounted() {
    this.fetchWorkshop()
  },
  methods: {
    async fetchWorkshop() {
    const filters = [
      'filters[$or][0][id][$eq]=1',
      'populate=*'
    ].join('&');

    await this.$api.get(`/api/workshops?${filters}`).then(res => {
      const data = res.data.data[0].attributes
      this.workshop = {
        ...data,
        fecha_inicio: new Date(data.fecha_inicio).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
        fecha_termino: new Date(data.fecha_termino).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
        foto_taller: data.foto_taller.data.attributes.url,
        temario: data.temario?.data?.attributes.url,
        foto_instructor: data.foto_instructor?.data?.attributes.url
      }
    });
  }
  }
}
</script>