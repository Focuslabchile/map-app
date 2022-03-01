<template>
  <div class="form-control">
    <label v-if="name && name.length" :for="name">{{name}}</label>
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
  }
}
</script>
<style lang="scss">
.form-control {
  margin-bottom: 10px;
  label {
    font-size: .75rem;
    font-weight: bold;
    display: block;
  }
  .btn {
    border-radius: 4px;
    border: 1px solid var(--gray);
    padding: 2px 7px;
  }
  input {
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
    }
  }
}
</style>
