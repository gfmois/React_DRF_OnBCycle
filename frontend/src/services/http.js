import axios from "axios"

export default function Http() {
    return axios.create({
        baseURL: "http://localhost:8000/"
    })
}