<template>
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link class="navbar-brand" to="/">Todo List</router-link>
    <ul class="navbar-nav mr-0">
      <li class="nav-item active">
        <router-link class="nav-link" to="/login" v-if="!isUserLoggedIn">Log in</router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" to="/register" v-if="!isUserLoggedIn">Register</router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" to="/myTasks" v-if="isUserLoggedIn">My Tasks</router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" to="/newTask" v-if="isUserLoggedIn">New Task</router-link>
      </li>
      <li class="nav-item active">
        <p class="nav-link" v-on:click="logout" v-if="isUserLoggedIn">Logout</p>
      </li>
    </ul>
</nav>

</template>

<script>
import { authService } from '../shared/AuthService'
export default {
  mounted () {
    this.setLoggedUser() //,
    //this.checkIsUserLogged()
  },
  data () {
    return {
      loggedUser: {},
     // isUserLoggedIn: false
    }
  },
  computed: {
    isUserLoggedIn () {
      return authService.isUserLoggedIn()
    }
  },
  methods: {
    logout () {
      authService.logout()
      this.user = {}
      //this.isUserLoggedIn = false
      this.$router.push('/login')
    },
    setLoggedUser () {
      this.loggedUser = authService.getLoggedUser()
    },
    /* checkIsUserLogged () {
      if (authService.isUserLogged()) {
        this.isUserLogged = true
      } else {
        this.isUserLogged = false
      }
    } */
  }
}
</script>