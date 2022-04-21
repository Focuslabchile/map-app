<template>
  <div :class="['form-control', {'animate__animated animate__headShake':shake}]">
    <label v-if="name && name.length" :for="name">{{name}}</label>
    <slot />
    <span class="description" v-if="description">{{description}}</span>
    <br v-if="alert">
    <small v-if="alert" class="alert">{{alert}}</small>
  </div>
</template>
<script>
export default {
  props: {
    alert: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      shake: false
    }
  },
  watch: {
    alert() {
      if(!this.alert) {
        return
      }
      this.shake = true
      setTimeout(() => {
        this.shake = false
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.form-control {
  &:not(.mb-0) {
    margin-bottom: 10px;
  }
  label {
    font-weight: bold;
    display: block;
  }
  .description {
    font-weight: 300;
  }
  .btn {
    border-radius: 4px;
    border: 1px solid var(--gray);
    padding: 2px 7px;
    &.btn-big {
      padding: 5px 40px;
      text-transform: uppercase;
    }
  }
  input {
    color: #333;
    width: 100%;
    padding: 7px 11px;
    border: 1px solid var(--gray);
    border-radius: 4px;
  }
  .select-wrapper {
    position: relative;
    &::after {
      border: 3px solid var(--primary);
      border-radius: 2px;
      border-right: 0;
      border-top: 0;
      content: " ";
      display: block;
      height: 0.625em;
      margin-top: -0.4375em;
      pointer-events: none;
      position: absolute;
      top: 50%;
      transform: rotate(-45deg);
      transform-origin: center;
      width: 0.625em;
      right: 9px;
    }
    select {
      width: 100%;
      padding: 7px 11px;
      padding-right: 2.5em;
      border: 1px solid var(--gray);
      border-radius: 4px;
      position: relative;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      color: var(--darkgray);
    }
  }
}
</style>
