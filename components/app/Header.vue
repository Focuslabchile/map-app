<template>
  <header>
    <div class="limit">
      <div class="flex justify-between items-center">
        <nuxt-link to="/">
          <figure class="logo">
            <img src="/logo2.png" alt="m&z logo" />
            <figcaption> M&Z</figcaption>
          </figure>
        </nuxt-link>
        <div class="menu">
          <span @click="menu = !menu" class="material-icons cursor-pointer">menu</span>
        </div>
        <nav :class="{active:menu}" >
          <ul class="flex list-none">
            <li>
              <nuxt-link @click.native="menu = false" to="/">
                <span class="material-icons">home</span>
                <span class="desktop">Inicio</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link @click.native="menu = false" to="/gischile">
                <span class="material-icons">public</span>
                <span class="desktop">GIS Chile</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link @click.native="menu = false" to="/estudio-de-resistividad-de-suelo">
                <span class="material-icons">contact_support</span>
                <span>Sev</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link @click.native="menu = false" to="/pruebas-y-mediciones-electricas-chile">
                <span class="material-icons">electrical_services</span>
                <span>Servicios</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link @click.native="menu = false" to="/#contacto">
                <span class="material-icons">contact_support</span>
                <span>Contacto</span>
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
  @extend .primary;
  position: relative;
  .logo {
    height: 88px;
    display: block;
    padding: 10px 0;
    img {
      margin: auto;
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
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: center;
      @extend .primary;
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
  }
}
</style>