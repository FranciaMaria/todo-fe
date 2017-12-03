// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Task from './components/Task'
import router from './router'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import { authService } from './shared/AuthService';
import VueResource from 'vue-resource';
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.use(VueResource);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  axios,
  template: '<App/>',
  components: { App }
  /* template: '<Task/>',
  components: { Task } */
})

axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token')

/* router.beforeEach((to, from, next) => {
  if (to.path != '/login' && to.path != '/register') {
    if (authService.isUserLoggedIn()) {
      router.go('/')
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
}) */

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth){
    if(authService.isUserLoggedIn()) {
      router.go('/')
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

