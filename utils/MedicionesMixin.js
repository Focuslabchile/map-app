export default {
  props: {
    map: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chileCoordinates: {
        center: [-71.5, -33.5],
        zoom: 0.53,
      },
      filterSclumberger: '',
      filterWenner: '',
      mediciones: [],
      search: '',
    }
  },
  computed: {
    apiUrl() {
      return this.$config.apiUrl
    }
  },
  watch: {
    filterSclumberger(val) {
      this.filter(val)
    },
    filterWenner(val) {
      this.filter(val)
    },
  },
  methods: {
    filter(val) {
      if(val.includes('delete:')) {
        const type = val.split(':')[1]
        this.removeMarkers(this.markers[type])
        return
      }
      this.mediciones
        .filter(medicion => medicion.data.tipo === val)
        .forEach(medicion => {
          this.loadProject(medicion, false)
        })
      this.mapbox.map.flyTo(this.chileCoordinates);
    },
    format(n) {
      return new Intl.NumberFormat('es-CL').format(n)
    },
    loadProject(item) {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(https://infomap.cl/logo2.png)`;
      el.style.width = '30px';
      el.style.height = '37px';
      el.stylebackgroundRepeat = 'no-repeat';
      el.style.backgroundSize = '100%';
      
      el.addEventListener('click', () => {
        this.projectInfoModal = true
        this.markerId = item.id
      })
      const marker = {
        el,
        item,
        coordinates: [item.latitud, item.longitud],
      }
      this.addMarker({item: marker, type: item.data.tipo, id: item.id})
    },
    async fetchSomething() {
      const mediciones = sessionStorage.getItem('mediciones')
      if(mediciones !== null) {
        this.mediciones = JSON.parse(mediciones)
      }
      const fields = 'fields=id,latitud,longitud,clima,temperatura,instrumento,fecha,fecha_calibracion,nombre_proyecto,direccion,data,pais,region'
      const limit = 'pagination[limit]=10000'
      const filters = `${fields}&${limit}`
      await this.$api.get(`/api/logarithmic-charts?${filters}`).then(res => {
        this.mediciones = res.data.data.map(el => {
          return {
            id: el.id,
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