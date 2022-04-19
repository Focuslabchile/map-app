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
              <span v-tippy :content="kmz.attributes.description+'<br>'+(format((kmz.attributes.file.data.attributes.size/1000).toFixed(3)))+' mb'" class="material-icons cursor-pointer">info</span>
            </span>
            <span class="icon-container">
              <span
                v-tippy
                content="Visualizar kmz"
                class="material-icons cursor-pointer"
                @click="loadKmz(apiUrl+kmz.attributes.file.data.attributes.url)"
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
import regions from '@/assets/regions.json'
import JSZipUtils from 'jszip-utils'
import JSZip from 'jszip'
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
      regions: regions,
      kmlLayers: [],
      kmzs: [],
      comunas: [],
      search: '',
      region: '',
      comuna: ''
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
    turnOffLayer(clickedLayer){
	    this.map.setPaintProperty( clickedLayer,"fill-color",  "rgba(255,255,255,0)");
    },
    loadKmz(fileURL,show){
      const self = this
      JSZipUtils.getBinaryContent(fileURL, function(err, data) {
        if(err) {
          console.log('error');
          throw err; // or handle err
        }

        JSZip.loadAsync(data,{base64: false, optimizedBinaryString:true}).then(function (zip) {
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
          console.log(response)
          var layerName=response.features[0].properties.name; 
          let d = JSON.parse(localStorage.getItem('polygons'))
          response.features[0].properties.edit = false
          response.features[0].id = uuidv4()
          d.push(response.features[0])
          localStorage.setItem('polygons', JSON.stringify(d))
          //self.$parent.init(layerName, response);

            self.kmlLayers.push(layerName);
        });
      }); 
    },
    pickComuna() {
      this.comunas = this.regions.find(region => region.region === this.region).comunas
    },
    searchKmz(val) {
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