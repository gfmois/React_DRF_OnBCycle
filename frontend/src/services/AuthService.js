import Http from "./http";

const AuthService = {
    login(credentials) {
        return Http().post('/auth/login', credentials)
    },
    register(credentials) {
        return Http().post('/auth/register', credentials)
    },
    getUser(data) {
        return Http().get('/auth/user', data)
    },
    isAdmin(data) {
        return Http().get('/auth/isAdmin', data)
    }
}

export default AuthService