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
    }
  },
  components: {
    Chart
  },
  methods: {
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
    startChart() {
      const el = document.getElementById(this.chartId)
      if(el === null) return
      this.chart = new Chart(
        el,
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
        this.schlumbergerRecords.forEach(item => {
          item.distanciaAb2 = this.schlumbergerGetAb(item)
          item.roCalculados = this.schlumbergerGetRoCalculados(item)
        })
      } else {
        this.wennerRecords.forEach(item => {
          item.roCalculados = this.wennerGetRoCalculados(item)
        })
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
      this.chart.options.scales.y.min = 0
      this.chart.options.scales.y.max = Math.pow(10, Math.ceil(Math.log10(maxY)))
      this.chart.update()

      this.$toast.success('Gráfico generado correctamente');
    }
  }
}