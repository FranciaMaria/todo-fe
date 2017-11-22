import Vue from 'vue'
import Router from 'vue-router'
import Task from '@/components/Task'
// import HelloWorld from '@/components/HelloWorld'

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
    }
  ]
})
