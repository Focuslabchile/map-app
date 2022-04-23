<template>
  <article v-if="open" class="modal">
    <div class="modal-content">
      <div v-if="close || title" class="modal-title">
        <span class="title mr-4">
          <slot name="modal-title">
              {{title}}
          </slot>
        </span>
        <span class="material-icons cursor-pointer" @click="$emit('update:open')">close</span>
      </div>
      <div class="modal-body my-4">
        <slot />
      </div>
      <footer class="modal-footer">
        <slot name="modalFooter"/>
      </footer>
    </div>
  </article>
</template>
<script>
export default {
  props: {
    close: {
      type: Boolean,
      default: true
    },
    open: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  mounted() {
    // console.log(this)
  }
}
</script>
<style lang="scss" scoped>
.modal {
  z-index: 50;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .5);
  backdrop-filter: blur(2px);
  .modal-content {
    padding: 10px;
    background-color: white;
    border-radius: 4px;
    .modal-title {
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .modal-footer {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>