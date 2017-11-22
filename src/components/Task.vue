<template>
    <div class="container">
        <div class="row">
            <div class="col-md-30">
                <div class="panel panel-default">

                  <br><button @click="newTask()" class="btn btn-info btn-xs" v-if="create != true">Create new Task</button><br>

                    <div v-if="create === true">
                      
                       <div class="form-group">
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
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" @click="createTask" class="btn btn-primary">Submit</button>
                    </div>


                   </div>
                </div><br>

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
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" @click="updateTask" class="btn btn-primary">Submit</button>
                    </div>
                  </div>
               

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
                                    Action
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
                                <td v-if="task.completed != true">
                                    <button @click="completeTask(task)" class="btn btn-warning btn-xs">Complete</button><br>
                                    <button @click="initUpdate(index)" class="btn btn-success btn-xs">Edit</button>
                                    <button @click="deleteTask(task)" class="btn btn-danger btn-xs">Delete</button>
                                </td>
                                <td v-if="task.completed != false">
                                    <button @click="completedTask(task)" class="btn btn-default btn-xs">Completed</button>
                                    <button @click="deleteTask(task)" class="btn btn-danger btn-xs">Delete</button>
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

    
    export default {
      data() {
        return {
          task: {
            name: '',
            description: '',
            priority: '',
            completed: false,
          },
          create: false,
          edit: false,
         /*  name: '',
          description: '',
          priority: '', */
          errors: [],
          tasks: [],
          update_task: {},
        };
      },
      mounted() {
        this.readTasks();
      },
      methods: {
        /* initAddTask() {
            // $("#add_task_model").modal("show");
        }, */
        newTask(){
          this.create = true;
        },
        createTask() {
          axios.post('http://localhost:8000/api/task', {
            name: this.task.name,
            description: this.task.description,
            priority: this.task.priority,
          })
            .then((response) => {
              this.reset();
              this.tasks.push(response.data.task);
            })
            .catch((error) => {
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
          window.location.href = '/';
        },
        reset() {
          this.task.name = '';
          this.task.description = '';
          this.task.priority = '';
        },
        readTasks() {
          axios.get('http://localhost:8000/api/task')
            .then((response) => {
              this.tasks = response.data.tasks;
            });
        },
        initUpdate(index) {
          this.errors = [];
          this.edit = true;
          this.update_task = this.tasks[index];
        },
        updateTask() {
          const link = 'http://localhost:8000/api/task/';
          axios.put(link + this.update_task.id, {
            name: this.update_task.name,
            description: this.update_task.description,
            priority: this.update_task.priority,
          })
          .then(response => {
            this.tasks.push(this.update_task);
            this.edit = false;
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
        },
        completeTask(task) {
            // let conf = confirm("Completed?");
            // if (conf === true) {
          const link = 'http://localhost:8000/api/task/complete/';
          axios.put(link + task.id)
            .then(
              this.task.completed = true,
          );
                /* .then((response) => {
                  this.task.completed = true;
                }); */
                /* .catch(error => {
                }); */
          window.location.href = 'http://localhost:8080';
                // }
        },
        completedTask(task) {
            // let conf = confirm("Uncompleted this task?");
            // if (conf === true) {
          const link = 'http://localhost:8000/api/task/completed/';
          axios.put(link + task.id)
            /* .then((response) => {
              this.task.completed = false;
            }); */
            .then(
              this.task.completed = false,
            );
            /* .catch(error => {
            }); */
          window.location.href = 'http://localhost:8080';
            // }
        },
        deleteTask(task) {
            // let conf = confirm("Do you really want to delete this task?");
            // if (conf === true) {
          const link = 'http://localhost:8000/api/task/';
          axios.delete(link + task.id)
            .then((response) => {
              this.tasks.splice(task.id, 1);
            });
            /* .then(
              this.tasks.splice(task.id, 1),
            ); */
            /* .catch((error) => {
            }); */
           window.location.href = 'http://localhost:8080/';
            // }
        },
      },
    };
</script>