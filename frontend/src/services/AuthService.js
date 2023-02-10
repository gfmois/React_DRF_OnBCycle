import Http from "./http";

const AuthService = {
    login(credentials) {
        return Http().post('/auth/login', credentials)
    },
    register(credentials) {
        return Http().post('/auth/register', credentials)
    },
    getUser() {
        return Http().get('/auth/user')
    },
    isAdmin(data) {
        return Http().get('/auth/isAdmin', data)
    },
    getUsers() {
        return Http().get('/auth/users')
    }
}

export default AuthService