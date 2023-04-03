<template>
  <section>
    <p class="my-8">Con herramienta podras crear tablas y gráficos para el estudio de tierras usando los métodos de <strong>Wenner</strong> y <strong>Schlumberger</strong>. Los usuarios pueden ingresar los datos de resistencia eléctrica y profundidad, y exportar los resultados en un gráfico en escala logarítmica y formato PDF.</p>
    <div class="filters mb-4">
      <InputRadio
        @update="(val) => formulaTab = val"
        group-name="formula_type"
        :value="formulaTab"
        :options="['Schlumberger', 'Wenner']"
      />
    </div>
    <div class="flex flex-col lg:flex-row items-center" v-if="formulaTab === 'Schlumberger'">
      <p>La resistividad del suelo Schlumberger es una técnica de investigación geofísica empleada para medir la resistividad eléctrica de los diferentes estratos del subsuelo. Esta técnica es fundamental en la identificación de estructuras geológicas, detección de agua subterránea y en la exploración de recursos minerales, entre otras aplicaciones. El método Schlumberger utiliza una configuración de electrodos específica, donde dos electrodos de corriente (A y B) inyectan una corriente eléctrica en el suelo y dos electrodos de potencial (M y N) miden la diferencia de potencial generada. La resistividad se calcula utilizando las mediciones de corriente y potencial, así como las distancias entre los electrodos.</p>
      <img src="/schlumberger.png" alt="Schlumberger" />
    </div>
    <div class="flex flex-col lg:flex-row items-center" v-else>
      <p>
        La resistividad del suelo Wenner es una técnica de investigación geofísica empleada para medir la resistividad eléctrica de los diferentes estratos del subsuelo. Esta técnica es esencial en la identificación de estructuras geológicas, detección de agua subterránea y en la exploración de recursos minerales, entre otras aplicaciones. El método Wenner utiliza una configuración específica de electrodos, en la cual cuatro electrodos linealmente espaciados (A, M, N y B) se colocan en el suelo a intervalos regulares. Dos electrodos de corriente (A y B) inyectan una corriente eléctrica en el suelo, mientras que los dos electrodos de potencial (M y N) miden la diferencia de potencial generada. La resistividad se calcula utilizando las mediciones de corriente y potencial, así como la distancia entre los electrodos.
      </p>
      <img src="/wenner.png" alt="Wenner" />
    </div>
    <div class="flex jusrify-between flex-wrap">
      <div class="table-container grow-0">
        <div class="table-controls mb-4">
          
          <span
            @click="schlumbergerRecords = []; wennerRecords = []; showChart= false"
            class="rounded-lg border-2 border-gray-500 p-1 cursor-pointer"
          >
            Limpiar datos
            <span class="material-icons align-bottom">
              cleaning_services
            </span>
          </span>
          <span
            v-if="schlumbergerRecords.length > 1 || wennerRecords.length > 1"
            @click="drawChart()"
            class="rounded-lg border-2 border-gray-500 p-1 cursor-pointer"
          >
            Visualizar gráfico
            <span class="material-icons align-bottom">
              timeline
            </span>
          </span>
        </div>
        <table v-if="formulaTab === 'Schlumberger'" id="schlumberger-table" class="table table-logaritmic">
          <tr>
            <th>Nº<br>Lecturas</th>
            <th>DISTANCIA<br>AB/2</th>
            <th>a</th>
            <th>d</th>
            <th>R<br>Medidas</th>
            <th>Ro<br>Calculados</th>
          </tr>
          <tr v-for="(item, index) in schlumbergerRecords" :key="index+'-table-item'">
            <td>{{ item.nLectura }}</td>
            <td>
              {{ schlumbergerGetAb(item) }}
            </td>
            <td>
              <template v-if="!schlumbergerEditList.includes(index)">
                {{ item.a }}
              </template>
              <input
                v-else
                @keypress.enter="editRecord(index)"
                class="rounded-lg border-1 border-gray-500 text-center p-1"
                v-model="schlumbergerRecords[index].a"
              >
            </td>
            <td>
              <template v-if="!schlumbergerEditList.includes(index)">
                {{ item.d }}
              </template>
              <input
                v-else
                @keypress.enter="editRecord(index)"
                class="rounded-lg border-1 border-gray-500 text-center p-1"
                v-model="schlumbergerRecords[index].d"
              >
            </td>
            <td>
              <template v-if="!schlumbergerEditList.includes(index)">
                {{ item.rMedidas }}
              </template>
              <input
                v-else
                @keypress.enter="editRecord(index)"
                class="rounded-lg border-1 border-gray-500 text-center p-1"
                v-model="schlumbergerRecords[index].rMedidas"
              >
            </td>
            <td>
              <span v-if="validationRoCalculados(item)" class="p-1">
                {{ schlumbergerGetRoCalculados(item).toFixed(3) }}
              </span>
              <span
                v-else
                v-tippy
                content="Hay inconsistencias en los datos ingresados"
                class="bg-red-600 text-white p-1"
              >
                {{ schlumbergerGetRoCalculados(item).toFixed(3) }}
              </span>
            </td>
            <td>
              <button
                @click="editRecord(index)"
                class="rounded-lg border-1 border-gray-500 text-center p-1 material-icons"
              >
                {{ schlumbergerEditList.includes(index) ? 'edit_off' : 'edit' }}
              </button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <input
                ref="a"
                @keypress.enter="addRecord()"
                class="rounded-lg border-1 border-gray-500 text-center p-1"
                v-model="schlumbergerRecordBlank.a"
              >
            </td>
            <td>
              <input
                @keypress.enter="addRecord()"
                class="rounded-lg border-1 border-gray-500 text-center p-1"
                v-model="schlumbergerRecordBlank.d"
              >
            </td>
            <td>
              <input
                @keypress.enter="addRecord()"
                class="rounded-lg border-1 border-gray-500 text-center p-1"
                v-model="schlumbergerRecordBlank.rMedidas"
              >
            </td>
            <td></td>
          </tr>
        </table>
        <table v-if="formulaTab=== 'Wenner'" id="wenner-table" class="table table-logaritmic">
          <tr>
            <th>Nº<br>Lecturas</th>
            <th>A</th>
            <th>R<br>Medidas</th>
            <th>Ro<br>Calculados</th>
          </tr>
          <tr v-for="(item, index) in wennerRecords" :key="index+'-table-item'">
            <td>{{ item.nLectura }}</td>
            <td>
              <template v-if="!wennerEditList.includes(index)">
                {{ item.a }}
              </template>
              <input
                v-else
                @keypress.enter="editRecord(index)"
                class="rounded-lg border-1 border-gray-500 text-center p-1"
                v-model="wennerRecords[index].a"
              >
            </td>
            <td>
              <template v-if="!wennerEditList.includes(index)">
                {{ item.rMedidas }}
              </template>
              <input
                v-else
                @keypress.enter="editRecord(index)"
                class="rounded-lg border-1 border-gray-500 text-center p-1"
                v-model="wennerRecords[index].rMedidas"
              >
            </td>
            <td>{{ wennerGetRoCalculados(item).toFixed(3) }}</td>
            <td>
              <button
                @click="editRecord(index)"
                class="rounded-lg border-1 border-gray-500 text-center p-1 material-icons"
              >
                {{ wennerEditList.includes(index) ? 'edit_off' : 'edit' }}
              </button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input
                ref="a"
                @keypress.enter="addRecord()"
                class="rounded-lg border-1 border-gray-500 text-center p-1"
                v-model="wennerRecordBlank.a"
              >
            </td>
            <td>
              <input
                @keypress.enter="addRecord()"
                class="rounded-lg border-1 border-gray-500 text-center p-1"
                v-model="wennerRecordBlank.rMedidas"
              >
            </td>
            <td></td>
          </tr>
        </table>
      </div>
      <div>

      </div>
    </div>
    <div class="mt-4">
      <button
        v-if="showChart"
        @click="sendChart()"
        :disabled="schlumbergerRecords.find(el => !validationRoCalculados(el))"
        :class="['rounded-lg border-2 border-gray-500 p-1 cursor-pointer items-center', { disabled: schlumbergerRecords.find(el => !validationRoCalculados(el)) }]"
      >
        Enviar documentos
        <span class="material-icons align-bottom">
          email
        </span>
      </button>
      <span
        v-if="formulaTab === 'Schlumberger'"
        @click="schlumbergerRecords = dataDummie"
        class="mx-2 create-record rounded-lg border-2 border-gray-500 p-1 cursor-pointer"
      >dummie data
      </span>
      <span
        v-if="formulaTab === 'Wenner'"
        @click="wennerRecords = wennerDataDummie"
        class="mx-2 create-record rounded-lg border-2 border-gray-500 p-1 cursor-pointer"
      >dummie data
      </span>
    </div>
    <div v-if="showChart && formulaTab === 'Schlumberger'" class="my-4">
      <span class="text-red-600" v-if="schlumbergerRecords.find(el => !validationRoCalculados(el))">
        Los datos ingresados son inconsistentes por lo que el gráfico no es válido.
        <br>
        <strong>
          Para enviar los documentos debe corregir los datos ingresados.
        </strong>
      </span>
      <strong v-else>
        Los datos ingresados son consistentes según las validaciones realizadas
      </strong>
    </div>
    <div
      v-show="showChart"
      class="mt-8"
    >
      <canvas id="logaritmic_chart"></canvas>
    </div>
    <Modal :open.sync="chartGenerate" title="Enviar documentos">
      <form ref="senddocumentform" @submit.prevent="sendDocuments">
        <div class="flex space-x-2 justify-between">
          <div class="grow">
            <FormControl name="Nombre:">
              <InputText name="nombre" placeholder="Juan Perez" />
            </FormControl>
            <FormControl
              name="E-mail:"
              :required="true"
              :alert="sendDocumentsData.emailEmpty"
              alert-color="text-red-600"
              alert-position="top"
            >
              <InputText name="email" placeholder="juan.perez@email.com" />
            </FormControl>
            <FormControl name="Nombre del proyecto:">
              <InputText name="nombre_proyecto" placeholder="Medición para Engie Chile" />
            </FormControl>
          </div>
          <div class="grow">
            <FormControl name="Fecha:">
              <InputText name="fecha" placeholder="20/02/2023"/>
            </FormControl>
            <FormControl name="Temperatura:">
              <InputText name="temperatura" placeholder="25" />
            </FormControl>
          </div>
          <div class="grow">
            <FormControl name="Clima:">
              <InputText name="clima" placeholder="Lluvioso" />
            </FormControl>
            <FormControl name="Sondeador:">
              <InputText name="sondeador" placeholder="Quien que realizo el estudio" />
            </FormControl>
          </div>
        </div>
        <FormControl
          name="Dirección:"
          alert-color="text-red-600"
          alert-position="top"
          :alert="sendDocumentsData.directionEmpty"
          description="Lugar donde se realizaron las mediciones"
          :required="true"
        >
          <template slot="horizonal-description">
            <small style="max-width: 700px; display: block;">
              Si el lugar donde se realizo el estudio <strong>aún no tiene dirección</strong> puedes hacer click en el boton <i class="my-location"></i> para agegar un punto en el lugar donde se realizo el estudio. Recuerda que puedes usar el buscador para encontrar un punto de referencia cercano.
            </small>
          </template>
          <div id="map"></div>
        </FormControl>
        <button ref="submitform" class="hidden" type="submit"></button>
      </form>
      <template slot="modalFooter">
        <FormControl class="mb-0">
          <button class="btn" @click="chartGenerate = false">
            <slot name="modal-footer-btn">
              cancelar
            </slot>
          </button>
          <button class="btn main" @click="$refs.submitform.click()">
            <slot name="modal-footer-btn">
              Enviar documentos
            </slot>
          </button>
        </FormControl>
      </template>
    </Modal>
  </section>
</template>
<script>
import Chart from 'chart.js/auto'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxDraw from "@mapbox/mapbox-gl-draw"
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
export default {
  name: 'Herramientas',
  components: {
    Chart
  },
  data() {
    return {
      sendDocumentsData: {
        emailEmpty: '',
        directionEmpty: ''
      },
      schlumbergerEditList: [],
      wennerEditList: [],
      coordinates: [],
      showChart: false,
      chartGenerate: false,
      formulaTab: 'Schlumberger',
      schlumbergerRecordBlank: {
        nLectura: null,
        distanciaAb2: null,
        a: null,
        d: null,
        rMedidas: null,
        roCalculados: null,
      },
      wennerRecordBlank: {
        nLectura: null,
        a: null,
        rMedidas: null,
        roCalculados: null,
      },
      wennerRecords: [],
      schlumbergerRecords: [],
      wennerDataDummie: [
        { nLectura: 1, a: 0.6, rMedidas:133.7 },
        { nLectura: 2, a: 0.8, rMedidas:158.9 },
        { nLectura: 3, a: 1.0, rMedidas:71.3 },
        { nLectura: 4, a: 1.6, rMedidas:19.5 },
        { nLectura: 5, a: 2.0, rMedidas:11.99 },
        { nLectura: 6, a: 2.5, rMedidas:8.02 },
        { nLectura: 7, a: 3.0, rMedidas:5.58 },
        { nLectura: 8, a: 4.0, rMedidas:4.09 },
        { nLectura: 9, a: 5.0, rMedidas:3.46 },
        { nLectura: 10, a: 7.0, rMedidas:3.62 },
        { nLectura: 11, a: 9.0, rMedidas:3.09 },
        { nLectura: 12, a: 11.0, rMedidas:3.88 },
        { nLectura: 13, a: 13.0, rMedidas:2.3 },
        { nLectura: 14, a: 16.0, rMedidas:1.73 },
      ],
      dataDummie: [
        {nLectura:	1	,distanciaAb2:1, a:1, d:0.5, rMedidas:27.7, roCalculados:65.2646625},
        {nLectura:	2	,distanciaAb2:1.5, a:1, d:1, rMedidas:15.97, roCalculados:100.33951},
        {nLectura:	3	,distanciaAb2:2, a:1, d:1.5, rMedidas:10.08, roCalculados:118.7487},
        {nLectura:	4	,distanciaAb2:2.5, a:1, d:2, rMedidas:7.73, roCalculados:145.70277},
        {nLectura:	5	,distanciaAb2:3, a:1, d:2.5, rMedidas:6.15, roCalculados:169.0519688},
        {nLectura:	6	,distanciaAb2:3.5, a:1, d:3, rMedidas:4.12, roCalculados:155.31576},
        {nLectura:	7	,distanciaAb2:6, a:1, d:4, rMedidas:2, roCalculados:125.66},
        {nLectura:	8	,distanciaAb2:6.5, a:1, d:6, rMedidas:1.11, roCalculados:146.45673},
        {nLectura:	9	,distanciaAb2:8.5, a:1, d:8, rMedidas:0.59, roCalculados:133.45092},
        {nLectura:	10	,distanciaAb2:10.5, a:1, d:10, rMedidas:0.32, roCalculados:110.5808},
        {nLectura:	11	,distanciaAb2:12.5, a:1, d:12, rMedidas:0.17, roCalculados:83.31258}
      ],
    }
  },
  mounted() {
    this.chart = new Chart(
      document.getElementById('logaritmic_chart'),
      {
        type: 'line',
        data: {
          datasets: [{
            label: 'Gráfico logarítmico',
            data: [],
            pointBackgroundColor: 'rgba(54, 196, 240, 1)'
          }]
        },
        options: {
          scales: {
            x: {
              type: 'logarithmic',
              title: {
                display: true,
                text: 'DISTANCIA AB/2'
              },
              min: 0,
              max: 100,
              ticks: {
                callback: function(value, index, values) {
                  return Number(value.toString()); // convert to number
                }
              }
            },
            y: {
              type: 'logarithmic',
              title: {
                display: true,
                text: 'RESISTIVIDAD (Ωm)'
              },
              min: 0,
              max: 100,
              ticks: {
                callback: function(value, index, values) {
                  return Number(value.toString()); // convert to number
                }
              }
            }
          }
        }
      }
    )
  },
  methods: {
    async sendDocuments(e) {
      this.sendDocumentsData.emailEmpty = ''
      this.sendDocumentsData.directionEmpty = ''
      this.$nextTick(() => {
        if(!e.target.email?.value.length) {
          this.sendDocumentsData.emailEmpty = 'Este campo es obligatorio'
        }
        if(!this.coordinates.length) {
          this.sendDocumentsData.directionEmpty = 'Este campo es obligatorio'
        }
      })
      if(!e.target.email?.value.length || !this.coordinates.length) {
        return
      }
      this.sendDocumentsData.emailEmpty = ''
      this.sendDocumentsData.directionEmpty = ''
      const chartData = this.formulaTab === 'Schlumberger' ? this.schlumbergerRecords : this.wennerRecords

      const chart = document.getElementById('logaritmic_chart').toDataURL()

      const data = {}
      const appendData = (keys) => {
        keys.forEach(key => {
          if (e.target[key]?.value !== '') {
            data[key] = e.target[key]?.value
          }
        })
      }
      appendData(['nombre', 'email', 'nombre_proyecto', 'fecha', 'temperatura', 'clima', 'sondeador', 'email'])
      const csv = ((data) => {
        const csvRows = []
        const headers = Object.keys(data[0])
        csvRows.push(headers.join(';'))
        for (const row of data) {
          const values = headers.map(header => {
            const escaped = ('' + row[header]).replace(/"/g, '\\"')
            return `"${escaped}"`
          })
          csvRows.push(values.join(';'))
        }
        return csvRows.join('\n')
      })(chartData)
      this.$axios.post('api/logarithmic-charts', {
        data: {
          ...data,
          formulaTab: this.formulaTab,
          latitud: this.coordinates[0],
          longitud: this.coordinates[1],
          chart: chart,
          rawData: chartData,
          data: csv,
        }
      })
        .then(response => {
          this.res = response.data
          this.contactData.send = true
        })
        .catch(_ => {
          this.res = response?.data
          this.contactData.error = true
        })
    },
    schlumbergerGetAb(item) {
      return (Number(item.d) / 2) + Number(item.a)
    },
    schlumbergerGetRoCalculados(item) {
      const d = Number(item.d)
      const a = Number(item.a)
      const r = Number(item.rMedidas)
      return (Math.PI * a * (a + d) * r)/d
    },
    validationRoCalculados(item) {
      if (this.formulaTab === 'Wenner') return true
      const d = Number(item.d)
      const a = Number(item.a)
      const r = Number(item.rMedidas)
      const ab = this.schlumbergerGetAb(item)

      const val1 = Math.PI * a * (a + 1) * d * r
      const val2 = (2 * Math.PI * r) * (d / 2) * (ab**2 - (1 / 4))
      const val3 = this.schlumbergerGetRoCalculados(item)
      const val4 = Math.PI * r * d * ((ab**2 / d**2) - (1 / 4))

      const accuracy = 0.002 // 0.2%
      const threshold = 1 + accuracy

      const minValue = Math.min(val1, val2, val3, val4)
      const maxValue = Math.max(val1, val2, val3, val4)

      return maxValue / minValue <= threshold
    },
    wennerGetRoCalculados(item) {
      const a = Number(item.a)
      const rMedidas = Number(item.rMedidas)
      return 2 * Math.PI * (a) * rMedidas
    },
    editRecord(index) {
      const item = this.formulaTab === 'Schlumberger' ? this.schlumbergerEditList : this.wennerEditList
      if(item.includes(index)) {
        item.splice(item.indexOf(index), 1)
      } else {
        item.push(index)
      }
      return
    },
    drawMap() {
      mapboxgl.accessToken = this.$config.mapboxApiUrl
      setTimeout(() => {
        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/sebakc/cl0d7xql7000y14qnuj9i507f',
          zoom: 3,
          center: [-73.17561116302086, -39.27770932403337],
        });
        
        map.addControl(new mapboxgl.AttributionControl({
            compact: false,
            customAttribution: 'Desarrollado por Sebastian Vega'
        }))

        // Add the control to the map.
        map.addControl(
          new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            placeholder: 'Buscar dirección',
            language: 'es',
            getItemValue: (item) => {
              this.setCoordinates(item)
              return item.place_name
            },
            mapboxgl
          })
        );
        map.addControl(new MapboxDraw({
          displayControlsDefault: false,
          controls: {
            trash: true,
            point: true,
          },
          defaultMode: 'simple_select'
        }))

        map.on('draw.create', (el) => {
          this.coordinates = el.features[0].geometry.coordinates
        })

      }, 100)
    },
    setCoordinates(item) {
      this.coordinates = item.center
    },
    drawChart() {
      this.showChart = true

      if(this.formulaTab === 'Schlumberger') {
        this.schlumbergerRecords.forEach(item => {
          item.distanciaAb2 = this.schlumbergerGetAb(item)
          item.roCalculados = this.schlumbergerGetRoCalculados(item)
        })
      } else {
        this.wennerRecords.forEach(item => {
          item.roCalculados = this.wennerGetRoCalculados(item)
          item.distanciaAb2 = item.a * 1.5
        })
      }
      const data = this.formulaTab === 'Schlumberger' ? this.schlumbergerRecords : this.wennerRecords
      const chartData = data
        .map(item => {
          return {
            x: item.distanciaAb2,
            y: item.roCalculados
          }
        })

      const maxY = chartData.reduce((max, obj) => {
        return obj.y > max ? obj.y : max
      }, 0)
      
      this.chart.data.datasets[0].data = chartData
      this.chart.options.scales.y.min = 0
      this.chart.options.scales.y.max = Math.pow(10, Math.ceil(Math.log10(maxY)))
      this.chart.update()

      this.$toast.success('Gráfico generado correctamente');
    },
    sendChart() {
      this.chartGenerate = true
      this.drawMap()
    },
    addRecord() {
      const item = this.formulaTab === 'Schlumberger' ? this.schlumbergerRecordBlank : this.wennerRecordBlank
      const items = this.formulaTab === 'Schlumberger' ? this.schlumbergerRecords : this.wennerRecords

      item.a = Number(item.a?.replace(',', '.'))
      item.rMedidas = Number(item.rMedidas?.replace(',', '.'))
      
      if (this.formulaTab === 'Schlumberger') {
        item.d = Number(item.d?.replace(',', '.'))
        if (!item.a || !item.d || !item.rMedidas) {
          item.a = ''
          item.d = ''
          item.rMedidas = ''
          return
        }
      } else {
        if (!item.a || !item.rMedidas) {
          item.a = ''
          item.rMedidas = ''
          return
        }
      }

      if(this.formulaTab === 'Schlumberger') {
        this.schlumbergerRecords.push({
          ...item,
          nLectura: items.length + 1,
        })
        item.d = ''
      } else {
        this.wennerRecords.push({
          ...item,
          nLectura: items.length + 1,
        })
      }

      item.a = ''
      item.rMedidas = ''
      this.$refs.a.focus()
    },
  }
}
</script>
<style lang="scss">
.mapboxgl-ctrl.mapboxgl-ctrl-attrib {
  &:nth-child(2) {
    display: none;
  }
  .mapbox-improve-map {
    display: none;
  }
}
.table {
  &.table-logaritmic {
    th {
      vertical-align: baseline;
      word-break: break-word;
      min-width: 80px;
      padding: 0 10px;
    }
    tr {
      td {
        text-align: center;
        input {
          color: black;
          width: 65px;
          border: 1px solid black;
        }
      }
    }
  }
}
#map {
  position: relative;
  top: 0;
  bottom: 0;
  height: 400px;
  width: 700px;
}
.my-location {
  background-image: url('data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="16" height="17">%3Cpath d="m10 2c-3.3 0-6 2.7-6 6s6 9 6 9 6-5.7 6-9-2.7-6-6-6zm0 2c2.1 0 3.8 1.7 3.8 3.8 0 1.5-1.8 3.9-2.9 5.2h-1.7c-1.1-1.4-2.9-3.8-2.9-5.2-.1-2.1 1.6-3.8 3.7-3.8z"/>%3C/svg>');
  display: inline-block;
  width: 16px;
  height: 17px;
}
</style>