<template>
  <section :class="['section py-12', background]">
    <div class="limit">
      <h3>{{title}}</h3>
      <slot />
    </div>
  </section>
</template>
<script>
export default {
  props: {
    background: {
      type: String,
      default: 'primary'
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>

</style>