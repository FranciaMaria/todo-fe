<template>
  <div class="container mx-auto">
    <div class="row">
      <div class="col-xs-6 col-sm-8 mt-4">
        <div class="form mt-4 mx-auto" v-on:submit.prevent="login(user)">
  
          <div class="form-group">
            <label for="email">Email: </label>
              <input v-validate data-vv-rules="required|email" id="email" type="email" class="form-control" name="email" v-model="user.email" />
              <div v-show="errors.has('email')" class="alert alert-danger">{{ errors.first('email') }}</div>
          </div>
          <div class="form-group">
            <label for="password">Password: </label>
              <input v-validate data-vv-rules="required|min:6|alpha_dash" id="password" type="password" class="form-control" name="password" v-model="user.password" />
              <div v-show="errors.has('password')" class="alert alert-danger">{{ errors.first('password') }}</div>
          </div>
       
          <button type="submit" class="btn btn-primary" v-on:click="login(user)">Log in</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '../shared/AuthService'

export default {
  data () {
    return {
      user: {}
    }
  },
  
  methods: {
    login (user) {
      authService.login(user)
      this.user = {}

    }
  }
}
</script>