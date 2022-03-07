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
      default: 'section-primary'
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
@import '~assets/scss/colors.scss';

.section {
  &.section-primary {
    @extend .primary;
  }
  &.section-secondary {
    @extend .secondary;
  }
}
</style>