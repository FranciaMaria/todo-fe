import axios from 'axios'
import router from './../router'

export default class AuthService {
    constructor(errors) {
        this.loggedUser = this.setLoggedUser()
        this.errors = []
    }
    register(user) {
        axios.post('http://localhost:8000/api/register', {
            name: user.name,
            email: user.email,
            password: user.password
        })
            .then(response => {})
            .catch(e => {
                this.errors.push(e)
            })
    }

    login(user) {
        console.log(axios)
        axios.post('http://localhost:8000/api/login', {
            email: user.email,
            password: user.password
        })
            .then(response => {
                console.log(response)
                window.localStorage.setItem('token', response.data.token)
                window.localStorage.setItem('user', JSON.stringify(response.data.authorisedUser))
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
                console.log(axios.defaults.headers.common)
                router.push({ name: 'Task', params: { id: user.id } })
            })
            .catch(e => {
                this.errors.push(e)
                console.log(this.errors)
                router.push('/register')
            })
    }

    logout() {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('user')
    }

    setLoggedUser(user) {
        let activeUser = JSON.parse(window.localStorage.getItem('user'))
        this.loggedUser = activeUser
        return activeUser
    }

    getLoggedUser() {
        return this.loggedUser
    }

    isUserLoggedIn() {
        let isSetToken = !!window.localStorage.getItem('token')
        if(isSetToken != 0){
            return isSetToken
        }
        else{
            console.log("No token!")
        }
        
    }
    
}

export const authService = new AuthService()