<template>
<main>
  <AppHeader />
  <Nuxt />
  <AppFooter />
</main>
</template>
<style lang="scss">
* {
  font-family: 'Roboto', sans-serif;
}
:root {
  --primary: rgb(49, 119,195);
  --light: rgba(49, 119,195, .3);
  --white: #fff;
  --gray: lightgrey;
  --box-shadow: 0 1px 3px rgb(0 0 0 / 20%);
}
body { margin: 0; padding: 0; width: 100%;}
.limit {
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}
</style>