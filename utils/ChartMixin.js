import Chart from 'chart.js/auto'
export default {
  data() {
    return {
      chart: null,
      showChart: false,
      chartId: 'small_logaritmic_chart',
      formulaType: 'Schlumberger',
      wennerRecords: [],
      schlumbergerRecords: [],
      showTheorical: true,
    }
  },
  components: {
    Chart
  },
  methods: {
    schlumbergerGetAb(item) {
      return (Number(item.d) / 2) + Number(item.a)
    },
    schlumbergerGetR(item) {
      const d = Number(item.d)
      const a = Number(item.a)
      const RO = Number(item.roCalculados)
      return (RO * d) / (Math.PI * a * (a + d))
    },
    schlumbergerGetRoCalculados(item) {
      const d = Number(item.d)
      const a = Number(item.a)
      const r = Number(item.rMedidas)
      return (Math.PI * a * (a + d) * r)/d
    },
    validationRoCalculados(item) {
      if (this.formulaType === 'Wenner') return true
      const d = Number(item.d)
      const a = Number(item.a)
      const r = Number(item.rMedidas)
      const ab = this.schlumbergerGetAb(item)

      const magabras = (2 * Math.PI * r) * (d/ 2) * ((ab/d)**2 - (1 / 4))
      const schlumberger = this.schlumbergerGetRoCalculados(item)
      const val4 = Math.PI * r * d * ((ab**2 / d**2) - (1 / 4))

      const accuracy = 0.002 // 0.2%
      const threshold = 1 + accuracy

      const minValue = Math.min(magabras, schlumberger, val4)
      const maxValue = Math.max(magabras, schlumberger, val4)

      return maxValue / minValue <= threshold
    },
    wennerGetRoCalculados(item) {
      const a = Number(item.a)
      const rMedidas = Number(item.rMedidas)
      return 2 * Math.PI * (a) * rMedidas
    },
    wennerGetR(item) {
      const a = Number(item.a)
      const roCalculados = Number(item.roCalculados)
      return roCalculados / (2 * Math.PI * (a))
    },
    startChart() {
      const el = document.getElementById(this.chartId)
      if(el === null) return
      el.addEventListener("contextmenu", e => e.preventDefault())
      this.chart = new Chart(
        el,
        {
          type: 'line',
          data: {
            datasets: [
              {
                label: 'Curva real',
                data: [],
                pointBackgroundColor: 'rgba(54, 196, 240, 1)',
                yAxisID: 'y',

              },
              {
                label: 'Curva Teórica',
                data: [],
                pointBackgroundColor: 'red',
                yAxisID: 'y',
              },
            ]
          },
          options: {
            plugins: {
              legend: {
                onClick: (e,legendItem, legend) => {
                  const index = legendItem.datasetIndex;
                  const ci = legend.chart;
                  if (ci.isDatasetVisible(index)) {
                    ci.hide(index);
                    legendItem.hidden = true;
                  } else {
                    ci.show(index);
                    legendItem.hidden = false;
                  }
                  this.showTheorical = !legendItem.hidden
                },
              },
            },
            tension: 0.4,
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
    drawChart() {
      this.showChart = true
      if(this.formulaType === 'Schlumberger') {
        if (this.rType === 'r_medidas') {
          this.schlumbergerRecords.forEach(item => {
            item.distanciaAb2 = this.schlumbergerGetAb(item)
            item.roCalculados = this.schlumbergerGetRoCalculados(item)
          })
        } else if (this.rType === 'ro_calculados') {
          this.schlumbergerRecords.forEach(item => {
            item.distanciaAb2 = this.schlumbergerGetAb(item)
            item.rMedidas = this.schlumbergerGetR(item)
          })
        }
      } else {
        if (this.rType === 'r_medidas') {
          this.wennerRecords.forEach(item => {
            item.roCalculados = this.wennerGetRoCalculados(item)
          })
        } else if (this.rType === 'ro_calculados') {
          this.wennerRecords.forEach(item => {
            item.rMedidas = this.wennerGetR(item)
          })
        }
      }
      const data = this.formulaType === 'Schlumberger' ? this.schlumbergerRecords : this.wennerRecords
      const chartData = data
        .map(item => {
          return {
            x: this.formulaType === 'Schlumberger' ? item.distanciaAb2 : item.a,
            y: item.roCalculados
          }
        })

      const maxY = chartData.reduce((max, obj) => {
        return obj.y > max ? obj.y : max
      }, 0)
      
      this.chart.options.scales.x.title.text = this.formulaType === 'Schlumberger' ? 'DISTANCIA AB/2' : 'DISTANCIA A'
      this.chart.data.datasets[0].data = chartData
      this.chart.data.datasets[1].data = this.theoricCurve(chartData)
      this.chart.options.scales.y.min = 0
      this.chart.options.scales.y.max = Math.pow(10, Math.ceil(Math.log10(maxY)))
      this.chart.update()
    },
    theoricCurve(realCurve) {
      const curve = []
      const [valuesY, valuesX] = [[], []]
      realCurve.forEach(item => {
        valuesY.push(Number(item.y))
        valuesX.push(Number(item.x))
      })
      const logest = this.logest(valuesY, valuesX)
      for(let i = 0; i < valuesX.length; i++) {
        curve.push({
          x: valuesX[i],
          y: logest.b * Math.pow(logest.m, valuesX[i])
        })
      }
      return curve
    },
    logest(yData, xData) {
      // Verificar que los arrays xData y yData tengan la misma longitud
      if (xData.length !== yData.length) {
        throw new Error('xData and yData must have the same length');
      }
  
      // Calcular el logaritmo natural de todos los elementos en yData
      const yLogData = yData.map(y => Math.log(y));
  
      // Calcular las sumas necesarias para la regresión lineal
      const n = xData.length;
      const sumX = xData.reduce((sum, x) => sum + x, 0);
      const sumYLog = yLogData.reduce((sum, y) => sum + y, 0);
      const sumX2 = xData.reduce((sum, x) => sum + x * x, 0);
      const sumXYLog = xData.reduce((sum, x, i) => sum + x * yLogData[i], 0);
  
      // Calcular la pendiente (slope) e intercepción (intercept) de la regresión lineal
      const slope = (n * sumXYLog - sumX * sumYLog) / (n * sumX2 - sumX * sumX);
      const intercept = (sumYLog - slope * sumX) / n;
  
      // Convertir la pendiente e intercepción a los parámetros 'b' y 'm' del modelo exponencial
      const m = Math.exp(slope);
      const b = Math.exp(intercept);
  
      // Devolver los valores ajustados de 'b' y 'm'
      return { b, m };
    }
  }
}