<template>
<div class="load-kmz">
  <Modal :open.sync="loadingModal" :close="false">
    <span v-if="loadingModal" class="text-black flex flex-col items-center">
      <Hourglass />
      Cargando kmz ...
    </span>
  </Modal>
  <div class="load-kmz--search-box">
    <form-control name="Región">
      <div class="select-wrapper">
        <select v-model="region" @change="pickComuna" name="Región">
          <option value="0" default>Todas</option>
          <option v-for="(region, index) in regions" :key="index" :value="region">{{region}}</option>
        </select>
      </div>
    </form-control>
    <form-control v-if="false" :class="{disabled: !comunas}" name="Comuna">
      <div class="select-wrapper">
        <select v-model="comuna" name="Comuna">
          <option value="1" default>Todas</option>
          <option v-for="(comuna, index) in comunas" :key="index" :value="comuna">{{comuna}}</option>
        </select>
      </div>
    </form-control>
    <form-control :class="{disabled: !filters}" name="Filtro">
      <div class="select-wrapper">
        <select v-model="filter" @change="filter=filter" name="Filtro">
          <option value="-1" default disabled>Seleccione un filtro</option>
          <option value="0" default>Todas</option>
          <option v-for="(filter, index) in filters" :key="index" :value="filter">{{filter}}</option>
        </select>
      </div>
    </form-control>
    <search-input v-if="false" name="Buscar" placeholder="Buscar" />
    <div class="kmz-list">
      <div :class="['kmz-list--item', (!kmz.attributes.disable || !kmz.attributes.disable.disable) || 'disabled']" v-for="(kmz, index) in filteredKmzs" :key="index">
        <div class="flex justify-between">
          <div class="flex items-center">
            <div class="kmz-list--item--name">
              {{kmz.attributes.name}} {{(kmz.attributes.disable && kmz.attributes.disable.disable) ? '(deshabilitado)' : ''}}
            </div>
            <div class="kmz-list--item--type ml-2">
              {{kmz.attributes.type}}
            </div>
          </div>
          <div class="kmz-list--icons flex items-center">
            <span class="icon-container">
              <span v-tippy :content="kmz.attributes.description+'<br>'+(format((kmz.attributes.file.data.attributes.size/1000).toFixed(3)))+' mb'" class="material-icons cursor-pointer">info</span>
            </span>
            <span class="icon-container">
              <span
                v-tippy
                content="Visualizar kmz"
                class="material-icons cursor-pointer"
                @click="loadKmz(kmz.attributes.file.data.attributes.url)"
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
// import regions from '@/assets/regions.json'
import JSZipUtils from 'jszip-utils'
import { loadAsync } from 'jszip'
import toGeoJSON from '@mapbox/togeojson'
import { v4 as uuidv4 } from 'uuid';
import MedicionesMixin from '../utils/MedicionesMixin'

export default {
  mixins: [MedicionesMixin],
  components: { FormControl },
  props: {
    map: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      geodata: {},
      mediciones: [],
      regions: [],
      loadingModal: false,
      kmlLayers: [],
      kmzs: [],
      comunas: [],
      filters: [],
      search: '',
      region: '0',
      comuna: '',
      filter: '-1',
    }
  },
  computed: {
    filteredKmzs() {
      let kmzs = [...new Set([...this.kmzs])]
      if (this.region !== '0') {
        kmzs = kmzs.filter(el => {
          return el.region.includes(this.region)
        })
      }
      if (this.filter !== '0') {
        kmzs = kmzs.filter(el => {
          return el.category.includes(this.filter)
        })
      }
      return kmzs
    },
    apiUrl() {
      return this.$config.apiUrl
    }
  },
  methods: {
    format(n) {
      return new Intl.NumberFormat('es-CL').format(n)
    },
    turnOffLayer(clickedLayer){
	    this.map.setPaintProperty( clickedLayer,"fill-color",  "rgba(255,255,255,0)");
    },
    loadKmz(fileURL,show){
      this.loadingModal = true
      setTimeout(() => {
        this.loadingModal = false
      }, 10000)
      //this.$toast.waiting('Cargando kmz ...')
      const self = this
      JSZipUtils.getBinaryContent(fileURL, function(err, data) {
        if(err) {
          console.log('error');
          throw err; // or handle err
        }

        loadAsync(data,{base64: false, optimizedBinaryString:true}).then(function (zip) {
          return zip
        }).then(function (zip) {
          var props = Object.getOwnPropertyNames(zip["files"]);
          var name =props[0];
          var kmlFile=zip.file(name).async("string"); // a promise of "Hello World\n"
          return kmlFile;          
        }).then(function(text){
          var parser = new DOMParser();
          var textXML = parser.parseFromString(text, "text/xml"); //important to use "text/xml"
          var response = toGeoJSON.kml(textXML);
          var layerName=response.features[0].properties.name; 
          let d = JSON.parse(localStorage.getItem('polygons'))
          if(!d) d = []
          const types = []
          response.features.forEach((el, index) => {
            response.features[index].properties.edit = false
            response.features[index].id = uuidv4()
            //if array has key
            const type = el['geometry']['type']
            if(!types[type]){
              types[type] = 0
            }
            types[type]++
            d.push(response.features[index])
          })
          //localStorage.setItem('polygons', JSON.stringify(d))
          const callback = () => {
            self.loadingModal = false
            //self.$toast.close()
            self.$toast.success('kmz cargado')
            self.$parent.tab = 'mis-zonas'
          }
          self.$parent.init(layerName, d, callback);

          self.kmlLayers.push(layerName);
        });
      }); 
    },
    pickComuna() {
      this.comunas = this.regions.find(region => region.region === this.region)?.comunas
    },
    searchKmz(val) {
      this.$emit('search-kmz', this.search)
    },
    async fetchSomething() {
      const geodata = sessionStorage.getItem('geodata')
      if(geodata !== null) {
        const { kmzs, regions, filters } = JSON.parse(geodata)
        this.kmzs = kmzs
        this.regions = regions
        this.filters = filters
        return
      }
      await this.$api.get('api/geo-data?populate=file,category,region,disable').then(res => {
        this.kmzs = res.data.data.map(el => {
          return {
            ...el,
            region: el.attributes.region.map(reg => reg.region),
            category: [...el.attributes.category.map(reg => reg.category_filter)]
          }
        })

        this.regions = this.kmzs.reduce((carry, el) => {
          return [...(new Set([...carry, ...el.region]))]
        }, [])

        this.filters = this.kmzs.reduce((carry, el) => {
          return [...(new Set([...carry, ...el.category]))]
        }, [])
        const data = {
          kmzs: this.kmzs,
          regions: this.regions,
          filters: this.filters
        }
        sessionStorage.setItem('geodata', JSON.stringify(data))
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