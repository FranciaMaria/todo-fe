<template>
    <div class="container">
        <div class="row">
            <div class="col-md-30">
                <div class="panel panel-default">             

                  <br><div class="panel-heading">
                      <strong>My Tasks</strong>
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
                                    User ID
                                </th>
                                <th>
                                    Completed
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
                                <td>
                                    {{ task.completed }}
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
          errors: [],
          tasks: [],
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
        }
      }
    };
</script>