// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Task from './components/Task'
import router from './router'
import axios from 'axios';

Vue.config.productionTip = false
axios.defaults.headers.common['Content-Type'] = 'application/json'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  template: '<App/>',
  components: { App }
  /* template: '<Task/>',
  components: { Task } */
})
