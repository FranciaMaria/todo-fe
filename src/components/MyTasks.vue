<template>
    <div class="container">
        <div class="row">
            <div class="col-md-30">
                <div class="panel panel-default">    

                 <br><button type="button" class="btn btn-default btn-xs" @click="getMyTasks" v-if="mytask != true && loggedUser.id > 0">Refresh</button><br>

                  <br><div class="panel-heading">
                      <strong>My Tasks</strong>
                    </div><br>

                    <div class="panel-body">
                        <br><table class="table table-bordered table-striped table-responsive" v-if="tasks.length">
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
                            <tr v-for="(task, index) in tasks" :key="index" v-if="task.user_id === loggedUser.id">
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
                                 <td v-if="task.completed != true && task.user_id === loggedUser.id">
                                    <button type="button" @click="completeTask(task)" class="btn btn-warning btn-xs">Complete</button><br>
                                    <button type="button" @click="initUpdate(index)" class="btn btn-success btn-xs">Edit</button>
                                    <button type="button" @click="deleteTask(task)" class="btn btn-danger btn-xs">Delete</button>
                                </td>
                                <td v-if="task.completed != false && task.user_id === loggedUser.id">
                                    <button type="button" @click="completeTask(task)" class="btn btn-default btn-xs">Completed</button>
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
                                <button type="button" @click="updateTask(update_task)" class="btn btn-primary">Submit</button>
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
          loggedUser: {}
        };
      },
      mounted() {
        this.setLoggedUser();
        this.getMyTasks();
      },
      methods: {
        setLoggedUser () {
          this.loggedUser = authService.getLoggedUser()
        },
        getMyTasks(){
          this.tasks = taskFormService.getMyTasks(this.loggedUser.id)
          this.tasks.then(response => {
              this.tasks = response.data.tasks
           }).catch(e => {
                return e
          })
        },
        initUpdate(index) {
          this.errors = [];
          this.update_task = this.tasks[index];
          if(this.update_task.user_id === this.loggedUser.id){
            this.edit = true;
          }
        },
        updateTask(update_task) {
            
            taskFormService.updateTask(update_task, this.loggedUser.id)
            this.$router.push('/myTasks') 
        },
        closeModal() {
          this.create = false;
          this.edit = false;
          this.$router.push('/myTasks');
        },
        completeTask(task) {
         taskFormService.completeTask(task, this.loggedUser.id);
         this.$router.push('/myTasks');
        },
        deleteTask(task) {
          taskFormService.deleteTask(task, this.loggedUser.id);
          this.$router.push('/myTasks');
        },
      }
    };
</script>