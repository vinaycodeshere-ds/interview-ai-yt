import axios from "axios"


const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data

    } catch (err) {

        console.log(err)
        throw err

    }

}

export async function login({ email, password }) {

    try {
        console.log('Attempting login with:', { email })
        const response = await api.post("/api/auth/login", {
            email, password
        })

        console.log('Login response:', response.data)
        return response.data

    } catch (err) {
        console.error('Login error response:', err.response?.data || err.message)
        console.error('Full error:', err)
        throw err
    }

}

export async function logout() {
    try {

        const response = await api.get("/api/auth/logout")

        return response.data

    } catch (err) {
        throw err
    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        return response.data

    } catch (err) {
        console.log(err)
        throw err
    }

}
