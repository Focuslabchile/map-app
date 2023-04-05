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
import { polygon } from '@turf/helpers';

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
      const makePoint = (item) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            item.latitud,
            item.longitud,
            0
          ]
        },
        properties: {
          name: item.nombre_proyecto ? item.nombre_proyecto : item.direccion ? item.direccion : 'proyecto sin nombre',
          type: 'loaded-project',
          table: item.data.records,
          styleUrl: "#msn_placemark_circle610",
          styleHash: "45c67b74",
          styleMapHash: {
            normal: "#sn_placemark_circle2100",
            highlight: "#sh_placemark_circle_highlight13"
          },
          edit: false
        },
        "id": uuidv4()
      })
      const data = JSON.parse(localStorage.getItem('polygons'))
      const callback = () => {
        this.$toast.success('proyecto cargado')
        this.$parent.tab = 'mis-proyectos'
      }
      const project = makePoint(item)
      // addMarker(item){
      //   new mapboxgl.Marker(item.el)
      //     .setLngLat(item.coordinates)
      //     .addTo(this.mapbox.map)
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(https://infomap.cl/logo2.png)`;
      el.style.width = '30px';
      el.style.height = '37px';
      el.stylebackgroundRepeat = 'no-repeat';
      el.style.backgroundSize = '100%';
      
      el.addEventListener('click', () => {
        console.log(project);
        window.alert(project);
      });

      console.log(project, data)
      this.$parent.addMarker({
        el,
        coordinates: [item.latitud, item.longitud],
      })
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