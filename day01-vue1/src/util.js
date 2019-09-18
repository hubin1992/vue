export default {
  setLoacalStorage(name, value) {
    window.localStorage.setItem(name, value)
  },
  getLocalStorage(name) {
    return JSON.parse(window.localStorage.getItem(name))
  }
}