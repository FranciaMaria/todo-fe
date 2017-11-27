<template>
    <div class="container">
        <div class="row">
            <div class="col-md-30">
                <div class="panel panel-default">    

                 <br><button type="button" class="btn btn-default btn-xs" @click="getMyTasks" v-if="mytask != true && logedUser.id > 0">Refresh</button><br>         

                  <br><div class="panel-heading">
                      <strong>My Tasks</strong>
                    </div><br>

                    <div class="panel-body">
                        <br><table class="table table-bordered table-striped table-responsive" v-if="tasks.length > 0">
                            <tbody>
                            <tr>
                                <th>
                                    No.
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Description
                                </th>
                                <th>
                                    Priority
                                </th>
                                <th>
                                    User ID
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                            <tr v-for="(task, index) in tasks" :key="index" v-if="task.user_id === logedUser.id">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    {{ task.name }}
                                </td>
                                <td>
                                    {{ task.description }}
                                </td>
                                <td>
                                    {{ task.priority }}
                                </td>
                                <td>
                                    {{ task.user_id }}
                                </td>
                                 <td v-if="task.completed != true && task.user_id === logedUser.id">
                                    <button type="button" @click="completeTask(task)" class="btn btn-warning btn-xs">Complete</button><br>
                                    <button type="button" @click="initUpdate(index)" class="btn btn-success btn-xs">Edit</button>
                                    <button type="button" @click="deleteTask(task)" class="btn btn-danger btn-xs">Delete</button>
                                </td>
                                <td v-if="task.completed != false && task.user_id === logedUser.id">
                                    <button type="button" @click="completedTask(task)" class="btn btn-default btn-xs">Completed</button>
                                    <button type="button" @click="deleteTask(task)" class="btn btn-danger btn-xs">Delete</button>
                                </td>
                            </tr>

                            <div v-if="edit === true">
                        <div class="form-group">
                            <label>Name:</label>
                            <input type="text" placeholder="Task Name" class="form-control"
                                   v-model="update_task.name">
                        </div>
                        <div class="form-group">
                            <label for="description">Description:</label>
                            <textarea cols="30" rows="5" class="form-control"
                                      placeholder="Task Description" v-model="update_task.description"></textarea>
                        </div>
                        <div class="form-group">
                            <input type="radio" id="very important" value="very important" v-model="update_task.priority">
                            <label for="very important">Very Important</label>
                            <br>
                            <input type="radio" id="important" value="important" v-model="update_task.priority">
                            <label for="important">Important</label>
                            <br>
                            <input type="radio" id="less important" value="less important" v-model="update_task.priority">
                            <label for="less important">Less Important</label>
                            <br>
                            <span>Priority: {{ update_task.priority }}</span>
                        </div>
                    
                    <div class="modal-footer">
                        <button type="button" @click="closeModal" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" @click="updateTask" class="btn btn-primary">Submit</button>
                    </div>
                  </div>
                            
                            </tbody>
                        </table>
                    </div>
                </div>
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
          create: false,
          edit: false,
          mytask: false,
          errors: [],
          tasks: [],
          update_task: {},
          logedUser: {},
        };
      },
      mounted() {
        this.setLogedUser();
        this.getMyTasks();
      },
      methods: {
        setLogedUser () {
          this.logedUser = authService.getLogedUser()
        },
        getMyTasks(){
          axios.get('http://localhost:8000/api/task/' + this.logedUser.id, {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then(response => {
            this.tasks = response.data.tasks
        }).catch(e => {
            return e
        })
        },
        initUpdate(index) {
          this.errors = [];
          this.update_task = this.tasks[index];
          if(this.update_task.user_id === this.logedUser.id){
            this.edit = true;
          }
        },
        updateTask() {
          const link = 'http://localhost:8000/api/task/';
          axios.put(link + this.update_task.id, {
            name: this.update_task.name,
            description: this.update_task.description,
            priority: this.update_task.priority,
          },
        {headers: {'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Bearer ${localStorage.getItem('token')}`}})
          .then(response => {
            this.tasks.push(this.update_task);
            //this.edit = false;
          })
          .catch(error => {
            this.errors = [];
            if (error.response.data.errors.name) {
                this.errors.push(error.response.data.errors.name[0]);
            }
            if (error.response.data.errors.description) {
                this.errors.push(error.response.data.errors.description[0]);
            }
            if (error.response.data.errors.priority) {
                this.errors.push(error.response.data.errors.priority[0]);
            }
          });
          //this.$router.push('/')
        },
        closeModal() {
          this.create = false;
          this.edit = false;
          window.location.href = 'http://localhost:8080';
        },
        completeTask(task) {
          const link = 'http://localhost:8000/api/task/complete/';
          axios.put(link + task.id,
            { headers: {'X-Requested-With': 'XMLHttpRequest'},
              'Authorization': `Bearer ${localStorage.getItem('token')}`})
            .then(
              this.task.completed = true
          );
         this.$router.push('/myTasks');
        },
        completedTask(task) {
          const link = 'http://localhost:8000/api/task/completed/';
          axios.put(link + task.id,
            { headers: {'X-Requested-With': 'XMLHttpRequest'},
              'Authorization': `Bearer ${localStorage.getItem('token')}`})
          .then(
            this.task.completed = false
          );
          this.$router.push('/myTasks');
        },
        deleteTask(task) {
          const link = 'http://localhost:8000/api/task/';
          axios.delete(link + task.id,
            {headers: {'X-Requested-With': 'XMLHttpRequest'},
              'Authorization': `Bearer ${localStorage.getItem('token')}`})
          .then((response) => {
              this.tasks.splice(task.id, 1);
          })
          .catch((error) => {
            })
          this.$router.push('/myTasks');
        },
      }
    };
</script>