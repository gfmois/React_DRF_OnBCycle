const JWTService = {
    getToken() {
        return localStorage.getItem('token')
    },
    saveToken(token) {
        localStorage.setItem('token', token)
    },
    removeToken() {
        localStorage.removeItem('token')
    },
    getRefreshToken() {
        return localStorage.getItem('refreshToken')
    },
    saveRefreshToken(refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
    },
    removeRefreshToken() {
        localStorage.removeItem('refreshToken')
    },
}

export default JWTService