<template>
  <header>
    <div class="limit">
      <div class="flex justify-between items-center">
        <figure class="logo">
          <img src="/logo2.png" alt="m&z logo" />
          <figcaption> M&Z</figcaption>
        </figure>
        <div class="menu">
          <span @click="menu = !menu" class="material-icons cursor-pointer">menu</span>
        </div>
        <nav :class="{active:menu}">
          <ul class="flex list-none">
            <li>
              <nuxt-link to="/">
                <span class="material-icons">home</span>
                <span class="desktop">Inicio</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/mapa">
                <span class="material-icons">public</span>
                <span class="desktop">Mapa</span>
              </nuxt-link>
            </li>
            <li>
              <a class="disabled" href="">
                <span class="material-icons">contact_support</span>
                <span>Contacto</span>
              </a>
            </li>
            <li>
              <a class="disabled" href="">
                <span class="material-icons">electrical_services</span>
                <span>Servicios</span>
              </a>
            </li>
            <li>
              <DarkMode />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      menu: false
    }
  }
}
</script>
<style lang="scss">
@import '~assets/scss/colors.scss';

header {
  @extend .primary;
  .logo {
    height: 88px;
    display: block;
    img {
      height: 100%;
    }
    figcaption {
      display: none;
      font-size: 2.7vw;
      font-weight: bold;
      line-height: 1;
      text-align: center;
    }
  }
  .menu {
    position: relative;
    z-index: 100;
  }
  nav {
    --space: 20px;
    margin-right: -20px;
    display: none;
    &.active {
      @extend .primary;
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 99;

      display: flex;
      align-items: center;
      justify-content: center;
      ul {
        flex-direction: column;
      }
    }
    ul {
      li {
        a {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space);
        }
      }
    }
  }
  @media screen and (min-width: 630px) {
    nav {
      display: block;
    }
    .menu {
      display: none;
    }
    .logo {
      figcaption {
        display: block;
      }
    }
  }
}
</style>