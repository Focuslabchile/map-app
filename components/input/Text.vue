<template>
  <div class="input-container">
    <label :for="name">{{label}}</label>
    <input
      :autocomplete="autocomplete"
      :name="name"
      v-model="value"
      @input="$emit('update:model', value); $emit('update', value)"
      type="text">
  </div>
</template>
<script>
export default {
  props: {
    autocomplete: {
      type: String,
      default: 'on'
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    model: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: ''
    }
  },
  mounted() {
    this.value = this.model
  }
}
</script>
<style lang="scss">
.input-container {
  input[type='text'] {
    width: 100%;
    border: 1px solid var(--gray);
    border-radius: 4px;
    box-shadow: var(--box-shadow);
    text-indent: 5px;
  }
}
</style>