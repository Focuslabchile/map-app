<template>
<article :class="['map', {fullscreen:fullscreen}]">
  <div id="map"></div>
  <div class="map-controls">
    <span @click="restart()" class="material-icons block control">
      {{fullscreen ? 'fullscreen_exit' : 'fullscreen'}}
    </span>
    <span v-if="fullscreen" @click="menu = !menu" class="mt-1 control block material-icons">{{!menu ? 'menu' : 'menu_open'}}</span>
  </div>
  <div class="map-filters">
    <InputRadio
      @update="switchStyle"
      group-name="map_type"
      value="Mapa"
      :options="['Mapa', 'Satelite']"
    />
  </div>
  <div :class="['map-info', {open:menu}]">
    <div class="map-info-title p-3">
      Mis zonas
    </div>
    <div class="map-info-body flex justify-between flex-col">
      <div class="info-items">
        <div
          :class="['info-item p-3', {active:active === polygon.id}]"
          v-for="(polygon, index) in polygons"
          :key="index"
        >
          <div class="flex justify-between items-center">

            <div>
              <div>
                {{polygon.properties.name}}
              </div>
              <div>
                {{ polygon.properties.calc }}: {{ polygon.properties.value }} {{ polygon.properties.unit }}
              </div>
            </div>
            <div class="icons">
              <span @click="center(polygon)" class="material-icons cursor-pointer">my_location</span>
              <span @click="polygon.properties.edit = !polygon.properties.edit" class="material-icons cursor-pointer">edit</span>
            </div>
          </div>
          <div v-if="polygon.properties.edit" class="edit mt-2">
            <div>id: {{ polygon.id }}</div>
            <InputText @update="updateLocalStorage" autocomplete="off" class="mb-2" label="Nombre" name="name" :model.sync="polygon.properties.name" />
            <InputTextarea @update="updateLocalStorage" class="mb-2" label="Descripción" name="description" :model.sync="polygon.properties.description" />
          </div>
        </div>
      </div>
      <div class="controls flex justify-between">
        <div @click="$refs.fileElem.click()" class="disabled:opacity-50 cursor-pointer flex items-center">
          <form>
            <input type="file" ref="fileElem" style="display:none" @change="handleUpload">
          </form>
          cargar zonas
          <span class="material-icons">file_upload</span>
        </div>
        <div @click="download" class="cursor-pointer flex items-center">
          descargar zonas
          <span class="material-icons">file_download</span>
        </div>
      </div>
    </div>
  </div>
</article>
</template>
<script>
import mapboxgl from 'mapbox-gl'
import MapboxDraw from "@mapbox/mapbox-gl-draw"
import * as turf from '@turf/turf'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import 'mapbox-gl/dist/mapbox-gl.css'
export default {
  data () {
    return {
      active: '',
      menu: true,
      polygons: [],
      fullscreen: false,
      mapbox: {
        zoom: 3,
        center: [-73.17561116302086, -39.27770932403337],
        map: null,
        draw: null,
        mode: 'light',
        init(options) {
          mapboxgl.accessToken = 'pk.eyJ1Ijoic2ViYWtjIiwiYSI6ImNremx0MTZ1MDUwN20yeHByanY2aHdldGMifQ.RJbd85g3ESIAiFjmeJNUIg'
          this.map = new mapboxgl.Map({
            container: 'map',
            style: `mapbox://styles/mapbox/${this.mode}-v10`,
            center: this.center,
            zoom: this.zoom,
            attributionControl: false
          })
        },
        addControls() {
          this.map.addControl(new mapboxgl.NavigationControl())
          this.map.addControl(new mapboxgl.GeolocateControl())
          this.map.addControl(new mapboxgl.AttributionControl({
              compact: false,
              customAttribution: 'Desarrollado por Sebastian Vega'
          }))
          this.map.addControl(new mapboxgl.ScaleControl())
          //this.map.addControl(new mapboxgl.FullscreenControl())
        }
      }
    }
  },
  methods: {
    handleUpload() {
      const reader = new FileReader();
      function b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      }
      reader.onload = (file) => {
        const json = b64DecodeUnicode(file.target.result.substring(29));
        const result = JSON.parse(json);
        this.polygons = [ ...this.polygons, ...result.features ]
        const geojson = {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: this.polygons
          }
        }
        this.mapbox.draw.add(geojson.data)
        localStorage.setItem('polygons', JSON.stringify(this.polygons))
      };
      reader.readAsDataURL(this.$refs.fileElem.files[0]);
    },
    download() {
      const geojson = {
        type: 'FeatureCollection',
        features: this.polygons
      }

      var data = "text/json;charset=iso-8859-1," + encodeURIComponent(JSON.stringify(geojson, null, 2));
      const link = document.createElement('a')
      link.setAttribute('href', 'data:' + data)
      link.setAttribute('download', 'mis_zonas.json')
      //document.querySelector('body').appendChild(link);
      link.click()
      link.remove()
      // 
    },
    switchStyle(val) {
      if(val === 'Mapa') {
        this.mapbox.map.setStyle(`mapbox://styles/mapbox/${this.mapbox.mode}-v10`)
      } else {
        this.mapbox.map.setStyle('mapbox://styles/mapbox/satellite-v9')
      }
    },
    calcArea(geometry) {
      const polygon = turf.polygon(geometry.coordinates)
      const area = turf.area(polygon)

      return {
        name: '',
        description: '',
        edit: false,
        calc: 'area',
        unit: 'mt²',
        value: Math.round(area * 100) / 100
      }
    },
    calcDistance(geometry) {
      const line = turf.lineString(geometry.coordinates)
      const length = turf.length(line)

      return {
        name: '',
        description: '',
        edit: false,
        calc: 'distancia',
        unit: 'km',
        value: Math.round(length * 100) / 100
      }
    },
    init() {
      this.mapbox.init()
      this.mapbox.addControls()
      const map = this.mapbox.map
      
      const self = this

      this.mapbox.draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
          line_string: true,
          //point: true,
          // combine_features: true
        },
        // Set mapbox-gl-draw to draw by default.
        // The user does not have to click the polygon control button first.
        defaultMode: 'simple_select'
      });
      map.addControl(this.mapbox.draw);

      map.on('draw.create', mapCreateDelete);
      map.on('draw.delete', mapCreateDelete);
      map.on('draw.selectionchange', mapSelectionChange);
      map.on('draw.update', mapUpdate);

      map.once('load', e => {
        map.on('zoom', mapUpdateZoom)
        map.on('move', mapUpdateCenter)
        self.loadLocalPolygons()
        if(localStorage.getItem('center')) {
          setTimeout(() => {
            const to = {
              center: JSON.parse(localStorage.getItem('center')),
              zoom: localStorage.getItem('zoom')
            }
            map.flyTo(to);
          }, 1000)
        }
      });

      function mapUpdateCenter() {
        self.mapbox.center = map.getCenter()
        localStorage.setItem('center', JSON.stringify(self.mapbox.center))
      }
      function mapUpdateZoom(e) {
        self.mapbox.zoom = e.target.getZoom()
        localStorage.setItem('zoom', self.mapbox.zoom)
      }
      function mapUpdate(e) {
        if(!e.features[0]) {
          return
        }
        const calc = getCalc(e.features[0].geometry);
        const feature = { ...e.features[0] }
        feature.properties = calc

        self.polygons = self.polygons.map(el => {
          if(el.id === e.features[0].id) {
            el = e.features[0]
            el.properties = calc
          }
          return el
        })
        localStorage.setItem('polygons', JSON.stringify(self.polygons))
      }
      function mapSelectionChange(e) {
        if(!e.features[0]) {
          console.log('No features selected')
          return
        }
        self.active = e.features[0].id
        const calc = getCalc(e.features[0].geometry);
      }

      function getCalc(geometry) {
        let calc = {}
        console.log(geometry)
        if(geometry.type === 'Polygon') {
          calc = self.calcArea(geometry)
          calc.type = 'poligono'
        } else if (geometry.type === 'LineString') {
          calc = self.calcDistance(geometry)
          calc.type = 'linea'
        } else if (geometry.type === 'Point') {
          const point = {
            
          }
          if(!map.getSource('points')) {
          } else {
            map.getSource('points').setData(point);
          }
          calc = {
            unit: 'no aplica',
            type: 'Punto',
            value: ''
          }
        }
        return calc
      }

      function mapCreateDelete(e) {
        const data = self.mapbox.draw.getAll();
        if (e.type === 'draw.delete'){
          self.polygons = self.polygons.filter(polygon => {
            return polygon.id !== e.features[0].id
          })
          localStorage.setItem('polygons', JSON.stringify(self.polygons))
          return
        }
        if (data.features.length > 0) {
          const lastFeature = data.features.pop()
          const geometry = lastFeature.geometry
          let calc = getCalc(geometry)
          self.polygons.push({
            ...e.features[0],
            properties: calc
          })
          localStorage.setItem('polygons', JSON.stringify(self.polygons))
        } else {
          if (e.type !== 'draw.delete') alert('Click the map to draw a polygon.');
        }
      }
    },
    loadLocalPolygons() {
      let features = JSON.parse(localStorage.getItem('polygons'))
      this.polygons = Array.isArray(features) ? features : []
      features = this.polygons
      const geojson = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        }
      }
      this.mapbox.draw.add(geojson.data)
      return
      /* add layers
      const geojson = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features
        }
      }
      this.mapbox.map.addSource('national-park', geojson);
      this.mapbox.map.addLayer({
        id: 'park-boundary',
        type: 'fill',
        source: 'national-park',
        paint: {
          'fill-color': '#888888',
          'fill-opacity': 0.4
        },
        filter: ['==', '$type', 'Polygon']
      });
      
      this.mapbox.map.addLayer({
        id: 'park-volcanoes',
        type: 'circle',
        source: 'national-park',
        paint: {
          'circle-radius': 6,
          'circle-color': '#B42222'
        },
        filter: ['==', '$type', 'Point']
      });
      */
    },
    restart() {
      this.fullscreen = !this.fullscreen
      this.$nextTick(() => {
        this.mapbox.map.resize();
      })
    },
    updateLocalStorage() {
      const polygons = this.polygons
      localStorage.setItem('polygons', JSON.stringify(polygons.map(el => {
        return {...el, edit: false}
      })))
    },
    center(polygon) {
      this.active = polygon.id
      var bbox = turf.bbox(polygon)
      
      const corners = {
        southwestern: [
          bbox[0],
          bbox[1]
        ],
        northeastern: [
          bbox[2],
          bbox[3]
        ]
      }

      this.mapbox.map.fitBounds([corners.southwestern, corners.northeastern], {padding: 20})
      this.mapbox.draw.changeMode('simple_select', { featureIds: [polygon.id] })

    }
  },
  mounted() {
    this.mapbox.init()
    this.init()
  }
}
</script>
<style lang="scss">
@import '~assets/scss/colors.scss';
.map {
  position: relative;
  width: 100%;
  height: var(--height);
  --height: calc(100vh - 120px);
  --space: 10px;
  --top: var(--space);
  --left: var(--space);
  --info: 300px;
  .map-filters {
    z-index: 1;
    position: absolute;
    left: 50px;
    top: var(--top);
  }
  &.fullscreen {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    #map {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    .map-info {
      top: 70px;
      max-width: var(--info);
      position: absolute;
      height: calc(100vh - 150px);
      left: var(--left);
      display: none;
      &.open {
        display: flex;
      }
    }
  }
  #map {
    position: relative;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }
  .map-controls {
    position: absolute;
    top: var(--top);
    left: var(--left);
    display: flex;
    flex-direction: column;
    .control {
      background-color: white;
      cursor: pointer;
    }
  }
  .map-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    .map-info-title {
      @extend .main;
    }
    .map-info-body {
      background-color: white;
      flex-grow: 1;
      overflow: auto;
      .info-item {
        &.active {
          background-color: var(--light);
        }
      }
    }
  }
  @media screen and (min-width: 768px) {
    #map {
      position: absolute;
      width: calc(100% - var(--info));
    }
    .map-info {
      position: absolute;
      right: 0;
      width: var(--info);
      height: var(--height);
      .map-info-item {
        padding: var(--space);
      }
    }
  }
}

</style>