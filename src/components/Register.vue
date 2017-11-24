<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <br><div class="panel-heading"><strong>Register</strong></div><br>
                    <div class="panel-body">
                        <form @submit.prevent='registerUser'>

                            <div class="form-group">
                                <label for="name" class="col-md-6 control-label">Name</label>

                                <div class="col-md-10">
                                    <input id="name" type="text" class="form-control" v-model="register.name"  required autofocus>
                                
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                                <div class="col-md-10">
                                    <input id="email" type="email" class="form-control" v-model="register.email" value="" required>

                                
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password" class="col-md-4 control-label">Password</label>

                                <div class="col-md-10">
                                    <input id="password" type="password" class="form-control" v-model="register.password" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-4">
                                    <button type="submit" class="btn btn-primary">
                                        Register
                                    </button>
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
        return {
            register:{
                name:"",
                email:"",
                password:""
            },
            hasErrors:{
                    name:false,
                    email:false,
                    password:false
                },
                errorMessage:{
                    name:null,
                    email:null,
                    password:null
                },
            users: [],
            errors: [],
            statusText: ''
        }
    },
    methods:{
        registerUser(){
            var _this = this
            var vm = this.hasErrors
            var _vm = this.errorMessage
            axios.post('http://localhost:8000/api/register', {
                name: _this.register.name,
                email: _this.register.email,
                password: _this.register.password
            },
            {headers: {'X-Requested-With': 'XMLHttpRequest'}})
            .then((response) =>{
                _this.users.push(respone.data.register);
                console.dir(_this.users);
            })
            .catch((error) => {
                                  var errors = error.response
                    if(errors.statusText === 'Unprocessable Entity'){
                        if(errors.data){
                            if(errors.data.name){
                               vm.name = true
                               _vm.name = _.isArray(errors.data.name) ? errors.data.name[0]: errors.data.name
                            }
                            if(errors.data.email){
                               vm.email = true
                               _vm.email = _.isArray(errors.data.email) ? errors.data.email[0]: errors.data.email
                            }
                            if(errors.data.password){
                               vm.password = true
                               _vm.password = _.isArray(errors.data.password) ? errors.data.password[0]: errors.data.password
                            }
                        }
                    }
                
            });
            window.location.href = 'http://localhost:8080/#/login';
        },

        getRequestHeaders(){
              // return new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('loginToken'));
              axios.defaults.headers.common['Authorization'] = "Bearer" +  authtoken.token
        }

        

    }
}
</script>