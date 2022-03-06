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
      <div class="limit">
        <div class="grid grid-cols-2">
          <div class="col-span-2 md:col-span-1">
            <h3 class="h2">
              Nosotros
            </h3>
          </div>
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
}
</style>