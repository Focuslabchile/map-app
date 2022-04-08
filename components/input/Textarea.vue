<template>
  <div class="textarea-container">
    <label :for="name">{{label}}</label>
    <textarea
      rows="4"
      :name="name"
      v-model="value"
      @input="$emit('update:model', value); $emit('update', value);"
    />
  </div>
</template>
<script>
export default {
  props: {
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
.textarea-container {
  textarea {
    color: var(--darkgray);
    width: 100%;
    border: 1px solid var(--gray);
    padding: 5px;
    outline: none;
  }
}
</style>