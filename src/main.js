import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './i18n'
import 'balloon-css'

import ToggleButton from 'vue-js-toggle-button'
import VueScreenSize from 'vue-screen-size'

Vue.use(VueScreenSize)
Vue.use(ToggleButton)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
