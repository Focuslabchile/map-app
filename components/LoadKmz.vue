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
    <div class="kmz-list">
      <div class="kmz-list--item" v-for="(kmz, index) in kmzs" :key="index">
        <div class="flex justify-between">
          <div class="flex items-center">
            <div class="kmz-list--item--name">
              {{kmz.attributes.name}}
            </div>
            <div class="kmz-list--item--type ml-2">
              {{kmz.attributes.type}}
            </div>
          </div>
          <div class="kmz-list--icons flex items-center">
            <span class="icon-container">
              <span v-tippy :content="kmz.attributes.description+'<br>'+kmz.attributes.file.data.attributes.size+' mb'" class="material-icons cursor-pointer">info</span>
            </span>
            <span class="icon-container">
              <span v-tippy content="Visualizar kmz" class="material-icons cursor-pointer">add_circle</span>
            </span>
          </div>
        </div>
      </div>
    </div>
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
      kmzs: [],
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
    async fetchSomething() {
      const ip = await this.$api.get('api/geo-data?populate=file').then(res => {
        this.kmzs = res.data.data
      })
    }
  },
  mounted() {
    this.fetchSomething()
  }
}
</script>
<style lang="scss">
.load-kmz {
  background: white;
  flex-grow: 1;
}
.kmz-list {
  .kmz-list--item {
    padding: 0.5rem;
    &:nth-child(odd) {
      background: var(--light);
    }
    .icon-container {
      position: relative;
      .material-icons {
        z-index: 1;
        position: relative;
      }
      &::after {
        content: "";
        position: absolute;
        width: 70%;
        height: 0;
        background: white;
        border-radius: 50%;
        left: 15%;
        top: 12%;
        padding-bottom: 70%;
      }
    }
    .kmz-list--item--type {
      padding: 2px 7px;
      font-size: 0.75rem;
      background: var(--primary);
      color: white;
      border-radius: 4px;
      display: inline-block;
      height: fit-content;
    }
  }
}
</style>