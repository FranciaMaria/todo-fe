<template>
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link class="navbar-brand" to="/">Todo List</router-link>
    <ul class="navbar-nav mr-0">
      <li class="nav-item active">
        <router-link class="nav-link" to="/login" v-if="isUserLoged === false">Log in</router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" to="/register" v-if="isUserLoged === false">Register</router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" to="/myTasks" v-if="isUserLoged === true">My Tasks</router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" to="/newTask" v-if="isUserLoged === true">New Task</router-link>
      </li>
      <li class="nav-item active">
        <p class="nav-link" v-on:click="logout" v-if="isUserLoged === true">Logout</p>
      </li>
    </ul>
</nav>

</template>

<script>
import { authService } from '../shared/AuthService'
export default {
  mounted () {
    this.setLogedUser(),
    this.checkIsUserLoged()
  },
  data () {
    return {
      logedUser: {},
      isUserLoged: false
    }
  },
  methods: {
    logout () {
      authService.logout()
      this.user = {}
      this.isUserLoged = false
      this.$router.push('/login')
    },
    setLogedUser () {
      this.logedUser = authService.getLogedUser()
    },
    checkIsUserLoged () {
      if (authService.isUserLoged()) {
        this.isUserLoged = true
      } else {
        this.isUserLoged = false
      }
    }
  }
}
</script>