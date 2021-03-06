import axios from 'axios'
import router from './../router'

export default class TaskFormService {

    tasks = []

    readTasks(){
        let tasksList = axios.get('http://localhost:8000/api/task',
            {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            return tasksList;
    }

    getMyTasks(loggedUserId) {

        let myTasksList = axios.get('http://localhost:8000/api/task/' + loggedUserId, {
            headers: {
                Authorization: 'Bearer ' + window.localStorage.getItem('token')
            }
        });

        return myTasksList;
    }

    addTask(task, loggedUserId) {
        axios.post('http://localhost:8000/api/task', {
            name: task.name,
            description: task.description,
            priority: task.priority,
            user_id: loggedUserId
        }, {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            })
            .then(response => { })
            .catch(e => {
                return e
            })
        router.push('/myTasks')
    }

    updateTask(update_task, loggedUserId){
        if(update_task.user_id === loggedUserId){
            const link = 'http://localhost:8000/api/task/';
            axios.put(link + update_task.id, {
                name: update_task.name,
                description: update_task.description,
                priority: update_task.priority,
            },
                {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(response => {
                    this.tasks.push(update_task);
                })
                .catch(error => {}
            );
            router.push('/myTasks');
        }
    }

    completeTask(task, loggedUserId){
        if(task.user_id === loggedUserId){
            const link = 'http://localhost:8000/api/task/complete/';
            axios.put(link + task.id,
                {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                })
                .then(
                task.completed = !task.completed
                );
        }
        router.push('/myTasks');
    }

    deleteTask(task, loggedUserId){
        if(task.user_id === loggedUserId){
            const link = 'http://localhost:8000/api/task/';
            axios.delete(link + task.id,
                {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                })
                .then((response) => {
                    this.tasks.splice(task.id, 1);
                })
                .catch((error) => {
                })
        }
        router.push('/myTasks');
    }
}
export const taskFormService = new TaskFormService();