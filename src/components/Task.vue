<template>
    <div class="container">
        <div class="row">
            <div class="col-md-30">
                <div class="panel panel-default">

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
               
                  <br><div class="panel-heading">
                      <strong v-if="logedUser.id > 0">All Tasks</strong>
                    </div><br>

                    <div class="panel-body">
                        <table class="table table-bordered table-striped table-responsive" v-if="tasks.length > 0">
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
                                    Completed
                                </th>
                                <th>
                                    User ID
                                </th>
                            </tr>
                            <tr v-for="(task, index) in tasks" :key="index">
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
                                    {{ task.completed }}
                                </td>
                                <td>
                                    {{ task.user_id }}
                                </td>
                            </tr>
                            
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
          mytask: true,
          errors: [],
          tasks: [],
          update_task: {},
          logedUser: {},
        };
      },
      mounted() {
        this.readTasks();
        this.setLogedUser();
      },
      methods: {
        setLogedUser () {
          this.logedUser = authService.getLogedUser()
        },
        readTasks() {
          axios.get('http://localhost:8000/api/task',
        /* {headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        } */
        { headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token')
        }})
            .then((response) => {
              this.tasks = response.data.tasks;
            });
        },
      }
    };
</script>