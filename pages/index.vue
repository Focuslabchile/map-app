<template>
  <div id="home">
    <header id="slider" class="flex primary items-center">
      <div class="limit">
        <div class="grid grid-cols-2">
          <div class="box text-center md:text-left col-span-2 md:col-span-1 flex justify-center flex-col">
            <h1 class="leading-125">{{ data.Titulo }}-</h1>
            <p class="h5 tracking-widest leading-125">Empresa Nacional al servicios de los proyectos del país</p>
          </div>
          <div class="box col-span-2 md:col-span-1 mt-8 md:mt-0">
            <Slider>
              <div class="slider-item">
                <div class="slider-item-header px-0 md:px-8">
                  <h3>Estamos certificados</h3>
                  <p>Nuestro personal cuenta con licencia SEC clase A.</p>
                </div>
                <div class="img-container">
                  <img src="@/static/sec.png" alt="sec certificación">
                </div>
              </div>
              <div class="slider-item">
                <div class="slider-item-header px-0 md:px-8">
                  <h3>Acreditados por el INN</h3>
                  <p>Nuestros equipos se encuentran calibrados por laboratorios acreditados por el Instituto Nacional de Normalización</p>
                </div>
                <div class="img-container">
                  <img src="@/static/inn.png" alt="logo inn">
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </header>
    <AppSection background="secondary">
      <div class="grid grid-cols-2">
        <div class="col-span-2 md:col-span-1">
          <div class="us-container pr-0 md:pr-16 text-center md:text-left">
            <h3 class="h2">
              Nosotros
            </h3>
            <p>Somos una empresa chilena fundada el año 2021 por jóvenes que se dedica a solucionar problemas de ingeniería eléctrica.</p>
            <p>Actualmente queremos determinar cómo afectara la sequía en los sistemas de protección a tierra.
              Además de incorporar información relevante del sistema eléctrico nacional para el uso de la comunidad.</p>
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <img class="mb-8 md:md-16 w-full" src="@/static/portada/high-voltage-tower.jpg" alt="torre de alto voltage">
          <img class="mb-8 md:md-16 w-full" src="@/static/portada/santiago.jpg" alt="santiago">
        </div>
      </div>

      <div class="flex flex-col-reverse md:grid grid-cols-2 md:mt-16">
        <div class="col-span-2 md:col-span-1">
          <img class="mb-8 md:md-16 w-full" src="@/static/portada/gis.png" alt="torre de alto voltage">
        </div>
        <div class="col-span-2 md:col-span-1 flex">
          <div class="pr-0 md:pl-16 text-center m-auto">
            <h3 class="uppercase">
              Infomap
            </h3>
            <p>Queremos construir el <strong>repositorio de estudios de mallas tierra más grande del país</strong></p>
          </div>
        </div>
      </div>

      <div class="flex flex-col-reverse md:grid grid-cols-2">
        <div class="col-span-2 md:col-span-1">
          <img class="mb-8 md:md-16 w-full" src="@/static/portada/studies.jpg" alt="estudios">
        </div>
        <div class="col-span-2 md:col-span-1 flex">
          <div class="pr-0 md:pl-16 text-center m-auto">
            <h3 class="uppercase">
              Puedes ser parte del proyecto
            </h3>
            <p>Cooperar con nosotros y con el desarrollo de la ingeniería nacional, enviando tus estudios de mallas tierra al correo: <strong><a href="mailto:estudios@infomap.cl">estudios@infomap.cl</a></strong></p>
            <p>Tu estudio sera validado y agregado a nuestro repositorio</p>
          </div>
        </div>
      </div>
    </AppSection>
    <AppSection background="primary">
      <div class="md:grid flex flex-col-reverse grid-cols-2">
        <div class="col-span-2 md:col-span-1">
          <div class="grid grid-cols-2 gap-16">
            <div v-for="(item, index) in services" :key="index" class="font-bold text-center text-xl">
              <img
                class="dark-invert md:w-[230px] max-w-full m-auto md:px-12 xl:px-16 mb-4"
                :src="apiUrl+item.attributes.image.data[0].attributes.url"
                :alt="'icono de ' + item.attributes.long_name"
              >
              {{item.attributes.long_name}}
            </div>
          </div>
          <FormControl class="block md:hidden">
            <nuxt-link to="/servicios" class="btn flex items-center m-auto mt-8 w-fit btn-big">Ver todos <span class="material-icons">add</span></nuxt-link>
          </FormControl>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="us-container pl-0 md:pl-16 text-center md:text-right md:mb-0 mb-12">
            <h3 class="h2">
              Nuestros servicios
            </h3>
            <p>Somos profesionales con licencia SEC y nuestros equipos se encuentran calibrados por laboratorios acreditado por el instituto nacional de normalización (INN). Somos especialistas en buscar soluciones a la medida de nuestros clientes.</p>
            <FormControl class="hidden md:block">
              <nuxt-link to="/servicios" class="btn flex items-center ml-auto mt-8 w-fit btn-big">Ver todos <span class="material-icons">add</span></nuxt-link>
            </FormControl>
          </div>
        </div>
      </div>
    </AppSection>
    <AppSection id="contacto" class="pb-24 pt-24" background="secondary">
      <div id="contact-us" class="grid grid-cols-2">
        <div class="col-span-2 md:col-span-1 pr-0 md:pr-16 mb-12 md:mb-0 text-center md:text-left">
          <h3 class="h2 mb-4">¡Contactanos!</h3>
          <p class="mb-2">¿Sabes lo que necesitas para tu nuevo proyecto?</p>
          <p>Escribenos a <strong><a href="mailto:rene@infomap.cl">rene@infomap.cl</a></strong> o a través este formulario de contacto.</p>
        </div>
        <div class="col-span-2 md:col-span-1">
          <form id="contact" @submit.prevent="submitForm">
            <FormControl name="¿Cómo te llamas?">
              <InputText name="name" />
            </FormControl>
            <FormControl name="¿Cómo te podemos contactar?" description="Correo o número telefónico" :alert="contactData.contactEmpty">
              <InputText name="contact" />
            </FormControl>
            <FormControl name="Cuéntanos sobre tu necesidad">
              <InputTextarea name="message" />
            </FormControl>
            <FormControl v-if="!contactData.send">
              <button class="btn btn-big" type="submit">Enviar</button>
            </FormControl>
            <FormControl v-if="contactData.send">
              <div class="flex flex-col items-center">
                <div class="mb-4">
                  <span class="material-icons">done_outline</span>
                </div>
                <p>Mensaje enviado</p>
                <p class="mb-4">¡Te contactaremos a la brevedad!</p>
              </div>
            </FormControl>
            <FormControl v-if="contactData.error">
              <div class="flex flex-col items-center">
                <div class="mb-4">
                  <span class="material-icons">sentiment_dissatisfied</span>
                </div>
                <p>Ha ocurrido un error</p>
                <p class="mb-4">Por favor contactanos al email rene@infomap.cl</p>
              </div>
            </FormControl>
          </form>
        </div>
      </div>
    </AppSection>
  </div>
</template>
<script>

export default {
  async asyncData(context) {
    const data = await context.$api.get('api/inicio?populate=Header_Slider,servicios.image,about_us,slide,section_services').then(res => {
      return res.data.data.attributes
    })
    return { data }
  },
  data() {
    const d =new Date().toISOString();
    return {
      contactData: {
        contactEmpty: '',
        send: false,
        error: false,

        createdAt: d,
        publishedAt: d,
        createdBy: 2,
        updatedBy: 2
      },
      res: ''
    }
  },
  computed: {
    apiUrl() {
      return this.$config.apiUrl.slice(0,-1)
    },
    services() {
      return this.data?.servicios?.data
    }
  },
  methods: {
    submitForm(e) {
      this.contactData.contactEmpty = ''
      this.$nextTick(() => {
        if(!e.target.contact?.value.length) {
          this.contactData.contactEmpty = 'Este campo es obligatorio'
          return
        }
      })
      if(!e.target.contact?.value.length) {
        return
      }
      this.contactData.contactEmpty = ''
      this.$axios.post(this.$config.apiUrl+'api/contacts', {
        data: {
          name: e.target.name?.value,
          contact: e.target.contact?.value,
          message: e.target.message?.value,
          ...this.contactData
        }
      }, {
        headers: {
          Authorization: `Bearer ${this.$config.contactApiToken}`
        }
      })
        .then(response => {
          this.res = response.data
          this.contactData.send = true
        })
        .catch(_ => {
          this.res = response.data
          this.contactData.error = true
        })
    }
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>

#home {
  #slider {
    min-height: 70vh;
    .slider-item {
      text-align: center;
      .img-container {
        img {
          margin: auto;
          max-height: 250px;
        }
      }
    }
  }
  .us-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: sticky;
    top: 35vh;
  }
  #contact-us {
  }
}
</style>