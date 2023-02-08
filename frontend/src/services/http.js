import axios from "axios"
import JWTService from "./JWTService"

export default function Http() {
    if (JWTService.getToken() || JWTService.getRefreshToken()) {
        return axios.create({
            baseURL: 'http://localhost:8000/',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JWTService.getToken()}`
            }
        })
    }

    return axios.create({
        baseURL: "http://localhost:8000/"
    })
}