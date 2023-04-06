<template>
<div class="load-projects">
  <div class="load-kmz--search-box">
    <search-input v-if="false" name="Buscar" placeholder="Buscar" />
    <div class="filters flex flex-1 mb-4">
      <InputRadio
        class="w-full"
        @update="(val) => filterSclumberger = val"
        group-name="filter_type_schlumberger"
        :allow-empty="true"
        :value="filterSclumberger"
        :options="['Schlumberger']"
      />
      <InputRadio
        class="w-full"
        @update="(val) => filterWenner = val"
        group-name="filter_type_wenner"
        :allow-empty="true"
        :value="filterWenner"
        :options="['Wenner']"
      />
    </div>
    <div class="kmz-list">
      <div :class="['kmz-list--item', (!medicion.disabled) || 'disabled']" v-for="(medicion, index) in mediciones" :key="index">
        <div class="flex justify-between">
          <div class="flex items-center">
            <div class="kmz-list--item--name">
              {{medicion.nombre_proyecto ? medicion.nombre_proyecto : medicion.direccion ? medicion.direccion : 'proyecto sin nombre' }} {{medicion.disable ? '(deshabilitado)' : ''}}
            </div>
            <div v-if="medicion.data && medicion.data.tipo" class="kmz-list--item--type ml-2">
              {{medicion.data.tipo}}
            </div>
          </div>
          <div class="kmz-list--icons flex items-center">
            <span class="icon-container">
              <span v-tippy :content="`${medicion.direccion ? `dirección: ${medicion.direccion}<br>`:''}lat: ${medicion.latitud}<br>lng: ${medicion.longitud}`" class="material-icons cursor-pointer">info</span>
            </span>
            <span class="icon-container">
              <span
                v-tippy
                content="Visualizar kmz"
                class="material-icons cursor-pointer"
                @click="loadProject(medicion)"
              >add_circle</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { filter } from 'jszip'

export default {
  props: {
    map: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chileCoordinates: {
        center: [-71.5, -33.5],
        zoom: 3,
      },
      filterSclumberger: '',
      filterWenner: '',
      mediciones: [],
      search: '',
    }
  },
  computed: {
    apiUrl() {
      return this.$config.apiUrl
    }
  },
  watch: {
    filterSclumberger(val) {
      this.filter(val)
    },
    filterWenner(val) {
      this.filter(val)
    },
  },
  methods: {
    filter(val) {
      if(val.includes('delete:')) {
        const type = val.split(':')[1]
        this.$parent.removeMarkers(this.$parent.markers[type])
        return
      }
      this.mediciones
        .filter(medicion => medicion.data.tipo === val)
        .forEach(medicion => {
          this.loadProject(medicion, false)
        })
      this.$parent.mapbox.map.flyTo(this.chileCoordinates);
    },
    format(n) {
      return new Intl.NumberFormat('es-CL').format(n)
    },
    loadProject(item) {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(https://infomap.cl/logo2.png)`;
      el.style.width = '30px';
      el.style.height = '37px';
      el.stylebackgroundRepeat = 'no-repeat';
      el.style.backgroundSize = '100%';
      
      el.addEventListener('click', () => {
        this.$parent.projectInfoModal = true
      });
      const marker = {
        el,
        item,
        coordinates: [item.latitud, item.longitud],
      }
      this.$parent.addMarker({item: marker, type: item.data.tipo})
    },
    async fetchSomething() {
      const mediciones = sessionStorage.getItem('mediciones')
      if(mediciones !== null) {
        this.mediciones = JSON.parse(mediciones)
      }
      const fields = 'fields=latitud,longitud,clima,temperatura,instrumento,fecha,fecha_calibracion,nombre_proyecto,direccion,data'
      const limit = 'pagination[limit]=10000'
      const filters = `${fields}&${limit}`
      await this.$api.get(`/api/logarithmic-charts?${filters}`).then(res => {
        this.mediciones = res.data.data.map(el => {
          return {
            ...el.attributes
          }
        })
        sessionStorage.setItem('mediciones', JSON.stringify(mediciones))
        return
      })
    }
  },
  mounted() {
    this.fetchSomething()
  }
}
</script>
<style lang="scss" scoped>
.load-kmz {
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
        color: black;
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