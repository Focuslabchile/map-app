<template>
  <header class="primary">
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
              <nuxt-link to="/#contacto">
                <span class="material-icons">contact_support</span>
                <span>Contacto</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/servicios">
                <span class="material-icons">electrical_services</span>
                <span>Servicios</span>
              </nuxt-link>
            </li>
            <li class="flex items-center justify-center last">
              <AccessibilityHandler />
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
  .logo {
    height: 88px;
    display: block;
    img {
      height: 75%;
    }
    figcaption {
      font-size: 1.3rem;
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
        &.last {
          //margin-left: 88px;
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
  }
}
</style>