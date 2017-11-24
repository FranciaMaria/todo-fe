<template>

    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                     <br><div class="panel-heading"><strong>Login</strong></div><br>
                    <div class="panel-body">
                        <form @submit.prevent="logIn">

                            <div class="form-group">
                                <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                                <div class="col-md-10">
                                    <input id="email" type="email" class="form-control" v-model="email" required autofocus>

                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password" class="col-md-4 control-label">Password</label>

                                <div class="col-md-10">
                                    <input id="password" type="password" class="form-control" v-model="password" required>

                                </div>
                            </div>

                            <!-- <div class="form-group">
                                <div class="col-md-6 col-md-offset-4">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" > Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div> -->

                            <div class="form-group">
                                <div class="col-md-8 col-md-offset-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>

                                    <!-- <a class="btn btn-link" >
                                        Forgot Your Password?
                                    </a> -->
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

    export default {
data(){
    return{
        email:"",
        password:""
    }
},
methods:{
    logIn(){
        axios.post('http://localhost:8000/api/login', { 
            email:this.email,
            password:this.password
        },
        {headers: {'X-Requested-With': 'XMLHttpRequest'}})
        .then((response) => {
        
            /* let token= response.data.token;
            if(token){
               localStorage.setItem('token',token);
            }
            console.log(token); */
            const token = response.data.token;
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            console.log(JSON.parse(window.atob(base64)));
            localStorage.setItem('token', token);
        })
        .catch((error) => {

            if (error.response.data.errors.email) {
                this.errors.push(error.response.data.errors.email[0]);
            }
            if (error.response.data.errors.password) {
                this.errors.push(error.response.data.errors.password[0]);
            }
                
            });

            window.location.href = 'http://localhost:8080/task';
        }
    }
}
</script>

