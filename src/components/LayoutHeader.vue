<template>
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link class="navbar-brand" to="/task">Todo List</router-link>
    <!-- <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" to="/todoListForm">New Todo</router-link>
      </li>  
    </ul> -->
    <ul class="navbar-nav mr-0">
      <li class="nav-item active">
        <router-link class="nav-link" to="/login">Log in</router-link>
      </li>
     <!--  <li class="nav-item active">
        <router-link class="nav-link" to="/login">Log out</router-link>
      </li> -->
      <li class="nav-item active">
        <router-link class="nav-link" to="/register">Register</router-link>
      </li>
    </ul>
</nav>

</template>

<script>

export default {

}
</script>