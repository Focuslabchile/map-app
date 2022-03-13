<template>
  <div id="home">
    <header id="slider" class="flex items-center">
      <div class="limit">
        <div class="grid grid-cols-2">
          <div class="box text-center md:text-left col-span-2 md:col-span-1 flex justify-center flex-col">
            <h1>Ingeníeria eléctrica M&Z</h1>
            <p>Empresa Nacional al servicios de los proyectos del país</p>
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
            <div class="font-bold text-center">
              <img class="dark-invert md:px-12 xl:px-16 mb-4" src="@/static/icons/ingnieria.png" alt="icono de ingenieria electrica">
              Ingeniería Eléctrica
            </div>
            <div class="font-bold text-center">
              <img class="dark-invert md:px-12 xl:px-16 mb-4" src="@/static/icons/certificacion.png" alt="icono de certificación">
              Certificación e inspección de instalaciones
            </div>
            <div class="font-bold text-center">
              <img class="dark-invert md:px-12 xl:px-16 mb-4" src="@/static/icons/informe.png" alt="icono de informe">
              Informe de verificación inicial
            </div>
            <div class="font-bold text-center">
              <img class="dark-invert md:px-12 xl:px-16 mb-4" src="@/static/icons/mediciones.png" alt="icono de mediciones">
              Mediciones de Mallas Tierra
            </div>
            <div class="font-bold text-center">
              <img class="dark-invert md:px-12 xl:px-16 mb-4" src="@/static/icons/tower-guy.png" alt="icono de torre de alta tension">
              Análisis de redes Eléctricas hasta 2000A
            </div>
            <div class="font-bold text-center">
              <img class="dark-invert md:px-12 xl:px-16 mb-4" src="@/static/icons/camara-termica.png" alt="icono de camara termica">
              Inspección termográfica
            </div>
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="us-container pl-0 md:pl-16 text-center md:text-right">
            <h3 class="h2">
              Nuestros servicios
            </h3>
            <p>Somos profesionales con licencia SEC y nuestros equipos se encuentran calibrados por laboratorios acreditado por el instituto nacional de normalización (INN). Somos especialistas en buscar soluciones a la medida de nuestros clientes.</p>
            <FormControl>
              <button class="btn flex items-center ml-auto mt-8">Ver todos <span class="material-icons">read_more</span></button>
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
          <form>
            <FormControl name="¿Cómo te llamas?">
              <InputText />
            </FormControl>
            <FormControl name="¿Cómo te podemos contactar?" description="Correo o número telefónico">
              <InputText />
            </FormControl>
            <FormControl name="Cuéntanos sobre tu necesidad">
              <InputTextarea />
            </FormControl>
            <FormControl>
              <button class="btn btn-big" type="submit">Enviar</button>
            </FormControl>
          </form>
        </div>
      </div>
    </AppSection>
  </div>
</template>
<style lang="scss">
@import '~assets/scss/colors.scss';

#home {
  #slider {
    @extend .primary;
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
    margin-bottom: 10vh;
  }
  #contact-us {
  }
}
</style>