import Vue from 'vue'
import Router from 'vue-router'
import Task from '@/components/Task'
import Login from '@/components/Login'
import Register from '@/components/Register'
import MyTasks from '@/components/MyTasks'
import NewTask from '@/components/NewTask'
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
      component: Task,
      meta: { requiresAuth: true}
    },
    /* {
      path: '/task',
      name: 'Task',
      component: Task
    }, */
    {
      path: '/myTasks',
      name: 'myTasks',
      component: MyTasks,
      meta: { requiresAuth: true }
    },
    {
      path: '/newTask',
      name: 'newTask',
      component: NewTask,
      meta: { requiresAuth: true }
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
