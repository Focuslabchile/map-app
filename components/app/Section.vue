<template>
  <section>
    <h3>{{title}}</h3>
    <slot />
  </section>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>