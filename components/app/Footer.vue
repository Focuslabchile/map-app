<template>
  <footer id="app-footer" class="py-8">
    <div class="limit">
      <div class="grid grid-cols-6 gap-4">
        <div class="logo flex items-center col-span-6 md:col-span-2">
          <img src="/logo2.png" alt="m&z">
          <p>Ingeniería M&Z para todos los profesioanales del sector de la energía, técnologia y contrucción.</p>
        </div>
        <div class="col-span-6 sm:col-span-5 md:col-span-2">
          <span class="flex justify-center md:justify-start flex-col">
            <h5>Contactanos</h5>
            <p class="flex items-center mb-2">
              <span class="material-icons">home</span>Calle Huérfanos Nº1055, Santiago
            </p>
            <p class="flex items-center mb-2">
              <span class="material-icons">alternate_email</span>rene@infomap.cl
            </p>
            <p class="flex items-center">
              <span class="material-icons">phone</span>+56 9 5200 0241
            </p>
          </span>
        </div>
        <div class="col-span-6 sm:col-span-1 flex justify-center">
          <span>
            <p>Siguenos en nuestras redes sociales</p>
            <a href="#">
              <img class="social" src="/linkedin.svg" alt="linkedin">
            </a>
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
#app-footer {
  background-color: var(--dark);
  color: var(--gray2);
  .logo {
    img {
      height: 100px;
    }
  }
  .social {
    width: 50px;
  }
}
</style>
