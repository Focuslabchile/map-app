<template>
  <div class="dark-mode">
    <a href="javascript:void(0)">
      <span @click="toggle" v-if="darkMode" class="material-icons">light_mode</span>
      <span @click="toggle" v-else class="material-icons">dark_mode</span>
    </a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      darkMode: false
    }
  },
  methods: {
    toggle() {
      this.darkMode = !this.darkMode
      document.body.classList.toggle('dark-mode')
    }
  },
  mounted() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    this.darkMode = prefersDarkScheme.matches
  }
}
</script>