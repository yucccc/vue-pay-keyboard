import Vue from 'vue'
import App from './App.vue'
import vuePayKeyboard from './lib/index.js'
Vue.use(vuePayKeyboard)
new Vue({
  el: '#app',
  render: h => h(App)
})
