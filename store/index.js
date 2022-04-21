export const state = () => ({
  toast: {
    message: '',
    type: 'success',
    status: 'close',
  }
})

export const mutations = {
  setToast(state, data) {
    state.toast = {
      message: data.message,
      type: data.type,
      duration: data.duration,
      status: data.status
    }
  }
}