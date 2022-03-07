<template>
  <div id="home">
    <header id="slider" class="flex items-center">
      <div class="limit">
        <div class="grid grid-cols-2">
          <div class="box text-center md:text-left col-span-2 md:col-span-1 flex justify-center flex-col">
            <h1>Ingeníeria eléctrica</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
          <div class="box col-span-2 md:col-span-1 mt-8 md:mt-0">
            <Slider>
              <div class="slider-item">
                <div class="slider-item-header px-0 md:px-8">
                  <h3>Estamos certificados</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                </div>
                <div class="img-container">
                  <img src="@/static/sec.png" alt="sec certificación">
                </div>
              </div>
              <div class="slider-item">
                <div class="slider-item-header px-0 md:px-8">
                  <h3>Estamos certificados</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                </div>
                <div class="img-container">
                  <img src="@/static/analizador.png" alt="analizador">
                </div>
              </div>
              <div class="slider-item">
                <div class="slider-item-header px-0 md:px-8">
                  <h3>Estamos certificados</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                </div>
                <div class="img-container">
                  <img src="@/static/termo-cam.png" alt="termo cam">
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
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <img class="mb-8 md:md-16 w-full" src="https://i.picsum.photos/id/42/600/400.jpg?hmac=xu2H-JM2iZFaiBN-UgpmCMa3sFj-L53aoSCIbC91RjI" alt="">
          <img class="mb-8 md:md-16 w-full" src="https://i.picsum.photos/id/496/600/400.jpg?hmac=UZP1e68JrI6RawgwYSmVqV66Te7qUVpmO0eM89EpQoI" alt="">
          <img class="mb-8 md:md-16 w-full" src="https://i.picsum.photos/id/1029/600/400.jpg?hmac=3muCYoyt7SRcTJEhJyYtvr08EQBZRYpWFepOEf8borI" alt="">
        </div>
      </div>
    </AppSection>
    <AppSection background="primary">
      <div class="md:grid flex flex-col-reverse grid-cols-2">
        <div class="col-span-2 md:col-span-1">
          <img class="mb-8 md:md-16 w-full" src="https://i.picsum.photos/id/42/600/400.jpg?hmac=xu2H-JM2iZFaiBN-UgpmCMa3sFj-L53aoSCIbC91RjI" alt="">
          <img class="mb-8 md:md-16 w-full" src="https://i.picsum.photos/id/496/600/400.jpg?hmac=UZP1e68JrI6RawgwYSmVqV66Te7qUVpmO0eM89EpQoI" alt="">
          <img class="mb-8 md:md-16 w-full" src="https://i.picsum.photos/id/1029/600/400.jpg?hmac=3muCYoyt7SRcTJEhJyYtvr08EQBZRYpWFepOEf8borI" alt="">
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="us-container pl-0 md:pl-16 text-center md:text-right">
            <h3 class="h2">
              Nuestros servicios
            </h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
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
          <p class="mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
          <p>Escribenos a renematusza@gmail.com o a través este formulario de contacto.</p>
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