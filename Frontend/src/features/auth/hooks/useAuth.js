import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            console.log('useAuth: Calling login API')
            const data = await login({ email, password })
            console.log('useAuth: Login API returned:', data)
            if (data && data.user) {
                console.log('useAuth: Setting user:', data.user)
                setUser(data.user)
                console.log('useAuth: Login successful')
                return true
            } else {
                console.error('useAuth: No user data in response')
                return false
            }
        } catch (err) {
            console.error('useAuth: Login failed:', err.message)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (err) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, []) // Empty dependency array is correct

    return { user, loading, handleRegister, handleLogin, handleLogout }
}