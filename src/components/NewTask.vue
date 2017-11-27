<template>
    <div class="container">
        <div class="row">
            <div class="col-md-30">
                <div class="panel panel-default">
                      
                       <br><div class="form-group">
                            <label for="name">Name:</label>
                            <input type="text" name="name" id="name" placeholder="Task Name" class="form-control"
                                   v-model="task.name">
                        </div>
                        <div class="form-group">
                            <label for="description">Description:</label>
                            <textarea name="description" id="description" cols="30" rows="5" class="form-control"
                                      placeholder="Task Description" v-model="task.description"></textarea>
                        </div>
                        <div class="form-group">
                            <input type="radio" id="very important" value="very important" v-model="task.priority">
                            <label for="very important">Very Important</label>
                            <br>
                            <input type="radio" id="important" value="important" v-model="task.priority">
                            <label for="important">Important</label>
                            <br>
                            <input type="radio" id="less important" value="less important" v-model="task.priority">
                            <label for="less important">Less Important</label>
                            <br>
                            <span>Priority: {{ task.priority }}</span>
                        </div>
                   
                    <div class="modal-footer">
                        <button type="button" @click="closeModal" class="btn btn-default" data-dismiss="modal">Close</button>
                        <!-- <button type="button" @click="createTask" class="btn btn-primary">Submit</button> -->
                        <button type="button" @click="addTask(task)" class="btn btn-primary">Submit</button>
                    </div>

                </div><br>
            </div>
        </div>
    </div>
</template>

<script>

    import axios from 'axios';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import { taskFormService } from '../shared/TaskFormService';
    import { authService } from '../shared/AuthService'
    
    export default {
      data() {
        return {
          task: {
            name: '',
            description: '',
            priority: '',
            completed: false,
            user_id: '',
            loading: false,
            token: localStorage.getItem('token')
          },
          errors: [],
          tasks: [],
          logedUser: {},
        };
      },
      mounted() {
        this.setLogedUser();
      },
      methods: {
        closeModal() {
          this.create = false;
          this.edit = false;
          window.location.href = 'http://localhost:8080';
        },
        newTask(){
          this.create = true;
        },
        addTask(task) {
          taskFormService.addTask(task, this.logedUser.id);
          //this.$router.push('/')
        },
        setLogedUser () {
          this.logedUser = authService.getLogedUser()
        },
        reset() {
          this.task.name = '';
          this.task.description = '';
          this.task.priority = '';
        },
      }
    };
</script>