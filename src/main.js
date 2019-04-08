// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'

// todo
// cssVars()

Vue.use(BootstrapVue)
Vue.use(VueCookie)
Vue.use(VueAxios, axios)

Vue.prototype.apiRequest = axios.create({
  baseURL: process.env.VUE_APP_API_GATEWAY
})
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.apiRequest.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
