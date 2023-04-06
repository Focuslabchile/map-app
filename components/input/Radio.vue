<template>
  <div class="radio-container">
    <span class="radio-input-container" v-for="(item, index) in options" :key="index">
      <input
        @click="updateValue(item)"
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
    allowEmpty: {
      type: Boolean,
      default: false
    },
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
      if(this.allowEmpty && this.value === '') {
        return ''
      }
      if(this.value === '') {
        return this.options[0]
      }
      return this.options.find(item => item === this.value)
    }
  },
  methods: {
    updateValue(value) {
      if (this.allowEmpty && value === this.selected) {
        this.$emit('update', 'delete:'+this.selected)
        return
      }
      this.$emit('update', value)
    }
  }
}
</script>
<style lang="scss" scoped>
.radio-container {
  display: flex;
  width: fit-content;
  box-shadow: var(--box-shadow);
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
  .radio-input-container {
    text-align: center;
  }
  &.w-full {
    width: 100% !important;
    .radio-input-container {
      flex: 1 1 0;
    }
  }
  input[type='radio'] {
    display: none;
  }
  span {
    display: block;
    label {
      color: #333;
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