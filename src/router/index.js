import Vue from 'vue'
import Router from 'vue-router'
import Task from '@/components/Task'
import Login from '@/components/Login'
import Register from '@/components/Register'
//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    /* {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, */
    {
      path: '/',
      name: 'Task',
      component: Task
    },
    {
      path: '/task',
      name: 'Task',
      component: Task
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
  ]
})
