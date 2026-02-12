import axios from 'axios'
import { useAuthStore } from '../state/auth'

const api = axios.create({
    baseURL: 'http://localhost:3000', // Replace with your API base URL
})

// Before send request
api.interceptors.request.use(config => {
    const token = useAuthStore.getState().accessToken
    config.headers = config.headers || {}
    if (token) {
        (config.headers as any).Authorization = `Bearer ${token}`
    }
    return config
})

// After get response
// Handle 401 errors (Unauthorized)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear auth state on 401
            const authStore = useAuthStore.getState()
            authStore.logout()
            // Redirect to login page if not already there
            if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                // Use replace to avoid adding to history
                window.location.replace('/login')
            }
        }
        return Promise.reject(error)
    }
)

export default api