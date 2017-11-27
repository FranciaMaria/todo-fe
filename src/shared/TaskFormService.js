import axios from 'axios'
import router from './../router'

export default class TaskFormService {
    addTask(task, logedUserId) {
        axios.post('http://localhost:8000/api/task', {
            name: task.name,
            description: task.description,
            priority: task.priority,
            user_id: logedUserId
        }, {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            })
            .then(response => { })
            .catch(e => {
                return e
            })
        //router.push('/')
    }
}
export const taskFormService = new TaskFormService();