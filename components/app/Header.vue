<template>
  <header>
    <div class="limit">
      <div class="flex justify-between items-center">
        <figure class="logo">
          <img src="/logo.png" alt="Mapbox logo" />
        </figure>
        <nav>
          <ul class="flex list-none">
            <li>
              <a href="">
                <span class="material-icons">public</span>
                <span class="desktop">Mapa</span>
              </a>
            </li>
            <li>
              <a href="">
                <span class="material-icons">contact_support</span>
                Contacto
              </a>
            </li>
            <li>
              <a href="">
                <span class="material-icons">electrical_services</span>
                Servicios
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
<style lang="scss">
header {
  .logo {
    height: 88px;
    display: none;
    img {
      height: 100%;
    }
    @media screen and (min-width: 360px) {
      display: block;
    }
  }
  nav {
    --space: 20px;
    margin-right: calc(var(--space) * -1);
    ul {
      li {
        a {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space);
          @media screen and (min-width: 460px) {
            flex-direction: row;
          }
        }
      }
    }
  }
}
</style>