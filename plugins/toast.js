export default ({ app }, inject) => {
  const toast = {
    timeout: null,
    success: (message, duration = 10000) => {
      app.$toast.open({
        message,
        type: 'success',
        duration: duration
      })
    },
    danger: (message, duration = 10000) => {
      app.$toast.open({
        message,
        type: 'danger',
        duration: duration
      })
    },
    warning: (message, duration = 10000) => {
      app.$toast.open({
        message,
        type: 'warning',
        duration: duration
      })
    },
    waiting: (message, duration = 10000) => {
      app.$toast.open({
        message,
        type: 'waiting',
        duration: duration
      })
    },
    open: ({message, type, duration}) => {
      app.store.commit('setToast', {
        message,
        type,
        status: 'open'
      })
      toast.timeout = setTimeout(() => {
        toast.close()
      }, duration)
    },
    close: () => {
      clearTimeout(toast.timeout)
      app.store.commit('setToast', {
        message: '',
        type: '',
        status: 'close'
      })
    }
  }
  inject('toast', toast)
}