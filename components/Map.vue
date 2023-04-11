<template>
<section>
  <slot name="description" />
  <article :class="['map', {fullscreen:fullscreen}]">
    <Modal v-if="markersInfo[markerId]" :open.sync="projectInfoModal" :title="`Estudio de resistividad del suelo (${markersInfo[markerId].data ? markersInfo[markerId].data.tipo : ''})`">
      <div class="flex flex-wrap">
        <div class="map-table vertical-table">
          <table style="max-width: 40vw;" class="mr-4">
            <tr v-if="false"><th class="text-left">DIRECCION </th><td class="whitespace-break-spaces">{{ markersInfo[markerId].direccion }}</td></tr>
            <tr><th class="text-left">PAIS </th><td class="whitespace-break-spaces">{{ markersInfo[markerId].pais }}</td></tr>
            <tr><th class="text-left">REGION </th><td class="whitespace-break-spaces">{{ markersInfo[markerId].region }}</td></tr>
            <tr><th class="text-left">FECHA MEDICION</th><td>{{ markersInfo[markerId].fecha }}</td></tr>
            <tr><th class="text-left">CLIMA</th><td>{{ markersInfo[markerId].clima }}</td></tr>
            <tr><th class="text-left">TEMPERATURA</th><td>{{ markersInfo[markerId].temperatura }}</td></tr>
            <tr><th class="text-left">INSTRUMENTO</th><td>{{ markersInfo[markerId].instrumento }}</td></tr>
            <tr><th class="text-left">FECHA CALIBRACION</th><td>{{ markersInfo[markerId].fecha_calibracion }}</td></tr>
          </table>
        </div>
        <div class="map-table">
          <table v-if="markersInfo[markerId].data" class="properties-table-horizontal text-center">
            <tr>
              <th>Nº Lecturas</th>
              <th v-if="markersInfo[markerId].data.tipo === 'Schlumberger'">DISTANCIA AB/2</th>
              <th v-if="markersInfo[markerId].data.tipo === 'Schlumberger'">a</th>
              <th v-else>A</th>
              <th v-if="markersInfo[markerId].data.tipo === 'Schlumberger'">d</th>
              <th>R Medidas</th>
              <th>Ro Calculados</th>
            </tr>
            <tr v-for="item in markersInfo[markerId].data.records">
              <td>{{ item.nLectura }}</td>
              <td v-if="markersInfo[markerId].data.tipo === 'Schlumberger'">{{ item.distanciaAb2 }}</td>
              <td>{{ item.a }}</td>
              <td v-if="markersInfo[markerId].data.tipo === 'Schlumberger'">{{ item.d }}</td>
              <td>{{ item.rMedidas }}</td>
              <td>{{ item.roCalculados.toFixed(2) }}</td>
            </tr>
          </table>
        </div>
      </div>
      <template slot="modalFooter">
        <FormControl class="mb-0">
          <button class="btn" @click="projectInfoModal = false">
            <slot name="modal-footer-btn">
              Cerrar
            </slot>
          </button>
        </FormControl>
      </template>
    </Modal>
    <Modal :open.sync="clearLayers" title="Se eliminaran las capas agregadas">
      Este paso no es reversible. ¿Está seguro?
      <template slot="modalFooter">
        <FormControl class="mb-0">
          <button class="btn w-10" @click="clearLayers = false">
            <slot name="modal-footer-btn">
              No
            </slot>
          </button>
          <button class="btn main w-10" @click="init('clear', {});$toast.success('Las capas se eliminaron correctamente');clearLayers = false">
            <slot name="modal-footer-btn">
              Si 
            </slot>
          </button>
        </FormControl>
      </template>
    </Modal>
    <div id="map"></div>
    <span v-if="fullscreen" @click="menu = !menu" class="mt-1 control block material-icons side-control cursor-pointer">{{!menu ? 'menu' : 'menu_open'}}</span>
    <div class="map-controls">
      <span @click="restart()" class="material-icons block control">
        {{fullscreen ? 'fullscreen_exit' : 'fullscreen'}}
      </span>
      <span @click="showProperties = !showProperties" class="material-icons block control mt-2">info</span>
      <div class="properties-table colored absolute">
        <table v-show="showProperties">
          <tr
            v-for="(item, index) in Object.entries(properties)"
            :key="index+'-table-item'"
          >
            <template v-if="showItem(item)">
              <th class="text-left">{{item[0]}}</th>
              <td><span v-html="tableContent(item[1])"></span></td>
            </template>
          </tr>
        </table>
      </div>
    </div>
    <div class="map-filters">
      <InputRadio
        @update="switchStyle"
        group-name="map_type"
        :value="mapType"
        :options="['Mapa', 'Satelite']"
      />
    </div>
    <div :class="['map-info', {open:menu}]">
      <div class="map-info-title p-3 flex justify-between">
        Herramientas
        <div
         @click="clearLayers = true"
         v-tippy
         content="Limpiar capas"
         class="cursor-pointer material-icons"
        >layers_clear</div>
      </div>
      <div class="map-info-body">
        <div class="map-info-tabs sticky top-0 secondary">
          <div @click="tab = 'mis-zonas'" :class="['map-info-tabs--item', {active: tab === 'mis-zonas'}]">Mis zonas</div>
          <div @click="tab = 'kmz'" :class="['map-info-tabs--item', {active: tab === 'kmz'}]">KMZ</div>
          <div v-if="showProyectos" @click="tab = 'mis-proyectos'" :class="['map-info-tabs--item', {active: tab === 'mis-proyectos'}]">Proyectos</div>
          <div v-if="description" @click="tab = 'description'" :class="['map-info-tabs--item', {active: tab === 'description'}]">Descripcion</div>
        </div>
        <div v-show="tab === 'description'" class="pt-3 map-feature-description" v-html="description"></div>
        <div v-show="tab === 'mis-zonas'" class="map-info-body flex justify-between flex-col pt-3">
          <div id="info-items-container" class="info-items">
            <div
              :id="polygon.id"
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
          <div class="controls flex justify-between p-3">
            <div @click="$refs.fileElem.click()" class="disabled:opacity-50 cursor-pointer flex items-center">
              <form>
                <input type="file" ref="fileElem" style="display:none" @change="handleUpload">
              </form>
              <span content="Cargar zonas" v-tippy class="material-icons">upload_file</span>
            </div>
            <div content="Descargar zonas" v-tippy @click="download" class="cursor-pointer flex items-center">
              <span class="material-icons">save</span>
            </div>
          </div>
        </div>
        <load-kmz :map="mapbox.map" class="p-3" v-show="tab === 'kmz'" />
        <load-projects class="p-3" v-show="tab === 'mis-proyectos'" />
      </div>
    </div>
  </article>
</section>
</template>
<script>
import mapboxgl from 'mapbox-gl'
import MapboxDraw from "@mapbox/mapbox-gl-draw"
import * as turf from '@turf/turf'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import 'mapbox-gl/dist/mapbox-gl.css'

export default {
  data () {
    const MAPBOX_API_URL = this.$config.mapboxApiUrl
    mapbox://styles/sebakc/cl0d7xql7000y14qnuj9i507f
    return {
      markers: {},
      markerId: '',
      markersInfo: {},
      projectInfoModal: false,
      markerInfo: {},
      showProyectos: false,
      showProperties: true,
      clearLayers: false,
      tab: 'mis-zonas',
      mapType: 'Satelite',
      active: '',
      description: '',
      properties: {},
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
          mapboxgl.accessToken = MAPBOX_API_URL
          this.map = new mapboxgl.Map({
            container: 'map',
            style: `mapbox://styles/sebakc/cl0d7xql7000y14qnuj9i507f`,
            center: this.center,
            zoom: this.zoom,
            attributionControl: false,
            ...options
          })
        },
        addControls() {
          this.map.addControl(new mapboxgl.NavigationControl())
          this.map.addControl(new mapboxgl.GeolocateControl())
          this.map.addControl(new mapboxgl.AttributionControl({
              compact: true,
              customAttribution: 'Desarrollado por Sebastian Vega'
          }))
          this.map.addControl(new mapboxgl.ScaleControl())
          //this.map.addControl(new mapboxgl.FullscreenControl())
        }
      }
    }
  },
  methods: {
    tableContent(item) {
      return item && item.includes('http') ? `<a href="${item}" class="text-blue-500 underline" target="_blank">${item}</a>` : item
    },
    showItem(item) {
      const hidenKeys = [
        "name",
        "styleUrl",
        "styleHash",
        "styleMapHash",
        "stroke",
        "stroke-opacity",
        "stroke-width",
        "edit"
      ]
      return !hidenKeys.includes(item[0])
    },
    handleUpload() {
      const reader = new FileReader();
      reader.onload = (file) => {
        const json = Buffer.from(file.target.result.substring(29), 'base64').toString('utf8');
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
      this.mapType = val
      if(val === 'Mapa') {
        this.mapbox.map.setStyle(`mapbox://styles/mapbox/${this.mapbox.mode}-v10`)
      } else {
        this.mapbox.map.setStyle('mapbox://styles/sebakc/cl0d7xql7000y14qnuj9i507f')
      }
    },
    getStyle(val) {
      return val === 'Mapa' ? `mapbox://styles/mapbox/${this.mapbox.mode}-v10` : 'mapbox://styles/sebakc/cl0d7xql7000y14qnuj9i507f'
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
    removeMarkers(markers) {
      markers.forEach(marker => marker.remove())
    },
    addMarker({item, type, flyTo = true, id}){
      const marker = new mapboxgl.Marker(item.el)
        .setLngLat(item.coordinates)
        .addTo(this.mapbox.map)
      this.markers[type] = this.markers[type] || []
      this.markers[type].push(marker)
      this.markersInfo[id] = item.item
      this.markerInfo = item.item
      if (!flyTo) return
      const to = {
        center: item.coordinates,
        zoom: 15
      }
      this.mapbox.map.flyTo(to);
    },
    init(layerid = null, addkmz =null, callback = null) {
      this.mapbox.init({
        style: this.getStyle()
      })
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
        self.loadLocalPolygons(layerid, addkmz, callback)
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
        const container = document.querySelector('.map-info-body')
        const child = document.getElementById(e.features[0].id)
        //flag data soruce
        container.scroll({top: child.offsetTop - 96 , behavior: 'smooth'})
        self.active = e.features[0].id
        self.properties = e.features[0].properties
        const calc = getCalc(e.features[0].geometry);
      }

      function getCalc(geometry) {
        let calc = {}
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
    loadLocalPolygons(layerid, addkmz, callback = null) {
      let features = addkmz
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

      if(layerid && addkmz) {
        //addLayer(response,layerid){
        this.mapbox.map.addSource(layerid, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: addkmz
          }
        });
        this.mapbox.map.addLayer({
          "id": layerid,
          "type": "fill",
          "source":layerid,
          "paint": { "fill-color":  [ "string", ["get", "fill"]]}
        }, 'aeroway-taxiway');
        if(callback) {
          callback()
        }
      }

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
      const container = document.querySelector('.map-info-body')
      const child = document.getElementById(this.active)
      container.scroll({top: child.offsetTop - 96 , behavior: 'smooth'})
      this.properties = polygon.properties

      this.description = polygon.properties.description
      this.tab = 'mis-zonas'
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
    document.addEventListener('keypress', (e) => {
      let pattern = sessionStorage.getItem('showProjects')
      pattern = pattern ? pattern : ''
      pattern += e.key
      sessionStorage.setItem('showProjects', pattern)
      if(pattern.includes('123123')) {
        this.showProyectos = true
      }
    })
    localStorage.getItem('darkMode') === 'true' ? this.mapbox.mode = 'dark' : this.mapbox.mode = 'light'
    this.mapbox.init({
        style: this.getStyle()
      })
    this.init()
    document.addEventListener('dark-mode', (e) => {
      this.mapbox.mode = e.detail ? 'dark' : 'light'
      // if(this.mapType !== 'Mapa') return
      this.mapbox.init()
      this.init()
    })
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/colors.scss';
.whitespace-break-spaces {
  white-space: break-spaces !important;
}
.map-table {
  th, td {
    padding: 0.2rem;
    min-width: 30px;
  }
  tr {
    &:not(:nth-child(1)) {
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
}
.vertical-table {
  tr {
    &:hover {
      background-color: inherit !important;
    }
  }
  th {
    position: relative;
    padding-right: 8px;
    &:after {
      position: absolute;
      right: 0;
      content: ':';
    }
  }
}
.map {
  position: relative;
  color: #333;
  width: 100%;
  height: var(--height);
  --height: calc(100vh - 120px);
  --space: 10px;
  --top: var(--space);
  --left: var(--space);
  --info: 300px;
  .map-feature-description {
    padding: .75rem;
  }
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
      top: 10px;
      left: auto;
      right: 80px;
      max-width: var(--info);
      position: absolute;
      height: calc(100vh - 150px);
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
    color: #333;
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
    .map-info-tabs {
      display: flex;
      z-index: 2;
      .map-info-tabs--item {
        padding: 0.75rem;
        flex-grow: 1;
        text-align: center;
        cursor: pointer;
        border-bottom: 1px solid;
        border-color: var(--light);
        &.active {
          border-color: var(--primary);
        }
      }
    }
    .map-info-title {
      @extend .main;
    }
    .map-info-body {
      @extend .secondary;
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
.properties-table {
  top: 92px;
  border-radius: 4px;
  overflow: hidden;
  .properties-table-horizontal {
    th {
      &:after {
        content: '';
      }
    }
  }
  &.colored {
    border: 1px solid rgba(0,0,0,.1);
    @extend .secondary;
  }
  th, td {
    white-space: nowrap;
    padding: 0.5rem;
  }
  th {
    position: relative;
    &:after {
      position: absolute;
      right: 0;
      content: ':';
    }
  }
  td {
    padding-left: 0.75rem;
  }
}
.side-control {
  top: 6px;
  position: fixed;
  right: 48px;
  background: white;
}
</style>