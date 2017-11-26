import axios from 'axios'
import router from './../router'
// Vue.use(axios)
export default class AuthService {
    constructor(errors) {
        this.logedUser = this.setLogedUser()
        this.errors = []
    }
    register(user) {
        axios.post('http://localhost:8000/api/register', {
            name: user.name,
            email: user.email,
            password: user.password
        })
            .then(response => { })
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
                //console.log(response)
            })
            .catch(e => {
                this.errors.push(e)
                console.log(this.errors)
            })
    }

    logout() {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('user')
        // this.$router.push('/login')
    }

    setLogedUser(user) {
        //console.log()
        let activeUser = JSON.parse(window.localStorage.getItem('user'))
        this.logedUser = activeUser
        return activeUser
    }

    getLogedUser() {
        return this.logedUser
    }

    isUserLoged() {
        let isSetToken = !!window.localStorage.getItem('token')
        return isSetToken
    }
}

export const authService = new AuthService()