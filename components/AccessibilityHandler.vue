<template>
  <div class="dark-mode primary accessibility flex items-center p-2">
    <span @click="toggle" v-if="darkMode" class="cursor-pointer material-icons">light_mode</span>
    <span @click="toggle" v-else class="cursor-pointer material-icons">dark_mode</span>
    <span @click="zoom('+')" class="cursor-pointer material-icons">zoom_in</span>
    <span @click="zoom('-')" class="cursor-pointer material-icons">zoom_out</span>
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
    zoom(type) {
      const min = 16;
      const max = 24;
      const step = 0.5;

      const el = document.querySelector('html')
      let currentSize = window.getComputedStyle(el, null).getPropertyValue('font-size')
      currentSize = parseFloat(currentSize.replace('px', ''))

      if(currentSize <= min && type === '-') return;
      if(currentSize >= max && type === '+') return;

      el.style.fontSize = currentSize + (type === '+' ? step : -step) + 'px'
    },
    toggle() {
      this.darkMode = !this.darkMode
      localStorage.setItem('darkMode', this.darkMode)
      const event = new CustomEvent('dark-mode', { detail: this.darkMode })
      document.dispatchEvent(event);
    }
  },
  mounted() {
    const savedMode = localStorage.getItem('darkMode')
    document.addEventListener('dark-mode', (e) => {
      document.body.classList.toggle('dark-mode')
    })
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
<style lang="scss" scoped>
.accessibility {
  //position: fixed;
  //transform: translateX(-88px);
  //z-index: 9999;
  border-radius: 8px;
}
</style>
