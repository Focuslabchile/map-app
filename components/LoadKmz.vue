<template>
<div class="load-kmz">
  <div class="load-kmz--search-box">
    <form-control name="Región">
      <div class="select-wrapper">
        <select v-model="region" @change="pickComuna" name="Región">
          <option value="1" default>Todas</option>
          <option v-for="(region, index) in regions" :key="index" :value="region.region">{{region.region}}</option>
        </select>
      </div>
    </form-control>
    <form-control name="Comuna">
      <div class="select-wrapper">
        <select v-model="comuna" name="Comuna">
          <option value="1" default>Todas</option>
          <option v-for="(comuna, index) in comunas" :key="index" :value="comuna">{{comuna}}</option>
        </select>
      </div>
    </form-control>
    <search-input name="Buscar" placeholder="Buscar" />
  </div>
</div>
</template>
<script>
import FormControl from './FormControl.vue'
import regions from '@/assets/regions.json'

export default {
  components: { FormControl },
  data() {
    return {
      regions: regions,
      comunas: [],
      search: '',
      region: '',
      comuna: ''
    }
  },
  methods: {
    pickComuna() {
      this.comunas = this.regions.find(region => region.region === this.region).comunas
    },
    searchKmz(val) {
      console.log(val)
      this.$emit('search-kmz', this.search)
    },
  },
}
</script>