<template>
  <AppSection>
    <h2>Herramientas</h2>
    <div class="tabs">
      <div class="filters text-2xl">
        <InputRadio
          @update="(val) => toolsTab = val"
          group-name="tool_type"
          :value="toolsTab"
          :options="['GIS Chile', 'Gráfico logaritmico']"
        />
      </div>
      <div class="tab-content">
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
        <div class="flex">
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
                <td>{{ schlumbergerGetAb(item) }}</td>
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
                <td>{{ schlumbergerGetRoCalculados(item).toFixed(3) }}</td>
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
                <th>a</th>
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
                    class="rounded-lg border-1 border-gray-500 text-center p-1"
                  >editar
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
        </div>
        <div class="mt-4">
          <span
            v-if="showChart"
            @click="sendChart()"
            class="rounded-lg border-2 border-gray-500 p-1 cursor-pointer items-center"
          >
            Enviar documentos
            <span class="material-icons align-bottom">
              email
            </span>
          </span>
          <span
            @click="downloadChart()"
            class="create-record rounded-lg border-2 border-gray-500 p-1 cursor-pointer"
          >downloadChart
          </span>
          <span
            v-if="formulaTab === 'Schlumberger'"
            @click="schlumbergerRecords = dataDummie"
            class="mx-2 create-record rounded-lg border-2 border-gray-500 p-1 cursor-pointer"
          >dummie data
          </span>
        </div>
        <div
          v-show="showChart"
          class="mt-8"
        >
          <canvas id="logaritmic_chart"></canvas>
        </div>
        <Modal :open.sync="chartGenerate" title="Enviar documentos">
          <form>
            <div class="flex space-x-2 justify-between">
              <div class="grow">
                <FormControl name="Nombre:">
                  <InputText name="name" />
                </FormControl>
                <FormControl name="E-mail:" :required="true">
                  <InputText name="email" />
                </FormControl>
                <FormControl name="Nombre del proyecto:">
                  <InputText name="name" placeholder="Medición para Engie Chile" />
                </FormControl>
              </div>
              <div class="grow">
                <FormControl name="Nombre del proyecto:">
                  <InputText name="name" placeholder="Medición para Engie Chile" />
                </FormControl>
                <FormControl name="Fecha:">
                  <InputText name="name" placeholder="20-02-2023" />
                </FormControl>
                <FormControl name="Temperatura:">
                  <InputText name="name" placeholder="25" />
                </FormControl>
              </div>
              <div class="grow">
                <FormControl name="Clima:">
                  <InputText name="name" placeholder="Lluvioso" />
                </FormControl>
                <FormControl name="Sondeador:">
                  <InputText name="name" placeholder="Quien que realizo el estudio" />
                </FormControl>
              </div>
            </div>
            <FormControl name="Dirección:" description="Lugar donde se realizaron las mediciones" :required="true">
              <div id="map"></div>
            </FormControl>
          </form>
          <template slot="modalFooter">
            <FormControl class="mb-0">
              <button class="btn" @click="chartGenerate = false">
                <slot name="modal-footer-btn">
                  cancelar
                </slot>
              </button>
              <button class="btn main" @click="drawChart()">
                <slot name="modal-footer-btn">
                  Enviar documentos
                </slot>
              </button>
            </FormControl>
          </template>
        </Modal>
      </div>
    </div>
  </AppSection>
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
    const MAPBOX_API_URL = this.$config.mapboxApiUrl
    return {
      schlumbergerEditList: [],
      wennerEditList: [],
      coordinates: [],
      showChart: false,
      chartGenerate: false,
      toolsTab: 'GIS Chile',
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
              min: 1,
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
              // max: Math.pow(10, Math.ceil(Math.log10(maxY))),
              max: 1000,
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
    schlumbergerGetAb(item) {
      return (item.a / 2) + Number(item.d)
    },
    schlumbergerGetRoCalculados(item) {
      const d = Number(item.d)
      const a = Number(item.a)
      const rMedidas = Number(item.rMedidas)
      return Math.PI * d * (d + 1) * a * rMedidas
    },
    wennerGetRoCalculados(item) {
      const a = Number(item.a)
      const rMedidas = Number(item.rMedidas)
      return 2 * Math.PI * a * rMedidas
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
          style: 'mapbox://styles/mapbox/light-v10',
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
    tableToCanvas() {
    },
    downloadChart() {
      var canvas = document.getElementById('logaritmic_chart');
      const link = document.createElement('a');

      link.download = 'logaritmic_chart.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
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
.tabs {
  .tab {
    &.tab-active {
      background-color: #f5f5f5;
      color: blue;
    }
  }
}
</style>