<template>
<main>
  <Toast />
  <AppHeader />
  <Nuxt />
  <AppFooter />
</main>
</template>
<style lang="scss">
* {
  font-family: 'Rajdhani', sans-serif;
}
body {
  margin: 0;
  padding: 0;
  width: 100%;
  scroll-behavior: smooth;
}
html {
  scroll-behavior: smooth;
}
.limit {
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}
</style>