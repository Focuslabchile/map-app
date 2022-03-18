<template>
  <form-control class="search-input flex">
    <input type="text" class="load-kmz--search-box--input" v-model="search" placeholder="Buscar KMZ" />
    <button class="btn load-kmz--search-box--button" @click="searchKmz">Buscar</button>
  </form-control>
</template>
<script>
export default {
  props: {
    search: {
      type: String,
      default: '',
    }
  },
  methods: {
    searchKmz(val) {
      console.log(val);
    }
  }
}
</script>
<style lang="scss" scoped>
.search-input {
  input {
    border-radius: 4px 0 0 4px;
  }
  .btn {
    border-radius: 0 4px 4px 0;
  }
}
</style>
