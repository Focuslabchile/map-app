<template>
<div class="load-projects">
  <div class="load-kmz--search-box">
    <search-input name="Buscar" placeholder="Buscar" />
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
import FormControl from './FormControl.vue'
import JSZipUtils from 'jszip-utils'
import { loadAsync } from 'jszip'
import toGeoJSON from '@mapbox/togeojson'
import { v4 as uuidv4 } from 'uuid';

export default {
  components: { FormControl },
  props: {
    map: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      mediciones: [],
      search: '',
    }
  },
  computed: {
    apiUrl() {
      return this.$config.apiUrl
    }
  },
  methods: {
    format(n) {
      return new Intl.NumberFormat('es-CL').format(n)
    },
    loadProject(item) {
      const callback = () => {
        this.$toast.success('proyecto cargado')
        this.$parent.tab = 'mis-proyectos'
      }

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

      console.log(item)
      this.$parent.addMarker({
        el,
        item,
        coordinates: [item.latitud, item.longitud],
      })
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
          const keys = Object.keys(el.attributes)
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