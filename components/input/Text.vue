<template>
  <div class="input-container">
    <label :for="name">{{label}}</label>
    <input
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :name="name"
      v-model="value"
      @input="$emit('update:model', value); $emit('update', value)"
      type="text">
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
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
<style lang="scss" scoped>
.input-container {
  input[type='text'] {
    color: var(--darkgray);
    width: 100%;
    border: 1px solid var(--gray);
    text-indent: 5px;
    padding: 4px 0;
    outline: none;
  }
}
</style>