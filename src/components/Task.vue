<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        My Tasks
                    </div>

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
                                    <button @click="completeTask(task)" class="btn btn-warning btn-xs">Complete</button>
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
    
    export default {
      data() {
        return {
          task: {
            name: '',
            description: '',
            priority: '',
            completed: false,
          },
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
        createTask() {
          axios.post('http://localhost:8000/api/task', {
            name: this.task.name,
            description: this.task.description,
            priority: this.task.priority,
          })
            .then((response) => {
              this.reset();
              this.tasks.push(response.data.task);
              // $('#add_task_model').modal('hide');
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
          // $('#update_task_model').modal('show');
          this.update_task = this.tasks[index];
        },
        updateTask() {
          const link = 'http://localhost:8000/api/task/';
          axios.patch(link + this.update_task.id, {
            name: this.update_task.name,
            description: this.update_task.description,
            priority: this.update_task.priority,
          })
            .then(
              // $('#update_task_model').modal('hide'),
            )
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
          window.location.href = 'http://localhost:8000/api/task';
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
          window.location.href = 'http://localhost:8000/api/task';
            // }
        },
        deleteTask(task) {
            // let conf = confirm("Do you really want to delete this task?");
            // if (conf === true) {
          const link = 'http://localhost:8000/api/task/';
          axios.delete(link + task.id)
            /* .then((response) => {
              this.tasks.splice(task.id, 1);
            }); */
            .then(
              this.tasks.splice(task.id, 1),
            );
            /* .catch((error) => {
            }); */
          window.location.href = 'http://localhost:8000/api/task';
            // }
        },
      },
    };
</script>