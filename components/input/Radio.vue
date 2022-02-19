<template>
  <div class="radio-container">
    <span v-for="(item, index) in options" :key="index">
      <input
        @click="$emit('update', item)"
        type='radio'
        :name='groupName'
        :checked="selected === item ? 'checked' : ''"
        :value='item'
        :id='`${item}-${groupName}`'
      >
      <label :for='`${item}-${groupName}`'>{{item}}</label>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    groupName: {
      type: String,
      default: 'radio',
      required: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    selected() {
      if(this.value === '') {
        console.log('no value', this.options[0])
        return this.options[0]
      }
      return this.options.find(item => item === this.value)
    }
  }
}
</script>
<style lang="scss">
.radio-container {
  display: flex;
  width: fit-content;
  box-shadow: var(--box-shadow);
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
  input[type='radio'] {
    display: none;
  }
  span {
    display: block;
    label {
      cursor: pointer;
      display: block;
      padding: 6px 12px;
    }
  }
  :checked + label {
    background: #333;
    color: #fff;
  }
}
</style>