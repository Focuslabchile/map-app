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
      localStorage.setItem('darkMode', this.darkMode)
      const event = new CustomEvent('dark-mode', { detail: this.darkMode });
      document.dispatchEvent(event);
    }
  },
  mounted() {
    const savedMode = localStorage.getItem('darkMode')
    if(savedMode) {
      this.darkMode = savedMode === 'true'
      savedMode === 'true' ? this.darkMode = true : this.darkMode = false
    } else {
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
      this.darkMode = prefersDarkScheme.matches
    }
    if(this.darkMode) {
      document.body.classList.add('dark-mode')
    }
  }
}
</script>