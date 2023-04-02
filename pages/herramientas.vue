<template>
  <AppSection>
    <h2>Herramientas</h2>
    <div class="tabs">
      <div :class="['tab h3 tab-big', {'tab-active': toolsTab=='log-chart'}]">gráfico logaritmico</div>
      <div :class="['tab h3 tab-big', {'tab-active': toolsTab=='log-chart'}]">GIS Chile</div>
      <div class="tab-content">
        <p class="mb-16">Con herramienta podras crear tablas y gráficos para el estudio de tierras usando los métodos de Wenner y Schlumberger. Los usuarios pueden ingresar los datos de resistencia eléctrica y profundidad, y exportar los resultados en un gráfico en escala logarítmica y formato PDF.</p>
        <div class="table-container flex">
          <table id="log-table" class="table table-logaritmic">
            <tr>
              <th>Nº<br>Lecturas</th>
              <th>DISTANCIA<br>AB/2</th>
              <th>a</th>
              <th>n</th>
              <th>R<br>Medidas</th>
              <th>Ro<br>Calculados</th>
            </tr>
            <tr v-for="(item, index) in logaritmicRecords" :key="index+'-table-item'">
              <td>{{ item.nLectura }}</td>
              <td>{{ item.distanciaAb2 }}</td>
              <td>{{ item.a }}</td>
              <td>{{ item.n }}</td>
              <td>{{ item.rMedidas }}</td>
              <td>{{ item.roCalculados.toFixed(3) }}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td><input ref="a" @keypress.enter="addRecord(logaritmicRecordBlank)" class="rounded-lg border-1 border-gray-500 text-center p-1" v-model="logaritmicRecordBlank.a"></td>
              <td><input @keypress.enter="addRecord(logaritmicRecordBlank)" class="rounded-lg border-1 border-gray-500 text-center p-1" v-model="logaritmicRecordBlank.n"></td>
              <td><input @keypress.enter="addRecord(logaritmicRecordBlank)" class="rounded-lg border-1 border-gray-500 text-center p-1" v-model="logaritmicRecordBlank.rMedidas"></td>
              <td></td>
            </tr>
          </table>
          <div class="flex justify-between flex-col-reverse flex-grow max-h-full text-center max-w-xs">
            <div @click="addRecord(logaritmicRecordBlank)" class="create-record rounded-lg border-2 border-gray-500 p-1 cursor-pointer">Crear registro</div>
            <div v-if="logaritmicRecords.length > 1" @click="makeChart()" class="create-record rounded-lg border-2 border-gray-500 p-1 cursor-pointer">Crear gráfico</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <span @click="downloadChart()" class="create-record rounded-lg border-2 border-gray-500 p-1 cursor-pointer">
        downloadChart
      </span>
      <span @click="logaritmicRecords = logaritmicRecords2" class="create-record rounded-lg border-2 border-gray-500 p-1 cursor-pointer">
        dummie data
      </span>
      <span @click="logaritmicRecords = []" class="create-record rounded-lg border-2 border-gray-500 p-1 cursor-pointer">
        limpiar datos
      </span>
    </div>
    <div style="width: 70%;"><canvas id="logaritmic_chart"></canvas></div>
    <Modal :open.sync="chartGenerate" title="Generar gráfico">
      <form>
        <FormControl name="Nombre:">
          <InputText name="name" />
        </FormControl>
        <FormControl name="E-mail:">
          <InputText name="email" />
        </FormControl>
        <FormControl name="Dirección:" description="lugar donde se realizo el estudio">
          <InputText name="password" />
        </FormControl>
      </form>
      <template slot="modalFooter">
        <FormControl class="mb-0">
          <button class="btn" @click="chartGenerate = false">
            <slot name="modal-footer-btn">
              cancelar
            </slot>
          </button>
          <button class="btn main" @click="showChart()">
            <slot name="modal-footer-btn">
              Generar gráfico
            </slot>
          </button>
        </FormControl>
      </template>
    </Modal>
  </AppSection>
</template>

<script>
import Chart from 'chart.js/auto'
export default {
  name: 'Herramientas',
  components: {
    Chart
  },
  data() {
    return {
      chartGenerate: false,
      toolsTab: 'log-chart',
      logaritmicRecordBlank: {
        nLectura: null,
        distanciaAb2: null,
        a: null,
        n: null,
        rMedidas: null,
        roCalculados: null,
      },
      logaritmicRecords: [],
      logaritmicRecords2: [
        {nLectura:	1	,distanciaAb2:1, a:1, n:0.5, rMedidas:27.7, roCalculados:65.2646625},
        {nLectura:	2	,distanciaAb2:1.5, a:1, n:1, rMedidas:15.97, roCalculados:100.33951},
        {nLectura:	3	,distanciaAb2:2, a:1, n:1.5, rMedidas:10.08, roCalculados:118.7487},
        {nLectura:	4	,distanciaAb2:2.5, a:1, n:2, rMedidas:7.73, roCalculados:145.70277},
        {nLectura:	5	,distanciaAb2:3, a:1, n:2.5, rMedidas:6.15, roCalculados:169.0519688},
        {nLectura:	6	,distanciaAb2:3.5, a:1, n:3, rMedidas:4.12, roCalculados:155.31576},
        {nLectura:	7	,distanciaAb2:6, a:1, n:4, rMedidas:2, roCalculados:125.66},
        {nLectura:	8	,distanciaAb2:6.5, a:1, n:6, rMedidas:1.11, roCalculados:146.45673},
        {nLectura:	9	,distanciaAb2:8.5, a:1, n:8, rMedidas:0.59, roCalculados:133.45092},
        {nLectura:	10	,distanciaAb2:10.5, a:1, n:10, rMedidas:0.32, roCalculados:110.5808},
        {nLectura:	11	,distanciaAb2:12.5, a:1, n:12, rMedidas:0.17, roCalculados:83.31258}
      ],
    }
  },
  methods: {
    tableToCanvas() {
      
    },
    downloadChart() {
      var canvas = document.getElementById('logaritmic_chart');
      const link = document.createElement('a');

      link.download = 'logaritmic_chart.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    },
    showChart() {
      this.chartGenerate = false
      const chartData = this.logaritmicRecords
        .map(item => {
          return {
            x: item.distanciaAb2,
            y: item.roCalculados
          }
        })

      const maxX = chartData.reduce((max, obj) => {
        return obj.x > max ? obj.x : max;
      }, 0);

      const maxY = chartData.reduce((max, obj) => {
        return obj.y > max ? obj.y : max;
      }, 0);

      new Chart(
        document.getElementById('logaritmic_chart'),
        {
          type: 'scatter',
          data: {
            datasets: [{
              label: 'Logarithmic Domain and Range Example',
              data: chartData,
              pointBackgroundColor: 'rgba(255, 99, 132, 1)'
            }]
          },
          options: {
            scales: {
              x: {
                type: 'logarithmic',
                title: {
                  display: true,
                  text: 'Logarithmic Domain'
                },
                min: 1,
                //max: 1000,
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
                  text: 'Logarithmic Range'
                },
                min: 0,
                //max: 1000,
                max: Math.pow(10, Math.ceil(Math.log10(maxY))),
                ticks: {
                  callback: function(value, index, values) {
                    return Number(value.toString()); // convert to number
                  }
                }
              }
            }
          }
        }
      );

      this.$toast.success('Gráfico generado correctamente');
    },
    makeChart() {
      this.chartGenerate = true
    },
    addRecord(item) {
      item.a = Number(item.a?.replace(',', '.'))
      item.n = Number(item.n?.replace(',', '.'))
      item.rMedidas = Number(item.rMedidas?.replace(',', '.'))

      if (!item.a || !item.n || !item.rMedidas) {
        this.logaritmicRecordBlank.a = ''
        this.logaritmicRecordBlank.n = ''
        this.logaritmicRecordBlank.rMedidas = ''
        return
      }

      this.logaritmicRecords.push({
        ...item,
        nLectura: this.logaritmicRecords.length + 1,
        distanciaAb2: (item.a / 2) + item.n,
        roCalculados: Math.PI * item.n * (item.n + 1) * item.a * item.rMedidas
      })

      this.logaritmicRecordBlank.a = ''
      this.logaritmicRecordBlank.n = ''
      this.logaritmicRecordBlank.rMedidas = ''
      this.$refs.a.focus()
    },
  }
}
</script>
<style lang="scss">
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
</style>