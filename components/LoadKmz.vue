<template>
<div class="load-kmz">
  <div class="load-kmz--search-box">
    <form-control name="Región">
      <div class="select-wrapper">
        <select name="Región">
          <option value="1">Todas</option>
          <option value="2">Arica</option>
        </select>
      </div>
    </form-control>
    <form-control name="Comuna">
      <div class="select-wrapper">
        <select name="Comuna">
          <option value="1">Todas</option>
          <option value="2">Arica</option>
        </select>
      </div>
    </form-control>
    <search-input name="Buscar" placeholder="Buscar" />
  </div>
</div>
</template>
<script>
import FormControl from './FormControl.vue'
export default {
  components: { FormControl },
  data() {
    return {
      search: '',
    }
  },
  methods: {
    searchKmz(val) {
      console.log(val)
      this.$emit('search-kmz', this.search)
    },
  },
}
</script>